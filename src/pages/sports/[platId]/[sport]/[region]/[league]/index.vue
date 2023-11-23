<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = route.params.region ? route.params.region.toString() : ''
const league = route.params.league ? route.params.league.toString() : ''
const { bool: isStandard } = useBoolean(true)
const params = computed(() => {
  return { m: 5, si: sport, ci: [league], page: 1, page_size: 100 }
})
const { data, run, runAsync } = useRequest(ApiSportEventList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

const baseType = ref('winner')
const curTab = ref(route.query.outrights ? '2' : '1')
const tabs = computed(() => [
  { value: '1', label: t('sport_in_coming') },
  { value: '2', label: t('champion_bet') },
])

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
// 联赛名称
const leagueName = computed(() => data.value && data.value.list
  ? data.value.list[0].cn
  : '-',
)
// 赛事数据
const eventList = computed(() => {
  return data.value && data.value.list ? data.value.list : []
})
const breadcrumb = computed(() => [
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}`,
    title: sportName.value,
  },
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport}/${region}`,
    title: regionName.value,
  },
  {
    path: '',
    title: leagueName.value,
  },
])

function onBaseTypeChange(v: string) {
  baseType.value = v
}

onMounted(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})

await application.allSettled([runAsync(params.value)])
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
          :is-standard="isStandard"
          :league-name="leagueName" :event-count="eventList.length" :base-type="baseType"
          :event-list="eventList" auto-show
        />
      </div>
      <!-- 冠军 -->
      <AppSportsOutrights v-else-if="isOutrights" :level="3" />

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
