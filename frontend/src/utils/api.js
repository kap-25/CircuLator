// Axios setup and API calls

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust based on your backend URL
});

// Automatically attach token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;