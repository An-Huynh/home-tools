import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupHttpInterceptor } from "./services/config/setup-interceptor";
import {
  FontAwesomeIcon,
  FONT_AWESOME_COMPONENT_NAME,
} from "@/config/fa-icons";

setupHttpInterceptor(store);

createApp(App)
  .use(store)
  .use(router)
  .component(FONT_AWESOME_COMPONENT_NAME, FontAwesomeIcon)
  .mount("#app");
