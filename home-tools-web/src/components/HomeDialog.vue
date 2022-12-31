<template>
  <div class="home-dialog">
    <div class="home-dialog__dialog">
      <div class="home-dialog__header">
        <h2>{{ title }}</h2>
        <font-awesome-icon
          v-if="!busy"
          @click.stop="onCancel"
          class="home-dialog__close-btn"
          icon="fa-solid fa-x"
          fixed-width
        />
        <loading-indicator v-else></loading-indicator>
      </div>
      <form class="home-dialog__form" @submit.prevent="onSave">
        <label for="name">Name</label>
        <input
          class="home-dialog__form-control"
          v-model="home.name"
          :disabled="busy"
          type="text"
          id="name"
        />
      </form>
      <div class="home-dialog__actions">
        <button class="home-dialog__btn" :disabled="busy" @click.stop="onSave">
          Save
        </button>
        <button
          class="home-dialog__btn"
          :disabled="busy"
          @click.stop="onCancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  onBeforeMount,
  PropType,
  ref,
} from "vue";

import loadingIndicator from "@/components/LoadingIndicator.vue";
import { Home } from "@/models/home";

// Component props.
const props = defineProps({
  home: { type: Object as PropType<Home | null> },
  busy: { typ: Boolean, default: false },
});

// Component data.
const home = ref<Home>({ id: "", name: "", ownerId: "" });

// Component computed data.
const title = computed(() => {
  return props.home ? "Edit Home" : "New Home";
});

// Component emits.
const emits = defineEmits<{
  (e: "save", home: Home): void;
  (e: "cancel"): void;
}>();

// Component lifecycle hooks.
onBeforeMount(() => {
  if (props.home) {
    home.value = { ...props.home };
  }
});

// Component methods.
function onSave() {
  emits("save", home.value);
}

function onCancel() {
  emits("cancel");
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.home-dialog {
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
    min-width: 90%;
    border-radius: 1rem;
    padding: 1rem;
    gap: 1rem;
    background: $secondary-color;
    color: black;

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
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__close-btn {
    cursor: pointer;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__form-control {
    border: 1px solid $secondary-color;
    border-radius: 0.25rem;
    outline: none;
    padding: 0.5rem;
    background-color: $secondary-alt-color;
    color: $text-color;
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

    // TODO: Make the button better indicate that it is disabled.
    &:disabled,
    &[disabled] {
      background-color: inherit;
      color: black;
      cursor: default;
    }
  }
}
</style>
