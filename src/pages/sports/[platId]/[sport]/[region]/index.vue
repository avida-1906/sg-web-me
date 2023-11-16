<script lang="ts" setup>
import LeagueOutrights from './outrights.vue'

const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = route.params.region ? route.params.region.toString() : ''
const { bool: isStandard } = useBoolean(true)
const sportsStore = useSportsStore()
const { data } = useRequest(() =>
  ApiSportEventList({ m: 5, si: sport, pgid: region, page: 1, page_size: 100 }), {
  manual: false,
})

const baseType = ref('winner')
const curTab = ref(route.query.outrights ? '2' : '1')
const tabs = [
  { value: '1', label: '滚球与即将开赛的盘口' },
  { value: '2', label: '冠军投注' },
]

const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
// 球种名称
const sportName = computed(() => sportsStore.getSportsNameBySi(sport))
// 地区名称
const regionName = computed(() => {
  return data.value ? data.value.list[0].pgn : '-'
})
// 联赛数据
const leagueList = computed(() => {
  return data.value ? sportsDataGroupByLeague(data.value.list) : []
})
const breadcrumb = computed(() => [
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}`,
    title: sportName.value,
    id: sport,
  },
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}/${region}`,
    title: regionName.value,
    id: region,
  },
])

function onBaseTypeChange(v: string) {
  baseType.value = v
}
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
      <LeagueOutrights v-else-if="isOutrights" />

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
