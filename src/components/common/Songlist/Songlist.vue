<template>
  <div class="song-list-table">
    <LoadingMove title="载入中" v-if="songs === null" />
    <div v-else>
      <div class="listsong no-1">
        <p class="caozuo">操作</p>
        <p class="title">标题</p>
        <p class="artist">歌手</p>
        <p class="album">专辑</p>
        <p class="songtime">时间</p>
      </div>
      <div
        class="listsong no-list"
        v-for="(item, index) in songs"
        :key="item.id"
        @dblclick="toPlay(item)"
      >
        <div class="num">
          <i
            class="iconfont icon-24gf-volumeZero"
            v-if="item.id === songDetail.id"
          ></i>
          <p v-else>{{ index + 1 }}</p>
        </div>
        <p class="caozuo">
          <i class="iconfont icon-aixin"></i>
        </p>
        <p class="title" :class="{ activeSong: item.id === songDetail.id }">
          {{ item.name }}
        </p>
        <div class="artist">
          <span v-for="(singer, i) in item.ar" :key="i">
            {{ singer.name }}
            <span>{{ i === item.ar.length - 1 ? "" : "/" }}</span>
          </span>
        </div>
        <p class="album">{{ item.al.name }}</p>
        <p class="songtime">{{ (item.dt / 1000) | formatTimer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { updateSongDetail } from "../../../mixin/mixin";
import LoadingMove from "../LoadingMove/LoadingMove.vue";
export default {
  name: "Songlist",
  components: { LoadingMove },
  props: {
    songs: {
      type: Array,
      default: null,
    },
  },
  mixins: [updateSongDetail],

  methods: {
    // 歌曲列表请求
    toPlay(s) {
      console.log(this.songs);
      // 播放列表中的歌曲。
      // 如果本地的播放列表中以有播放列表则找到对应的歌曲播放，反之追加到本地的播放列表中
      let song = JSON.parse(localStorage.getItem("song"));
      song = song || [];
      // 如果 本地有歌曲列表
      if (song.length !== 0) {
        // 找到歌曲的位置
        let i = song.findIndex((item) => {
          return item.id === s.id;
        });
        // 如果找到了
        if (i !== -1) {
          localStorage.setItem("index", JSON.stringify(i));
          this.$store.dispatch("SongUrl");
        } else {
          // 没找到就将歌曲数据追加
          song.push(s);
          localStorage.setItem("song", JSON.stringify(song));
          localStorage.setItem("index", JSON.stringify(song.length - 1));
          this.$store.dispatch("SongUrl");
        }
      } else {
        // 如果本地没有播放列表则直接追加
        song.push(s);
        localStorage.setItem("song", JSON.stringify(song));
        localStorage.setItem("index", JSON.stringify(song.length - 1));
        this.$store.dispatch("SongUrl");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.song-list-table {
  margin-top: 20px;
  width: 100%;
  .listsong {
    position: relative;
    display: flex;
    padding: 15px 0;
    align-items: center;
    font-size: 14px;
    &.no-1 {
      color: #888888;
    }

    &.no-list:nth-child(even) {
      background: #f9f9f9;
    }
    &.no-list:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
    .num {
      position: absolute;
      left: 40px;
      color: #999;
      i {
        color: #ff7a9e;
      }
    }
    .caozuo {
      flex: 0.1;
      margin-left: 70px;
      i {
        position: relative;
        font-size: 20px;
        top: 1px;
        left: 4.5px;
      }
    }
    .title {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 10px;
      &.activeSong {
        color: #ff7a9e;
      }
    }
    .artist {
      flex: 0.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 30px;
    }
    .album {
      flex: 0.9;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 30px;
    }
    .songtime {
      margin-left: 30px;
      flex: 0.3;
    }
  }
}
</style>