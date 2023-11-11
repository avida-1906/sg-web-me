<script setup lang='ts'>
import SportsLive from '~/pages/sports/live/index.vue'
import SportsUpComing from '~/pages/sports/upcoming/index.vue'
import SportsMyBets from '~/pages/sports/my-bets.vue'
import SportsFavourites from '~/pages/sports/favourites.vue'

defineOptions({
  name: 'KeepAliveSports',
})

const { t } = useI18n()
const router = useRouter()
const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const sportsStore = useSportsStore()
const { currentProvider, providerList } = storeToRefs(sportsStore)

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
</script>

<template>
  <div class="sports sports-layout-home">
    <div class="layout-spacing">
      <div class="hero-wrapper mt-24">
        <AppBanner />
      </div>
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
      <SportsLive on-page />
      <BaseButton
        class="check-more" type="text" padding0
        @click="router.push('/sports/live')"
      >
        {{ t('view_all') }}
      </BaseButton>
      <AppSportsHotEvent />
    </template>
    <!-- 我的投注 -->
    <SportsMyBets v-else-if="marketType === 'my-bet'" on-page />
    <!-- 收藏夹 -->
    <SportsFavourites v-else-if="marketType === 'fav'" on-page />
    <!-- 滚球 -->
    <SportsLive v-else-if="marketType === 'live'" on-page />
    <!-- 即将开赛 -->
    <SportsUpComing v-else-if="marketType === 'soon'" on-page />
    <div class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.check-more{
  display: block;
  margin-top: -12px;
  padding-left: var(--tg-spacing-16);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
  browserTitle: 加密货币与比特币在线体育博彩 – Stake.com 体育博彩
</route>
