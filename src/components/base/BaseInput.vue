<script setup lang="ts">
import { ref, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  counter: Number,
  disabled: Boolean,
  readonly: Boolean,
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Tạo validation rules
const validationRules = {
  ...(props.required && { required: true }),
};

// Sử dụng useField nếu có name
const { value: fieldValue, errorMessage } = props.name
  ? useField(() => props.name, validationRules)
  : { value: ref(props.modelValue), errorMessage: ref(null) };

// Đồng bộ giá trị với modelValue
watch(fieldValue, (newVal) => {
  emit("update:modelValue", newVal);
});

// Cập nhật giá trị khi modelValue thay đổi từ bên ngoài
watch(
  () => props.modelValue,
  (newVal) => {
    if (!props.name) {
      fieldValue.value = newVal;
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
      :type="type"
      v-model="fieldValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      class="form-control green-focus"
      :aria-required="required"
    />

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.green-focus:focus {
  outline: none;
  border-color: var(--primary-border-color); /* xanh lá cây tươi */
  box-shadow: 0 0 0 1px var(--primary-border-color);
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

/* Hiệu ứng khi có lỗi */
.form-control.invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
}
</style>
