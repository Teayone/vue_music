<template>
  <div id="aside">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: item.link === activeClass }"
        @click="toListItem(item.link)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      list: [
        { link: "/", name: "个性推荐" },
        { link: "/playlist", name: "歌单" },
        { link: "/toplist", name: "排行榜" },
        { link: "/artist", name: "歌手" },
        { link: "/mv", name: "MV" },
        { link: "/newsongs", name: "最新音乐" },
      ],
    };
  },
  methods: {
    toListItem(path) {
      this.$router.push({
        path,
      });
    },
  },
  computed: {
    activeClass() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
#aside {
  width: 360px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  ul {
    width: 100%;
    padding: 10px;
    li {
      width: 100%;
      padding: 15px 0 15px 5px;
      margin-bottom: 3px;
      cursor: pointer;
      &.active {
        background-color: #f5f5f5;
        font-weight: 900;
        font-size: 18px;
      }
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>