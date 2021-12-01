<template>
  <div id="songlist">
    <div v-if="song !== null">
      <h2>当前播放</h2>
      <div class="tt">
        <p class="num">总{{ song.length }}首</p>
        <p class="shoucang">
          <i class="iconfont icon-shoucang1"></i><span>收藏全部</span>
        </p>
        <p class="clear" @click.stop="clearSongList">
          <i class="iconfont icon-del"></i><span>清空列表</span>
        </p>
      </div>
      <ul class="list" id="ul-list">
        <li
          v-for="(item, index) in song"
          :key="item.id"
          :class="{ active: item.id === songDetail.id }"
          @click="playSong(index)"
        >
          <i class="iconfont icon-zanting1 icon"></i>
          <span class="song">{{ item.name }}</span>
          <div class="singer">
            <span
              class="singer"
              v-for="(artist, i) in item.ar"
              :key="artist.id"
            >
              {{ artist.name }}
              <em>{{ i === item.ar.length - 1 ? "" : "/" }}</em>
            </span>
          </div>
          <i
            class="iconfont icon-del shanchu"
            title="移除歌曲"
            @click.stop="removeSong(item.id)"
          ></i>
          <i class="iconfont icon-lianjie lianjie"></i>
          <span class="time">{{ (item.dt / 1000) | formatTimer }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <!-- 歌曲列表中没有歌曲时显示 -->
      <h2>暂无歌曲</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songlist",
  data() {
    return {
      song: null, //歌曲列表数据
      songDetail: null, // 当前正在播放的歌曲
    };
  },
  created() {
    this.getData();
    this.updateSongDetail();
  },
  mounted() {
    setTimeout(() => {}, 100);
  },
  methods: {
    // 更新播放列表
    getData() {
      let song = JSON.parse(localStorage.getItem("song"));
      if (song) {
        this.song = song;
      } else {
        this.song = null;
      }
    },
    // 更新具体演唱的歌曲
    updateSongDetail() {
      let index = JSON.parse(localStorage.getItem("index")),
        song = JSON.parse(localStorage.getItem("song"));
      if (song) {
        this.songDetail = song[index];
      } else {
        this.songDetail = null;
      }
    },
    // 播放歌曲
    playSong(index) {
      localStorage.setItem("index", JSON.stringify(index));
      this.$store.dispatch("SongUrl");
      setTimeout(() => {
        this.updateSongDetail();
      }, 100);
    },
    // 清空播放列表
    clearSongList() {
      this.$emit("clearSonglist");
    },
    removeSong(id) {
      let song = JSON.parse(localStorage.getItem("song"));
      let index = JSON.parse(localStorage.getItem("index"));
      let i = song.findIndex((item) => {
        return item.id === id;
      });
      // 删除播放列表歌曲
      song.splice(i, 1);
      // 更新播放列表
      this.song = song;
      // 更新本地的播放列表
      localStorage.setItem("song", JSON.stringify(song));
      // 如果正在播放的歌曲的索引，大于被删除的歌曲的索引则index--防止样式位移
      if (i < index) {
        index--;
        localStorage.setItem("index", JSON.stringify(index));
      } else if (i === index) {
        // 如果正在播放
        if (this.$parent.flag) {
          // 先减掉在下一首
          index--;
          localStorage.setItem("index", JSON.stringify(index));
          this.$parent.nextSong();
        } else {
          // 反之更新父组件正在播放的歌曲的状态
          this.$parent.updateSongDetail();
        }
      }
      // 最终都会更新播放列表正在和演唱的歌曲样式
      this.updateSongDetail();
    },
    // 将当前正在播放的歌曲显示在正中央(移动滚动条)
    activeSongScroll() {
      setTimeout(() => {
        let Ulist = document.querySelector("#ul-list");
        let Llist = document.querySelector("#ul-list>li.active");
        let uh = Ulist.offsetHeight;
        let lot = Llist.offsetTop;
        if (lot >= uh) {
          Ulist.scrollTop = lot;
        } else {
          Ulist.scrollTop = lot - uh / 2;
        }
      }, 200);
    },
    // 根据切换歌曲而移动滚动条
    setSongListSroll() {
      setTimeout(() => {
        let Ulist = document.querySelector("#ul-list");
        let Llist = document.querySelector("#ul-list>li.active");
        let uh = Ulist.offsetHeight;
        let us = Ulist.scrollTop;
        let lot = Llist.offsetTop;
        if (lot >= uh + us) {
          Ulist.scrollTop = lot - uh + Llist.offsetHeight;
        } else if (lot <= us - Llist.offsetHeight) {
          Ulist.scrollTop = lot;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#songlist {
  position: absolute;
  top: -525px;
  width: 500px;
  height: 500px;
  background: #25b3c9;
  overflow: hidden;
  z-index: 2;
  border: 1px solid #25b3c9;
  h2 {
    font-size: 24px;
    font-weight: 900;
    padding: 20px 20px 0 20px;
  }
  .tt {
    display: flex;
    margin-top: 20px;
    padding: 0 20px 15px 20px;

    p {
      flex: 1;
      font-size: 12px;
      &.num {
        position: relative;
        color: #517daf;
        top: 4px;
      }
      &.shoucang {
        cursor: pointer;
        margin-left: 200px;
        i {
          vertical-align: -1px;
          margin-right: 2px;
        }
      }
      &.clear {
        cursor: pointer;
        i {
          vertical-align: -1px;
        }
      }
    }
  }
  .list {
    width: 100%;
    height: 400px;
    font-size: 12px;
    overflow: auto;
    position: relative;
    li {
      position: relative;
      display: flex;
      align-items: center;
      background: #55bed3;
      height: 40px;
      padding: 0 10px;
      cursor: pointer;
      border-top: 1px solid #356f86;
      color: #1a638d;
      &.active {
        background: #4498b9;
        color: #2665da;
        .icon {
          visibility: visible;
        }
      }
      &:hover {
        background: #4498b9;
        .shanchu {
          visibility: visible;
        }
      }
      .icon {
        visibility: hidden;
      }
      .song {
        flex: 1;
        margin-right: 10px;
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .singer {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .shanchu {
        flex: 0.2;
        padding-left: 10px;
        cursor: pointer;
        visibility: hidden;
      }
      .lianjie {
        flex: 0.2;
      }
      .time {
        flex: 0.4;
      }
    }
  }
}
</style>