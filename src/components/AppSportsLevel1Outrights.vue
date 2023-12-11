<script setup lang='ts'>
const { t } = useI18n()
const route = useRoute()
const sportId = route.params.sport ? +route.params.sport : 0
const { sidebarData } = storeToRefs(useSportsStore())

const params = ref({ si: sportId, kind: 'outright' })
const { data: competitionListData, run, runAsync } = useRequest(ApiSportCompetitionList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

// 热门地区
const hotSportList = computed(() => {
  if (competitionListData.value && competitionListData.value.hot)
    return competitionListData.value.hot
  return []
})
// 所有地区
const allRegionList = computed(() => {
  if (competitionListData.value && competitionListData.value.list)
    return competitionListData.value.list
  return []
})
// 球种名称
const sportName = computed(() => {
  if (sidebarData.value)
    return sidebarData.value.all.find(a => a.si === sportId)?.sn ?? '-'
  return '-'
})

watch(route, (r) => {
  if (r.name === 'sports-platId-sport') {
    params.value.si = r.params.sport ? +r.params.sport : 0
    competitionListData.value = undefined
    run(params.value)
    // startTimer()
  }
})

onMounted(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <!-- 热门 -->
  <div class="sub-wrapper">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>{{ t('casino_sort_popular') }} {{ sportName }} {{ t('champion_bet') }}</h6>
      </div>
    </div>
    <AppSportsOutrightsRegion
      v-for="region, i in hotSportList" :key="region.pgid"
      :title="region.pgn" :icon="region.ppic" :init="i === 0" :count="region.cl.length"
      :league-list="region.cl" is-hot-game
    />
  </div>

  <div class="sub-wrapper">
    <div class="sports-page-title">
      <div class="sports-page-title">
        <div class="left">
          <BaseIcon name="spt-sort-az" />
          <span>{{ $t('all') }} {{ sportName }} {{ t('champion_bet') }}</span>
        </div>
      </div>
    </div>
    <AppSportsOutrightsRegion
      v-for="region, in allRegionList" :key="region.pgid"
      :title="region.pgn" :icon="region.ppic" :init="false" :count="region.cl.length"
      :league-list="region.cl"
    />
  </div>
</template>

<style lang='scss' scoped>
.sub-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
.content {
  background: var(--content-background);
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);

  &.is-open {
    border-top: 2px solid var(--content-border);
  }
}

.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
  padding: var(--tg-spacing-8);
}
</style>
