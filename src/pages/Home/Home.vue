<template>
  <div id="home">
    <Swiper />
    <Title describe="推荐歌单" link="/playlist" />
    <Songsheet />
    <Title describe="独家放送" link="/sole" />
    <Release />
    <Title describe="最新音乐" link="/new-song" />
    <NewSong />
    <Title describe="推荐MV" link="/mv" />
    <List v-if="mvData">
      <PersonalizedMv
        v-for="item in mvData"
        :key="item.id"
        :imageSrc="item.picUrl"
        :copywriter="item.copywriter"
        :playCount="item.playCount"
        :show="true"
        :MvName="item.name"
        :artists="item.artists"
        @mvClick="mvClick(item.id)"
      />
    </List>
  </div>
</template>

<script>
import Swiper from "@/components/content/Swiper/Swiper";
import Title from "@/components/common/Title/Title";
import Songsheet from "@/components/common/Songsheet/Songsheet";
import Release from "@/components/content/Release/Release";
import NewSong from "@/components/content/NewSong/NewSong";
import PersonalizedMv from "@/components/content/PersonalizedMv/PersonalizedMv";
import List from "../../components/common/List/List.vue";
import { getPersonalizedMv } from "@/network/api";
export default {
  name: "Home",
  components: {
    Swiper,
    Title,
    Songsheet,
    Release,
    NewSong,
    PersonalizedMv,
    List,
  },
  data() {
    return {
      mvData: null,
    };
  },
  created() {
    this.getMvData();
  },
  methods: {
    async getMvData() {
      let { data: res } = await getPersonalizedMv();
      this.mvData = res.result;
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
#home {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 20px 40px;
}
</style>