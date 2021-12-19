<template>
  <div id="toplist">
    <h2>官方榜</h2>
    <Official
      v-for="(item, index) in officialList"
      :key="item.id"
      :imageSrc="item.coverImgUrl"
      :coverInfo="item.updateTime"
      :songList="songs[index]"
      @allClick="allClick(item.id)"
      @songPlay="bofang"
      @listPlay="playSong(item.id)"
    />
    <h2>全球榜</h2>
    <List>
      <PlaylistItem
        v-for="item in globalList"
        :key="item.id"
        :playCount="item.playCount"
        :describe="item.name"
        @playSong="playSong(item.id)"
        @jumpRouter="toPlaylistDetail(item.id)"
      >
        <img v-lazy="item.coverImgUrl" :key="item.coverImgUrl" alt="" />
      </PlaylistItem>
    </List>
  </div>
</template>

<script>
import { playlistPlay, songPlay } from "@/mixin/mixin";
import { getTopList, getWholeSongs } from "@/network/api";
import List from "@/components/common/List/List.vue";
import PlaylistItem from "@/components/content/PlaylistItem/PlaylistItem.vue";
import Official from "./children/Official.vue";
export default {
  name: "Toplist",
  components: { List, PlaylistItem, Official },
  data() {
    return {
      globalList: [],
      // 官方榜
      officialList: [],
      songs: [],
    };
  },
  mixins: [playlistPlay, songPlay],
  created() {
    this.getTopListData();
  },
  methods: {
    async getTopListData() {
      let { data: res } = await getTopList();
      this.globalList = res.list.slice(4);
      this.officialList = res.list.slice(0, 4);
      this.officialList.forEach(async (item) => {
        let { data: songres } = await getWholeSongs(item.id);
        this.songs.push(songres.playlist.tracks.slice(0, 5));
      });
    },
    toPlaylistDetail(id) {
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id,
        },
      });
    },
    allClick(id) {
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#toplist {
  padding: 0 40px 40px 40px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>