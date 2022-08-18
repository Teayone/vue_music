import Alert from "@/components/common/Alert/Alert.vue";
export let show;
export let hide;
export default {
  install(Vue) {
    let isAlert = null;
    let vm = null;
    Vue.component("alert", Alert);
    show = (title) => {
      if (!isAlert) {
        const Ctor = Vue.extend({
          render(h) {
            return h("alert", { props: { title } });
          },
        });
        isAlert = new Ctor();
        vm = isAlert.$mount();
        document.body.appendChild(vm.$el);
      }
    };
    hide = () => {
      document.body.removeChild(vm.$el);
      isAlert = null;
      vm = null;
    };
  },
};
