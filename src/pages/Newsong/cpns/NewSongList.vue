<template>
  <div class="new-song-list-box">
    <LoadingMove v-if="showLoading" />
    <ul class="new-song-list" v-else>
      <li v-for="(item, index) in songList" :key="item.id">
        <span class="song-index">{{
          index + 1 >= 10 ? index + 1 : "0" + (index + 1)
        }}</span>
        <div class="cover">
          <Cover :item="item" @coverClick="bofang" />
        </div>
        <div class="song-name overflow-hiding">
          <span class="name" overflow-hiding>{{ item.name }}</span>
          <div class="mv-icon" v-if="item.mvid !== 0">
            <MvIcon @toPlayMv="toPlayMv(item.mvid)" />
          </div>
        </div>
        <div class="artist-name overflow-hiding">
          <template v-for="artist in item.artists">
            <span class="artist-name-n overflow-hiding" :key="artist.id">
              {{ artist.name }}
            </span>
          </template>
        </div>
        <span class="album overflow-hiding">{{ item.album.name }}</span>
        <span class="song-dt">{{ (item.duration / 1000) | formatTimer }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Cover from "@/components/common/Cover";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
import MvIcon from "@/components/common/Songlist/children/MvIcon.vue";
import { songPlay } from "@/mixin/mixin";
export default {
  name: "NewSongList",
  components: { Cover, LoadingMove, MvIcon },
  mixins: [songPlay],
  props: {
    songList: {
      type: Array,
      default: () => [],
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
  },
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

<style lang="less">
.new-song-list-box {
  margin-top: 10px;
  width: 100%;
  .new-song-list {
    width: 100%;
    li {
      padding: 10px;
      background: #f9f9f9;
      width: 100%;
      display: flex;
      align-items: center;
      cursor: default;
      &:nth-child(even) {
        background: #fff;
      }
      .overflow-hiding {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .song-index {
        width: 100px;
        display: flex;
        justify-content: center;
        color: #d9cae1;
      }
      .cover {
        display: flex;
        justify-content: flex-end;
        width: 200px;
        padding-right: 10px;
      }
      .song-name {
        padding-left: 10px;
        width: 400px;
        color: #343434;
        display: flex;
        align-items: center;
        padding: 0 10px;
        .name {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 370px;
        }
        .mv-icon:hover {
          cursor: pointer;
        }
      }

      .artist-name {
        width: 350px;
        white-space: nowrap;
        color: #656565;
        .artist-name-n:not(:last-child)::after {
          content: "/";
        }
        .artist-name-n:hover {
          color: #343434;
          cursor: pointer;
        }
      }
      .album {
        width: 300px;
        color: #656565;
        cursor: pointer;
        &:hover {
          color: #343434;
        }
      }
      .song-dt {
        flex: 1;
        display: flex;
        justify-content: center;
        color: #9f9f9f;
      }
    }
    li:hover {
      background: #f0f1f2;
    }
  }
}
</style>
