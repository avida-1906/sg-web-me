<script setup lang='ts'>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'

interface Props {
  isStandard: boolean
  baseType: 'winner' | 'handicap' | 'total'
}
defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = ref(route.params.region ? route.params.region.toString() : '')
const {
  VITE_SPORT_EVENT_PAGE_SIZE,
  VITE_SPORT_EVENT_PAGE_SIZE_MAX,
} = getEnv()

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
const { run, runAsync, loading } = useRequest(ApiSportEventList, {
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
  list.value = sportsDataGroupedByLeagueUpdateByMqtt(list.value, data)
}
/** 🚧 分页、定时器、监听更新数据 end 🚧 */

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
  <div
    class="sub-wrapper"
  >
    <AppSportsMarket
      v-for="league, i in list" :key="league.ci" :is-standard="isStandard"
      :league-name="league.cn" :event-count="league.list.length"
      :base-type="baseType"
      :event-list="league.list" :auto-show="i === 0"
    />
    <AppSportsMarketSkeleton
      v-if="loading"
      :num="total - curTotal > 10 ? 10 : total - curTotal "
    />
    <BaseButton
      v-show="curTotal < total && !loading"
      size="none" type="text" @click="loadMore"
    >
      {{ t('load_more') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>

</style>
