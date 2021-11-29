<template>
  <div id="home">
    <Swiper />
    <Title describe="推荐歌单" link="/playlist" />
    <Songsheet />
    <Title describe="独家放送" link="/sole" />
  </div>
</template>

<script>
import Swiper from "../../components/content/Swiper/Swiper.vue";
import Title from "../../components/common/Title/Title.vue";
import Songsheet from "../../components/common/Songsheet/Songsheet.vue";
export default {
  name: "Home",
  components: { Swiper, Title, Songsheet },
};
</script>

<style lang="less" scoped>
#home {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 20px 40px;
}
</style>