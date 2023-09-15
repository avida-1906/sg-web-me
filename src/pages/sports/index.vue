<script setup lang='ts'>
// 123
</script>

<template>
  <div class="sports">
    sports
    <AppGameSearch game-type="2" />
    <div class="box" />
    <AppAmount amount="0.00001234" :currency-type="19" />
    <AppAmount amount="0.00001234" :currency-type="20" />
    <AppAmount amount="0.00001234" :currency-type="21" />
    <AppAmount amount="0.00001234" :currency-type="22" />
    <AppAmount amount="0.00001234" :currency-type="23" />
    <AppAmount amount="0.00001234" :currency-type="24" />
  </div>
</template>

<style lang='scss' scoped>
.sports{
  padding: var(--tg-spacing-16);
  min-height: 700px;
  color: #fff;
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
