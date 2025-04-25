<template>
  <div
    class="toast-item"
    :class="[`toast-${toast.type}`, { 'toast-with-title': !!toast.title }]"
    @click="close"
  >
    <div class="toast-icon">
      <component :is="getIcon(toast.type)" />
    </div>
    <div class="toast-content">
      <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>
      <div class="toast-message">{{ toast.message }}</div>
    </div>
    <button class="toast-close" @click.stop="close">×</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ToastMessage } from "@/core/types/toast.ts";
import { useToastStore } from "@/stores/ToastStore.ts";

// Icons
import SuccessIcon from "@/assets/icons/SuccessIcon.vue";
import ErrorIcon from "@/assets/icons/ErrorIcon.vue";
import WarningIcon from "@/assets/icons/WarningIcon.vue";
import InfoIcon from "@/assets/icons/InfoIcon.vue";

const props = defineProps<{
  toast: ToastMessage;
}>();

const toastStore = useToastStore();

function close() {
  toastStore.removeToast(props.toast.id);
}

function getIcon(type: string) {
  switch (type) {
    case "success":
      return SuccessIcon;
    case "error":
      return ErrorIcon;
    case "warning":
      return WarningIcon;
    case "info":
      return InfoIcon;
    default:
      return InfoIcon;
  }
}
</script>

<style scoped>
.toast-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 450px;
  background-color: white;
  position: relative;
  cursor: pointer;
  animation: slide-in 0.3s ease-out;
  transition: all 0.3s ease;
}

.toast-item:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-warning {
  border-left: 4px solid #f59e0b;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

.toast-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.toast-message {
  color: #4b5563;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  line-height: 1;
  margin-left: 8px;
}

.toast-close:hover {
  color: #4b5563;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
