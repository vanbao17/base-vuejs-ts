<template>
  <div class="dropdown-container" ref="dropdownRef">
    <div class="dropdown-trigger" @click="toggleDropdown">
      <slot name="trigger">
        <button>{{ triggerText }}</button>
      </slot>
    </div>

    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="dropdown-content"
        :class="placement"
        @click.stop
      >
        <!-- Nếu có slot mặc định thì ưu tiên slot -->
        <slot>
          <!-- Không có slot thì tự render listData -->
          <ul v-if="listData.length">
            <li
              v-for="(item, index) in listData"
              :key="index"
              class="dropdown-item"
              @click="onItemClick(item)"
            >
              {{ item.label ?? item }}
            </li>
          </ul>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from "vue";

export default defineComponent({
  name: "BaseDropdown",
  props: {
    triggerText: {
      type: String,
      default: "Dropdown",
    },
    placement: {
      type: String as () => "top" | "bottom" | "left" | "right",
      default: "bottom",
    },
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    listData: {
      type: Array as () => Array<any>,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "open", "close", "select"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const dropdownRef = ref<HTMLElement | null>(null);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
      emitState();
    };

    const closeDropdown = () => {
      isOpen.value = false;
      emitState();
    };

    const emitState = () => {
      emit("update:modelValue", isOpen.value);
      isOpen.value ? emit("open") : emit("close");
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const onItemClick = (item: any) => {
      emit("select", item);
      closeDropdown();
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    watch(
      () => props.modelValue,
      (val) => {
        if (val !== undefined) {
          isOpen.value = val;
        }
      }
    );

    return {
      isOpen,
      toggleDropdown,
      dropdownRef,
      onItemClick,
    };
  },
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  min-width: 150px;
  background: white;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 5px;
}

.bottom {
  top: 100%;
  right: 0;
}

/* Animate */
.slide-fade-enter-active {
  transition: all 0.25s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* List item */
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.dropdown-item:hover {
  background: #f0f0f0;
}
</style>
