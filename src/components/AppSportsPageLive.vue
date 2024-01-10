<script lang="ts" setup>
import type { ISportEventList } from '~/apis/types'
import type { ISportDataGroupedByLeague } from '~/types'

defineProps<{ onPage?: boolean; onLobby?: boolean }>()

const { t } = useI18n()
const router = useLocalRouter()
const sportsStore = useSportsStore()
const { sportLiveNavs, currentLiveNav, currentLiveBetType } = storeToRefs(sportsStore)
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

let timer: any = null
const sportListEventRef = ref()
const marketNum = ref(1)
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const curTotal = ref(0)
const list = ref<ISportDataGroupedByLeague>([])

const baseTypeOptions = computed(() =>
  sportsStore.getSportsBetTypeListBySi(currentLiveNav.value),
)
const params = computed(() => {
  return {
    si: currentLiveNav.value,
    m: 3,
    ic: 0,
    ivs: 0,
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
function startLive(immediate?: boolean) {
  if (timer)
    stopLive()

  function update() {
    page.value = 1
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
    curTotal.value = 0
  }

  if (immediate)
    update()

  timer = setInterval(() => {
    update()
    sportListEventRef.value.send()
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
      if (currentLiveNav.value !== -1) {
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
watch(currentLiveNav, (a, b) => {
  if (b !== -1) {
    currentLiveBetType.value = baseTypeOptions.value[0].value
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
  <div class="tg-sports-type" :class="{ 'on-page': onPage }">
    <BaseEvent
      ref="sportListEventRef"
      send-name="sport-list"
      receive-name="cart"
      @receive="startLive(true)"
    />
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon v-if="onLobby" name="spt-ball-plate" />
        <h6>{{ t('sports_tab_live_events') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="currentLiveBetType" :is-standard="isStandard"
        :base-type-options="baseTypeOptions"
      />
    </div>
    <AppSportsTab
      v-model="currentLiveNav" :list="sportLiveNavs" @change="onSportsSiChange"
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
            :base-type="currentLiveBetType"
          />
          <AppSportsMarketSkeleton v-if="moreLoading" :num="10" />
          <BaseButton
            v-show="curTotal < total && isHaveDataToShow && !onPage"
            size="none" type="text" @click="loadMore"
          >
            {{ t('load_more') }}
          </BaseButton>
          <BaseButton
            v-if="onPage" size="none" type="text"
            style="padding-left: var(--tg-spacing-16);"
            @click="router.push(`/sports/${getSportsPlatId()}/live`)"
          >
            {{ t('view_all') }}
          </BaseButton>
        </template>
        <div v-else class="empty">
          <BaseEmpty icon="empty-1" :description="t('empty_cap')" />
        </div>
      </template>
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

<route lang="yaml">
meta:
  layout: home
</route>
