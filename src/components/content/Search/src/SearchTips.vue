<template>
  <div id="search-tips">
    <!-- 搜索历史区域 -->
    <div class="search-history" v-if="SearchHistory.length !== 0">
      <div class="sh">
        <span class="history">搜索历史</span>
        <i class="iconfont icon-del" @click="clearHistory"></i>
        <span
          class="show-all-history"
          @click.stop="showAllHistory"
          v-show="isShow"
          >全部显示</span
        >
      </div>
      <div class="history-info" ref="historyInfo" :class="{ show: isShow }">
        <span
          v-for="item in SearchHistory"
          :key="item.id"
          @click.stop="searchHistory(item.name)"
          >{{ item.name
          }}<i
            @click.stop="deleteHistroty(item.id)"
            class="iconfont icon-chacha"
            title="删除历史记录"
          ></i
        ></span>
      </div>
    </div>
    <!-- 热搜提示 -->
    <div class="hot-list">
      <h3 class="hot-title">热搜榜</h3>
      <ul>
        <li
          v-for="(item, index) in SearchHotList"
          :key="index"
          :class="{ active: index <= 2 }"
          @click="search(item.searchWord)"
        >
          <div class="rank-num">
            {{ index + 1 }}
          </div>
          <div class="rank-song">
            <!-- 歌名 -->
            <h3>
              {{ item.searchWord }}
              <img
                v-if="item.iconUrl"
                :src="item.iconUrl"
                alt=""
                :class="{
                  up: item.iconType === 5,
                  hot: item.iconType === 1,
                  newTop: item.iconType === 2,
                }"
              /><span>{{ item.score }}</span>
            </h3>
            <!-- 歌曲简介 -->
            <p>{{ item.content }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSearchHotDetail } from "@/network/api";
export default {
  name: "SearchTips",
  data() {
    return {
      SearchHistory: [], // 搜索历史纪录
      SearchHotList: [], // 热搜列表
      isShow: false, // 是否折叠搜索历史
    };
  },
  created() {
    // 读取本地是否有没有搜索记录
    let searchHistory = JSON.parse(localStorage.getItem("search-history"));
    // 有的话就赋值
    this.SearchHistory = searchHistory || [];

    this.getSeachData();
  },
  mounted() {
    if (this.SearchHistory.length !== 0) {
      setTimeout(() => {
        let h = this.$refs.historyInfo.offsetHeight;
        if (h > 50) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }, 100);
    }
  },
  methods: {
    async getSeachData() {
      let { data: res } = await getSearchHotDetail();
      this.SearchHotList = res.data;
    },
    search(searchWord) {
      this.$emit("search", searchWord);
    },
    // 显示全部历史记录
    showAllHistory() {
      // 将样式和全部显示按钮隐藏
      this.isShow = false;
      this.$emit("allHistory");
    },
    // 重新搜索历史纪录
    searchHistory(name) {
      this.$emit("allHistory", name);
    },
    // 删除历史记录
    deleteHistroty(id) {
      this.$emit("allHistory"); // 不让父组件关闭提示框
      let h = JSON.parse(localStorage.getItem("search-history"));
      h = h.filter((item) => {
        return item.id !== id;
      });
      this.SearchHistory = h;
      localStorage.setItem("search-history", JSON.stringify(h));
    },
    // 清空搜索历史
    clearHistory() {
      this.$emit("allHistory");
      localStorage.removeItem("search-history");
      this.SearchHistory = [];
    },
  },
};
</script>

<style lang="less" scoped>
#search-tips {
  position: absolute;
  left: -65%;
  top: 40px;
  width: 400px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  overflow-y: auto;
  .search-history {
    padding: 20px;
    .sh {
      .history {
        color: #666666;
      }
      i {
        color: #666;
        &:hover {
          color: #000;
          cursor: pointer;
        }
      }
      .show-all-history {
        float: right;
        color: #666;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
    .history-info {
      margin-top: 15px;
      font-size: 14px;
      &.show {
        height: 50px;
        overflow: hidden;
      }
      span {
        position: relative;
        display: inline-block;
        padding: 7px 18px;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin: 10px;
        cursor: pointer;
        i {
          position: absolute;
          right: 4px;
          font-size: 12px;
          top: 9px;
          color: #ccc;
          display: none;
          &:hover {
            color: #333;
          }
        }
        &:hover {
          background: #f2f2f2;
          i {
            display: block;
          }
        }
      }
    }
  }
  .hot-list {
    .hot-title {
      margin-top: 30px;
      color: #666;
      padding: 0 20px;
    }
    ul {
      margin-top: 20px;
      li {
        display: flex;
        padding: 7px 20px;
        &.active {
          .rank-num {
            color: red;
          }
          .rank-song {
            h3 {
              font-weight: 700;
            }
          }
        }
        cursor: pointer;
        &:hover {
          background: #f2f2f2;
        }
        .rank-num {
          width: 40px;
          height: 40px;
          line-height: 40px;
          color: #d3d3d3;
        }
        .rank-song {
          line-height: 20px;
          h3 {
            font-size: 14px;

            span {
              font-size: 12px;
              color: #cccccc;
              margin-left: 5px;
            }
            img.up {
              width: 12px;
              height: 14px;
              margin: 0 4px;
              vertical-align: -1px;
            }
            img.hot,
            img.newTop {
              width: 24px;
              margin: 0 4px;
            }
          }
          p {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
