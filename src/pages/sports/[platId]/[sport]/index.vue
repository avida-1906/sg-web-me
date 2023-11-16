<script lang="ts" setup>
import RegionOutrights from './outrights.vue'

const { t } = useI18n()
const sportsStore = useSportsStore()
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const { bool: isStandard } = useBoolean(true)
const { data: competitionListData } = useRequest(() =>
  ApiSportCompetitionList({ si: sport, kind: 'normal' }),
{
  manual: false,
})

const curTab = ref(route.query.outrights ? '2' : '1')
const baseType = ref('winner')
const tabs = [
  { value: '1', label: '滚球与即将开赛的盘口' },
  { value: '2', label: '冠军投注' },
]

const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
// 热门地区
const hotSportList = computed(() => {
  if (competitionListData.value)
    return competitionListData.value.hot
  return []
})
// 所有地区
const allRegionList = computed(() => {
  if (competitionListData.value)
    return competitionListData.value.list
  return []
})
// 球种名称
const sportName = computed(() => sportsStore.getSportsNameBySi(sport))
const breadcrumb = computed(() => [
  {
    path: '',
    title: sportName.value,
    id: sport,
  },
])

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(route, (a) => {
  curTab.value = a.query.outrights ? '2' : '1'
})
</script>

<template>
  <div class="tg-sports-index tg-sports-hotlive">
    <div class="layout-spacing variant-normal no-bottom-spacing">
      <AppNavBreadCrumb :breadcrumb="breadcrumb" />
      <div class="sports-page-title">
        <div class="left">
          <BaseTab
            v-model="curTab" :list="tabs" size="large"
            :center="false"
          />
        </div>
        <AppSportsMarketTypeSelect
          v-show="isLiveAndUpcoming"
          v-model="isStandard" :base-type="baseType"
          @base-type-change="onBaseTypeChange"
        />
      </div>
      <!-- 滚球及即将开赛 -->
      <template v-if="isLiveAndUpcoming">
        <!-- 热门 -->
        <div class="sports-page-title">
          <div class="left">
            <BaseIcon name="uni-popular" />
            <h6>{{ t('casino_sort_popular') }} {{ sportName }}</h6>
          </div>
        </div>
        <div class="layout-spacing no-bottom-spacing sort-tournament">
          <AppSportsMarketRegion
            v-for="region, index in hotSportList"
            :key="region.pgid"
            :title="region.pgn"
            icon="spt-game-intl"
            :init="index > 0 ? false : true"
            :count="region.c"
            :is-standard="isStandard"
            :base-type="baseType"
            :league-list="region.cl"
          />
        </div>
        <!-- 按字母顺序排序 -->
        <div class="layout-spacing sort-tournament">
          <h3 class="sub-title">
            <BaseIcon name="spt-sort-az" />
            <span>按字母顺序排列</span>
          </h3>
          <AppSportsMarketRegion
            v-for="region in allRegionList"
            :key="region.pgid"
            :title="region.pgn"
            icon="spt-game-intl"
            :init="false"
            :count="region.c"
            :is-standard="isStandard"
            :base-type="baseType"
            :league-list="region.cl"
          />
        </div>
      </template>
      <!-- 冠军 -->
      <RegionOutrights v-else-if="isOutrights" />

      <div class="layout-spacing">
        <AppBetData mode="sports" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-column-200 {
  display: grid;
  grid-gap: var(--tg-spacing-8);
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  padding: var(--tg-spacing-16);
}
.game-like {
  display: flex;
  align-items: center;
  color: var(--tg-text-white);
  background: var(--tg-secondary-main);
  box-shadow: var(--tg-box-shadow);
  border-radius: var(--tg-radius-default);
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  overflow: hidden;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  line-height: var(--tg-spacing-26);
}
.sort-tournament >*+* {
  margin-top: var(--tg-spacing-12);
}
.sub-title {
  color: var(--tg-text-white);
  text-align: left;
  justify-content: flex-start;
  font-weight: var(--tg-font-weight-semibold);
  display: inline-flex;
  align-items: center;
  font-size: var(--tg-font-size-md);
  line-height: 1.5;
  .app-svg-icon {
    margin-right: var(--tg-spacing-8);
  }
}
.tg-sports-index {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
