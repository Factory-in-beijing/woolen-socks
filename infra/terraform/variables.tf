variable "project_id" {
  type        = string
  description = "One GCP project per environment (staging and prod are separate projects)."
}

variable "region" {
  type    = string
  default = "europe-west1"
}

variable "api_image" {
  type        = string
  description = "Container image of the API. Rollouts normally go through Cloud Build; Terraform only sets the initial one."
}

variable "min_instances" {
  type        = number
  default     = 0
  description = "Set from load-test results (B9), not guesses."
}

variable "max_instances" {
  type    = number
  default = 10
}

variable "firestore_location" {
  type        = string
  default     = "eur3"
  description = "Firestore location is permanent once created; pick deliberately (eur3 = EU multi-region, nam5 = US)."
}

variable "alert_email" {
  type        = string
  default     = ""
  description = "Where failed-job alerts go. Empty = alert policy is created without a notification channel (add one in the console)."
}

variable "job_sweep_schedule" {
  type        = string
  default     = "*/5 * * * *"
  description = "Cron (Asia/Tbilisi) for re-dispatching jobs that never reached the queue. A working assumption, tune from monitoring."
}
