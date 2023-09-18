<script setup lang='ts'>
const { bool: isTheatre } = useBoolean(false) // 影院模式
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre }">
    <AppIframe />
  </div>
</template>

<style lang='scss' scoped>
.casino-games {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3vw;
  margin: 0 auto;
}
.theatre{
  padding: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
