<script setup lang='ts'>
interface Props {
  isStandard: boolean
  baseType: string
}
defineProps<Props>()

const { t } = useI18n()
const { sidebarData } = storeToRefs(useSportsStore())
const route = useRoute()
const sport = computed(() => route.params.sport ? +route.params.sport : 0)

const params = ref({ si: sport.value, kind: 'normal' })
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
    return sidebarData.value.all.find(a => a.si === sport.value)?.sn ?? '-'
  return '-'
})

watch(route, (r) => {
  if (r.name === 'sports-platId-sport') {
    params.value.si = r.params.sport ? +r.params.sport : 0
    competitionListData.value = undefined
    run(params.value)
    startTimer()
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
  <div class="sub-wrapper hot">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>{{ t('casino_sort_popular') }} {{ sportName }}</h6>
      </div>
    </div>
    <AppSportsMarketRegion
      v-for="region, index in hotSportList"
      :key="region.pgid"
      :title="region.pgn"
      :icon="region.ppic"
      :init="index === 0"
      :count="region.c"
      :is-standard="isStandard"
      :base-type="baseType"
      :league-list="region.cl"
      is-hot-game
    />
  </div>

  <!-- 按字母顺序排序 -->
  <div class="sub-wrapper">
    <h3 class="sub-title">
      <BaseIcon name="spt-sort-az" />
      <span>{{ t('all') }} {{ sportName }}</span>
    </h3>
    <AppSportsMarketRegion
      v-for="region in allRegionList"
      :key="region.pgid"
      :title="region.pgn"
      :icon="region.ppic"
      :init="false"
      :count="region.c"
      :is-standard="isStandard"
      :base-type="baseType"
      :league-list="region.cl"
    />
  </div>
</template>

<style lang='scss' scoped>
.wrapper,.sub-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-24);
}
.sub-wrapper{
  gap:  var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}

.sub-title {
  color: var(--tg-text-white);
  text-align: left;
  justify-content: flex-start;
  font-weight: var(--tg-font-weight-semibold);
  display: inline-flex;
  align-items: center;
  font-size: var(--tg-font-size-md);
  line-height: 1.5;
  .app-svg-icon {
    margin-right: var(--tg-spacing-8);
  }
}
</style>
