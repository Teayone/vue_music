<template>
  <div id="list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "List",
};
</script>

<style scoped>
#list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
