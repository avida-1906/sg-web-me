<script lang="ts" setup>
import type { ISportEventInfo, ISportEventList } from '~/apis/types'

const props = defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const { upcomingNavs, currentUpcomingNav } = storeToRefs(sportsStore)
const { bool: isStandard } = useBoolean(true)
const { VITE_SPORT_EVENT_PAGE_SIZE, VITE_SPORT_EVENT_PAGE_SIZE_MAX } = getEnv()
/** 定时更新count */
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 120, true)

let timer: any = null
const baseType = ref('winner')
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const list = ref<ISportEventInfo[]>([])
const params = computed(() => {
  return {
    si: currentUpcomingNav.value,
    m: 4,
    page: page.value,
    page_size: pageSize.value,
  }
})
const isAll = computed(() => currentUpcomingNav.value === 0)
const { run, runAsync } = useRequest(ApiSportEventList,
  {
    refreshDeps: [currentUpcomingNav],
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
const leagueName = computed(() => {
  return upcomingNavs.value.find(a => a.si === currentUpcomingNav.value)?.sn ?? '-'
})
/** 👷 分页、定时器、监听更新数据 start 👷 */
function startUpcoming() {
  if (timer)
    stopUpcoming()

  timer = setInterval(() => {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value })
  }, 120000)
}
function stopUpcoming() {
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

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(currentUpcomingNav, () => {
  reset()
  getData()
  startUpcoming()
})

onMounted(() => {
  if (props.onPage) {
    getData()
    startUpcoming()
  }

  startCount()
  sportDeltaBus.on(updateDataByMqtt)
})
onBeforeUnmount(() => {
  stopUpcoming()
  stopCount()
  sportDeltaBus.off(updateDataByMqtt)
})

if (!props.onPage) {
  await application.allSettled([runAsync(params.value)])
  startUpcoming()
}
</script>

<template>
  <div class="tg-sports-upcoming" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-timing" />
        <h6>{{ t('sports_tab_starting_soon') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :disabled="isAll" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentUpcomingNav" :list="upcomingNavs" />

    <div class="market-wrapper">
      <AppSportsMarket
        :is-standard="isStandard" show-breadcrumb
        :league-name="leagueName" :event-count="total" :base-type="baseType"
        :event-list="list" auto-show :show-more="curTotal < total" @more="loadMore"
      />
    </div>

    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-upcoming {
  margin-top: var(--tg-spacing-24);
  &.on-page{
    margin-top: 0;
  }
}

.market-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>
