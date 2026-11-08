// Launch gate (BE step B9): 10 000 concurrent virtual users. Working assumption, NOT a fact: peak ≈ 1 000–2 000 req/s.
// Today it only exercises /v1/health; real scenarios (search, booking, payment callback, quick test) are added
// together with the endpoints they hit. Run against staging, never prod:  BASE_URL=https://... k6 run load/peak.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 2000 },
    { duration: "3m", target: 10000 },
    { duration: "5m", target: 10000 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800", "p(99)<2000"],
  },
};

const BASE_URL = __ENV.BASE_URL;
if (!BASE_URL) throw new Error("BASE_URL is required");

export default function () {
  check(http.get(`${BASE_URL}/v1/health`), { "status 200": (r) => r.status === 200 });
  sleep(5 + Math.random() * 5); // an active user sends one request every 5–10 s
}
