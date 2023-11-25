<script lang="ts" setup>
import type { ISportEventInfo } from '~/apis/types'

const props = defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const { upcomingNavs, currentUpcomingNav } = storeToRefs(sportsStore)
const { bool: isStandard } = useBoolean(true)

let timer: any = null
const scrollDom = ref()
const baseType = ref('winner')
const page = ref(1)
const pageSize = ref(10)
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

/** 定时更新count */
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 60, true)

// 基础的获取数据
function getData() {
  run(params.value)
}
/** 定时更新数据 */
function startUpcoming() {
  if (timer)
    stopUpcoming()

  timer = setInterval(() => {
    page.value = 1
    run({ si: currentUpcomingNav.value, m: 4, page: page.value, page_size: curTotal.value })
    curTotal.value = 0
  }, 60000)
}
function stopUpcoming() {
  clearInterval(timer)
  timer = null
}
function loadMore() {
  if (curTotal.value >= 100) {
    curTotal.value = 0
    page.value = 1
    pageSize.value = 100
    scrollDom.value.scrollTo({ top: 0 })
  }
  else {
    page.value++
    pageSize.value = 10
  }
  getData()
}
function reset() {
  page.value = 1
  pageSize.value = 10
  total.value = 0
  curTotal.value = 0
  list.value = []
}
function onBaseTypeChange(v: string) {
  baseType.value = v
}
function updateDate(data: any) {
  console.log('🚀 ~监听新数据', typeof data, data)
  console.log('原来的list===>', list.value)
}

// TODO：替换数据方法
const arrOld = [
  {
    ci: 1,
    cn: '第一个联赛',
    list: [
      { ei: '001', en: '第1场赛事', num: '第一次赔率' },
      { ei: '002', en: '第2场赛事', num: '第一次赔率' },
      { ei: '003', en: '第3场赛事', num: '第一次赔率' },
      { ei: '004', en: '第4场赛事', num: '第一次赔率' },
      { ei: '005', en: '第5场赛事', num: '第一次赔率' },
    ],
  },
  {
    ci: 2,
    cn: '第2个联赛',
    list: [
      { ei: '006', en: '第1场赛事', num: '第一次赔率' },
      { ei: '007', en: '第2场赛事', num: '第一次赔率' },
      { ei: '008', en: '第3场赛事', num: '第一次赔率' },
      { ei: '009', en: '第4场赛事', num: '第一次赔率' },
      { ei: '010', en: '第5场赛事', num: '第一次赔率' },
    ],
  },
  {
    ci: 3,
    cn: '第3个联赛',
    list: [
      { ei: '011', en: '第1场赛事', num: '第一次赔率' },
      { ei: '012', en: '第2场赛事', num: '第一次赔率' },
      { ei: '013', en: '第3场赛事', num: '第一次赔率' },
      { ei: '014', en: '第4场赛事', num: '第一次赔率' },
      { ei: '015', en: '第5场赛事', num: '第一次赔率' },
    ],
  },
  {
    ci: 4,
    cn: '第4个联赛',
    list: [
      { ei: '016', en: '第1场赛事', num: '第一次赔率' },
      { ei: '017', en: '第2场赛事', num: '第一次赔率' },
      { ei: '018', en: '第3场赛事', num: '第一次赔率' },
      { ei: '019', en: '第4场赛事', num: '第一次赔率' },
      { ei: '020', en: '第5场赛事', num: '第一次赔率' },
    ],
  },
]
const newData = { ei: '013', en: '第3场赛事', num: '😂😂😂😂😂😂😂' }
function test(origin: {
  ci: number
  cn: string
  list: {
    ei: string
    en: string
    num: string
  }[]
}[], newData: {
  ei: string
  en: string
  num: string
}) {
  const arr: {
    ci: number
    cn: string
    list: {
      ei: string
      en: string
      num: string
    }[]
  }[] = cloneDeep(origin)
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i].list.findIndex(a => a.ei === newData.ei)
    if (index > -1)
      arr[i].list.splice(index, 1, newData)
  }
  console.log('origin====>', arr)
}
test(arrOld, newData)

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
  sportDeltaBus.on(updateDate)
})
onBeforeUnmount(() => {
  stopUpcoming()
  stopCount()
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
