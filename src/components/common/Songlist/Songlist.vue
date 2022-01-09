<template>
  <div class="song-list-table">
    <LoadingMove title="载入中" v-if="songs === null" />
    <div v-if="songs">
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
        @dblclick="bofang(item.id)"
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
          <span class="song-title-name">{{ item.name }}</span>
          <MvIcon
            v-if="(item.mv && item.mv !== 0) || (item.mvid && item.mvid !== 0)"
            @toPlayMv="toPlayMv(item.mv || item.mvid)"
          />
        </p>
        <div class="artist">
          <span v-for="(singer, i) in item.ar || item.artists" :key="i">
            {{ singer.name }}
            <span v-if="item.ar">{{
              i === item.ar.length - 1 ? "" : "/"
            }}</span>
            <span v-if="item.artists">{{
              i === item.artists.length - 1 ? "" : "/"
            }}</span>
          </span>
        </div>
        <p class="album">
          {{ (item.al && item.al.name) || (item.album && item.album.name) }}
        </p>
        <p class="songtime">
          {{
            (item.dt && item.dt / 1000) ||
            (item.duration && item.duration / 1000) | formatTimer
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { updateSongDetail, songPlay } from "@/mixin/mixin";
import LoadingMove from "../LoadingMove/LoadingMove.vue";
import MvIcon from "./children/MvIcon.vue";
export default {
  name: "Songlist",
  components: { LoadingMove, MvIcon },
  props: {
    songs: {
      type: Array,
      default: [],
    },
  },
  mixins: [updateSongDetail, songPlay],
  methods: {
    toPlayMv(mvid) {
      this.$router.push({
        path: "/play-mv",
        query: {
          mvid,
        },
      });
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
      width: 0;
      margin-left: 10px;
      display: flex;
      align-items: center;
      .song-title-name {
        display: block;
        max-width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
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