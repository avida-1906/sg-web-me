<script lang="ts" setup>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'
import type { EnumSportMarketType } from '~/utils/enums'

const { t } = useI18n()
usePageTitle({ prefix: t('btc_sport_title') })
const { width } = storeToRefs(useWindowStore())
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = ref(route.params.region ? route.params.region.toString() : '')
const { bool: isStandard } = useBoolean(true)
const {
  VITE_SPORT_EVENT_PAGE_SIZE,
  VITE_SPORT_EVENT_PAGE_SIZE_MAX, VITE_SPORT_DEFAULT_MARKET_TYPE,
} = getEnv()

const baseType = ref(VITE_SPORT_DEFAULT_MARKET_TYPE)
const curTab = ref(route.query.outrights ? '2' : '1')
let timer: any = null
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref<ISportDataGroupedByLeague>([])
const params = computed(() => {
  return {
    m: 5,
    si: sport,
    pgid: region.value,
    page: page.value,
    page_size: pageSize.value,
  }
})
const { data, run, runAsync } = useRequest(ApiSportEventList, {
  onSuccess(res) {
    if (res.d) {
      total.value = res.t
      curTotal.value = curTotal.value + res.d.length

      if (page.value === 1)
        return list.value = sportsDataGroupByLeague(res.d)

      list.value = sportsDataGroupByLeagueLoadMore(list.value, res.d)
    }
  },
})

const tabs = computed(() => [
  { value: '1', label: t('sport_in_coming') },
  { value: '2', label: t('champion_bet') },
])
const isOver814 = computed(() => width.value > 814)
const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
// 球种名称
const sportName = computed(() => data.value && data.value.d
  ? data.value.d[0].sn
  : '-',
)
// 地区名称
const regionName = computed(() => data.value && data.value.d
  ? data.value.d[0].pgn
  : '-',
)
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

/** 👷 分页、定时器、监听更新数据 start 👷 */
function startTimer() {
  if (timer)
    stopTimer()

  timer = setInterval(() => {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
    curTotal.value = 0
  }, 120000)
}
function stopTimer() {
  clearInterval(timer)
  timer = null
}
function getData() {
  run(params.value)
}
function loadMore() {
  if (curTotal.value >= +VITE_SPORT_EVENT_PAGE_SIZE_MAX) {
    curTotal.value = 0
    page.value = 1
    pageSize.value = +VITE_SPORT_EVENT_PAGE_SIZE_MAX
    scrollMainContentToTop()
  }
  else {
    page.value++
    pageSize.value = +VITE_SPORT_EVENT_PAGE_SIZE
  }
  getData()
}
function reset() {
  page.value = 1
  pageSize.value = +VITE_SPORT_EVENT_PAGE_SIZE
  total.value = 0
  curTotal.value = 0
  list.value = []
}
function updateDataByMqtt(data: ISportEventList[]) {
  list.value = sportsDataUpdateByMqtt(list.value, data)
}
/** 🚧 分页、定时器、监听更新数据 end 🚧 */

function onBaseTypeChange(v: EnumSportMarketType) {
  baseType.value = v
}

watch(route, (r) => {
  if (r.name === 'sports-platId-sport-region') {
    region.value = r.params.region ? r.params.region.toString() : ''
    reset()
    getData()
    startTimer()
  }
})

onMounted(() => {
  startTimer()
  sportDeltaBus.on(updateDataByMqtt)
})
onBeforeUnmount(() => {
  stopTimer()
  sportDeltaBus.off(updateDataByMqtt)
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
          v-if="isOver814"
          v-show="isLiveAndUpcoming"
          v-model="isStandard" :base-type="baseType"
          @base-type-change="onBaseTypeChange"
        />
      </div>
      <AppSportsMarketTypeSelect
        v-if="!isOver814"
        v-show="isLiveAndUpcoming"
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
      <!-- 滚球及即将开赛 -->
      <div
        v-if="isLiveAndUpcoming"
        class="sub-wrapper"
      >
        <AppSportsMarket
          v-for="league, i in list" :key="league.ci" :is-standard="isStandard"
          :league-name="league.cn" :event-count="league.list.length" :base-type="baseType"
          :event-list="league.list" :auto-show="i === 0"
        />
        <BaseButton v-show="curTotal < total" size="none" type="text" @click="loadMore">
          {{ t('load_more') }}
        </BaseButton>
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
  align-items: flex-start;
}
.tg-sports-category-index {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
