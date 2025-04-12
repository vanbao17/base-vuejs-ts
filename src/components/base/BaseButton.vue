<script setup lang="ts">
import { withDefaults, defineProps, computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    color?: string;
    variant?: "elevated" | "flat" | "tonal" | "outlined" | "text" | "plain";
    loading?: boolean;
    disabled?: boolean;
    icon?: boolean;
  }>(),
  {
    type: "button",
    color: "var(--primary-color)",
    variant: "elevated",
    loading: false,
    disabled: false,
    icon: false,
  }
);
const bgColor = computed(() => {
  switch (props.variant) {
    case "elevated":
      return props.color;
    case "flat":
    case "text":
    case "plain":
      return "transparent";
    case "tonal":
      return `${props.color}20`; // nhẹ hơn
    case "outlined":
      return "transparent";
    default:
      return props.color;
  }
});

const borderColor = computed(() => {
  return props.variant === "outlined" ? props.color : "transparent";
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'base-btn',
      variant,
      icon ? 'icon-btn' : '',
      disabled || loading ? 'disabled' : '',
    ]"
    :style="{
      '--btn-color': color,
      '--btn-bg': bgColor,
      '--btn-border': borderColor,
    }"
  >
    <span v-if="loading" class="loader" />
    <slot v-else />
  </button>
</template>

<style scoped>
.base-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--btn-border, transparent);
  background-color: var(--primary-backgroud-color, var(--btn-color));
  color: #fff;
  transition: all 0.2s ease;
  cursor: pointer;
}

.base-btn.elevated:hover {
  opacity: 0.9;
}

.base-btn.flat {
  color: var(--btn-color);
}

.base-btn.tonal {
  background-color: var(--btn-bg);
  color: var(--btn-color);
}

.base-btn.outlined {
  color: var(--btn-color);
}

.base-btn.text,
.base-btn.plain {
  background-color: transparent;
  color: var(--btn-color);
  border: none;
}

.base-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon-btn {
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
