<script lang="ts" setup>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'
import { EnumSportMarketType } from '~/utils/enums'

const props = defineProps<{ onPage?: boolean; onLobby?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const { sportLiveNavs, currentLiveNav } = storeToRefs(sportsStore)
const { bool: isStandard } = useBoolean(true)
const {
  VITE_SPORT_EVENT_PAGE_SIZE,
  VITE_SPORT_EVENT_PAGE_SIZE_MAX, VITE_SPORT_DEFAULT_MARKET_TYPE,
} = getEnv()
/** 定时更新count */
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 60, true)

let timer: any = null
const baseType = ref(VITE_SPORT_DEFAULT_MARKET_TYPE)
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref<ISportDataGroupedByLeague>([])
const params = computed(() => {
  return { si: currentLiveNav.value, m: 3, page: page.value, page_size: pageSize.value }
})
const { run, runAsync } = useRequest(ApiSportEventList,
  {
    refreshDeps: [currentLiveNav],
    onSuccess(res) {
      if (res.d) {
        total.value = res.t
        curTotal.value = curTotal.value + res.d.length

        if (page.value === 1)
          return list.value = sportsDataGroupByLeague(res.d)

        list.value = sportsDataGroupByLeagueLoadMore(list.value, res.d)
      }
    },
  },
)
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
function startLive() {
  if (timer)
    stopLive()

  timer = setInterval(() => {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
    curTotal.value = 0
  }, 60000)
}
function stopLive() {
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

/** 切换球种 */
watch(currentLiveNav, () => {
  reset()
  getData()
  startLive()
})

onMounted(() => {
  if (currentLiveNav.value !== -1 && props.onPage) {
    getData()
    startLive()
  }

  startCount()
  sportDeltaBus.on(updateDataByMqtt)
})
onBeforeUnmount(() => {
  stopLive()
  stopCount()
  sportDeltaBus.off(updateDataByMqtt)
})

if (currentLiveNav.value !== -1 && !props.onPage) {
  await application.allSettled([runAsync(params.value)])
  startLive()
}
</script>

<template>
  <div class="tg-sports-type" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-ball-plate" />
        <h6>{{ t('sports_tab_live_events') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentLiveNav" :list="sportLiveNavs" />
    <div class="market-wrapper">
      <AppSportsMarket
        v-for="item in listFiltered" :key="item.ci + item.list.length"
        :is-standard="isStandard"
        :league-name="item.cn"
        :event-count="item.list.length"
        :event-list="item.list"
        :base-type="baseType"
        :auto-show="item.list.length > 0"
      />
      <BaseButton
        v-show="curTotal < total "
        size="none" type="text" @click="loadMore"
      >
        {{ t('load_more') }}
      </BaseButton>
    </div>

    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-type {
  margin-top: var(--tg-spacing-24);

  &.on-page {
    margin-top: 0;
  }
}
.check-more{
  display: block;
  margin-top: -12px;
  padding-left: var(--tg-spacing-16);
  margin-bottom: var(--tg-spacing-24);
}

.market-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
