<template>
  <div>
    <SearchList v-for="(item, index) in userList" :key="item.userId + index">
      <ListPhoto :imgSrc="item.avatarUrl" radius />
      <div class="user-name">
        <span>{{ item.nickname }}</span>
        <em v-if="item.gender > 0" :class="item.gender === 1 ? 'nan' : 'nv'">
          <i
            :class="
              item.gender === 1 ? 'iconfont icon-nan' : 'iconfont icon-nv'
            "
          ></i>
        </em>
      </div>
    </SearchList>
  </div>
</template>

<script>
import SearchList from "../SearchList.vue";
import ListPhoto from "../ListPhoto.vue";
export default {
  name: "SearchUser",
  components: { SearchList, ListPhoto },
  props: {
    userList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.user-name {
  display: flex;
  align-items: center;
  em {
    position: relative;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-left: 10px;
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &.nan {
      background: #bceffb;
      i {
        color: #70c0e2;
      }
    }
    &.nv {
      background: #f4c3df;
      i {
        color: #e64887;
      }
    }
  }
}
</style>