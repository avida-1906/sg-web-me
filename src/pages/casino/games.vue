<script setup lang='ts'>
const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env
const { query } = useRoute()
const pid = ref(query.pid?.toString() ?? '')
const gameId = ref(query.game_id?.toString() ?? '')
const { isMobile } = storeToRefs(useWindowStore())
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const { data: recGameList } = usePage((page, page_size) => () => ApiMemberGameRecList({
  page: page.value,
  page_size: page_size.value,
}), { page_size: VITE_CASINO_HOME_PAGE_SIZE, manual: false })

const appIframeRef = ref()
const route = useRoute()
const stop = watch(route, (a) => {
  pid.value = a.query.pid?.toString() ?? ''
  gameId.value = a.query.game_id?.toString() ?? ''
  nextTick(() => {
    appIframeRef.value.runDetail()
  })
})
onBeforeRouteLeave(() => {
  stop()
})
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre && !isMobile }">
    <AppIframe ref="appIframeRef" :pid="pid" :game-id="gameId" :is-theatre="isTheatre" @change-theatre="setBool" />
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
