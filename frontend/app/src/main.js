import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faTimes,
  faUtensils,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUserSecret,
  faTimes,
  faUtensils,
  faAngleDoubleLeft,
  faAngleDoubleRight
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import VueInputAutowidth from "vue-input-autowidth";
Vue.use(VueInputAutowidth);

Vue.config.productionTip = false;

Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
