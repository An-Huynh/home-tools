import { createApp } from "vue";

import {
  FONT_AWESOME_COMPONENT_NAME,
  FontAwesomeIcon,
} from "@/config/fa-icons";

import App from "./App.vue";
import router from "./router";
import { setupHttpInterceptor } from "./services/config/setup-interceptor";
import store from "./store";

setupHttpInterceptor(store);

createApp(App)
  .use(store)
  .use(router)
  .component(FONT_AWESOME_COMPONENT_NAME, FontAwesomeIcon)
  .mount("#app");
