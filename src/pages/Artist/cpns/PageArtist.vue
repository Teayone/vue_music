<template>
  <div class="page-artist">
    <ArtistTags
      v-for="(item, index) in labels"
      :label="item"
      :list="lists[index]"
      @itemClick="itemClick"
      width="1000px"
      :key="index"
      exp="name"
      :type="$route.query.type"
      :area="$route.query.area"
      :initial="$route.query.initial"
    />
    <ArtistContent :artists="artistList" @scrollEvent="handleScroll" />
    <LoadingMove v-if="showLoading" />
  </div>
</template>

<script>
import ArtistTags from "./ArtistTags.vue";
import ArtistContent from "./ArtistContent.vue";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
import { lists, labels } from "../config/lists";
import { formatType, formatLabel } from "../utils";
import { getArtistList } from "@/network/api";
export default {
  name: "PageArtist",
  components: { ArtistTags, ArtistContent, LoadingMove },
  data() {
    return {
      labels: Object.freeze(labels),
      lists: Object.freeze(lists),
      artistList: [],
      type: -1,
      area: -1,
      initial: -1,
      offset: 1,
      showLoading: false,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.hasOwnProperty("type")) {
      const { type, area, initial } = this.$route.query;
      this.getArtistListData(type, area, initial, 1);
    } else {
      this.getArtistListData(-1, -1, -1, 1);
    }
  },
  methods: {
    async getArtistListData(type, area, initial, offset) {
      const res = await getArtistList(type, area, initial, offset);
      this.showLoading = false;
      if (!res.data.artists.length) return;
      if (offset > 1) {
        this.artistList.push(...res.data.artists);
      } else if (offset == 1) {
        this.artistList = res.data.artists;
      }
    },
    itemClick(item, label) {
      let type = formatType(item.name);
      formatLabel(this, label, type);
      this.offset = 1;
      this.$router.replace({
        path: "/artist",
        query: {
          type: this.type,
          area: this.area,
          initial: this.initial,
        },
      });
      this.getArtistListData(this.type, this.area, this.initial, this.offset);
    },
    // 节流
    handleScroll() {
      this.showLoading = true;
      this.offset = this.offset + 1;
      this.getArtistListData(this.type, this.area, this.initial, this.offset);
    },
  },
};
</script>

<style lang="less">
.page-artist {
  height: 100%;
  padding: 20px 0 0 0;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
</style>
