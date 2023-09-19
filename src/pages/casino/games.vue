<script setup lang='ts'>
const { isFullScreen } = storeToRefs(useWindowStore())
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre && !isFullScreen }">
    <AppIframe :is-theatre="isTheatre" @change-theatre="setBool" />
    <AppDesc />
    <!-- <AppStatisticsDialog /> -->
    <AppVipDialog />
  </div>
</template>

<style lang='scss' scoped>
.casino-games {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3vw;
}

.theatre {
  padding: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
