<script setup lang='ts'>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'

const {
  VITE_SPORT_EVENT_PAGE_SIZE, VITE_SPORT_EVENT_PAGE_SIZE_MAX,
  VITE_SPORT_DEFAULT_MARKET_TYPE,
} = getEnv()
const { t } = useI18n()

let timer: any = null
const baseType = ref(VITE_SPORT_DEFAULT_MARKET_TYPE)
const scrollDom = ref()
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref<ISportDataGroupedByLeague>([])
const params = computed(() => {
  return {
    si: 0, m: 0, hot: 1, page: page.value, page_size: pageSize.value,
  }
})
const { runAsync, run } = useRequest(ApiSportEventList, {
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
/** 过滤无当前盘口的类型的赛事 */
const listFiltered = computed(() => {
  const origin: ISportDataGroupedByLeague = cloneDeep(list.value)
  let arr: ISportDataGroupedByLeague = []

  if (baseType.value === EnumSportMarketType.HANDICAP) {
    arr = origin.map((league) => {
      const list = league.list.filter((event) => {
        return event.ml.findIndex(market => market.bt === 1) > -1
      })

      return { cn: league.cn, ci: league.ci, list }
    })
  }
  else if (baseType.value === EnumSportMarketType.TOTAL) {
    arr = origin.map((league) => {
      const list = league.list.filter((event) => {
        return event.ml.findIndex(market => market.bt === 2) > -1
      })
      return { cn: league.cn, ci: league.ci, list }
    })
  }
  if (baseType.value === EnumSportMarketType.WINNER) {
    arr = origin.map((league) => {
      const list = league.list.filter((event) => {
        return event.ml.findIndex(market => market.bt === 3 || market.bt === 4) > -1
      })
      return { cn: league.cn, ci: league.ci, list }
    })
  }
  return arr
})
/** 👷 分页、定时器、监听更新数据 start 👷 */
function startTimer() {
  if (timer)
    stopTimer()

  timer = setInterval(() => {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
    curTotal.value = 0
  }, 60000)
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
    scrollDom.value.scrollTo({ top: 0 })
  }
  else {
    page.value++
    pageSize.value = +VITE_SPORT_EVENT_PAGE_SIZE
  }
  getData()
}
function updateDataByMqtt(data: ISportEventList[]) {
  list.value = sportsDataGroupedByLeagueUpdateByMqtt(list.value, data)
}
/** 🚧 分页、定时器、监听更新数据 end 🚧 */

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
  <div class="sports-hot-event">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>{{ t('sports_hot_event') }}</h6>
      </div>
    </div>

    <div class="market-wrapper">
      <AppSportsMarket
        v-for="item in listFiltered" :key="item.ci"
        :league-name="item.cn"
        :event-count="item.list.length"
        :event-list="item.list"
        :base-type="baseType"
        is-standard
      />
      <BaseButton v-show="curTotal < total" size="none" type="text" @click="loadMore">
        {{ t('load_more') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.market-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
  margin-top: var(--tg-spacing-12);
}
</style>
