<!-- src/components/AppLayout.vue -->
<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();

const layoutComponent = computed(() => {
  const layout = route.meta.layout;
  if (layout === "none") return "div";
  return DefaultLayout;
});
</script>
