# Minimal infra (Ops: "Terraform (minimal): Cloud Run, Tasks, Scheduler, IAM"). Firestore rules/indexes go through the Firebase CLI.
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "cloudtasks.googleapis.com",
    "cloudscheduler.googleapis.com",
    "secretmanager.googleapis.com",
    "artifactregistry.googleapis.com",
    "firestore.googleapis.com",
  ])
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "images" {
  repository_id = "drivenet"
  format        = "DOCKER"
  location      = var.region
  depends_on    = [google_project_service.apis]
}

# Native-mode Firestore. Rules and indexes are deployed with the Firebase CLI, not Terraform.
# If the console already created "(default)", run: terraform import google_firestore_database.default "(default)"
resource "google_firestore_database" "default" {
  name                              = "(default)"
  location_id                       = var.firestore_location
  type                              = "FIRESTORE_NATIVE"
  point_in_time_recovery_enablement = "POINT_IN_TIME_RECOVERY_ENABLED" # backups/PITR on (Firestore block)
  deletion_policy                   = "ABANDON"
  depends_on                        = [google_project_service.apis]
}

# Runtime identity of the API: least privilege (principle 15). Secret access is granted per secret when secrets are created.
resource "google_service_account" "api" {
  account_id   = "drivenet-api"
  display_name = "DriveNet API (Cloud Run)"
}

resource "google_project_iam_member" "api_roles" {
  for_each = toset(["roles/datastore.user", "roles/cloudtasks.enqueuer", "roles/logging.logWriter"])
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.api.email}"
}

# Background jobs (principle 8): a job is a Firestore record + a task here; handlers live at /internal/jobs.
resource "google_cloud_tasks_queue" "jobs" {
  name     = "jobs"
  location = var.region
  retry_config {
    max_attempts  = 8
    min_backoff   = "5s"
    max_backoff   = "600s"
    max_doublings = 5
  }
  depends_on = [google_project_service.apis]
}

data "google_project" "this" {}

locals {
  # Cloud Run's deterministic URL; also the OIDC audience for /internal/jobs.
  api_url = "https://drivenet-api-${data.google_project.this.number}.${var.region}.run.app"
}

# Identity that Cloud Tasks and Cloud Scheduler present when calling /internal/jobs (verified in the service).
resource "google_service_account" "invoker" {
  account_id   = "drivenet-invoker"
  display_name = "DriveNet job invoker (Tasks/Scheduler)"
}

# The API creates tasks that run "as" the invoker, so it needs actAs on it (and nothing broader).
resource "google_service_account_iam_member" "api_acts_as_invoker" {
  service_account_id = google_service_account.invoker.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.api.email}"
}

resource "google_cloud_run_v2_service" "api" {
  name     = "drivenet-api"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.api.email
    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }
    containers {
      image = var.api_image
      env {
        name  = "SERVICE_URL"
        value = local.api_url
      }
      env {
        name  = "TASKS_QUEUE_PATH"
        value = google_cloud_tasks_queue.jobs.id
      }
      env {
        name  = "TASKS_INVOKER_SA"
        value = google_service_account.invoker.email
      }
      resources {
        limits = { cpu = "1", memory = "512Mi" }
      }
    }
  }

  lifecycle {
    # Cloud Build owns the image and traffic split after the first apply.
    ignore_changes = [template[0].containers[0].image, client, client_version, traffic]
  }
  depends_on = [google_project_service.apis]
}

# Authentication is the service's own JWT check (Firebase ID token), so the endpoint itself is public.
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.api.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Sweeper: Scheduler (Asia/Tbilisi) re-dispatches jobs whose Cloud Task was never created (principle 8).
resource "google_cloud_scheduler_job" "job_sweep" {
  name      = "job-sweep"
  region    = var.region
  schedule  = var.job_sweep_schedule
  time_zone = "Asia/Tbilisi"

  http_target {
    http_method = "POST"
    uri         = "${local.api_url}/internal/jobs/sweep"
    oidc_token {
      service_account_email = google_service_account.invoker.email
      audience              = local.api_url
    }
  }
  depends_on = [google_project_service.apis]
}

# Idempotency records expire by TTL policy (the app also ignores expired records, as TTL deletion can lag).
resource "google_firestore_field" "idempotency_ttl" {
  collection = "idempotency"
  field      = "expiresAt"
  ttl_config {}
  index_config {} # exempt from indexing: TTL fields do not need it and it avoids hot index writes
  depends_on = [google_firestore_database.default]
}

# Failure -> alert (principle 8): permanently failed jobs log {"alert":"job_failed"}; a log metric counts them.
resource "google_logging_metric" "job_failed" {
  name   = "job_failed"
  filter = "resource.type=\"cloud_run_revision\" AND jsonPayload.alert=\"job_failed\""
  metric_descriptor {
    metric_kind = "DELTA"
    value_type  = "INT64"
  }
}

resource "google_monitoring_notification_channel" "email" {
  count        = var.alert_email == "" ? 0 : 1
  display_name = "DriveNet alerts"
  type         = "email"
  labels       = { email_address = var.alert_email }
}

resource "google_monitoring_alert_policy" "job_failed" {
  display_name = "Background job failed permanently"
  combiner     = "OR"
  conditions {
    display_name = "job_failed > 0"
    condition_threshold {
      filter          = "metric.type=\"logging.googleapis.com/user/${google_logging_metric.job_failed.name}\" AND resource.type=\"cloud_run_revision\""
      comparison      = "COMPARISON_GT"
      threshold_value = 0
      duration        = "0s"
      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_SUM"
      }
    }
  }
  notification_channels = [for c in google_monitoring_notification_channel.email : c.id]
}
