<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <Transition name="modal-zoom">
          <div class="modal-content">
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

const open = () => {
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
};

defineExpose({ open, close });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
}

/* Animation fade cho nền đen */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Animation zoom cho nội dung modal */
.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: transform 0.3s;
}
.modal-zoom-enter-from {
  transform: scale(0.8);
}
.modal-zoom-leave-to {
  transform: scale(0.8);
}
</style>
