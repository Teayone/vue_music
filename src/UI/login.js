import { LoginBox } from "@/components/content/Login";
import store from "@/store";
export default {
  install(Vue) {
    let loginBox = null;
    Vue.component(LoginBox.name, LoginBox);
    Vue.prototype.$login = {
      show,
      hide,
    };
    function show(props, cb) {
      if (!loginBox) {
        const LoginBoxCtor = Vue.extend({
          render(h) {
            return h("LoginBox", { props });
          },
        });
        loginBox = new LoginBoxCtor({
          store,
        });
        this.vm = loginBox.$mount();
        document.body.append(this.vm.$el);
        cb && cb.call(this);
      }
    }
    function hide(cb) {
      document.body.removeChild(this.vm.$el);
      loginBox = null;
      cb && cb.call(this);
    }
  },
};
