import axios from 'axios';

let $https = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  withCredentials: true,
});

export {$https}