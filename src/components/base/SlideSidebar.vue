<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="sidebar-overlay" @click.self="close">
        <Transition name="slide-sidebar">
          <div :style="{ [position]: '0' }" class="sidebar-content">
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isOpen = ref(false);
const props = defineProps<{
  position: string;
}>();
const open = () => {
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
};

defineExpose({ open, close });
</script>

<style scoped>
/* Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow: hidden;
}

/* Sidebar content */
.sidebar-content {
  background: white;
  /* border-radius: 16px 0px 0px 16px; */
  width: 500px;
  max-width: 90%;
  height: 100vh;
  /* padding: 20px; */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
}

/* Fade overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide sidebar */
.slide-sidebar-enter-active,
.slide-sidebar-leave-active {
  transition: transform 0.3s ease;
}

.slide-sidebar-enter-from,
.slide-sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
