<script setup lang="ts">
import { ref, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  counter?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rules?: any; // Có thể là object hoặc function
}>();

const emit = defineEmits(["update:modelValue"]);

// Gộp rules
const rules = props.rules || (props.required ? "required" : undefined);

// Tạo field qua vee-validate
const {
  value: fieldValue,
  errorMessage,
  meta,
} = useField(() => props.name, rules);

// Đồng bộ ra ngoài
watch(fieldValue, (val) => emit("update:modelValue", val));

// Nếu không dùng form context => cập nhật thủ công
watch(
  () => props.modelValue,
  (val) => {
    if (val !== fieldValue.value) {
      fieldValue.value = val as any;
    }
  }
);
</script>

<template>
  <div class="form-group">
    <label v-if="label" :for="name">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <input
      :id="name"
      :type="type || 'text'"
      v-model="fieldValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="form-control green-focus"
      :class="{ invalid: errorMessage }"
    />

    <div v-if="counter" class="counter">
      {{ String(fieldValue).length }} / {{ counter }}
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-group {
  width: 100%;
  margin-bottom: 1rem;
}

label {
  color: #aaa;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.green-focus:focus {
  border-color: var(--primary-border-color);
  box-shadow: 0 0 0 1px var(--primary-border-color);
}

.form-control.invalid {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.counter {
  font-size: 0.875rem;
  color: #6c757d;
  text-align: right;
  margin-top: 0.25rem;
}

.required-star {
  color: #dc3545;
  margin-left: 2px;
}
</style>
