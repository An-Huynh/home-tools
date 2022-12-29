<template>
  <header class="navbar">
    <nav class="content">
      <font-awesome-icon
        class="nav-menu-item"
        size="xl"
        icon="fa-solid fa-bars"
      />
      <router-link to="/" class="navbar-brand">
        <font-awesome-icon icon="fa-solid fa-house-chimney" />
        <span class="brand-name">Home Tools</span></router-link
      >
      <router-link
        to="/login"
        class="navbar-user-button"
        v-if="!store.state.auth.isAuthenticated"
        >Login</router-link
      >
      <router-link
        to="/signup"
        class="navbar-user-button"
        v-if="!store.state.auth.isAuthenticated"
        >Register</router-link
      >
      <span
        class="welcome-message nav-menu-item"
        v-if="store.state.auth.isAuthenticated"
        >Welcome, {{ store.state.auth.user.name }}</span
      >
      <div class="pos-relative">
        <font-awesome-icon
          v-if="store.state.auth.isAuthenticated"
          @click.prevent="toggleUserMenu"
          class="nav-menu-item clickable"
          size="xl"
          icon="fa-solid fa-user"
        />
        <div class="user-menu" v-if="showUserMenu">
          <ul class="user-menu-list">
            <li class="user-menu-item">Your Profile</li>
            <li class="user-menu-item">Settings</li>
            <li class="user-menu-item" @click="onLogout">Logout</li>
          </ul>
        </div>
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
@import "@/assets/styles/constants.scss";
.navbar {
  position: fixed;
  width: 100%;
  border-bottom: 1px solid $accent-color;
  background-color: $background-color;
  top: 0;
  left: 0;
}

.content {
  padding-right: 1rem;
  padding-left: 1rem;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  display: flex;
}

.navbar-brand {
  margin-right: auto;
  line-height: 2rem;
  font-size: 1.5rem;
  padding: 0.5rem;
}

.navbar-user-button {
  line-height: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.nav-menu-item {
  padding: 0.5rem;
}

.clickable {
  cursor: pointer;
}

.brand-name {
  display: none;
}

.user-menu {
  right: 0;
  position: absolute;
  background: $secondary-color;
  border-radius: 0.5rem;
}

.user-menu-list {
  list-style-type: none;
}

.user-menu-item {
  white-space: nowrap;
  padding: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  &:hover {
    background: $accent-color;
    color: black;
  }
}

.pos-relative {
  position: relative;
}

@media (min-width: $small-device-width) {
  .content {
    width: 720px;
  }
  .brand-name {
    display: inline;
    margin-left: 0.25rem;
  }
}

@media (min-width: $medium-device-width) {
  .content {
    width: 940px;
  }
}

@media (min-width: $large-device-width) {
  .content {
    width: 1140px;
  }
}
</style>
