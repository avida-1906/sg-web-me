<script setup lang="ts">
const props = defineProps<{ gameType: string }>()
const { VITE_CASINO_GAME_PAGE_SIZE } = import.meta.env
const { t } = useI18n()
const route = useRoute()

const currentType = ref(props.gameType)
const isLive = computed(() => currentType.value === EnumCasinoGameType.LIVE) // 真人
const isSlot = computed(() => currentType.value === EnumCasinoGameType.SLOT) // 老虎机
const isRec = computed(() => currentType.value === 'rec') // 推荐游戏
const iszProvider = computed(() => currentType.value === 'provider') // 供应商

const title = computed(() => {
  if (isLive.value)
    return t('game_type_live')
  else if (isSlot.value)
    return t('game_type_slot')
  else if (isRec.value)
    return t('game_type_rec')
  else if (iszProvider.value)
    return route.query.name
  return '-'
})
const bannerImg = computed(() => {
  if (isLive.value)
    return 'live'
  else if (isSlot.value)
    return 'slot'
  return 'default'
})

// 真人、老虎机
const gameTypeParams = computed(() => isLive.value ? 1 : isSlot.value ? 3 : undefined)
const pid = computed(() => iszProvider.value ? route.query.pid?.toString() : undefined)
const { list: gameList, total: gameTotal, runAsync: runGameList, loading: loadingGame, loadMore: loadMoreGame } = useList(ApiMemberGameList, {}, { page_size: VITE_CASINO_GAME_PAGE_SIZE })

// 推荐游戏
const { list: recList, total: recTotal, runAsync: runRecList, loading: loadingRec, loadMore: loadMoreRec } = useList(ApiMemberGameRecList, {}, { page_size: VITE_CASINO_GAME_PAGE_SIZE })

const list = computed(() => {
  if (isLive.value || isSlot.value || iszProvider.value)
    return gameList.value
  else if (isRec.value)
    return recList.value
  return []
})
const total = computed(() => {
  if (isLive.value || isSlot.value || iszProvider.value)
    return gameTotal.value
  else if (isRec.value)
    return recTotal.value
  return 0
})
const loading = computed(() => {
  if (isLive.value || isSlot.value || iszProvider.value)
    return loadingGame.value
  else if (isRec.value)
    return loadingRec.value
  return false
})
const push = computed(() => {
  if (isLive.value || isSlot.value || iszProvider.value)
    return loadMoreGame
  else if (isRec.value)
    return loadMoreRec
  return () => { }
})

const stop = watch(route, (a) => {
  currentType.value = a.params.gameType.toString()
  if (isLive.value || isSlot.value || iszProvider.value)
    application.allSettled([runGameList({ game_type: gameTypeParams.value, platform_id: pid.value })])
  else if (isRec.value)
    application.allSettled([runRecList()])
})
onBeforeRouteLeave(() => {
  stop()
})

if (isLive.value || isSlot.value || iszProvider.value)
  await application.allSettled([runGameList({ game_type: gameTypeParams.value, platform_id: pid.value })])

else if (isRec.value)
  await application.allSettled([runRecList()])
</script>

<template>
  <div>
    <section class="layout-spacing tg-game-type-page">
      <div class="group-banner-wrap">
        <div class="group-banner-bg" />
        <div class="banner-wrap">
          <div class="banner">
            <div class="left">
              <h1>
                <span>{{ title }}</span>
              </h1>
            </div>
            <div class="right">
              <BaseImage :url="`/img/casino/group-banner-${bannerImg}.png`" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <AppGameSearch game-type="1" />
      </div>
      <div class="mt-24">
        <AppGroupFilter :game-type="currentType" />
      </div>
      <div class="mt-24">
        <AppCardList :list="list" />
      </div>
      <div class="load-more mt-24">
        <AppPercentage :total="total" :percentage="list?.length" />
        <BaseButton v-show="list?.length < total" size="md" :loading="loading" @click="push">
          <div>
            {{ $t('load_more') }}
          </div>
        </BaseButton>
      </div>
      <AppProviderSlider />
    </section>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.load-more {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-16);

  button {
    width: 184px;
    height: 44px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
