<script setup lang='ts'>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'

const {
  VITE_SPORT_EVENT_PAGE_SIZE, VITE_SPORT_EVENT_PAGE_SIZE_MAX,
} = getEnv()
const { t } = useI18n()
const {
  bool: moreLoading, setTrue: moreLoadingTrue,
  setFalse: moreLoadingFalse,
} = useBoolean(false)

let timer: any = null
const hotEventRef = ref()
const scrollDom = ref()
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref<ISportDataGroupedByLeague>([])
const params = computed(() => {
  return {
    si: 0,
    m: 0,
    ic: 0,
    ivs: 0,
    hot: 1,
    page: page.value,
    page_size: pageSize.value,
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
  onAfter() {
    moreLoadingFalse()
  },
})
/** 👷 分页、定时器、监听更新数据 start 👷 */
function startTimer(immediate?: boolean) {
  if (timer)
    stopTimer()

  function update() {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
    curTotal.value = 0
  }

  if (immediate)
    update()

  timer = setInterval(() => {
    update()
    hotEventRef.value.send()
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
  moreLoadingTrue()
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
    <BaseEvent
      ref="hotEventRef"
      send-name="hot"
      receive-name="cart"
      @receive="startTimer(true)"
    />
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>{{ t('sports_hot_event') }}</h6>
      </div>
    </div>

    <div class="market-wrapper">
      <AppSportsMarket
        v-for="item in list"
        :key="item.ci + item.list.length" :league-name="item.cn"
        :event-count="item.list.length"
        :event-list="item.list"
        base-type="3@@1"
        is-standard
      />
      <AppSportsMarketSkeleton v-if="moreLoading" :num="10" />
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
