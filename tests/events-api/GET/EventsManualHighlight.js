import http from 'k6/http';
import {check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '3m', target: 50 },
      { duration: '5m', target: 100 },
      { duration: '2m', target: 0 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.03'], 
      http_req_duration: ['p(90)<100'], 
    },
}

export default function() {
  const url =  'https://events-api-hzykoji3kq-uc.a.run.app/v5/events/manual/highlight';
  const params = {
    headers: {
      'Content-Type': 'application/json', }
  };
  const res = http.get(url,params);
  check(res, {'status was 200': (r) => r.status === 200});
  sleep(2);
}