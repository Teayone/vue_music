<template>
  <div>
    <SearchList v-for="item in albumList" :key="item.id">
      <ListPhoto :imgSrc="item.blurPicUrl" :borderRadius="5"></ListPhoto>
      <div class="album-name">
        <span>
          {{ item.name }}
          <i v-if="item.transNames">（{{ item.transNames[0] }}）</i>
          <i v-if="item.alias.length">（{{ item.alias[0] }}）</i>
        </span>
      </div>
      <div class="artist-name">
        <span
          >{{ item.artist && item.artist.name }}
          <i v-if="item.artist && item.artist.trans"
            >（{{ item.artist.trans }}）</i
          >
          <i
            v-if="item.artist && !item.artist.trans && item.artist.alias.length"
            >（{{ item.artist.alias[0] }}）</i
          >
        </span>
      </div>
    </SearchList>
  </div>
</template>

<script>
import SearchList from "../SearchList.vue";
import ListPhoto from "../ListPhoto.vue";
export default {
  name: "SearchAlbum",
  components: { SearchList, ListPhoto },
  props: {
    albumList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and(max-width:1400px) and(min-width:1000px) {
  .album-name {
    flex: 0.8;
    margin-left: 20px;
    color: #373737;
    span {
      display: block;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
@media screen and(min-width: 1401px) and(max-width:1920px) {
  .album-name {
    flex: 0.8;
    margin-left: 20px;
    color: #373737;
    span {
      display: block;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
@media screen and(max-width:999px) and(min-width:400px) {
  .album-name {
    flex: 0.8;
    margin-left: 20px;
    color: #373737;
    span {
      display: block;
      max-width: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i {
        color: #999;
        font-size: 14px;
      }
    }
  }
}

.artist-name {
  right: 200px;
  width: 300px;
  text-align: left;
  i {
    color: #999;
    font-size: 14px;
  }
}
</style>