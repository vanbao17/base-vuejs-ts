<script lang="ts" setup>
import Footer from "@/components/layouts/Footer.vue";
import Header from "@/components/layouts/Header.vue";
</script>
<template>
  <div class="wrapper-layout">
    <div class="container-layout">
      <Header />
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>
<style></style>
