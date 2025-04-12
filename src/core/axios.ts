// src/core/axios.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn("Unauthorized - redirect to login or refresh token...");
        // Có thể tự động chuyển hướng hoặc logout ở đây
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
