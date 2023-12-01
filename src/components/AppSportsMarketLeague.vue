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

let timer: any = null
const page = ref(1)
const pageSize = ref(+VITE_SPORT_EVENT_PAGE_SIZE)
const total = ref(props.count)
const list = ref<ISportEventInfo[]>([])
const params = computed(() => {
  return {
    si: +sport,
    m: 5,
    ci: [props.leagueId],
    page: page.value,
    page_size: pageSize.value,
  }
})
const { run, loading } = useRequest(ApiSportEventList, {
  onSuccess(res) {
    if (res.d) {
      total.value = res.t
      if (page.value === 1)
        return list.value = res.d

      list.value = [...cloneDeep(list.value), ...res.d]
    }
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

onMounted(() => {
  if (props.autoShow && props.isRegionOpen)
    getEventsData()
})
onBeforeUnmount(() => {
  stopTimer()
  sportDeltaBus.off(updateDataByMqtt)
})
</script>

<template>
  <BaseSecondaryAccordion
    :title="leagueName"
    :show-more="curTotal < total && isSelfOpen"
    level="2"
    :init="autoShow"
    @open="onAccordionOpen"
    @close="onAccordionClose"
    @more="loadMore"
  >
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="total" />
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
        />
      </div>
    </template>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
</style>
