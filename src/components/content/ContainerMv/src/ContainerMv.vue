<template>
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
</template>

<script>
import List from "@/components/common/List/List.vue";
import PersonalizedMv from "@/components/content/PersonalizedMv/PersonalizedMv";
import { getPersonalizedMv } from "@/network/api";
export default {
  name: "ContainerMv",
  components: { List, PersonalizedMv },
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

<style></style>
