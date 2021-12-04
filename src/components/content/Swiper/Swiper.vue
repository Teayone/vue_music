<template>
  <div id="swiper">
    <el-carousel :interval="4000" type="card" height="300px" trigger="click">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img
          style="width: 100%; border-radius: 10px"
          :src="item.imageUrl"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanner } from "@/network/api";
export default {
  name: "Swiper",
  data() {
    return {
      banners: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getBanner();
      this.banners = res.banners;
    },
  },
};
</script>

<style lang="less" scoped>
#swiper {
  width: 100%;
  height: 300px;
}
</style>