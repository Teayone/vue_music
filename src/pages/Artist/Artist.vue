<template>
  <div id="artist">
    <PageArtist />
  </div>
</template>

<script>
import PageArtist from "./cpns/PageArtist.vue";
export default {
  name: "Artist",
  components: { PageArtist },
};
</script>

<style lang="less">
#artist {
  height: 100%;
}
</style>
