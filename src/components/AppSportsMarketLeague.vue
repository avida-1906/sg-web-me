<script setup lang='ts'>
import type { ISportEventInfo, ISportEventList } from '~/apis/types'

interface Props {
  showBreadcrumb?: boolean
  isStandard: boolean
  showMore?: boolean
  autoShow: boolean
  leagueName: string
  leagueId: string
  baseType: string
  isRegionOpen: boolean // 父级是否展开
  count: number
}
const props = defineProps<Props>()
const route = useRoute()
const sport = route.params.sport
const { VITE_SPORT_EVENT_PAGE_SIZE, VITE_SPORT_EVENT_PAGE_SIZE_MAX } = getEnv()
const { bool: isSelfOpen } = useBoolean(props.autoShow)
const {
  bool: moreLoading, setTrue: moreLoadingTrue,
  setFalse: moreLoadingFalse,
} = useBoolean(false)

let timer: any = null
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(props.count)
const list = ref<ISportEventInfo[]>([])
const params = computed(() => {
  return {
    si: +sport,
    m: 5,
    ic: 0,
    ivs: 0,
    ci: props.leagueId,
    page: page.value,
    page_size: pageSize.value,
  }
})
const { run, runAsync, loading } = useRequest(ApiSportEventList, {
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
const isRegionOpen = computed(() => props.isRegionOpen)
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
function updateDataByMqtt(data: ISportEventList[]) {
  list.value = sportsEventInfoListUpdateByMqtt(list.value, data)
}
/** 🚧 分页、定时器、监听更新数据 end 🚧 */

// 组件开关时判断是否需要获取数据
function getEventsData() {
  if (curTotal.value > 0 || loading.value)
    return
  moreLoadingTrue()
  run(params.value)
  startTimer()
  sportDeltaBus.on(updateDataByMqtt)
}

function onAccordionOpen() {
  isSelfOpen.value = true
  getEventsData()
}
function onAccordionClose() {
  isSelfOpen.value = false
}

watch(isRegionOpen, (a) => {
  if (a && props.autoShow)
    getEventsData()
})

onBeforeUnmount(() => {
  stopTimer()
  sportDeltaBus.off(updateDataByMqtt)
})

if (props.autoShow && props.isRegionOpen)
  await application.allSettled([runAsync(params.value).then(() => { startTimer() })])
</script>

<template>
  <BaseSecondaryAccordion
    :title="leagueName"
    :show-more="curTotal < total && isSelfOpen && !moreLoading"
    level="2"
    :init="autoShow"
    @open="onAccordionOpen"
    @close="onAccordionClose"
    @more="loadMore"
  >
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="total" :max="99999" />
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <AppSportsMarketInfo
          v-for="item, i in list" :key="item.hti"
          :show-breadcrumb="showBreadcrumb"
          :is-standard="isStandard" :index="i"
          :data="item"
          :base-type="baseType"
          :is-last="i === list.length - 1"
        />
        <AppSportsMarketInfoSkeleton v-if="moreLoading" :num="total - curTotal" />
      </div>
    </template>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
</style>
