<template>
  <div class="new-album-list">
    <ul class="new-album-list-u">
      <li v-for="item in list" :key="item.id">
        <div class="new-album-cover">
          <div class="new-album-cover-msk"></div>
          <img v-lazy="item.blurPicUrl" :key="item.blurPicUrl" alt="" />
        </div>
        <div class="new-album-info">
          <p class="album-name">
            <a href="javascript:;">{{ item.name }}</a>
          </p>
          <p class="album-author">
            <a href="javascript:;">{{ item.artist.name }}</a>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewAlbumList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less">
.new-album-list {
  margin-top: 20px;
  .new-album-list-u {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 150px;
      position: relative;
      margin: 15px 50px;
    }
    .new-album-cover {
      width: 150px;
      height: 140px;
      position: relative;
      .new-album-cover-msk {
        position: absolute;
        width: 180px;
        height: 100%;
        background: url("../../../assets/img/disc.png") no-repeat;
        background-size: 100%;
        background-position: 0 -17px;
      }
      img {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .new-album-info {
      width: 100%;
      margin-top: 10px;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .album-name {
        a {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #373737;
        }
      }
      .album-author {
        a {
          font-size: 14px;
          color: #9f9f9f;
        }
      }
    }
  }
}
</style>
