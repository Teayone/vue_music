<template>
  <div id="app">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from "./Layout/Header/Header.vue";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer/Footer.vue";
export default {
  name: "App",
  components: { Header, Main, Footer },
};
</script>

<style>
/* @import url("./assets/css/reset.css");
@import url("./assets/css/iconfont.css");
@import url("./assets/css/common.css"); */
</style>
