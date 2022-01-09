<template>
  <div class="search-tags">
    <ul>
      <li
        class="t-li"
        v-for="(item, index) in tagList"
        :key="index"
        :class="{ active: item === Name }"
        @click.stop="tagClick(item)"
      >
        {{ item }}
      </li>
    </ul>
    <p class="t-info"><slot></slot></p>
  </div>
</template>

<script>
export default {
  name: "SearchTags",
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      },
    },
    Name: {
      type: String,
      default: "单曲",
    },
  },
  data() {
    return {};
  },
  methods: {
    tagClick(tagName) {
      this.$emit("tagName", tagName);
    },
  },
};
</script>

<style lang="less" scoped>
.search-tags {
  display: flex;
  position: relative;
  ul {
    display: flex;
    li {
      position: relative;
      margin-right: 45px;
      font-size: 18px;
      cursor: pointer;
      color: #373737;
      &:hover {
        color: #000;
      }
      &.active {
        color: #000;
        font-weight: 600;
        &::after {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 4px;
          border-radius: 5px;
          background: #ff7a9e;
          content: "";
        }
      }
    }
  }
  @media screen and(max-width:1100px) and(min-width:500px) {
    .t-info {
      display: none;
    }
    .t-li {
      font-size: 16px;
      white-space: nowrap;
    }
  }
  @media screen and(max-width: 1920px) and(min-width: 1101px) {
    p {
      position: absolute;
      right: 20px;
      bottom: 3px;
      font-size: 14px;
      color: #ccc;
      cursor: default;
      span {
        i {
          margin: 0 3px;
        }
      }
    }
  }
}
</style>