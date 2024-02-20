import axios from "axios";
import authHeader from './auth-header';


const api = axios.create({
  baseURL: "https://da47-2403-6200-8832-3d22-e54b-10c8-a944-69f9.ngrok-free.app/api",
  headers: {
    "Content-Type" : "application/json",
  }
});

api.interceptors.request.use(config => {
  const headers = authHeader();
  config.headers = { ...config.headers, ...headers };
  return config;
});


export default api;