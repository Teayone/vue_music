<template>
  <div id="c-mv">
    <!-- 最新MV -->
    <div class="lay-mt">
      <Tags @areaClick="areaClick" :showTags="true" TagsTitle="最新MV" />
      <List>
        <PersonalizedMv
          v-for="item in newMV"
          :key="item.id"
          :imageSrc="item.cover"
          :playCount="item.playCount"
          :MvName="item.name"
          :artists="item.artists"
          @mvClick="mvClick(item.id)"
        />
      </List>
    </div>
    <!-- 热播MV -->
    <div class="lay-mt">
      <Tags TagsTitle="热播MV" />
      <List>
        <PersonalizedMv
          v-for="item in hotMV"
          :key="item.id"
          :imageSrc="item.cover"
          :playCount="item.playCount"
          :MvName="item.name"
          :artists="item.artists"
          @mvClick="mvClick(item.id)"
        />
      </List>
    </div>
    <!-- 网易出品 -->
    <div class="lay-mt">
      <Tags TagsTitle="网易出品" />
      <List>
        <PersonalizedMv
          v-for="item in wyMV"
          :key="item.id"
          :imageSrc="item.cover"
          :playCount="item.playCount"
          :MvName="item.name"
          :artists="item.artists"
          @mvClick="mvClick(item.id)"
        />
      </List>
    </div>

    <!-- MV排行榜 -->
    <div class="lay-mt">
      <Tags TagsTitle="MV排行榜" @areaClick="mvTopClick" :showTags="true" />
      <List>
        <TopMv
          v-for="(item, index) in topMV"
          :key="item.id"
          :playCount="item.playCount"
          :mvName="item.name"
          :imageSrc="item.cover"
          :artists="item.artists"
          :rankNum="index + 1"
          @mvClick="mvClick(item.id)"
        />
      </List>
    </div>
  </div>
</template>

<script>
import {
  getMvFirst,
  getMvAll,
  getMvExclusiveRcmd,
  getTopMv,
} from "@/network/api";
import List from "@/components/common/List/List.vue";
import PersonalizedMv from "@/components/content/PersonalizedMv/PersonalizedMv.vue";
import Tags from "../com/Tags.vue";
import TopMv from "@/components/content/TopMv/TopMv.vue";
export default {
  name: "Cmv",
  components: { List, PersonalizedMv, Tags, TopMv },
  data() {
    return {
      newMV: [], // 最新
      hotMV: [], // 热播
      wyMV: [], // 网易出品
      topMV: [], // MV排行
    };
  },
  created() {
    this.getMvData();
  },
  methods: {
    async getMvData() {
      // 最新MV
      let { data: res } = await getMvFirst("内地");
      this.newMV = res.data.slice(0, 8);
      // 热播MV
      let { data: mvAll } = await getMvAll("全部", "上升最快");
      this.hotMV = mvAll.data.slice(0, 8);
      // 网易出品MV
      let { data: WyMv } = await getMvExclusiveRcmd();
      this.wyMV = WyMv.data.slice(0, 8);
      // MV排行榜
      let { data: topMv } = await getTopMv("内地", 10);
      this.topMV = topMv.data;
    },
    // 最新MV切换地区
    async areaClick(item) {
      let { data: res } = await getMvFirst(item);
      this.newMV = res.data.slice(0, 8);
    },
    // MV排行榜切换地区
    async mvTopClick(item) {
      let { data: topMv } = await getTopMv(item, 10);
      this.topMV = topMv.data;
    },
    mvClick(id) {
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
.lay-mt {
  margin-bottom: 40px;
}
</style>