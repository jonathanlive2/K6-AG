import http from 'k6/http';
import {check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '6m', target: 50 },
      { duration: '10m', target: 100 },
      { duration: '4m', target: 0 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.05'], 
      http_req_duration: ['p(90)<1500'], 
    },
}

export default function() {
  const url = 'https://api-ag-hzykoji3kq-uc.a.run.app/api/v1/EsqueciSenha';
  const payload = JSON.stringify({
    "nm_email": "performancetests@apostaganha.bet"
  });
  const params = {
    headers: {
      'Content-Type': 'application/json', }
  };
  const res = http.post(url, payload, params);
  check(res, {'status was 200': (r) => r.status === 200});
  sleep(1);
}