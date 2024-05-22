import http from 'k6/http';
import {check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '2m', target: 5 },
      { duration: '3m', target: 25 },
      { duration: '1m', target: 0 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.05'], 
      http_req_duration: ['p(90)<100'], 
    },
}

export default function() {
  const url = 'https://promotion-api-hzykoji3kq-uc.a.run.app/v5/reserves/available';
  const params = {
    headers: {
      'ag-m2m-auth': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5tQXV0aCI6Ijk2MDE3NzdGLUUzNkUtNDE1OS1BOUU4LUVFNTlBOEI4NkIwNiJ9fQ.VqH8UhKdl4THJ6WEcd6wGsL7njfizd_yv-jq3qmtsdeR3n1XOh1didO7ebllKOo32Il_ODSoMOz8luz2uyKGRmYgGiDyfVo61yQBZfXnXYaGimKJVob-9pfaj-gfQeNwrdoiUbUfcJRJceQOdFBCNBHoCsHyZbm72fvY5_PLUWKRimZUiLfCLMIhxpHsA-125JLewYmSqvhCHd9XAOjzuuydoXtS3gkeTPZZiYCo1QyOaTNQZt_efz9RzXgPwcCUxwKun6sLcqpov9GoCpIDX0Njpqy75eT8E9Cvx5kB4zygZMk9GBGNMOkcH_Nn6OyolxIS3cgUMqLB1XNLzt8F0g',}
  };
  const res = http.get(url,params);
  check(res, {'status was 200': (r) => r.status === 200});
  sleep(2);
}