<template>
  <div id="c-tags">
    <div class="tags-all">
      <span class="all-playlist" @click.stop="isShow = !isShow"
        >{{ tagsName }}<i class="iconfont icon-qianjin"></i
      ></span>
      <!-- 弹框 -->
      <div class="tags-tips" v-show="isShow">
        <h5 class="t-tips-title">
          <span
            :class="{ active: '全部歌单' === tagsName }"
            @click="allPlaylistClick"
            >全部歌单</span
          >
        </h5>
        <!-- 行 -->
        <div class="category" v-for="(item, index) in category" :key="item.id">
          <!-- 左侧分类 -->
          <div class="category-list">
            <span><i :class="item.icon"></i>{{ item.name }}</span>
          </div>
          <!-- 右侧标签 -->
          <div class="lable-list" v-if="subsData !== null">
            <span
              v-for="subitem in subsData[index]"
              :key="subitem.name"
              @click="subsClick(subitem.name)"
              ><i :class="{ active: subitem.name === tagsName }">{{
                subitem.name
              }}</i></span
            >
          </div>
        </div>
      </div>
    </div>
    <ul class="labels">
      <li
        @click="tagsClick(item.name)"
        v-for="item in tags"
        :key="item.id"
        :class="{ active: item.name === tagsName }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { category } from "../category";
import { getPlaylistCatlist, getPlaylistHot } from "@/network/api";
export default {
  name: "Ctags",
  data() {
    return {
      category: [],
      sub: [],
      subsData: null,
      tags: [],
      isShow: false,
      tagsName: "全部歌单", // 激活样式
    };
  },
  created() {
    this.category = category;
    this.getCategoryData();
  },
  methods: {
    async getCategoryData() {
      let { data: res } = await getPlaylistCatlist();
      let { data: res2 } = await getPlaylistHot();
      let subData = {};
      res.sub.forEach((item) => {
        if (!subData[item.category]) {
          subData[item.category] = [item];
        } else {
          subData[item.category].push(item);
        }
      });
      this.subsData = subData;
      this.tags = res2.tags;
    },
    // 全部歌单按钮
    allPlaylistClick() {
      this.isShow = false;
      if (this.tagsName === "全部歌单") return;
      this.tagsName = "全部歌单";
      this.$emit("playlistClick", "全部");
    },
    // 全部分类按钮
    subsClick(name) {
      this.isShow = false;
      if (this.tagsName === name) return;
      this.tagsName = name;

      this.$emit("playlistClick", name);
    },
    // 热门分类安妮
    tagsClick(name) {
      if (this.tagsName === name) return;
      this.tagsName = name;
      this.$emit("playlistClick", name);
    },
  },
  watch: {
    isShow(n) {
      const _this = this;
      if (n) {
        document.addEventListener("click", toggleTips, false);
      }
      function toggleTips() {
        _this.isShow = false;
        document.removeEventListener("click", toggleTips);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#c-tags {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tags-all {
    position: relative;
    .all-playlist {
      display: inline-block;
      padding: 7px 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 30px;
      cursor: pointer;
      i {
        font-size: 14px;
      }
      &:hover {
        background: #f4f4f4;
      }
    }
    .tags-tips {
      position: absolute;
      top: 40px;
      padding: 20px;
      width: 800px;
      height: 600px;
      overflow-y: auto;
      background: #fff;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      .t-tips-title {
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e5e5;
        span {
          font-size: 12px;
          cursor: pointer;
          margin: 0 5px;
          padding: 5px 8px;
          border-radius: 20px;
          &.active {
            color: #ff7a9e;
            background: #fef8fa;
          }
        }
      }
      .category {
        margin: 15px 0 35px 0;
        display: flex;
        font-size: 12px;

        .category-list {
          width: 80px;
          cursor: default;
          color: #cfcfcf;
          text-align: center;
          span {
            display: flex;
            align-items: center;
          }
          i {
            font-size: 25px;
            margin-right: 5px;
          }
        }
        .lable-list {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          flex-wrap: wrap;
          span {
            width: 20%;
            height: 40px;
            line-height: 29px;
            i {
              padding: 5px 7px;
              border-radius: 30px;
              cursor: pointer;
              &.active {
                background: #fef8fa;
                color: #ff7a9e;
              }
              &:hover {
                color: #d47f96;
              }
            }
          }
        }
      }
    }
  }
  .labels {
    display: flex;
    li {
      font-size: 12px;
      cursor: pointer;
      margin: 0 5px;
      padding: 5px 8px;
      border-radius: 20px;
      &.active {
        color: #ff7a9e;
        background: #fef8fa;
      }
    }
  }
}
</style>