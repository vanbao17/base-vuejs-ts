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
      <!-- <Footer /> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .container-layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
      max-height: calc(100vh - 132px);
      overflow-y: auto;
    }
  }
}
</style>
