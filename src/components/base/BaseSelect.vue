<template>
  <div class="dropdown-container" :class="{ 'is-active': isOpen }">
    <div class="dropdown-trigger" @click="toggleDropdown" ref="triggerRef">
      <slot name="trigger">
        <button type="button" class="dropdown-button">
          {{ displayedValue }}
          <img
            src="@/assets/svgs/chervon-down.svg"
            alt="icon down"
            class="dropdown-arrow icon"
            :class="{ 'is-open': isOpen }"
          />
        </button>
      </slot>
    </div>

    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu" :style="menuStyle">
        <!-- Search Input -->
        <div v-if="enableSearch" class="dropdown-search">
          <input
            v-model="searchQuery"
            class="dropdown-search-input"
            type="text"
            :placeholder="searchPlaceholder"
            @input="handleSearch"
          />
        </div>

        <!-- Options List -->
        <ul class="dropdown-content">
          <li v-if="loading" class="dropdown-item dropdown-loading">
            <slot name="loading">Đang tải...</slot>
          </li>

          <template v-else>
            <li
              v-for="(option, index) in filteredOptions"
              :key="index"
              class="dropdown-item"
              :class="{ 'is-selected': isSelected(option) }"
              @click="selectOption(option)"
            >
              <slot
                name="option"
                :option="option"
                :index="index"
                :is-selected="isSelected(option)"
              >
                {{ getOptionLabel(option) }}
              </slot>
            </li>

            <li
              v-if="filteredOptions.length === 0"
              class="dropdown-item dropdown-no-results"
            >
              <slot name="no-results">Không có kết quả</slot>
            </li>
          </template>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  PropType,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";

type DropdownPosition = "bottom" | "top" | "auto";

export default defineComponent({
  name: "BaseDropdown",
  props: {
    options: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array] as PropType<any | any[]>,
      default: null,
    },
    placeholder: {
      type: String,
      default: "Chọn một mục",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "value",
    },
    position: {
      type: String as PropType<DropdownPosition>,
      default: "auto",
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    menuWidth: {
      type: String,
      default: "100%",
    },
    maxHeight: {
      type: String,
      default: "300px",
    },
    // New: enable search
    enableSearch: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: "Tìm kiếm...",
    },
    // New: loading state
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "change", "open", "close", "search"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const triggerRef = ref<HTMLElement | null>(null);
    const searchQuery = ref("");
    const menuPosition = ref<"bottom" | "top">("bottom");

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        emit("open");
        calculatePosition();
      } else {
        emit("close");
      }
    };

    const calculatePosition = () => {
      if (props.position !== "auto") {
        menuPosition.value = props.position as "bottom" | "top";
        return;
      }
      const trigger = triggerRef.value;
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - triggerRect.bottom;
      const estimatedMenuHeight = Math.min(
        props.options.length * 40,
        parseInt(props.maxHeight)
      );
      menuPosition.value =
        spaceBelow < estimatedMenuHeight &&
        triggerRect.top > estimatedMenuHeight
          ? "top"
          : "bottom";
    };

    const menuStyle = computed(() => {
      return {
        width: props.menuWidth,
        maxHeight: props.maxHeight,
        [menuPosition.value === "top" ? "bottom" : "top"]: "100%",
      };
    });

    const selectOption = (option: any) => {
      if (props.multiple) {
        const currentValue = Array.isArray(props.modelValue)
          ? [...props.modelValue]
          : [];
        const value = getOptionValue(option);
        const index = currentValue.findIndex(
          (v) => getOptionValue(v) === value
        );

        if (index === -1) {
          currentValue.push(option);
        } else {
          currentValue.splice(index, 1);
        }

        emit("update:modelValue", currentValue);
        emit("change", currentValue);
      } else {
        emit("update:modelValue", option);
        emit("change", option);

        if (props.closeOnSelect) {
          isOpen.value = false;
          emit("close");
        }
      }
    };

    const isSelected = (option: any) => {
      const value = getOptionValue(option);

      if (props.multiple && Array.isArray(props.modelValue)) {
        return props.modelValue.some((v) => getOptionValue(v) === value);
      }

      return getOptionValue(props.modelValue) === value;
    };

    const getOptionLabel = (option: any) => {
      if (props.labelKey && typeof option === "object") {
        return option[props.labelKey];
      }
      return option;
    };

    const getOptionValue = (option: any) => {
      if (props.valueKey && typeof option === "object") {
        return option[props.valueKey];
      }
      return option;
    };

    const displayedValue = computed(() => {
      if (!props.modelValue) return props.placeholder;

      if (props.multiple && Array.isArray(props.modelValue)) {
        if (props.modelValue.length === 0) return props.placeholder;
        return props.modelValue
          .map((option) => getOptionLabel(option))
          .join(", ");
      }

      return getOptionLabel(props.modelValue);
    });

    // Filtered options based on search
    const filteredOptions = computed(() => {
      if (!props.enableSearch || !searchQuery.value.trim()) {
        return props.options;
      }

      return props.options.filter((option) => {
        const label = getOptionLabel(option).toString().toLowerCase();
        return label.includes(searchQuery.value.toLowerCase());
      });
    });

    const handleSearch = () => {
      emit("search", searchQuery.value);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!props.closeOnClickOutside || !isOpen.value) return;

      const target = event.target as HTMLElement;
      const trigger = triggerRef.value;
      const dropdown = trigger?.nextElementSibling as HTMLElement | null; // lấy dropdown menu

      if (
        trigger &&
        (trigger.contains(target) || (dropdown && dropdown.contains(target)))
      ) {
        // Nếu click vào trigger hoặc dropdown thì bỏ qua
        return;
      }

      // Nếu click ngoài thực sự thì mới đóng
      isOpen.value = false;
      emit("close");
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      isOpen,
      triggerRef,
      toggleDropdown,
      selectOption,
      isSelected,
      getOptionLabel,
      displayedValue,
      menuStyle,
      searchQuery,
      filteredOptions,
      handleSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
/* (giữ nguyên phần cũ) */

/* New: search input styling */
.icon {
  width: 20px;
  height: 20px;
}
.dropdown-button {
  display: flex;
  align-items: center;
  gap: 6px;
}
.dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  .dropdown-content {
    padding: 6px 12px;
    height: 200px;
    overflow-y: auto;
    .dropdown-item {
      width: 100%;
      cursor: pointer;
      border-radius: 8px;
      color: #8e8d8d;
      &:hover {
        background-color: #f2f3f4;
      }
      padding: 6px 12px;
    }
    li {
      list-style-type: none;
    }
  }
}
.dropdown-trigger {
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
  padding: 6px 12px;
  border: 1px solid #aaa;
}
.dropdown-search {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.dropdown-search-input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.dropdown-loading {
  text-align: center;
  font-style: italic;
}
</style>
