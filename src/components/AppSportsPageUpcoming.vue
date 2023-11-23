<script lang="ts" setup>
const props = defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const { upcomingNavs, currentUpcomingNav } = storeToRefs(sportsStore)

const baseType = ref('winner')
const isAll = computed(() => currentUpcomingNav.value === 0)
const { bool: isStandard } = useBoolean(true)
const params = computed(() => {
  return { si: currentUpcomingNav.value, m: 4, page: 1, page_size: 100 }
})
const { data, run, runAsync } = useRequest(ApiSportEventList,
  {
    refreshDeps: [currentUpcomingNav],
  })
/** 定时更新数据 */
const { startTimer: startUpcoming, stopTimer: stopUpcoming }
= useSportsDataUpdate(() => run(params.value), 30, true)
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 30, true)

const list = computed(() => {
  if (data.value && data.value.d)
    return sportsDataGroupByLeague(data.value.d)

  return []
})

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(currentUpcomingNav, () => {
  startUpcoming()
})

onMounted(() => {
  if (props.onPage)
    startUpcoming()

  startCount()
})
onBeforeUnmount(() => {
  stopUpcoming()
  stopCount()
})

// 即将开赛页面使用全局loading并延迟调用计时器，因计时器会马上进行一次请求
if (!props.onPage) {
  await application.allSettled([runAsync(params.value)])
  const t = setTimeout(() => {
    startUpcoming()
    clearTimeout(t)
  }, 30000)
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
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>
