<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { ref } from "vue";

const router = useRouter();
const auth = useAuthStore();
const schema = yup.object({
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
  name: yup.string().required("Vui lòng nhập tên"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải dài hơn 6 ký tự"),
  passwordConfirm: yup
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
const isLoading = ref(false);
const user = ref<RegisterUser>({
  phone: "",
  name: "",
  password: "",
  passwordConfirm: "",
});
const submit = handleSubmit((values) => {
  login();
});
</script>

<template>
  <div class="wrapper-login">
    <div class="container">
      <div class="container-left">
        <img src="@/assets/images/thumb_login.png" alt="thumb" />
      </div>
      <div class="container-right">
        <h1>Đăng ký</h1>
        <form @submit.prevent="submit">
          <BaseInput
            v-model="user.phone"
            name="phone"
            label="Nhập số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại"
            :required="true"
          />
          <BaseInput
            v-model="user.name"
            name="name"
            label="Nhập họ và tên"
            type="text"
            placeholder="Nhập họ và tên"
            :required="true"
          />
          <BaseInput
            v-model="user.password"
            name="password"
            label="Nhập mật khẩu"
            type="text"
            placeholder="Nhập mật khẩu"
            :required="true"
          />
          <BaseInput
            v-model="user.passwordConfirm"
            name="passwordConfirm"
            label="Nhập lại mật khẩu"
            type="text"
            placeholder="Nhập lại mật khẩu"
            :required="true"
          />
          <BaseButton
            variant="elevated"
            color="#22c55e"
            :isLoading="isLoading"
            class="btn-submit"
            @click="submit"
            >Đăng ký</BaseButton
          >
          <a class="to-sign-up" href="/login">Đăng nhập</a>
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
