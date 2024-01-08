<script lang="ts" setup>
import type { ISportEventInfo, ISportEventList } from '~/apis/types'

defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const {
  upcomingNavs, currentUpcomingNav, allSportsCount,
} = storeToRefs(sportsStore)
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
  VITE_SPORT_EVENT_PAGE_SIZE, VITE_SPORT_EVENT_PAGE_SIZE_MAX,
} = getEnv()
/** 定时更新count */
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 120, true)

let timer: any = null
const marketNum = ref(1)
const baseType = ref(
  sportsStore.getSportsBetTypeListBySi(currentUpcomingNav.value)[0]?.value,
)
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(0)
const list = ref<ISportEventInfo[]>([])
const baseTypeOptions = computed(() =>
  sportsStore.getSportsBetTypeListBySi(currentUpcomingNav.value),
)

const params = computed(() => {
  return {
    si: currentUpcomingNav.value,
    m: 4,
    ic: 0,
    ivs: 0,
    page: page.value,
    page_size: pageSize.value,
  }
})
const isAll = computed(() => currentUpcomingNav.value === 0)
const { run, runAsync } = useRequest(ApiSportEventList,
  {
    onSuccess(res) {
      if (res.d) {
        // 修改即将开赛导航的条数数据
        if (allSportsCount.value) {
          if (currentUpcomingNav.value === 0) {
            allSportsCount.value = {
              c: allSportsCount.value.c,
              nc: res.t,
              list: allSportsCount.value.list,
            }
          }
          else {
            const index = allSportsCount.value.list.findIndex(a => a.si === currentUpcomingNav.value)
            if (index > -1) {
              const arr = cloneDeep(allSportsCount.value.list)
              arr.splice(index, 1, { ...allSportsCount.value.list[index], nc: res.t })
              allSportsCount.value = {
                nc: allSportsCount.value.nc,
                c: allSportsCount.value.c,
                list: arr,
              }
            }
          }
        }
        total.value = res.t

        if (page.value === 1)
          return list.value = res.d

        list.value = [...cloneDeep(list.value), ...res.d]
      }
    },
    onAfter() {
      switchLoadingFalse()
      moreLoadingFalse()
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
    run({ ...params.value, page_size: curTotal.value > 10 ? curTotal.value : 10 })
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

function onSportsSiChange(item: { count: number }) {
  marketNum.value = item.count > 10 ? 10 : item.count
}

watch(currentUpcomingNav, () => {
  baseType.value = baseTypeOptions.value[0].value
  switchLoadingTrue()
  reset()
  getData()
  startUpcoming()
})

onMounted(() => {
  startCount()
  sportDeltaBus.on(updateDataByMqtt)
})
onBeforeUnmount(() => {
  stopUpcoming()
  stopCount()
  sportDeltaBus.off(updateDataByMqtt)
})

await application.allSettled([runAsync(params.value).then(() => startUpcoming())])
</script>

<template>
  <div class="tg-sports-upcoming" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <!-- <BaseIcon  name="spt-timing" /> -->
        <h6>{{ t('sports_tab_starting_soon') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="baseType" :disabled="isAll" :base-type-options="baseTypeOptions"
        :is-standard="isStandard"
      />
    </div>
    <AppSportsTab
      v-model="currentUpcomingNav" :list="upcomingNavs"
      @change="onSportsSiChange"
    />

    <div class="market-wrapper">
      <AppSportsMarketSkeleton v-if="switchLoading" :num="marketNum" />
      <template v-else>
        <AppSportsMarket
          :is-standard="isStandard"
          :league-name="leagueName" :event-count="total" :base-type="baseType"
          :event-list="list" auto-show show-breadcrumb :show-more="curTotal < total"
          :loading-more="moreLoading"
          @more="loadMore"
        />
      </template>
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
