<template>
  <div class="login">
    <div class="login__content">
      <h1 class="login__title">Login</h1>
      <span class="login__login-failed-msg" v-if="showLoginFailed"
        >Failed to login</span
      >
      <form class="login__form" @submit.prevent="onSubmit">
        <input
          :disabled="store.state.auth.isLoading"
          type="text"
          class="login__form-control"
          v-model="v$.username.$model"
          placeholder="Email"
        />
        <ul class="login__error-list" v-if="v$.username.$errors.length !== 0">
          <li
            class="login__error-item"
            v-for="error of v$.username.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </li>
        </ul>
        <input
          id="password"
          :disabled="store.state.auth.loading"
          class="login__form-control"
          name="password"
          type="password"
          placeholder="Password"
          v-model="v$.password.$model"
        />
        <ul class="login__error-list" v-if="v$.password.$errors.length !== 0">
          <li
            class="login__error-item"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </li>
        </ul>
        <div class="login__buttons">
          <button class="login__btn" :disabled="store.state.auth.loading">
            Login
          </button>
          <button
            class="login__btn"
            type="button"
            :disabled="store.state.auth.loading"
          >
            Forgot Password
          </button>
        </div>
      </form>
      <div class="login__loader">
        <loading-indicator v-if="store.state.auth.loading"></loading-indicator>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import loadingIndicator from "@/components/LoadingIndicator.vue";
import { reactive, ref, watch } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const showLoginFailed = ref(false);
const credentials = reactive({
  username: "",
  password: "",
});

const rules = {
  username: { required },
  password: { required },
};

const v$ = useVuelidate(rules, credentials);

watch(credentials, () => {
  showLoginFailed.value = false;
});

async function onSubmit() {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    await store.dispatch("auth/login", credentials);
    if (store.state.auth.isAuthenticated) {
      // Successful login.
      router.push("/");
    } else {
      showLoginFailed.value = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.login {
  display: flex;
  justify-content: center;
  padding-top: 3rem;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 40%;
  }

  &__title {
    text-align: center;
  }

  &__login-failed-msg {
    color: $error-color;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__form-control {
    border: 1px solid $secondary-color;
    border-radius: 0.25rem;
    outline: none;
    padding: 0.5rem;
    background-color: inherit;
    color: $text-color;

    &::placeholder {
      color: $text-color;
    }
  }

  &__error-list {
    list-style-position: inside;
  }

  &__error-item {
    color: $error-color;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  &__btn {
    border: 0;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background-color: $secondary-color;
    color: black;

    &:hover {
      cursor: pointer;
    }
  }

  &__loader {
    margin: auto;
  }
}
</style>
