import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/css/common.css";
import "./assets/css/iconfont.css";
import "./assets/css/reset.css";
import VueLazyload from "vue-lazyload";
import format from "./filter/format";
import login from "./UI/login";
import alert from "./UI/alert";
Vue.use(VueLazyload);
Vue.use(format);
Vue.use(login);
Vue.use(alert);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
