<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";

const router = useRouter();
const auth = useAuthStore();

const login = () => {
  auth.setToken("fake-token-123");
  router.push("/dashboard");
};
const submit = () => {};
const username = ref();
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
            v-model="username"
            name="username"
            label="Tên đăng nhập"
            type="text"
            placeholder="Nhập tên đăng nhập"
            :required="true"
          />
          <BaseInput
            v-model="username"
            name="phone"
            label="Phone Number"
            type="text"
            placeholder="Nhập tên đăng nhập"
            :required="true"
          />
          <BaseInput
            v-model="username"
            name="email"
            label="E-mail"
            type="text"
            placeholder="Nhập tên đăng nhập"
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
