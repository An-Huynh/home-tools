<template>
  <header class="nav">
    <nav class="nav__content">
      <font-awesome-icon
        class="nav__item nav__item--large-font"
        icon="fa-solid fa-bars"
        size="xl"
      />
      <router-link to="/" class="nav__item nav__item--large-font">
        <font-awesome-icon icon="fa-solid fa-house-chimney" />
        <span class="nav__title">Home Tools</span></router-link
      >
      <router-link
        to="/login"
        class="nav__item nav__item--pull-right"
        v-if="!store.state.auth.isAuthenticated"
        >Login</router-link
      >
      <router-link
        to="/signup"
        class="nav__item"
        v-if="!store.state.auth.isAuthenticated"
        >Register</router-link
      >
      <span
        class="nav__item nav__item--pull-right"
        v-if="store.state.auth.isAuthenticated"
        >Welcome, {{ store.state.auth.user.name }}</span
      >
      <div class="nav__item nav__item--clickable nav__item--relative">
        <font-awesome-icon
          v-if="store.state.auth.isAuthenticated"
          @click="toggleUserMenu"
          icon="fa-solid fa-user"
          size="xl"
        />
        <ul class="nav__user-menu" v-if="showUserMenu">
          <li class="nav__user-menu-item">Your Profile</li>
          <li class="nav__user-menu-item">Settings</li>
          <li class="nav__user-menu-item" @click="onLogout">Logout</li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const showUserMenu = ref(false);

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
}

function onLogout() {
  store.dispatch("auth/logout");
  router.push("/");
  toggleUserMenu();
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.nav {
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid $secondary-color;
  width: 100%;
  background-color: $background-color;

  &__content {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    @media (min-width: $small-device-width) {
      width: 720px;
    }
    @media (min-width: $medium-device-width) {
      width: 940px;
    }
    @media (min-width: $large-device-width) {
      width: 1140px;
    }
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &__item {
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 2rem;
    white-space: nowrap;

    &--large-font {
      font-size: 1.5rem;
    }

    &--pull-right {
      margin-left: auto;
    }

    &--clickable {
      cursor: pointer;
    }

    &--relative {
      position: relative;
    }
  }

  &__title {
    display: none;
    @media (min-width: $small-device-width) {
      display: inline;
      margin-left: 0.25rem;
    }
  }

  &__user-menu {
    position: absolute;
    right: 0;
    border-radius: 0.5rem;
    background-color: $primary-color;
    list-style-type: none;
  }

  &__user-menu-item {
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: $secondary-color;
      color: black;
    }
  }
}
</style>
