<script lang="ts" setup>
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = route.params.region ? route.params.region.toString() : ''
const { bool: isStandard } = useBoolean(true)
const sportsStore = useSportsStore()
const { data } = useRequest(() =>
  ApiSportEventList({ m: 5, si: sport, pgid: region, page: 1, page_size: 100 }), {
  manual: false,
})
const list = computed(() => {
  return data.value ? sportsDataGroupByLeague(data.value.list) : []
})

const baseType = ref('winner')
const curTab = ref(route.query.outrights ? '2' : '1')
const tabs = [
  { value: '1', label: '滚球与即将开赛的盘口' },
  { value: '2', label: '冠军投注' },
]

const sportName = computed(() => sportsStore.getSportsNameBySi(sport))
const breadcrumb = computed(() => [
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}`,
    title: sportName.value,
    id: sport,
  },
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}/${region}`,
    title: sportName.value,
    id: region,
  },
])

function onBaseTypeChange(v: string) {
  baseType.value = v
}
</script>

<template>
  <div class="tg-sports-category-index">
    <div class="layout-spacing variant-normal">
      <AppNavBreadCrumb :breadcrumb="breadcrumb" />
      <div class="sports-page-title">
        <div class="left">
          <BaseTab v-model="curTab" :list="tabs" size="large" :center="false" />
        </div>
        <AppSportsMarketTypeSelect
          v-model="isStandard" :base-type="baseType"
          @base-type-change="onBaseTypeChange"
        />
      </div>
      <div class="layout-spacing no-bottom-spacing sort-tournament">
        <AppSportsMarket
          v-for="league, i in list" :key="league.ci" :is-standard="isStandard"
          :league-name="league.cn" :event-count="league.list.length" :base-type="baseType"
          :event-list="league.list" :auto-show="i === 0"
        />
      </div>
    </div>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.sort-tournament >*+* {
  margin-top: var(--tg-spacing-12);
}
.tg-sports-category-index {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
