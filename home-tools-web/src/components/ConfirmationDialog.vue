<template>
  <div class="overlay">
    <div class="confirmation-dialog">
      <div class="confirmation-dialog__header">
        <h2 class="confirmation-dialog__title">{{ props.title }}</h2>
        <font-awesome-icon
          @click.prevent="cancel"
          class="confirmation-dialog__close-btn"
          icon="fa-solid fa-x"
          fixed-width
        />
      </div>
      <span>{{ props.message }}</span>
      <div class="confirmation-dialog__actions">
        <button class="confirmation-dialog__btn" @click.prevent="confirm">
          Yes
        </button>
        <button class="confirmation-dialog__btn" @click.prevent="cancel">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
});

const emits = defineEmits(["confirm", "cancel"]);

function confirm() {
  emits("confirm");
}

function cancel() {
  emits("cancel");
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.confirmation-dialog {
  display: flex;
  flex-direction: column;
  background: $secondary-color;
  color: black;
  padding: 1rem;
  border-radius: 1rem;
  gap: 1rem;

  &__header {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__title {
    margin-right: auto;
  }

  &__actions {
    display: flex;
    justify-content: end;
    gap: 1rem;
    align-items: center;
  }

  &__close-btn {
    cursor: pointer;
  }

  &__btn {
    border: 0;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background-color: inherit;
    border: 1px solid $primary-color;
    color: black;
    flex: 1 1 0;

    &:hover {
      cursor: pointer;
      background: $primary-color;
      color: $text-color;
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(64, 64, 64, 0.3);
}
</style>
