<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const { upcomingNavs, currentUpcomingNav } = storeToRefs(sportsStore)

const isAll = computed(() => currentUpcomingNav.value === 0)
const { bool: isStandard, setBool: setStandard } = useBoolean(true)

const { data, run } = useRequest(() =>
  ApiSportEventList({ si: currentUpcomingNav.value, m: 4, page: 1, page_size: 100 }),
{
  refreshDeps: [currentUpcomingNav],
})
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(run, 30, true)
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount, 30, true)

const baseType = ref('winner')
const list = computed(() => {
  if (data.value && data.value.list)
    return sportsDataGroupByLeague(data.value.list)

  return []
})

function onBaseTypeChange(v: string) {
  baseType.value = v
}

watch(currentUpcomingNav, (a) => {
  if (a === 0)
    setStandard(true)

  startTimer()
})

onBeforeMount(() => {
  startTimer()
  startCount()
})
onBeforeUnmount(() => {
  stopTimer()
  stopCount()
})
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
