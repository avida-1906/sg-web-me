<script setup lang='ts'>
const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env
const { query } = useRoute()
const id = ref(query.id?.toString() ?? '')
const { isMobile } = storeToRefs(useWindowStore())
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const { list: recGameList } = useList(() => ApiMemberGameRecList({ page: 1, page_size: VITE_CASINO_HOME_PAGE_SIZE }), { manual: false })

const appIframeRef = ref()
const route = useRoute()
const stop = watch(route, (a) => {
  id.value = a.query.id?.toString() ?? ''
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
    <AppIframe :id="id" ref="appIframeRef" :is-theatre="isTheatre" @change-theatre="setBool" />
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
.content-wrapper{
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
