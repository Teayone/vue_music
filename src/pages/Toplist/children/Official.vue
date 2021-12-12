<template>
  <div class="official">
    <div class="official-left">
      <img :src="imageSrc" alt="" />
      <span class="bofang-btn" @click="playlistPlay">
        <i class="iconfont icon-bofangqi-bofang"></i>
      </span>
      <span class="cover-info">{{ coverInfo | formatUpdateTime }}</span>
    </div>
    <div class="official-right">
      <ul class="rank-list">
        <li
          v-for="(item, index) in songList"
          :key="item.id"
          @dblclick="bofang(item.id)"
        >
          <div class="list-num" :class="{ active: index <= 2 }">
            {{ index + 1 }}
          </div>
          <!-- 歌名 -->
          <div class="list-song">{{ item.name }}</div>
          <!-- 歌手 -->
          <div class="list-artist">
            <span v-for="(artist, idx) in item.ar" :key="artist.id"
              >{{ artist.name }}
              <i>{{ idx === item.ar.length - 1 ? "" : "/" }}</i>
            </span>
          </div>
        </li>
      </ul>
      <!-- 查看全部 -->
      <p class="chakanquanbu" @click="AllClick">
        查看全部 <i class="iconfont icon-qianjin"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Official",
  props: {
    // 图片封面路径
    imageSrc: {
      type: String,
      default: "",
    },
    // 图片文字
    coverInfo: {
      type: Number,
      default: 0,
    },
    // 歌曲数组
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    formatUpdateTime(value) {
      let date = new Date(value);

      let m = date.getMonth() + 1;
      let d = date.getDate();
      return m + "月" + d + "日" + "更新";
    },
  },
  methods: {
    playlistPlay() {
      this.$emit("listPlay");
    },
    AllClick() {
      this.$emit("allClick");
    },
    bofang(id) {
      this.$emit("songPlay", id);
    },
  },
};
</script>

<style lang="less" scoped>
.official {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
  margin-top: 20px;
  .official-left {
    position: relative;
    width: 300px;
    height: 300px;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: pointer;
    &:hover {
      .bofang-btn {
        opacity: 1;
      }
    }
    .bofang-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.4);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      text-align: center;
      line-height: 105px;
      transition: opacity 0.3s;
      opacity: 0;
      i {
        font-size: 70px;
        margin-left: 10px;
        color: #ea6e92;
      }
    }
    .cover-info {
      position: absolute;
      top: 68%;
      left: 50%;
      transform: translateX(-50%);
      color: #f3ffff;
      font-size: 14px;
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
  .official-right {
    flex: 1;
    margin-left: 20px;

    .rank-list {
      width: 100%;
      height: 100%;
      li {
        position: relative;
        display: flex;
        align-items: center;
        height: 20%;
        border-radius: 10px;
        cursor: default;
        &:nth-child(odd) {
          background: #f9f9f9;
        }
        &:hover {
          background: #f4f4f4;
        }
        .list-num {
          width: 40px;
          text-align: center;
          &.active {
            color: red;
          }
        }
        .list-song {
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list-artist {
          position: absolute;
          right: 20px;
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #9b9b9b;
        }
      }
    }
    .chakanquanbu {
      margin-top: 10px;
      margin-left: 20px;
      cursor: pointer;
      color: #676767;
      &:hover {
        color: #373737;
      }
      i {
        vertical-align: middle;
        font-size: 14px;
      }
    }
  }
}
</style>