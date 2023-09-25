<script setup lang='ts'>
const props = defineProps<{ pid: string }>()
const { query } = useRoute()
const gameId = computed(() => query.code?.toString() ?? '')
const { isMobile } = storeToRefs(useWindowStore())
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const { gameList } = useGameList()
const { data } = useRequest(() => ApiGameLunch(props.pid, gameId.value))
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre && !isMobile }">
    <AppIframe :data="data" :is-theatre="isTheatre" @change-theatre="setBool" />
    <AppDesc />
    <AppContent>
      <div class="content-wrapper">
        <AppSlider api="" icon="chess-original-game" :title="$t('casino_games_recommend')" :data="gameList" game-type="hot" />
        <AppProviderSlider />
      </div>
      <div class="layout-spacing">
        <AppBetData mode="casino" />
      </div>
    </AppContent>
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
