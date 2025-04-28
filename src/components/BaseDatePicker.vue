<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Props nhận từ bên ngoài
const props = defineProps<{
  modelValue: Date | null;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
}>();

// Emit sự kiện để dùng v-model
const emit = defineEmits(["update:modelValue"]);

// Local state
const localDate = ref<Date | null>(props.modelValue);

// Watch để cập nhật modelValue khi chọn
watch(localDate, (newValue) => {
  emit("update:modelValue", newValue);
});

// Nếu props modelValue thay đổi bên ngoài, sync lại
watch(
  () => props.modelValue,
  (newValue) => {
    localDate.value = newValue;
  }
);
</script>

<template>
  <Datepicker
    v-model="localDate"
    :placeholder="placeholder || 'Chọn ngày'"
    :format="format || 'dd/MM/yyyy'"
    :min-date="minDate"
    :max-date="maxDate"
    :enable-time-picker="false"
    :clearable="false"
    :auto-apply="true"
    hide-input-icon
  />
</template>

<style scoped>
/* Tuỳ chỉnh giao diện nếu muốn */
</style>
