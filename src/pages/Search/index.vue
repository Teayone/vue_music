<template>
  <div class="search-page" ref="searchPage">
    <h1>搜索 {{ $route.query.keyword }}</h1>
    <div class="search-box">
      <SearchTags :tagList="tagList" :Name="Name" @tagName="tagName">
        <span
          >找到<i>{{ countNum }}</i
          >{{ info }}</span
        >
      </SearchTags>
      <div class="search-result">
        <!-- 加载动画 -->
        <LoadingMove v-show="isShow" />
        <SearchSong v-if="Name === '单曲'" :songs="searchList" />
        <SearchArtists v-else-if="Name === '歌手'" :artistList="searchList" />
        <SearchAlbum v-else-if="Name === '专辑'" :albumList="searchList" />
        <SearchVideo v-else-if="Name === '视频'" :videoList="searchList" />
        <SearchPlaylist v-else-if="Name === '歌单'" :playlist="searchList" />
        <SearchLyric v-else-if="Name === '歌词'" />
        <SearchUser v-else-if="Name === '用户'" :userList="searchList" />
        <!-- 分页 -->
        <PageTurning
          v-show="!isShow"
          :total="countNum"
          :pageSize="30"
          @currentChange="currentChange"
          :key="theKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from "@/network/api";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
import PageTurning from "@/components/common/PageTurning";
import SearchTags from "./SearchTags.vue";
import SearchSong from "./pages/SearchSong.vue";
import SearchArtists from "./pages/SearchArtists.vue";
import SearchAlbum from "./pages/SearchAlbum.vue";
import SearchVideo from "./pages/SearchVideo.vue";
import SearchPlaylist from "./pages/SearchPlaylist.vue";
import SearchLyric from "./pages/SearchLyric.vue";
import SearchUser from "./pages/SearchUser.vue";
export default {
  name: "Search",
  components: {
    SearchTags,
    SearchSong,
    SearchArtists,
    SearchAlbum,
    SearchVideo,
    SearchPlaylist,
    SearchLyric,
    SearchUser,
    LoadingMove,
    PageTurning,
  },
  data() {
    return {
      tagList: ["单曲", "歌手", "专辑", "视频", "歌单", "歌词", "用户"],
      Name: "单曲",
      info: "首单曲",
      keyword: "",
      searchType: 1, // 默认单曲
      countNum: 0,
      searchList: [],
      isShow: false,
      theKey: 0,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.getSearchData(this.keyword, 1); // 搜索页面默认请求单曲
  },
  methods: {
    tagName(name) {
      this.theKey++;
      this.Name = name;
      this.setRequestParams(name);
    },
    async getSearchData(keyword, type, offset) {
      this.isShow = true;
      let { data: res } = await getSearchResult(keyword, type, offset);
      this.countNum =
        res.result.songCount ||
        res.result.artistCount ||
        res.result.albumCount ||
        res.result.videoCount ||
        res.result.playlistCount ||
        res.result.userprofileCount;
      this.searchList =
        res.result.songs ||
        res.result.artists ||
        res.result.albums ||
        res.result.videos ||
        res.result.playlists ||
        res.result.userprofiles;
      this.isShow = false;
    },
    currentChange(newPage) {
      this.searchList = [];
      this.getSearchData(this.keyword, this.searchType, newPage);
    },

    setRequestParams(name) {
      this.searchList = [];
      switch (name) {
        case "单曲":
          this.info = "首单曲";
          this.searchType = 1;
          this.getSearchData(this.keyword, 1);
          break;
        case "歌手":
          this.info = "位歌手";
          this.searchType = 100;
          this.getSearchData(this.keyword, 100);
          break;
        case "专辑":
          this.info = "张专辑";
          this.searchType = 10;
          this.getSearchData(this.keyword, 10);
          break;
        case "视频":
          this.info = "个视频";
          this.searchType = 1014;
          this.getSearchData(this.keyword, 1014);
          break;
        case "歌单":
          this.info = "个歌单";
          this.searchType = 1000;
          this.getSearchData(this.keyword, 1000);
          break;
        case "歌词":
          this.info = "首歌词";
          this.searchType = 1006;
          this.getSearchData(this.keyword, 1006);
          break;
        case "用户":
          this.info = "位用户";
          this.searchType = 1002;
          this.getSearchData(this.keyword, 1002);
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 40px;
  h1 {
    font-size: 24px;
    color: #333;
    font-weight: 900;
  }
  .search-box {
    margin-top: 40px;
    .search-result {
      margin-top: 30px;
    }
  }
}
</style>