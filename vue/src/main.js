import { createApp } from "vue";
import "./index.css";
import store from "./store";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.vue";

createApp(App).use(store).use(router).use(VueSweetalert2).mount("#app");
