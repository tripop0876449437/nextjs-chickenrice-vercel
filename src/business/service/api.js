// // api.js
// import axios from "axios";
// import authHeader from './auth-header';

// const api = axios.create({
//   baseURL: "https://da47-2403-6200-8832-3d22-e54b-10c8-a944-69f9.ngrok-free.app/api",
//   headers: {
//     "Content-Type" : "application/json",
//   }
// });

// api.interceptors.request.use(config => {
//   const headers = authHeader();
//   config.headers = { ...config.headers, ...headers };
//   return config;
// });

// export default api;

// api.js

import axios from 'axios';

// Load environment variables from .env file
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;


const API_BASE_URL = `${BASE_URL_API}`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
