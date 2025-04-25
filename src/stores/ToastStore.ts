import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { ToastMessage, ToastType } from "../core/types/toast";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<ToastMessage[]>([]);
  const defaultDuration = 5000;

  const activeToasts = computed(() => {
    return toasts.value.sort((a, b) => b.timestamp - a.timestamp);
  });

  function generateId() {
    return `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  function addToast(
    type: ToastType,
    message: string,
    title?: string,
    duration?: number
  ) {
    const id = generateId();

    const toast: ToastMessage = {
      id,
      type,
      message,
      title,
      duration: duration || defaultDuration,
      timestamp: Date.now(),
    };

    toasts.value.push(toast);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration);

    return id;
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }

  function clearAll() {
    toasts.value = [];
  }

  // Helper methods for common toast types
  function success(message: string, title?: string, duration?: number) {
    return addToast("success", message, title, duration);
  }

  function error(message: string, title?: string, duration?: number) {
    return addToast("error", message, title, duration);
  }

  function warning(message: string, title?: string, duration?: number) {
    return addToast("warning", message, title, duration);
  }

  function info(message: string, title?: string, duration?: number) {
    return addToast("info", message, title, duration);
  }

  return {
    toasts: activeToasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
  };
});
