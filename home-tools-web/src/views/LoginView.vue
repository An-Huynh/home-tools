<template>
  <div class="container">
    <div class="content">
      <h1 class="header-text">Login</h1>
      <span class="login-failed-message" v-if="showLoginFailed"
        >Failed to login</span
      >
      <form class="login-form" @submit.prevent="onSubmit">
        <input
          :disabled="store.state.auth.isLoading"
          type="text"
          class="form-control"
          v-model="v$.username.$model"
          placeholder="Email"
        />
        <ul class="error-list" v-if="v$.username.$invalid">
          <li
            class="error"
            v-for="error of v$.username.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </li>
        </ul>
        <input
          id="password"
          :disabled="store.state.auth.isLoading"
          class="form-control"
          name="password"
          type="password"
          placeholder="Password"
          v-model="v$.password.$model"
        />
        <ul class="error-list" v-if="v$.password.$invalid">
          <li
            class="error"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </li>
        </ul>
        <div class="login-buttons">
          <button class="btn" :disabled="store.state.auth.isLoading">
            Login
          </button>
          <button
            class="btn"
            type="button"
            :disabled="store.state.auth.isLoading"
          >
            Forgot Password
          </button>
        </div>
      </form>
      <div class="loader">
        <loading-indicator
          v-if="store.state.auth.isLoading"
        ></loading-indicator>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/constants.scss";

.container {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}

.content {
  display: flex;
  flex-direction: column;
  min-width: 40%;
  gap: 1rem;
}

h1 {
  text-align: center;
}

.login-failed-message {
  color: $error-color;
  text-align: center;
}

.error-list {
  list-style-position: inside;
}

.error {
  color: $error-color;
}

.loader {
  margin: auto;
  padding-top: 1rem;
}

.login-form {
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
}

.login-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem;
  background-color: $accent-color;
  border-radius: 0.25rem;
  border: 0;
  color: black;

  &:hover {
    cursor: pointer;
  }
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  background-color: inherit;
  border-color: $accent-color;
  color: $text-color;
}

::placeholder {
  color: $text-color;
}
</style>

<script setup lang="ts">
import loadingIndicator from "@/components/LoadingIndicator.vue";
import { reactive, ref, watch, onMounted } from "vue";
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
      console.log("isAuthenticated...");
      // Successful login.
      router.push("/");
    } else {
      showLoginFailed.value = true;
    }
  }
}
</script>
