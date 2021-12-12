<template>
  <div id="recommend">
    <RecommendList
      v-for="item in mvs"
      :key="item.id"
      :playCount="item.playCount"
      :author="item.artistName"
      :coverSrc="item.cover"
      :vTitle="item.name"
      @recommendClick="recommendClick(item.id)"
      @authorClick="authorClick(item.artistId)"
    />
  </div>
</template>

<script>
import RecommendList from "./RecommendList.vue";
export default {
  components: { RecommendList },
  props: {
    mvs: {
      type: Array,
      default: [],
    },
  },
  methods: {
    recommendClick(id) {
      this.$router.push({
        path: "/play-mv",
        query: {
          mvid: id,
        },
      });
    },
    authorClick(id) {
      return;
      // this.$router.push({
      //   path: "/play-mv",
      //   query: {
      //     mvid: id,
      //   },
      // });
    },
  },
};
</script>

<style lang="less" scoped>
#recommend {
  width: 100%;
  padding: 20px 40px;
}
</style>