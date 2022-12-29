<template>
  <the-header></the-header>
  <div class="main-content-container">
    <div class="main-content"><router-view /></div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";
.main-content-container {
  width: 100%;
}

.main-content {
  display: block;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

@media (min-width: $small-device-width) {
  .main-content {
    width: 720px;
  }
}

@media (min-width: $medium-device-width) {
  .main-content {
    width: 940px;
  }
}

@media (min-width: $large-device-width) {
  .main-content {
    width: 1140px;
  }
}
</style>
