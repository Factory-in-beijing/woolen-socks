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
