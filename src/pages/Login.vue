<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import * as yup from "yup";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useForm } from "vee-validate";
import { ref } from "vue";

const router = useRouter();
const auth = useAuthStore();
const schema = yup.object({
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải dài hơn 6 ký tự"),
});
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const login = () => {
  auth.setToken("fake-token-123");
  router.push("/dashboard");
};
const submit = handleSubmit((values) => {
  login();
});

const phone = ref();
const isLoading = ref(false);
</script>

<template>
  <div class="wrapper-login">
    <div class="container">
      <div class="container-left">
        <img src="@/assets/images/thumb_login.png" alt="thumb" />
      </div>
      <div class="container-right">
        <h1>Đăng nhập</h1>
        <form @submit.prevent="submit">
          <BaseInput
            v-model="phone"
            name="phone"
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại"
            :required="true"
          />
          <BaseInput
            v-model="password"
            name="password"
            label="Nhập mật khẩu"
            type="text"
            placeholder="Nhập mật khẩu"
            :required="true"
          />

          <BaseButton
            variant="elevated"
            color="#22c55e"
            :isLoading="isLoading"
            class="btn-submit"
            @click="login"
            >Đăng nhập</BaseButton
          >
          <a class="to-sign-up" href="/register">Đăng ký ngay</a>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper-login {
  background-color: var(--primary-backgroud-color);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    width: 60%;
    display: flex;
    border-radius: 16px;
    overflow: hidden;
    background-color: #fff;
    padding: 24px;
    .container-left {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 80%;
      }
    }
    .container-right {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      form {
        width: 80%;
      }
      h1 {
        margin-bottom: 24px;
        color: #006d38;
      }
    }
  }
  .to-sign-up {
    width: 100%;
    display: block;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    font-weight: 600;
    color: var(--primary-backgroud-color);
  }
  .btn-submit {
    margin-bottom: 12px;
  }
}
</style>
