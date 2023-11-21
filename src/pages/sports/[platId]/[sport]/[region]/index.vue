<script lang="ts" setup>
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = ref(route.params.region ? route.params.region.toString() : '')
const { bool: isStandard } = useBoolean(true)
const { data, run } = useRequest(() =>
  ApiSportEventList({ m: 5, si: sport, pgid: region.value, page: 1, page_size: 100 }),
)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(run, 30)

const baseType = ref('winner')
const curTab = ref(route.query.outrights ? '2' : '1')
const tabs = [
  { value: '1', label: '滚球与即将开赛的盘口' },
  { value: '2', label: '冠军投注' },
]

const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
// 球种名称
const sportName = computed(() => data.value && data.value.list
  ? data.value.list[0].sn
  : '-',
)
// 地区名称
const regionName = computed(() => data.value && data.value.list
  ? data.value.list[0].pgn
  : '-',
)
// 联赛数据
const leagueList = computed(() => {
  return data.value && data.value.list ? sportsDataGroupByLeague(data.value.list) : []
})
const breadcrumb = computed(() => [
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}`,
    title: sportName.value,
  },
  {
    path: '',
    title: regionName.value,
  },
])

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(route, (a) => {
  region.value = a.params.region ? a.params.region.toString() : ''
  startTimer()
})

startTimer()
onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <div class="tg-sports-category-index">
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
      <div
        v-if="isLiveAndUpcoming"
        class="sub-wrapper"
      >
        <AppSportsMarket
          v-for="league, i in leagueList" :key="league.ci" :is-standard="isStandard"
          :league-name="league.cn" :event-count="league.list.length" :base-type="baseType"
          :event-list="league.list" :auto-show="i === 0"
        />
      </div>
      <!-- 冠军 -->
      <AppSportsOutrights v-else-if="isOutrights" :level="2" />

      <AppBetData />
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
.tg-sports-category-index {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
