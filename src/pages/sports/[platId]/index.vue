<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveSports',
})
const props = defineProps<{ platId: string }>()
const { t } = useI18n()
usePageTitle({ prefix: t('btc_sport_title'), suffix: t('sports_label') })
const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const sportsStore = useSportsStore()
const { currentProvider, providerList } = storeToRefs(sportsStore)
sportsStore.changeProvider(props.platId)

const marketType = ref('all')
const tabList = computed(() => [
  { label: t('sports_tab_lobby'), value: 'all', icon: 'spt-basketball' },
  {
    label: t('my_bets'),
    value: 'my-bet',
    icon: 'spt-user-bet',
    disabled: !isLogin.value,
  },
  {
    label: t('sports_tab_favourites'),
    value: 'fav',
    icon: 'uni-favorites',
    disabled: !isLogin.value,
  },
  { label: t('sports_tab_live_events'), value: 'live', icon: 'spt-ball-plate' },
  { label: t('sports_tab_starting_soon'), value: 'soon', icon: 'spt-timing' },
])

function setLobby() {
  marketType.value = 'all'
}

sportsLobbyBus.on(setLobby)

onBeforeUnmount(() => {
  sportsLobbyBus.off(setLobby)
})
</script>

<template>
  <div class="sports sports-layout-home">
    <div class="layout-spacing">
      <AppBanner type="sports" />
      <!-- <AppMarquee /> -->
      <div v-if="!isMobile" class="mt-24">
        <AppGameSearch game-type="2" />
      </div>
      <AppSportsProviderSlider
        v-if="providerList.length > 1"
        v-model="currentProvider" :list="providerList"
        @change="sportsStore.changeProvider"
      />
      <div class="mt-24">
        <BaseTab
          v-model="marketType"
          size="large"
          :list="tabList"
          :center="false"
        />
      </div>
    </div>

    <!-- 大厅 -->
    <template v-if="marketType === 'all'">
      <AppSportsPageLive on-page on-lobby />
      <AppSportsHotEvent />
    </template>
    <!-- 我的投注 -->
    <AppSportsPageMyBet
      v-else-if="marketType === 'my-bet'" on-page
    />
    <!-- 收藏夹 -->
    <AppSportsPageFavourites v-else-if="marketType === 'fav'" on-page />
    <!-- 滚球 -->
    <AppSportsPageLive v-else-if="marketType === 'live'" on-page />
    <!-- 即将开赛 -->
    <AppSportsPageUpcoming v-else-if="marketType === 'soon'" on-page />
    <div class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

<route lang="yaml">
meta:
  layout: home
</route>
