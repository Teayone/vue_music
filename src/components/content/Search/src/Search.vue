<template>
  <!-- 搜索框 -->
  <div class="search">
    <i class="iconfont icon-sousuo search-icon"></i>
    <input
      type="text"
      ref="input"
      placeholder="搜索"
      v-model.trim="searchMsg"
      @focus="showSearchTips"
      @blur="closeSearchTips"
      @keyup.enter="search"
      @input="getSearchProposal"
    />
    <!-- 只有当输入框还没输入内容时显示热搜列表 -->
    <SearchTips
      v-if="!searchMsg && isShow"
      @search="search"
      @allHistory="allHistory"
    />
    <!--搜索建议 -->
    <SearchProposal
      :searchMsg="searchMsg"
      :searchData="ProposalData"
      v-if="showProposal"
    />
  </div>
</template>

<script>
import { getSearchSuggest } from "@/network/api";
import SearchProposal from "./SearchProposal.vue";
import SearchTips from "./SearchTips.vue";
export default {
  name: "Search",
  components: { SearchProposal, SearchTips },
  data() {
    return {
      searchMsg: "",
      isShow: false,
      timer: null, // 搜索建议防抖
      ProposalData: null, // 搜索建议数据
      showProposal: false, // 是否显示搜索建议
      time: null, // 聚焦关闭提示框的防抖
    };
  },
  methods: {
    // 聚焦事件
    showSearchTips() {
      this.isShow = true;
      if (this.searchMsg) {
        this.getSearchProposal();
      }
    },
    // 失去焦点事件
    closeSearchTips() {
      this.time = setTimeout(() => {
        this.isShow = false;
        this.showProposal = false;
        this.time = null;
      }, 200);
    },
    // 跳转到搜索页
    search(searchWord) {
      this.closeSearchTips();
      this.$refs.input.blur();
      this.timer && clearTimeout(this.timer);
      // 如果当前输入框有值，则采用 enter 跳转到搜索页
      if (this.searchMsg) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: this.searchMsg,
          },
        });
      } else {
        if (searchWord) {
          this.searchMsg = searchWord;
          // 跳转到搜索页
          this.$router.push({
            path: "search",
            query: {
              keyword: searchWord,
            },
          });
        }
      }
      // 查看本地是否有记录
      let h = JSON.parse(localStorage.getItem("search-history")) || [];
      if (h.length !== 0) {
        let i = h.find((item) => {
          return item.name === this.searchMsg;
        });
        if (i) {
          return;
        } else {
          h.unshift({ name: this.searchMsg, id: Date.now() });
          // 将其存到本地
          localStorage.setItem("search-history", JSON.stringify(h));
        }
      } else {
        h.push({ name: this.searchMsg, id: Date.now() });
        localStorage.setItem("search-history", JSON.stringify(h));
      }
    },
    // 获取搜索建议数据
    getSearchProposal() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.searchMsg) return;
      this.timer = setTimeout(() => {
        getSearchSuggest(this.searchMsg).then((v) => {
          this.ProposalData = v.data.result;
          this.showProposal = true;
        });
        this.timer = null;
      }, 500);
    },

    // 子组件的搜索历史的一些逻辑
    allHistory(name) {
      clearTimeout(this.time); // 关闭定时器，不销毁提示框
      let i = this.$refs.input;
      i.focus(); // 重新获取焦点
      if (name) {
        // 如果子组件传来值了，则搜索
        this.search(name);
        i.blur();
      }
    },
  },
};
</script>

<style lang="less">
.search {
  position: relative;
  width: 180px;
  height: 30px;
  margin-top: 25px;
  margin-left: 40px;

  .search-icon {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 10px;
    top: 7px;
    color: #fabacb;
  }
  input {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    border: none;
    outline: none;
    padding-left: 30px;
    box-sizing: border-box;
    color: #fff9fb;
    background-color: #f47497;
    &::placeholder {
      color: #f3acbf;
    }
  }
}
</style>
