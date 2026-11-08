output "api_url" {
  value = google_cloud_run_v2_service.api.uri
}

output "jobs_queue" {
  value = google_cloud_tasks_queue.jobs.name
}
