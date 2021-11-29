<template>
  <!-- 推荐歌单组件 -->
  <List>
    <PlaylistItem
      v-for="item in list"
      :key="item.id"
      :playCount="item.playCount"
      :describe="item.name"
      @playSong="playSong(item.id)"
    >
      <img :src="item.picUrl" alt="" />
    </PlaylistItem>
  </List>
</template>

<script>
import List from "../List/List.vue";
import PlaylistItem from "../../content/PlaylistItem/PlaylistItem.vue";
import { getPersonalized, getWholeSongs } from "../../../network/api";
export default {
  name: "Songsheet",
  components: { List, PlaylistItem },
  data() {
    return {
      // 歌单数据
      list: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getPersonalized();
      this.list = res.result.slice(0, 20);
    },
    // playSong 子组件的播放音乐按钮
    playSong(id) {
      getWholeSongs(id).then((v) => {
        // 将歌曲列表存到本地
        localStorage.setItem("song", JSON.stringify(v.data.playlist.tracks));
        // 将歌曲索引存到本地
        localStorage.setItem("index", JSON.stringify(0));
        // 通知Vuex发起请求获取某首音乐的URL
        this.$store.dispatch("SongUrl");
      });
    },
  },
};
</script>

<style>
</style>