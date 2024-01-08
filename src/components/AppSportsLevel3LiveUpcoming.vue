<script setup lang='ts'>
import type { ISportEventInfo, ISportEventList } from '~/apis/types'

interface Props {
  isStandard: boolean
  baseType: string
}
defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const navObj = application.urlParamsToObject(route.fullPath.split('?')[1])
const sport = route.params.sport ? +route.params.sport : 0
const league = route.params.league ? route.params.league.toString() : ''
const { bool: isStandard } = useBoolean(true)
const {
  bool: moreLoading, setTrue: moreLoadingTrue,
  setFalse: moreLoadingFalse,
} = useBoolean(false)
const {
  VITE_SPORT_EVENT_PAGE_SIZE,
  VITE_SPORT_EVENT_PAGE_SIZE_MAX,
} = getEnv()

let timer: any = null
const si = ref(sport)
const ci = ref(league)
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const list = ref<ISportEventInfo[]>([])
const params = computed(() => {
  return {
    m: 5,
    ic: 0,
    ivs: 0,
    si: si.value,
    ci: ci.value,
    page: page.value,
    page_size: pageSize.value,
  }
})
const { run, runAsync } = useRequest(ApiSportEventList, {
  onSuccess(res) {
    if (res.d) {
      total.value = res.t
      if (page.value === 1)
        return list.value = res.d

      list.value = [...cloneDeep(list.value), ...res.d]
    }
  },
  onAfter() {
    moreLoadingFalse()
  },
})
const curTotal = computed(() => list.value.length)

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
  moreLoadingTrue()
  getData()
}
function reset() {
  page.value = 1
  pageSize.value = +VITE_SPORT_EVENT_PAGE_SIZE
  total.value = 0
  list.value = []
}
function updateDataByMqtt(data: ISportEventList[]) {
  list.value = sportsEventInfoListUpdateByMqtt(list.value, data)
}
/** 🚧 分页、定时器、监听更新数据 end 🚧 */

watch(route, (r) => {
  if (r.name === 'sports-platId-sport-region-league') {
    si.value = r.params.sport ? +r.params.sport : 0
    ci.value = r.params.league ? r.params.league.toString() : ''
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
  <div class="sub-wrapper">
    <div v-if="list.length === 0" class="empty">
      <BaseEmpty icon="empty-1" :description="t('empty_cap')" />
    </div>
    <AppSportsMarket
      v-else
      :is-standard="isStandard"
      :league-name="navObj.cn" :event-count="total" :base-type="baseType"
      :event-list="list" :loading-more="moreLoading" group-by-date auto-show
    />
    <BaseButton
      v-show="curTotal < total && !moreLoading"
      size="none" type="text" @click="loadMore"
    >
      {{ t('load_more') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
.sub-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-12);
  align-items: flex-start;
}
.empty {
    width: 100%;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
