import axios from 'axios';

let $https = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
});

export {$https}