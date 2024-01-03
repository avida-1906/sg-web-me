<script setup lang='ts'>
const { isMobile } = storeToRefs(useWindowStore())
const { cateProviderData } = storeToRefs(useCasinoStore())
const route = useRoute()
const { query } = useRoute()
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const id = ref(query.id?.toString() ?? '')
const name = ref(query.name?.toString() ?? '')
const pn = ref(query.pn?.toString() ?? '')
const pid = ref(query.pid?.toString() ?? '')
const game_id = ref(query.game_id?.toString() ?? '')
const appIframeRef = ref()

const { list: recGameList } = useList(ApiMemberGameRecList, { manual: false })

const stop = watch(route, (a) => {
  id.value = a.query.id?.toString() ?? ''
  name.value = a.query.name?.toString() ?? ''
  pn.value = a.query.pn?.toString() ?? ''
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
      :id="id" ref="appIframeRef" :pid="pid"
      :game-id="game_id"
      :is-theatre="isTheatre"
      @change-theatre="setBool"
    />
  </div>
  <section class="page-content">
    <AppDesc :name="name" :plat-name="pn" :pid="pid" />
    <div class="margin-auto home-container">
      <div class="content-wrapper">
        <AppSlider
          icon="uni-rec-games"
          :title="$t('casino_games_recommend')"
          :data="recGameList"
          game-type="rec"
          :path="`/casino/group/rec?name=${$t('game_type_rec')}`"
        />
        <AppProviderSlider
          :icon="cateProviderData?.icon ?? ''"
          :list="cateProviderData?.games ?? []"
          :title="cateProviderData?.name ?? ''"
        />
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
