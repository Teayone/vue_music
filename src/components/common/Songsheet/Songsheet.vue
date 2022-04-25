<template>
  <!-- 推荐歌单组件 -->
  <List>
    <PlaylistItem
      v-for="item in list"
      :key="item.id"
      :playCount="item.playCount || item.playcount"
      :describe="item.name"
      @playSong="playSong(item.id)"
      @jumpRouter="toPlaylistDetail(item.id)"
    >
      <img :src="item.picUrl" alt="" />
    </PlaylistItem>
  </List>
</template>

<script>
import List from "../List/List.vue";
import PlaylistItem from "../../content/PlaylistItem/PlaylistItem.vue";
import { getPersonalized, getLoginPlayList } from "@/network/api";
import { playlistPlay } from "@/mixin/mixin";
export default {
  name: "Songsheet",
  components: { List, PlaylistItem },
  mixins: [playlistPlay],
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
      const loginState = this.$store.state.login.loginState;
      if (loginState) {
        let { data: ures } = await getLoginPlayList();
        this.list = ures.recommend.slice(0, 10);
      } else {
        let { data: res } = await getPersonalized();
        this.list = res.result.slice(0, 10);
      }
    },
    toPlaylistDetail(id) {
      this.$router.push({
        path: "playlist-detail",
        query: {
          id,
        },
      });
    },
  },
  watch: {
    "$store.state.login.loginState"(newVal) {
      this.getData();
    },
  },
};
</script>

<style></style>
