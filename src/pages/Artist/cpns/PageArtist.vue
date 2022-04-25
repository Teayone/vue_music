<template>
  <div class="page-artist">
    <ArtistTags
      v-for="(item, index) in labels"
      :label="item"
      :key="index"
      :list="lists[index]"
      width="1000px"
      @itemClick="itemClick"
    />
    <ArtistContent />
  </div>
</template>

<script>
import ArtistTags from "./ArtistTags.vue";
import ArtistContent from "./ArtistContent.vue";
import { lists, labels } from "../config/lists";
export default {
  name: "PageArtist",
  components: { ArtistTags, ArtistContent },
  data() {
    return {
      labels: Object.freeze(labels),
      lists: Object.freeze(lists),
    };
  },
  methods: {
    itemClick(item) {
      console.log(item);
    },
  },
};
</script>

<style></style>
