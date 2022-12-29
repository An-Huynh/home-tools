<template>
  <div class="spin"></div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: $secondary-color;
  border-radius: 50%;
  content: "";
  height: 1rem;
  width: 1rem;
  will-change: transform;
  display: inline-block;
}
</style>
