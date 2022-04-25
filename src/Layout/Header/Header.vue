<template>
  <div id="header">
    <div class="wrap">
      <XLocation />
      <Search />
      <Login />
    </div>
  </div>
</template>

<script>
import XLocation from "@/components/content/Location";
import Login from "@/components/content/Login";
import Search from "@/components/content/Search";
export default {
  name: "Header",
  components: {
    Login,
    XLocation,
    Search,
  },
};
</script>

<style lang="less" scoped>
#header {
  position: relative;
  width: 100%;
  height: 80px;
  background: #ff7a9e;
  z-index: 101;
  .wrap {
    position: absolute;
    display: flex;
    width: 1240px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    .search {
      position: relative;
      width: 180px;
      height: 30px;
      margin-top: 25px;
      margin-left: 40px;

      .search-icon {
        width: 15px;
        height: 15px;
        position: absolute;
        left: 10px;
        top: 7px;
        color: #fabacb;
      }
      input {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        border: none;
        outline: none;
        padding-left: 30px;
        box-sizing: border-box;
        color: #fff9fb;
        background-color: #f47497;
        &::placeholder {
          color: #f3acbf;
        }
      }
    }
  }
}
</style>
