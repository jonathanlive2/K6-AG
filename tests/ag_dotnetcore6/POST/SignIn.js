import http from 'k6/http';
import {check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '5m', target: 50 },
      { duration: '5m', target: 100 },
      { duration: '2m', target: 0 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.03'], 
      http_req_duration: ['p(90)<1000'], 
    },
}

export default function() {
  const url = 'https://api-ag-hzykoji3kq-uc.a.run.app/api/v5/SignIn';
  const payload = JSON.stringify({
    user: "jonathanlive",
    pass: "A7a7a@a@",
    method: "LOGIN_CARD"
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'ag-m2m-auth': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTYyMTQ5NTMsImV4cCI6MTcxODgwNjk1M30.Vo5pXcH-VZ-jUDbbPsvUji0Y_U70GPHYCZTg8zALizXhnFAREUtR7JNdpBCJrPRLsb6tO5It3ZRJf-TZM6W-TCeKizaumI1LzoO6bT22g-NvR1zlTJlTr0UUWX6SIa3n21aeyeI1aLovi2SGnk_kilY9ET4v8eZXnzlD3SygFpA14uMKFjrM-Fu6QD5rodZd_lF-no2oR_9rt30BC2zY3bg_t-B-mgYW8umFYCx1xwnP2DsSX4Rtaj0dYbwHvaiCQPNL1yYrt6Tt4qhKQUv4jVNc_NOIUM7lxsKsOnQ5PfA5q-5cee5wp4KRxm-RTlV9aRTzCwTl7VK0iYK7V_eHPQ'
    }
  };
  const res = http.post(url, payload, params);
  check(res, {'status was 200': (r) => r.status === 200});
  sleep(1);
}