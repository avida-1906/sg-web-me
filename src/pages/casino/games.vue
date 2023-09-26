<script setup lang='ts'>
const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env
const { query } = useRoute()
const gameData = computed(() => query || {})
const { isMobile } = storeToRefs(useWindowStore())
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const { data: recGameList, runAsync: runGetRecGameList } = usePage((page, page_size) => () => ApiMemberGameRecList({
  page: page.value,
  page_size: page_size.value,
}), { page_size: VITE_CASINO_HOME_PAGE_SIZE })

await application.allSettled([runGetRecGameList()])
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre && !isMobile }">
    <AppIframe :data="gameData" :is-theatre="isTheatre" @change-theatre="setBool" />
  </div>
  <section class="page-content">
    <AppDesc />
    <div class="home-container margin-auto">
      <div class="content-wrapper">
        <AppSlider
          icon="chess-original-game" :title="$t('casino_games_recommend')" :data="recGameList"
          game-type="rec"
        />
        <AppProviderSlider />
      </div>
      <div class="layout-spacing">
        <AppBetData mode="casino" />
      </div>
    </div>
  </section>
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
