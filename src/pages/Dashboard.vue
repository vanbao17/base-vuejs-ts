<template>
  <div class="dashboard-container">
    <h1>Dashboard Page</h1>

    <div class="toast-test-buttons">
      <button @click="showSuccessToast" class="toast-button success-button">
        Test Toast Success
      </button>

      <button @click="showErrorToast" class="toast-button error-button">
        Test Toast Error
      </button>

      <button @click="showWarningToast" class="toast-button warning-button">
        Test Toast Warning
      </button>

      <button @click="showInfoToast" class="toast-button info-button">
        Test Toast Info
      </button>
    </div>

    <button @click="login" class="logout-button">Đăng xuất</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import { useToastStore } from "@/stores/ToastStore.ts";

const router = useRouter();
const auth = useAuthStore();
const toast = useToastStore();

function showSuccessToast() {
  toast.success("Thao tác thành công!", "Thành công");
}

function showErrorToast() {
  toast.error("Đã xảy ra lỗi khi xử lý yêu cầu", "Lỗi");
}

function showWarningToast() {
  toast.warning("Bạn nên kiểm tra lại thông tin", "Cảnh báo");
}

function showInfoToast() {
  toast.info("Đây là thông báo mới", "Thông tin");
}

const login = () => {
  auth.logout();
  router.push("/login");
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.toast-test-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
}

.toast-button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.toast-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.success-button {
  background-color: #10b981;
  color: white;
}

.error-button {
  background-color: #ef4444;
  color: white;
}

.warning-button {
  background-color: #f59e0b;
  color: white;
}

.info-button {
  background-color: #3b82f6;
  color: white;
}

.logout-button {
  padding: 10px 16px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #4b5563;
}
</style>
