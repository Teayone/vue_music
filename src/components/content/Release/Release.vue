<template>
  <ul id="release" v-if="result">
    <li v-for="item in result" :key="item.id" @click="toPlayMv(item.id)">
      <div class="img-box">
        <span class="img-bg"><i class="iconfont icon-bofang1"></i></span>
        <img v-lazy="item.picUrl" :key="item.picUrl" alt="" />
      </div>
      <p>{{ item.name }}</p>
    </li>
  </ul>
</template>

<script>
import { getPersonalizedPrivatecontent } from "../../../network/api";
export default {
  name: "Release",
  data() {
    return {
      result: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getPersonalizedPrivatecontent();
      this.result = res.result;
    },
    toPlayMv(id) {
      this.$router.push({
        path: "/play-mv",
        query: {
          mvid: id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#release {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  li {
    width: 32%;
    .img-box {
      position: relative;
      width: 100%;
      height: 200px;
      cursor: pointer;
      .img-bg {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        left: 10px;
        top: 10px;
        z-index: 2;

        i {
          font-size: 30px;
          color: #f2f2f2;
        }
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    p {
      margin-top: 10px;
      cursor: pointer;
    }
  }
}
</style>