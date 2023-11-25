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
const scrollDom = ref()
const baseType = ref('winner')
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref< {
  ci: string
  cn: string
  list: ISportEventInfo[]
}[]>([])
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
        curTotal.value = curTotal.value + res.d.length

        if (page.value === 1) {
          const groupedList = sportsDataGroupByLeague(res.d)
          return list.value = groupedList
        }

        list.value = sportsDataGroupByLeagueLoadMore(list.value, res.d)
      }
    },
  })
/** 分页、定时器、监听更新数据 start */
function startUpcoming() {
  if (timer)
    stopUpcoming()

  timer = setInterval(() => {
    page.value = 1
    run({ si: currentUpcomingNav.value, m: 4, page: page.value, page_size: curTotal.value })
    curTotal.value = 0
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
/** 分页、定时器、监听更新数据 end */

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(currentUpcomingNav, () => {
  reset()
  getData()
  startUpcoming()
})

onMounted(() => {
  scrollDom.value = document.getElementById('main-content-scrollable')
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

// 即将开赛页面使用全局loading并延迟调用计时器，因计时器会马上进行一次请求
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
        v-for="item in list" :key="item.ci"
        :is-standard="isStandard"
        :league-name="item.cn"
        :event-count="item.list.length"
        :event-list="item.list"
        :base-type="baseType"
        show-breadcrumb
      />
      <BaseButton v-show="curTotal < total" size="none" type="text" @click="loadMore">
        {{ t('load_more') }}
      </BaseButton>
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
