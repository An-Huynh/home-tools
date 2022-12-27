import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupHttpInterceptor } from "./services/config/setup-interceptor";

setupHttpInterceptor(store);

createApp(App).use(store).use(router).mount("#app");
