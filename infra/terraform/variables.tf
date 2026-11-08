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
