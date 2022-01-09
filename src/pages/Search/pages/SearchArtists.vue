<template>
  <div>
    <SearchList v-for="item in artistList" :key="item.id">
      <ListPhoto :imgSrc="item.img1v1Url" :borderRadius="5"> </ListPhoto>
      <div class="artist-name">
        <span
          >{{ item.name
          }}<i v-if="item.alias.length !== 0">（{{ item.alias[0] }}）</i></span
        >
      </div>
    </SearchList>
  </div>
</template>

<script>
import SearchList from "../SearchList.vue";
import ListPhoto from "../ListPhoto.vue";
export default {
  name: "SearchArtists",
  components: { SearchList, ListPhoto },
  props: {
    artistList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.artist-name {
  margin-left: 20px;
  flex: 1;
  i {
    color: #ccc;
  }
}
.artist-user-home {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f94e43;
  margin-right: 10px;
  &:hover {
    background: #e8493d;
  }
  i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 600;
  }
}
</style>