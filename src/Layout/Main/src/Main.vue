<template>
  <div id="main">
    <Aside />
    <Container />
    <SpecialComp />
  </div>
</template>

<script>
import "animate.css";
import Aside from "@/Layout/Aside";
import Container from "./Container.vue";
import SpecialComp from "./SpecialComp.vue";
export default {
  name: "Main",
  components: { Aside, Container, SpecialComp },
};
</script>

<style scoped lang="less">
#main {
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 160px);
}
</style>
