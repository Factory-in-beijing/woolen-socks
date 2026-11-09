# Firebase / GCP პროექტის გაშვება (staging, შემდეგ prod)

რას აკეთებ **შენ** კონსოლში, და რას აკეთებს repo. ყოველ გარემოს ცალკე პროექტი აქვს (`drivenet-staging`, `drivenet-prod` — სახელები შენი არჩევანია).

## 1. შენ: პროექტის შექმნა

1. Firebase Console → პროექტის შექმნა (Blaze გეგმა — Cloud Run, Tasks, App Hosting-ს სჭირდება).
2. ჩართე: **Authentication** (+ Phone provider), **Firestore** (Native; ლოკაცია **მუდმივია** — `eur3` ნაგულისხმევია, `docs`-ში შეცვალე თუ სხვა გინდა), **Storage**, **App Hosting**.
3. მომიტანე: project ID, region, Firestore ლოკაცია. **საიდუმლოს (key/JSON) ჩატში არ გამოაგზავნო** — ქვემოთ OIDC/ადგილობრივი ავტორიზაცია გამოიყენება.

## 2. პირველი ინფრა (Terraform)

```bash
gcloud auth application-default login
cd infra/terraform
cp terraform.tfvars.example staging.tfvars   # შეავსე project_id და ა.შ.
terraform init
terraform apply -var-file=staging.tfvars     # api_image: ნებისმიერი ხელმისაწვდომი image პირველ apply-ზე
```

თუ Firestore ბაზა კონსოლში უკვე შექმენი: `terraform import google_firestore_database.default "(default)"`.
Terraform ქმნის: API-ები, Artifact Registry, API-ის service account (მინიმალური როლები), Cloud Tasks რიგს `jobs`, Cloud Run სერვისს, Firestore ბაზას (PITR ჩართული).

## 3. Rules და ინდექსები (Firebase CLI — მხოლოდ rules tests-ის შემდეგ)

```bash
pnpm test:integration
pnpm exec firebase deploy --only firestore:rules,firestore:indexes,storage --project <project-id>
```

`.firebaserc`-ში გამოიყენება `demo-drivenet` (ემულატორი); რეალური პროექტი — ყოველთვის `--project`-ით.

## 4. CI/CD (Cloud Build)

1. ჩართე Cloud Build + დააკავშირე GitHub repo.
2. ტრიგერი PR-ზე: `cloudbuild.yaml` (გეიტები → image → staging revision `--no-traffic`).
3. გამოშვება/უკან დაბრუნება: `cloudbuild.promote.yaml` (`_TO_TAG` ან `_TO_REVISION`).
4. Cloud Build service account-ს დასჭირდება: `run.admin`, `artifactregistry.writer`, `iam.serviceAccountUser`. (**ჯერ არ გაშვებულა** რეალურ პროექტზე — პირველ გაშვებაზე გადაამოწმე.)

## 5. ვები (App Hosting)

App Hosting → backend → GitHub repo, **Root directory = `apps/web`**, branch. კონფიგი: `apps/web/apphosting.yaml`. დააყენე `NEXT_PUBLIC_API_BASE_URL` = `terraform output api_url`.
**გადასამოწმებელია**: pnpm monorepo workspace-პაკეტებით (`@drivenet/*`) App Hosting-ის build-ში — პირველი deploy-ზე დაადასტურე.

## 6. ღია (შენი გადაწყვეტილება / ADR)

- ტელეფონი+პაროლი შესვლა (custom token თუ სინთეტიკური email) — ADR-0001 „ღია“ #1, M1-მდე.
- Admin MFA: Identity Platform — პირველ გამოყენებაზე დოკუმენტაციით დაადასტურე.
- Secret Manager: საიდუმლოები (BOG, SMS) ემატება M4/M7-თან ერთად; ახლა არცერთი არ გვჭირდება.
