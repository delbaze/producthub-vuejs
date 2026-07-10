import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { vFocus } from "./directives/vFocus.ts";

createApp(App)
  .directive("focus", vFocus) // v-focus
  .use(createPinia())
  .use(router)
  .mount("#app");
