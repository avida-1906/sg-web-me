<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveSports',
})
const props = defineProps<{ platId: string }>()

const { t } = useI18n()
usePageTitle({ prefix: t('page_title_sport'), suffix: t('online_casino') })
const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const sportsStore = useSportsStore()
const { currentProvider, providerList } = storeToRefs(sportsStore)
const { bool: isFirst } = useBoolean(true)

const marketType = ref(Session.get<string>(STORAGE_SPORTS_LIVE_NAV)?.value ?? 'all')
const tabList = computed(() => [
  { label: t('sports_tab_lobby'), value: 'all', icon: 'spt-basketball' },
  {
    label: t('v_sports'),
    value: 'v-sports',
    icon: 'spt-v-sports',
  },
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
  // { label: t('sports_tab_live_events'), value: 'live', icon: 'spt-ball-plate' },
  // { label: t('sports_tab_starting_soon'), value: 'soon', icon: 'spt-timing' },
])

function setLobby() {
  marketType.value = 'all'
}
function onTabChange() {
  isFirst.value = false
  Session.set(STORAGE_SPORTS_LIVE_NAV, unref(marketType))
}

sportsStore.changeProvider(props.platId)
sportsLobbyBus.on(setLobby)

onMounted(() => {
  Session.set(STORAGE_SPORTS_LIVE_NAV, unref(marketType))
})
onBeforeUnmount(() => {
  sportsLobbyBus.off(setLobby)
  Session.remove(STORAGE_SPORTS_LIVE_NAV)
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
          @change="onTabChange"
        />
      </div>
    </div>

    <AppSportsLobby v-if="isFirst" :market-type="marketType" />
    <template v-else>
      <Suspense timeout="0">
        <AppSportsLobby :key="marketType" :market-type="marketType" />
        <template #fallback>
          <AppLoading full-screen />
        </template>
      </Suspense>
    </template>

    <div class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
    <AppSportsIntroduction />
  </div>
</template>

<style lang='scss' scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
