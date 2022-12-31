<template>
  <div class="confirmation-dialog">
    <div class="confirmation-dialog__dialog">
      <div class="confirmation-dialog__header">
        <h2>{{ props.title }}</h2>
        <font-awesome-icon
          v-if="!busy"
          @click.stop="onCancel"
          class="confirmation-dialog__close-btn"
          icon="fa-solid fa-x"
          fixed-width
        />
        <loading-indicator v-else></loading-indicator>
      </div>
      <span>{{ props.message }}</span>
      <div class="confirmation-dialog__actions">
        <button class="confirmation-dialog__btn" @click.stop="onConfirm">
          Yes
        </button>
        <button class="confirmation-dialog__btn" @click.stop="onCancel">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

import loadingIndicator from "@/components/LoadingIndicator.vue";

// Component props.
const props = defineProps({
  message: { type: String, required: true },
  title: { type: String, required: true },
  busy: { type: Boolean, default: false },
});

// Component emits.
const emits = defineEmits(["confirm", "cancel"]);

// Component Methods.
function onConfirm() {
  emits("confirm");
}

function onCancel() {
  emits("cancel");
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.confirmation-dialog {
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

  &__dialog {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    background: $secondary-color;
    color: black;
    max-width: 90%;

    @media (min-width: $small-device-width) {
      min-width: calc($small-device-width * 0.6);
    }

    @media (min-width: $medium-device-width) {
      min-width: calc($medium-device-width * 0.5);
    }

    @media (min-width: $large-device-width) {
      min-width: calc($large-device-width * 0.4);
    }
  }

  &__header {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  &__close-btn {
    cursor: pointer;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__btn {
    flex: 1 1 0;
    border: 1px solid $primary-color;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background-color: inherit;
    color: black;

    &:hover {
      background: $primary-color;
      color: $text-color;
      cursor: pointer;
    }
  }
}
</style>
