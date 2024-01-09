<script setup lang='ts'>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'

const { t } = useI18n()
const sportsStore = useSportsStore()
const { bool: isStandard } = useBoolean(true)
const {
  bool: switchLoading, setTrue: switchLoadingTrue,
  setFalse: switchLoadingFalse,
} = useBoolean(false)
const {
  bool: moreLoading, setTrue: moreLoadingTrue,
  setFalse: moreLoadingFalse,
} = useBoolean(false)
const {
  VITE_SPORT_EVENT_PAGE_SIZE,
  VITE_SPORT_EVENT_PAGE_SIZE_MAX,
} = getEnv()
/** 定时更新count */
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 60, true)
const {
  vSportsNavs,
  currentVSportsNav,
  currentVSportsBetType,
} = storeToRefs(useSportsStore())

let timer: any = null
const marketNum = ref(1)
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref<ISportDataGroupedByLeague>([])

const baseTypeOptions = computed(() =>
  sportsStore.getSportsBetTypeListBySi(currentVSportsNav.value),
)
const params = computed(() => {
  return {
    si: currentVSportsNav.value,
    ivs: 1,
    page: page.value,
    page_size: pageSize.value,
  }
})
const { run, runAsync } = useRequest(ApiSportEventList,
  {
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
      switchLoadingFalse()
      moreLoadingFalse()
    },
  },
)
/** 判断当前展示的数据是否至少有一条可以展示 */
const isHaveDataToShow = computed(() => {
  return list.value.some(a => a.list.length > 0)
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
  moreLoadingTrue()
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

function onSportsSiChange(item: { count: number }) {
  marketNum.value = item.count > 10 ? 10 : item.count
}

// 初始化数据
function initData() {
  return new Promise((resolve) => {
    let a = 0
    const t = setInterval(() => {
      a++
      if (currentVSportsNav.value !== -1) {
        clearInterval(t)
        runAsync(params.value).finally(() => {
          startLive()
          resolve(true)
        })
      }
      else if (a > 300) {
        clearInterval(t)
        resolve(true)
      }
    }, 50)
  })
}

/** 切换球种 */
watch(currentVSportsNav, (a, b) => {
  if (b !== -1) {
    currentVSportsBetType.value = baseTypeOptions.value[0].value
    switchLoadingTrue()
    reset()
    getData()
    startLive()
  }
})

onMounted(() => {
  startCount()
  sportDeltaBus.on(updateDataByMqtt)
})
onBeforeUnmount(() => {
  stopLive()
  stopCount()
  sportDeltaBus.off(updateDataByMqtt)
})

await application.allSettled([initData()])
</script>

<template>
  <div class="virtual-sports">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-v-sports" />
        <h6>{{ t('v_sports') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="currentVSportsBetType" :is-standard="isStandard"
        :base-type-options="baseTypeOptions"
      />
    </div>
    <AppSportsTab
      v-model="currentVSportsNav" :list="vSportsNavs" @change="onSportsSiChange"
    />

    <div class="market-wrapper">
      <AppSportsMarketSkeleton v-if="switchLoading" :num="marketNum" />
      <template v-else>
        <template v-if="isHaveDataToShow">
          <AppSportsMarket
            v-for="item in list"
            :key="item.ci + item.list.length"
            :is-standard="isStandard"
            :league-name="item.cn"
            :event-count="item.list.length"
            :event-list="item.list"
            :base-type="currentVSportsBetType"
          />
          <AppSportsMarketSkeleton v-if="moreLoading" :num="10" />
          <BaseButton
            v-show="curTotal < total && isHaveDataToShow"
            size="none" type="text" @click="loadMore"
          >
            {{ t('load_more') }}
          </BaseButton>
        </template>
        <div v-else class="empty">
          <BaseEmpty icon="empty-1" :description="t('empty_cap')" />
        </div>
      </template>
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
}
.empty{
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
