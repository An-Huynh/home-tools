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
      <router-link to="/login" class="navbar-user_button">Login</router-link>
      <router-link to="/signup" class="navbar-user-button"
        >Register</router-link
      >
    </nav>
  </header>
</template>
<style scoped lang="scss">
@import "@/assets/styles/constants.scss";

.navbar {
  border-bottom: 1px solid $accent-color;
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

.brand-name {
  display: none;
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
