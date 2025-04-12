<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.ts";

const router = useRouter();
const auth = useAuthStore();

const login = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <h1>dashboard Page</h1>
    <button @click="login">dashboard</button>
  </div>
</template>
