<template>
  <!-- 收藏着 -->
  <div id="collection">
    <LoadingMove v-show="showLoading" />
    <div class="showCollection" v-if="showCollection">
      <h2>暂无收藏者</h2>
    </div>
    <div class="c-collection" v-else>
      <ul>
        <li v-for="item in subscribers" :key="item.userId">
          <!-- 头像 -->
          <img :src="item.avatarUrl" alt="" />
          <!-- 昵称 -->
          <span>{{ item.nickname }}</span>
          <!-- 性别 -->
          <div
            :class="item.gender === 1 ? 'nan' : 'nv'"
            v-if="item.gender !== 0"
          >
            <i
              :class="
                item.gender === 1 ? 'iconfont icon-nan' : 'iconfont icon-nv'
              "
            ></i>
          </div>
        </li>
      </ul>
      <!-- 登陆获取更多收藏者 -->
      <div class="login-get-collect" v-if="needLogin">
        <h2>登陆获取全部收藏者</h2>
      </div>
      <!-- 翻页 -->
      <div class="fanye" v-else>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="32"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaylistSubscribers } from "@/network/api";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
export default {
  name: "Collection",
  components: { LoadingMove },
  data() {
    return {
      subscribers: null,
      total: 0,
      needLogin: false,
      showCollection: false,
      Blist: null, // DOM元素
      showLoading: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.Blist = document.querySelector(".b-list");
    });
  },
  created() {
    this.getData(this.$route.query.id);
  },
  methods: {
    async getData(id, offset) {
      this.showLoading = true;
      let { data: res } = await getPlaylistSubscribers(id, offset);
      this.showLoading = false;
      if (res.subscribers.length === 0) {
        this.showCollection = true; // 是否显示没有收藏者
        return;
      } else if (res.needLogin) {
        this.needLogin = true; // 是否显示登陆获取更多收藏者
      }
      this.subscribers = res.subscribers;
      this.total = res.total;
    },
    currentChange(newPage) {
      let id = this.$route.query.id;
      this.getData(id, newPage);
      this.$nextTick(() => {
        this.Blist.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
};
</script>

<style lang="less" scoped>
#collection {
  width: 100%;
  padding: 40px;
  .c-collection {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        align-items: center;
        width: 25%;
        margin-bottom: 30px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        span {
          color: #333;
          cursor: pointer;
          margin-left: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:hover {
            color: #000;
          }
        }
        .nan {
          width: 24px;
          height: 24px;
          background: #c0f3ff;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          margin-left: 5px;
          i {
            font-size: 16px;
            color: #72c2e4;
          }
        }
        .nv {
          width: 24px;
          height: 24px;
          background: #ffcde8;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          margin-left: 5px;
          i {
            font-size: 16px;
            color: #e8528f;
          }
        }
      }
    }
    .fanye {
      text-align: center;
      margin-top: 30px;
      ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #ff7a9e;
      }
    }
    .login-get-collect {
      margin-top: 30px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .showCollection {
    font-weight: 700;
    text-align: center;
    font-size: 18px;
    font-family: 宋体;
  }
}
</style>