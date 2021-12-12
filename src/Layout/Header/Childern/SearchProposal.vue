<template>
  <div id="search-proposal" v-if="searchMsg">
    <h2>
      搜 <span>“{{ searchMsg }}”</span> 相关得结果
    </h2>
    <ul v-if="searchData && searchData.songs">
      <li class="describe">
        <i class="iconfont icon-yinle"></i><span>单曲</span>
      </li>
      <li
        v-for="item in searchData.songs"
        :key="item.id"
        @click="bofang(item.id)"
        class="serach-song"
      >
        <span class="song-name">
          {{ item.name }}
          <b v-show="item.alias && item.alias.length !== 0"
            >({{ item.alias[0] }})</b
          >
        </span>
        <i>-</i>
        <em v-for="(artists, index) in item.artists" :key="index">
          {{ artists.name }}
        </em>
      </li>
    </ul>
    <ul v-if="searchData && searchData.artists">
      <li class="describe">
        <i class="iconfont icon-gerenzhuye"></i><span>歌手</span>
      </li>
      <li v-for="item in searchData.artists" :key="item.id">{{ item.name }}</li>
    </ul>
    <ul v-if="searchData && searchData.albums">
      <li class="describe">
        <i class="iconfont icon-zhuanji"></i><span>专辑</span>
      </li>
      <li v-for="item in searchData.albums" :key="item.id">{{ item.name }}</li>
    </ul>
    <ul v-if="searchData && searchData.playlists">
      <li class="describe">
        <i class="iconfont icon-gedan"></i><span>歌单</span>
      </li>
      <li
        v-for="item in searchData.playlists"
        :key="item.id"
        @click="toPlaylist(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { songPlay } from "@/mixin/mixin";
export default {
  name: "SearchProposal",
  props: {
    searchMsg: {
      type: String,
      default: "",
    },
    searchData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  mixins: [songPlay],
  methods: {
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
#search-proposal {
  position: absolute;
  left: -65%;
  top: 40px;
  width: 400px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  overflow-y: auto;
  h2 {
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: #000;
    }
    span {
      color: #507db6;
    }
  }
  ul {
    width: 100%;
    .serach-song {
      .song-name {
        b {
          font-size: 12px;
          color: #999;
        }
      }
      i {
        margin: 0 3px;
      }
    }
    li {
      position: relative;
      padding: 6px 10px 6px 30px;
      font-size: 14px;
      color: #353536;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background: #f2f2f2;
      }
      &.describe {
        background: #f5f5f7;
        i {
          position: absolute;
          left: 10px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>