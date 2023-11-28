<script lang="ts" setup>
const { t } = useI18n()
const { sidebarData } = storeToRefs(useSportsStore())
const route = useRoute()
const sport = computed(() => route.params.sport ? +route.params.sport : 0)
const { bool: isStandard } = useBoolean(true)
const params = ref({ si: sport.value, kind: 'normal' })
const { data: competitionListData, run, runAsync } = useRequest(ApiSportCompetitionList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

const curTab = ref(route.query.outrights ? '2' : '1')
const baseType = ref('handicap')
const tabs = computed(() => [
  { value: '1', label: t('sport_in_coming') },
  { value: '2', label: t('champion_bet') },
])

const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
// 热门地区
const hotSportList = computed(() => {
  if (competitionListData.value && competitionListData.value.hot)
    return competitionListData.value.hot
  return []
})
// 所有地区
const allRegionList = computed(() => {
  if (competitionListData.value && competitionListData.value.list)
    return competitionListData.value.list
  return []
})
// 球种名称
const sportName = computed(() => {
  if (sidebarData.value)
    return sidebarData.value.all.find(a => a.si === sport.value)?.sn ?? '-'
  return '-'
})
const breadcrumb = computed(() => [
  {
    path: '',
    title: sportName.value,
  },
])

usePageTitle({ prefix: sportName })

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(route, (r) => {
  if (r.name === 'sports-platId-sport') {
    curTab.value = r.query.outrights ? '2' : '1'
    params.value.si = r.params.sport ? +r.params.sport : 0
    competitionListData.value = undefined
    run(params.value)
    startTimer()
  }
})

onMounted(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <div class="tg-sports-index tg-sports-hotlive">
    <div class="wrapper">
      <AppNavBreadCrumb :breadcrumb="breadcrumb" />
      <div class="tab-box">
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
        <div class="sub-wrapper">
          <div class="sports-page-title">
            <div class="left">
              <BaseIcon name="uni-popular" />
              <h6>{{ t('casino_sort_popular') }} {{ sportName }}</h6>
            </div>
          </div>
          <AppSportsMarketRegion
            v-for="region, index in hotSportList"
            :key="region.pgid"
            :title="region.pgn"
            icon="spt-game-intl"
            :init="index === 0"
            :count="region.c"
            :is-standard="isStandard"
            :base-type="baseType"
            :league-list="region.cl"
            is-hot-game
          />
        </div>

        <!-- 按字母顺序排序 -->
        <div class="sub-wrapper">
          <h3 class="sub-title">
            <BaseIcon name="spt-sort-az" />
            <span>{{ t('order_by_alpha') }}</span>
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
      <AppSportsOutrights v-else-if="isOutrights" :level="1" />

      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapper,.sub-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-24);
}
.sub-wrapper{
  gap:  var(--tg-spacing-12);
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
