<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <ToastItem v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToastStore } from "../../../stores/ToastStore.ts";
import ToastItem from "../ToastItem.vue";

const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
