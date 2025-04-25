// src/core/axios.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useToastStore } from "@/stores/ToastStore";
import router from "@/router"; // Giả sử bạn đã cấu hình router

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const REFRESH_TOKEN_URL = "/auth/refresh-token";

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm riêng để gọi refresh token
async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Sử dụng axios thông thường (không sử dụng instance) để tránh vòng lặp
    const response = await axios.post(
      `${baseURL}${REFRESH_TOKEN_URL}`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Lưu token mới
    const { token, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", newRefreshToken);

    return token;
  } catch (error) {
    // Nếu refresh token cũng thất bại, logout user
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
    throw error;
  }
}

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

// Biến để theo dõi request đang xử lý refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}> = [];

// Xử lý các request bị delay đợi refresh token
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      if (token && request.config.headers) {
        request.config.headers.set("Authorization", `Bearer ${token}`);
      }
      request.resolve(instance(request.config));
    }
  });

  failedQueue = [];
};

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const toast = useToastStore();
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi là do token hết hạn (401) và chưa thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, thêm request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Thực hiện refresh token
        const newToken = await refreshToken();

        // Cập nhật lại Authorization header cho request hiện tại
        if (originalRequest.headers) {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        }

        // Xử lý các request đang đợi
        processQueue(null, newToken);
        isRefreshing = false;

        // Thực hiện lại request ban đầu
        return instance(originalRequest);
      } catch (refreshError: any) {
        // Xử lý các request đang đợi với lỗi
        processQueue(refreshError, null);
        isRefreshing = false;

        // Hiển thị toast thông báo
        toast.error(
          "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
          "Lỗi xác thực"
        );

        // Chuyển hướng đến trang đăng nhập
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }

    // Xử lý các lỗi khác và hiển thị toast
    if (error.response) {
      const errorMessage = error.response.data?.message || "Đã có lỗi xảy ra";
      const errorTitle = `Lỗi ${error.response.status}`;

      // Không hiển thị toast lỗi xác thực vì đã xử lý ở trên
      if (error.response.status !== 401) {
        toast.error(errorMessage, errorTitle);
      }
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      toast.error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
        "Lỗi kết nối"
      );
    } else {
      // Lỗi khi thiết lập request
      toast.error("Đã xảy ra lỗi khi gửi yêu cầu.", "Lỗi hệ thống");
    }

    return Promise.reject(error);
  }
);

export default instance;
