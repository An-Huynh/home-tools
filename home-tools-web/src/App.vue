<template>
  <the-header></the-header>
  <div class="app-container">
    <div class="app-container__content"><router-view /></div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";

.app-container {
  display: flex;
  justify-content: center;

  &__content {
    display: block;
    margin-top: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;

    @media (min-width: $small-device-width) {
      width: 720px;
    }

    @media (min-width: $medium-device-width) {
      width: 940px;
    }

    @media (min-width: $large-device-width) {
      width: 1140px;
    }
  }
}
</style>
