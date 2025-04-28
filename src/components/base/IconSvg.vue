<template>
  <img
    :src="src"
    :width="width"
    :height="height"
    :alt="alt"
    :class="customClass"
    :style="computedStyle"
    loading="lazy"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  src: string; // URL hoặc path của SVG
  width?: string | number;
  height?: string | number;
  alt?: string;
  fill?: string;
  stroke?: string;
  customClass?: string;
}

const props = defineProps<Props>();

// Xử lý inline style cho fill và stroke nếu có
const computedStyle = computed(() => ({
  fill: props.fill || "currentColor",
  stroke: props.stroke || "none",
}));
</script>
