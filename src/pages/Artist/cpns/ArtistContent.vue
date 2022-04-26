<template>
  <div class="artist-content" @scroll="handleScroll">
    <div
      class="artist-singer"
      :key="item.id"
      v-for="item in artists"
      ::key="item.id"
    >
      <div class="artist-avatar">
        <img v-lazy="item.picUrl" :key="item.picUrl" />
      </div>
      <div class="artist-name">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistContent",
  props: {
    artists: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  mounted() {},
  methods: {
    handleScroll(e) {
      if (this.timer) return;
      this.timer = setTimeout(() => {
        let sh = e.target.scrollHeight;
        let st = e.target.scrollTop;
        let oh = e.target.offsetHeight;
        if (sh - st === oh) {
          this.$emit("scrollEvent");
        }
        this.timer = null;
      }, 100);
    },
  },
};
</script>

<style lang="less">
.artist-content {
  flex: 1;
  width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  padding: 15px 35px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .artist-singer {
    width: 260px;
    padding: 10px 0;
    .artist-avatar {
      width: 100%;
      height: 230px;
      padding: 15px 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
