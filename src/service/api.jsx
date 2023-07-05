import axios from 'axios';

export const api = axios.create({
  baseURL:"https://preparocerto.onrender.com/"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@Auth:token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
