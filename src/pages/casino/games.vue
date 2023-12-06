<script setup lang='ts'>
const { isMobile } = storeToRefs(useWindowStore())
const route = useRoute()
const { query } = useRoute()
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const id = ref(query.id?.toString() ?? '')
const name = ref(query.name?.toString() ?? '')
const pn = ref(query.pn?.toString() ?? '')
const appIframeRef = ref()

const { list: recGameList } = useList(ApiMemberGameRecList, { manual: false })

const stop = watch(route, (a) => {
  id.value = a.query.id?.toString() ?? ''
  nextTick(() => {
    appIframeRef.value.refreshDetail()
  })
})

onBeforeRouteLeave(() => {
  stop()
})
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre && !isMobile }">
    <AppCasinoIframe
      :id="id"
      ref="appIframeRef"
      :is-theatre="isTheatre"
      @change-theatre="setBool"
    />
  </div>
  <section class="page-content">
    <AppDesc :name="name" :plat-name="pn" />
    <div class="home-container margin-auto">
      <div class="content-wrapper">
        <AppSlider
          icon="chess-original-game"
          :title="$t('casino_games_recommend')"
          :data="recGameList"
          game-type="rec"
        />
        <AppProviderSlider />
      </div>
      <div v-if="!isMobile" class="layout-spacing">
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
