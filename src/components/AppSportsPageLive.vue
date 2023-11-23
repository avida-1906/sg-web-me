<script lang="ts" setup>
const props = defineProps<{ onPage?: boolean; onLobby?: boolean }>()

const { t } = useI18n()
const router = useRouter()
const sportsStore = useSportsStore()
const { sportLiveNavs, currentLiveNav } = storeToRefs(sportsStore)
const { bool: isStandard } = useBoolean(true)
const params = ref({ si: currentLiveNav.value, m: 3, page: 1, page_size: 50 })
const { data, run, runAsync } = useRequest(ApiSportEventList,
  {
    refreshDeps: [currentLiveNav],
  },
)
/** 定时更新数据 */
const { startTimer: startLive, stopTimer: stopLive }
= useSportsDataUpdate(() => run(params.value))
const {
  startTimer: startCount,
  stopTimer: stopCount,
} = useSportsDataUpdate(sportsStore.runSportsCount)

const baseType = ref('winner')
const groupedList = computed(() => {
  if (data.value && data.value.list)
    return sportsDataGroupByLeague(data.value.list)
  return []
})
const list = computed(() => {
  if (props.onLobby)
    return groupedList.value.slice(0, 3)
  return groupedList.value
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
await application.allSettled([runAsync(params.value)])
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
    <BaseButton
      v-if="groupedList.length > 3 && onLobby"
      class="check-more" type="text" padding0
      @click="router.push(`/sports/${getSportsPlatId()}/live`)"
    >
      {{ t('view_all') }}
    </BaseButton>

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
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
