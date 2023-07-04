import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API
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