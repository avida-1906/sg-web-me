<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const sportsStore = useSportsStore()
const { sportLiveNavs, currentLiveNav } = storeToRefs(sportsStore)
const { bool: isStandard } = useBoolean(true)
const { data, run } = useRequest(() =>
  ApiSportEventList({ si: currentLiveNav.value, m: 3, page: 1, page_size: 100 }),
{
  refreshDeps: [currentLiveNav],
})
/** 定时更新数据 */
const { startTimer: startLive, stopTimer: stopLive } = useSportsDataUpdate(run)
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount)

const baseType = ref('winner')
const list = computed(() => {
  if (data.value && data.value.list)
    return sportsDataGroupByLeague(data.value.list)

  return []
})

function onBaseTypeChange(v: string) {
  baseType.value = v
}

/** 切换球种 */
watch(currentLiveNav, () => {
  startLive()
})

onMounted(() => {
  if (currentLiveNav.value !== -1)
    startLive()

  startCount()
})
onBeforeUnmount(() => {
  stopLive()
  stopCount()
})
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
        v-for="item in list" :key="item.ci"
        :is-standard="isStandard"
        :league-name="item.cn"
        :event-count="item.list.length"
        :event-list="item.list"
        :base-type="baseType"
      />
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
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
