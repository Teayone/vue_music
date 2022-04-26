<template>
  <div class="page-song">
    <div class="page-song_header">
      <NewSongCate :list="cateList" @itemClick="itemClick" />
      <SongBtn @playClick="allPlay" />
    </div>
    <div class="page-song_content">
      <NewSongList :songList="songs" :showLoading="isLoading" />
    </div>
  </div>
</template>

<script>
import NewSongCate from "../cpns/NewSongCate.vue";
import SongBtn from "../cpns/SongBtn.vue";
import NewSongList from "../cpns/NewSongList.vue";
import { getNewSong } from "@/network/api";
import { allPlay } from "@/mixin/mixin.js";
import { formatType } from "../utils";
export default {
  name: "PageSong",
  components: { NewSongCate, SongBtn, NewSongList },
  mixins: [allPlay],
  data() {
    return {
      cateList: ["全部", "华语", "欧美", "韩国", "日本"],
      songs: [],
      isLoading: false,
    };
  },
  created() {
    this.getNewSongList(0);
  },
  methods: {
    async getNewSongList(type) {
      this.isLoading = true;
      const { data: res } = await getNewSong(type);
      this.isLoading = false;
      this.songs = res.data;
      console.log(res.data);
    },
    itemClick(item) {
      let type = formatType(item);
      this.getNewSongList(type);
    },
  },
};
</script>

<style lang="less">
.page-song {
  width: 100%;
  margin-top: 30px;

  .page-song_header {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
