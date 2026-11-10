# Firebase / GCP project setup (staging first, then prod)

What **you** do in the console and what the repo does. Each environment has its own project (`drivenet-staging`, `drivenet-prod` — names are your choice).

## 1. You: create the project

1. Firebase Console → create the project (Blaze plan — required by Cloud Run, Tasks and App Hosting).
2. Enable: **Authentication** (+ Phone provider), **Firestore** (Native mode; the location is **permanent** — `eur3` is the default, change it in the variables if you want another one), **Storage**, **App Hosting**.
3. Give me: project ID, region, Firestore location. **Never paste secrets (keys/JSON) in chat** — Terraform below uses your own local credentials.

## 2. First infrastructure (Terraform)

```bash
gcloud auth application-default login
cd infra/terraform
cp terraform.tfvars.example staging.tfvars   # fill in project_id etc.
terraform init
terraform apply -var-file=staging.tfvars     # api_image: any pullable image is fine for the first apply
```

If you already created the Firestore database in the console: `terraform import google_firestore_database.default "(default)"`.
Terraform creates: APIs, Artifact Registry, the API service account (least privilege), the `jobs` Cloud Tasks queue, the invoker service account, the job-sweep Scheduler job, the idempotency TTL policy, the `job_failed` log metric and alert policy, the Cloud Run service, and the Firestore database (PITR on).

## 3. Rules and indexes (Firebase CLI — only after the rules tests pass)

```bash
pnpm test:integration
pnpm exec firebase deploy --only firestore:rules,firestore:indexes,storage --project <project-id>
```

`.firebaserc` uses `demo-drivenet` (the emulator); always pass `--project` for a real project.

## 4. CI/CD (Cloud Build)

1. Enable Cloud Build and connect the GitHub repo.
2. PR trigger: `cloudbuild.yaml` (gates → image → staging revision with `--no-traffic`).
3. Release / rollback: `cloudbuild.promote.yaml` (`_TO_TAG` or `_TO_REVISION`).
4. The Cloud Build service account needs `run.admin`, `artifactregistry.writer`, `iam.serviceAccountUser`. (**Not yet run** against a real project — verify on the first run.)

## 5. Web (App Hosting)

App Hosting → backend → GitHub repo, **Root directory = `apps/web`**, branch. Config: `apps/web/apphosting.yaml`. Set `NEXT_PUBLIC_API_BASE_URL` = `terraform output api_url`.
**To verify**: App Hosting building this pnpm monorepo with workspace packages (`@drivenet/*`) — confirm on the first deploy.

## 6. Open (your decision / ADR)

- Phone + password sign-in (custom token vs synthetic email) — ADR-0001 "open" #1, needed before M1.
- Admin MFA: Identity Platform — confirm against the documentation on first use.
- Secret Manager: secrets (BOG, SMS) arrive with M4/M7; none are needed yet.
