<template>
  <ul id="new-song">
    <li
      v-for="item in newSongs"
      :key="item.id"
      :class="{ active: item.id === songDetail.id }"
    >
      <Cover :item="item" @coverClick="bofang" />
      <div class="song-info">
        <h5>
          {{ item.name }}
          <em v-if="item.alias && item.alias.length !== 0"
            >({{ item.alias[0] }})</em
          >
        </h5>
        <p>
          <span v-for="(singers, index) in item.artists" :key="index">
            {{ singers.name }}
            <i>{{ index === item.artists.length - 1 ? "" : "/" }}</i>
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { getNewSong } from "@/network/api";
import { songPlay, updateSongDetail } from "@/mixin/mixin";
import Cover from "@/components/common/Cover";
export default {
  name: "NewSong",
  components: { Cover },
  data() {
    return {
      newSongs: [],
    };
  },
  mixins: [songPlay, updateSongDetail],
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getNewSong();
      this.newSongs = res.data.slice(0, 12);
    },
  },
};
</script>

<style lang="less" scoped>
#new-song {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    display: flex;
    width: 400px;
    margin: 15px 0;
    &.active {
      background: #eaeaea;
    }
    &:hover {
      background: #eaeaea;
    }
    .song-info {
      position: relative;
      padding-left: 10px;
      flex: 1;
      h5 {
        cursor: default;
        margin-top: 6px;
        line-height: 18px;
        em {
          font-size: 14px;
          color: #9f9f9f;
          margin-left: 10px;
        }
      }
      p {
        position: absolute;
        bottom: 6px;
        font-size: 14px;
        color: #9f9f9f;
        cursor: pointer;
        span:hover {
          color: #5f5f5f;
        }
      }
    }
  }
}
</style>
