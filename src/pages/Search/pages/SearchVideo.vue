<template>
  <List>
    <VideoList
      v-for="(item, index) in videoList"
      :key="index"
      :PlayCount="item.playTime"
      :videoName="item.title"
      :imageSrc="item.coverUrl"
      :dt="item.durationms / 1000"
      :creator="item.creator"
      :mv="item.type === 0 ? true : false"
      :nicName="item.creator && item.creator[0].userName"
      @playClick="playClick(item.vid, item.type)"
    />
  </List>
</template>

<script>
import List from "@/components/common/List/List.vue";
import VideoList from "@/components/content/VideoList/VideoList.vue";
export default {
  name: "SearchVideo",
  components: { List, VideoList },
  props: {
    videoList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playClick(vid, type) {
      console.log(vid, type);
      if (type === 1) {
        this.$router.push({
          path: "/play-video",
          query: {
            id: vid,
          },
        });
      } else {
        this.$router.push({
          path: "/play-mv",
          query: {
            mvid: vid,
          },
        });
      }
    },
  },
};
</script>

<style>
</style>