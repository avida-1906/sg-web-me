<script setup lang='ts'>
// 123
</script>

<template>
  <div class="sports">
    sports
    <AppGameSearch game-type="2" />
    <div class="box" />
  </div>
</template>

<style lang='scss' scoped>
.sports{
  padding: var(--tg-spacing-16);
  min-height: 700px;
}
.box{
  width: 200px;
  height: 100px;
  background-color: #fff;
}
</style>

<route lang="yaml">
meta:
  layout: home
  </route>
