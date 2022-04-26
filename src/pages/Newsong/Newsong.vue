<template>
  <div id="newsong">
    <NewBtn @btnClick="btnClick" :active="curIndex" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NewBtn from "./cpns/NewBtn.vue";
import NewSongCate from "./cpns/NewSongCate.vue";
export default {
  name: "Newsong",
  components: { NewBtn, NewSongCate },
  data() {
    return {
      curIndex: this.$route.name === "newsong" ? 0 : 1,
    };
  },
  methods: {
    btnClick(item, index) {
      this.curIndex = index;
      this.$router.push({
        name: index === 0 ? "newsong" : "newalbum",
      });
    },
  },
};
</script>

<style lang="less" scoped>
#newsong {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 0;
}
</style>
