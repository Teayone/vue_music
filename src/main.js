import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import VueLazyload from "vue-lazyload";
import format from "./filter/format";
import login from "./UI/login";
Vue.use(VueLazyload);
Vue.use(format);
Vue.use(login);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
