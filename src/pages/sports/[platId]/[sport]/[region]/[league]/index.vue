<script lang="ts" setup>
import type { ISportEventInfo, ISportEventList } from '~/apis/types'
import type { EnumSportMarketType } from '~/utils/enums'

const { t } = useI18n()
usePageTitle({ prefix: t('btc_sport_title') })
const { width } = storeToRefs(useWindowStore())
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = route.params.region ? route.params.region.toString() : ''
const league = route.params.league ? route.params.league.toString() : ''
const { bool: isStandard } = useBoolean(true)
const {
  VITE_SPORT_EVENT_PAGE_SIZE,
  VITE_SPORT_EVENT_PAGE_SIZE_MAX, VITE_SPORT_DEFAULT_MARKET_TYPE,
} = getEnv()

let timer: any = null
const baseType = ref(VITE_SPORT_DEFAULT_MARKET_TYPE)
const curTab = ref(route.query.outrights ? '2' : '1')
const si = ref(sport)
const ci = ref([league])
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const list = ref<ISportEventInfo[]>([])
const params = computed(() => {
  return {
    m: 5,
    si: si.value,
    ci: ci.value,
    page: page.value,
    page_size: pageSize.value,
  }
})
const { data, run, runAsync } = useRequest(ApiSportEventList, {
  onSuccess(res) {
    if (res.d) {
      total.value = res.t
      if (page.value === 1)
        return list.value = res.d

      list.value = [...cloneDeep(list.value), ...res.d]
    }
  },
})
const curTotal = computed(() => list.value.length)
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
// 联赛名称
const leagueName = computed(() => data.value && data.value.d
  ? data.value.d[0].cn
  : '-',
)
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

/** 👷 分页、定时器、监听更新数据 start 👷 */
function startTimer() {
  if (timer)
    stopTimer()

  timer = setInterval(() => {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
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
  list.value = []
}
function updateDataByMqtt(data: ISportEventList[]) {
  const arr: ISportEventInfo[] = cloneDeep(list.value)

  for (let i = 0; i < data.length; i++) {
    const index = arr.findIndex(a => a.ei === data[i].ei)
    if (index > -1)
      arr.splice(index, 1, data[i].v[0])
  }
  list.value = arr
}
/** 🚧 分页、定时器、监听更新数据 end 🚧 */

function onBaseTypeChange(v: EnumSportMarketType) {
  baseType.value = v
}

watch(route, (r) => {
  if (r.name === 'sports-platId-sport-region-league') {
    si.value = r.params.sport ? +r.params.sport : 0
    ci.value = [r.params.league ? r.params.league.toString() : '']
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
          :is-standard="isStandard"
          :league-name="leagueName" :event-count="total" :base-type="baseType"
          :event-list="list" auto-show
        />
        <BaseButton v-show="curTotal < total" size="none" type="text" @click="loadMore">
          {{ t('load_more') }}
        </BaseButton>
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
