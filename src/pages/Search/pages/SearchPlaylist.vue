<template>
  <div>
    <SearchList
      v-for="item in playlist"
      :key="item.id"
      @listClick="listClick(item.id)"
    >
      <ListPhoto :imgSrc="item.coverImgUrl" :borderRadius="5"></ListPhoto>
      <span class="playlsit-name">{{ item.name }}</span>
      <span class="playlist-num">{{ item.trackCount }}首</span>
      <p class="playlist-artist">
        <i>by</i>
        <span>{{ item.creator && item.creator.nickname }}</span>
      </p>
      <p class="playlist-playcount">
        <i class="iconfont icon-bofangqi-bofangshu"></i>
        <span>{{ item.playCount | formatPlayCount }}</span>
      </p>
    </SearchList>
  </div>
</template>

<script>
import SearchList from "../SearchList.vue";
import ListPhoto from "../ListPhoto.vue";
export default {
  name: "SearchPlaylist",
  components: { SearchList, ListPhoto },
  props: {
    playlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    listClick(id) {
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
.playlsit-name {
  flex: 1;
  white-space: nowrap;
}
.playlist-num {
  flex: 0.2;
  font-size: 14px;
  color: #999;
  white-space: nowrap;
}
.playlist-artist {
  color: #999;
  font-size: 14px;
  flex: 0.7;
  white-space: nowrap;
  span {
    color: #656565;
    margin-left: 5px;
  }
}
.playlist-playcount {
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex: 0.2;
  font-size: 14px;
  color: #999;
  i {
    font-size: 20px;
  }
}
</style>