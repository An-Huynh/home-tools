<template>
  <the-header></the-header>
  <div class="main-content"><router-view /></div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";
.main-content {
  display: block;
  margin-top: 3rem;
}
</style>
