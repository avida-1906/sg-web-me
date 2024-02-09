<script setup lang='ts'>
defineProps<{ marketType: string }>()
</script>

<template>
  <!-- 大厅 -->
  <AppSportsPageLobby v-if="marketType === 'all'" />
  <!-- 虚拟体育 -->
  <AppSportsPageVirtualSports v-else-if="marketType === 'v-sports'" />
  <!-- 我的投注 -->
  <AppSportsPageMyBet v-else-if="marketType === 'my-bet'" on-page />
  <!-- 收藏夹 -->
  <AppSportsPageFavourites v-else-if="marketType === 'fav'" on-page />
  <!-- 滚球 -->
  <!-- <AppSportsPageLive v-else-if="marketType === 'live'" on-page /> -->
  <!-- 即将开赛 -->
  <!-- <AppSportsPageUpcoming v-else-if="marketType === 'soon'" on-page /> -->
</template>

<style lang='scss' scoped>

</style>
