// k6 smoke: proves the harness and the thresholds work. Usage: BASE_URL=http://localhost:8080 k6 run load/smoke.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:8080";

export default function () {
  const res = http.get(`${BASE_URL}/v1/health`);
  check(res, {
    "status 200": (r) => r.status === 200,
    "has trace id": (r) => !!r.headers["X-Trace-Id"],
  });
  sleep(0.2);
}
