<template>
  <div class="page-album">
    <div class="page-album-header">
      <NewSongCate :list="cateList" @itemClick="itemClick" />
      <AlbumBtn @itemClick="btnClick" />
    </div>
    <div class="page-album-content">
      <template v-if="!showLoading">
        <template v-if="weekAlbumList && weekAlbumList.length">
          <h1 class="page-album-content-title">本周新碟</h1>
          <NewAlbumList :list="weekAlbumList" />
        </template>
        <template v-if="monthAlbumList && monthAlbumList.length">
          <h1 class="page-album-content-title">{{ date }}</h1>
          <NewAlbumList :list="monthAlbumList" />
        </template>
      </template>
      <template v-else>
        <LoadingMove />
      </template>
    </div>
  </div>
</template>

<script>
import NewSongCate from "../cpns/NewSongCate.vue";
import AlbumBtn from "../cpns/AlbumBtn.vue";
import NewAlbumList from "../cpns/NewAlbumList.vue";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
import { getNewAlbum } from "@/network/api";
import { formatAlbumArea } from "../utils";
export default {
  components: { NewSongCate, AlbumBtn, NewAlbumList, LoadingMove },
  data() {
    return {
      cateList: ["全部", "华语", "欧美", "韩国", "日本"],
      weekAlbumList: [],
      monthAlbumList: [],
      cacheAlbumList: [],
      showLoading: false,
      area: "ALL",
      type: "hot",
      offset: 1,
    };
  },
  created() {
    this.getNewAlbumList("ALL", "hot", 1);
  },
  methods: {
    async getNewAlbumList(area, type, offset) {
      this.showLoading = true;
      const { data: res } = await getNewAlbum(area, type, offset);
      this.weekAlbumList = res.weekData;
      this.monthAlbumList = res.monthData;
      this.showLoading = false;
    },

    itemClick(item) {
      this.weekAlbumList = [];
      this.monthAlbumList = [];
      this.area = formatAlbumArea(item);
      this.getNewAlbumList(this.area, this.type, 1);
    },
    btnClick(item) {
      switch (item) {
        case "推荐":
          this.type = "hot";
          break;
        case "全部":
          this.type = "new";
          break;
        default:
          break;
      }
      this.getNewAlbumList(this.area, this.type, 1);
    },
  },
  computed: {
    date() {
      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth() + 1;
      return `${y}年${m}月`;
    },
  },
};
</script>

<style lang="less">
.page-album {
  width: 100%;
  margin-top: 30px;
  padding: 0 20px;
  .page-album-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-album-content {
    padding: 0 150px 0 100px;
    .page-album-content-title {
      font-size: 25px;
      font-weight: 700;
      color: #343434;
      text-align: center;
      padding: 30px 0;
    }
  }
}
</style>
