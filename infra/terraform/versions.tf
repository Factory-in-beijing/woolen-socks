terraform {
  required_version = ">= 1.9"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
  # Remote state bucket is created once by hand per environment, then enabled here:
  # backend "gcs" { bucket = "<project>-tfstate" prefix = "drivenet" }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
