<template>
  <div id="my-create-list">
    <h1 class="my-song">我的音乐</h1>
    <div class="my-create">
      <h1 @click="showCreate = !showCreate">
        创建的歌单<i
          :class="
            showCreate === true
              ? 'iconfont icon-xiasanjiaoxing'
              : 'iconfont icon-bofangqi-bofang'
          "
        ></i>
      </h1>
      <ul v-show="showCreate">
        <li
          v-for="item in myPlayList"
          :key="item.id"
          :class="{ active: item.id == $route.query.id }"
          @click="toPlaylist(item.id)"
        >
          <i
            :class="
              item.name === item.creator.nickname + '喜欢的音乐'
                ? 'iconfont icon-aixin'
                : 'iconfont icon-gedan'
            "
          ></i
          ><span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="my-shoucang">
      <h1 @click="showShoucang = !showShoucang">
        收藏的歌单<i
          :class="
            showShoucang === true
              ? 'iconfont icon-xiasanjiaoxing'
              : 'iconfont icon-bofangqi-bofang'
          "
        ></i>
      </h1>
      <ul v-show="showShoucang">
        <li
          v-for="item in shouCangPlaylist"
          :key="item.id"
          :class="{ active: item.id == $route.query.id }"
          @click="toPlaylist(item.id)"
        >
          <i class="iconfont iconfont icon-gedan"></i
          ><span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUserPlayList, getUserAdminDetail } from "@/network/user";
export default {
  name: "MyCreateList",
  data() {
    return {
      showCreate: true,
      showShoucang: false,
      myPlayList: [],
      shouCangPlaylist: [],
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      let cookie = localStorage.getItem("userInfo");
      let { data: userRes } = await getUserAdminDetail(cookie);
      let uid = userRes.profile.userId;
      let { data: res } = await getUserPlayList(uid);
      this.myPlayList = res.playlist.filter((item) => {
        return item.creator.nickname == userRes.profile.nickname;
      });
      this.shouCangPlaylist = res.playlist.filter((item) => {
        return item.creator.nickname != userRes.profile.nickname;
      });
    },
    toPlaylist(id) {
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#my-create-list {
  width: 100%;
  overflow: hidden;
  padding: 10px;
  .my-song {
    padding: 10px 5px;
    color: #333;
    font-weight: 600;
    font-size: 18px;
  }
  .my-create,
  .my-shoucang {
    margin: 5px 0;
    h1 {
      padding: 10px 5px;
      color: #9f9f9f;
      cursor: pointer;
      &:hover {
        i {
          color: #999999;
        }
      }
    }
    ul {
      li {
        padding: 20px 5px;
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.active {
          background: #f5f5f6;
        }
        &:hover {
          background: #f5f5f6;
        }
        i {
          font-size: 14px;
        }
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>