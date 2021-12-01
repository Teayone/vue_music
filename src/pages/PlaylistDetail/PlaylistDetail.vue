<template>
  <div id="playlist-detail">
    <!-- top -->
    <div class="top">
      <div class="cover-box">
        <img
          src="https://p4.music.126.net/NViyDtuhErzoaNzHChk0Eg==/109951165500314285.jpg?param=200y200"
          alt=""
        />
      </div>
      <div class="song-info">
        <h2>今天从《What I Know》听起|私人雷达</h2>
        <p class="author">
          <img
            src="https://p1.music.126.net/4ZjO1oj0WTeN5U19FpnQFw==/109951165005238078.jpg?param=40y40"
            alt=""
          />
          <span class="author-name">云音乐官方</span>
          <span class="create-time">2021-10-12创建</span>
        </p>
        <div class="song-btn">
          <button class="play-btn">播放全部</button>
          <button class="shoucang-btn">收藏</button>
          <button class="fenxiang-btn">分享</button>
        </div>
        <ul class="info-list">
          <li class="biaoqian">标签：<span>流行</span></li>
          <li class="gequ">
            歌曲：<span>20</span><em>播放：<span>945640万</span></em>
          </li>
          <li class="jianjie">简介：<span>你爱的歌，值得反复聆听</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistDetail",
};
</script>

<style lang="less" scoped>
#playlist-detail {
  padding: 40px;
  .top {
    display: flex;
    .cover-box {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .song-info {
      flex: 1;
      margin-left: 25px;
      margin-top: 5px;
      font-size: 14px;
      h2 {
        font-size: 24px;
        font-weight: 900;
      }
      .author {
        margin-top: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
          cursor: pointer;
        }
        .author-name {
          margin-left: 10px;
          color: #507daf;
          cursor: pointer;
        }
        .create-time {
          margin-left: 10px;
          color: #676767;
        }
      }
      .song-btn {
        margin-top: 10px;
        button {
          width: 100px;
          height: 35px;
          border-radius: 40px;
          border: none;
          margin: 0 10px;
          cursor: pointer;
          border: 1px solid #ccc;
          transition: all 0.3s;
          background: #fff;
          &:hover {
            background: #f2f2f2;
          }
          &:first-child {
            margin-left: 0;
          }
        }
        .play-btn {
          background: #ff7a9e;
          color: #fff;
          border: 1px solid #ff7a9e;
          &:hover {
            background: #de688a;
          }
        }
      }
      .info-list {
        margin-top: 10px;
        li {
          line-height: 22px;
          &.biaoqian {
            span {
              color: #507daf;
            }
          }
          &.gequ {
            span {
              color: #676767;
            }
            em {
              margin-left: 10px;
            }
          }
          &.jianjie {
            span {
              color: #676767;
            }
          }
        }
      }
    }
  }
}
</style>