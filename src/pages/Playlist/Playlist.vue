<template>
  <div id="playlist" ref="playlist">
    <!-- 翻页之后回到顶部的空元素 -->
    <div ref="scroll"></div>
    <!-- 歌单 -->
    <Ctags @playlistClick="playlistClick" />
    <!--  -->
    <List>
      <PlaylistItem
        v-for="item in playlists"
        :key="item.id"
        :playCount="item.playCount"
        :describe="item.name"
        @playSong="playSong(item.id)"
        @jumpRouter="toPlaylistDetail(item.id)"
      >
        <img :src="item.coverImgUrl" alt="" />
      </PlaylistItem>
    </List>
    <!-- 翻页 -->
    <div class="fanye" v-if="total > 50" :key="theKey">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="50"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Ctags from "./pages/Ctags.vue";
import List from "@/components/common/List/List.vue";
import PlaylistItem from "@/components/content/PlaylistItem/PlaylistItem";
import { getTopPlaylist } from "@/network/api";
import { playlistPlay } from "../../mixin/mixin";
export default {
  name: "Playlist",
  components: { Ctags, List, PlaylistItem },
  data() {
    return {
      playlists: [], // 歌单数据
      total: 0, // 歌单数量
      tagsName: "全部", // 默认分类为全部
      theKey: 0,
    };
  },
  mixins: [playlistPlay],
  created() {
    this.getPlaylistData("全部");
  },
  methods: {
    async getPlaylistData(name, offset) {
      let { data: res } = await getTopPlaylist(name, offset);
      this.playlists = res.playlists;
      this.total = res.total;
    },
    playlistClick(name) {
      this.theKey++; // 防止翻页之后切换歌单分类，翻页所在的页数按钮不变
      this.tagsName = name;
      this.getPlaylistData(name);
    },
    // 翻页
    currentChange(newPage) {
      this.getPlaylistData(this.tagsName, newPage);
      this.$nextTick(() => {
        this.$refs.scroll.scrollIntoView({ behavior: "smooth" });
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
  },
};
</script>

<style lang="less" scoped>
#playlist {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 40px;
  .fanye {
    text-align: center;
    margin-top: 30px;
    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: #ff7a9e;
    }
  }
}
</style>