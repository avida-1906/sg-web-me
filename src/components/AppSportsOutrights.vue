<script setup lang='ts'>
interface Props {
  level: 1 | 2 | 3
}
const props = defineProps<Props>()

const route = useRoute()
const sportId = route.params.sport ? +route.params.sport : 0
const regionId = route.params.region ? route.params.region.toString() : ''
const leagueId = route.params.league ? route.params.league.toString() : ''
// 冠军数据
const params = ref({ si: sportId, page: 1, page_size: 100 })
const { data, run, runAsync } = useRequest(ApiSportOutrightList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

const isSport = computed(() => props.level === 1)
const isRegion = computed(() => props.level === 2)
const isLeague = computed(() => props.level === 3)
const sportlist = computed(() => {
  return data.value && data.value.d ? sportsOutrightsGroupByRegion(data.value.d) : []
})
const regionList = computed(() => {
  return data.value && data.value.d ? data.value.d.filter(a => a.pgid === regionId) : []
})
const leagueList = computed(() => {
  return data.value && data.value.d ? data.value.d.filter(a => a.ci === leagueId) : []
})

watch(route, (r) => {
  if (r.fullPath.includes('outrights=2')) {
    params.value.si = r.params.sport ? +r.params.sport : 0
    run(params.value)
    startTimer()
  }
})

onBeforeMount(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <div v-if="isSport" class="sub-wrapper">
    <div class="sports-page-title">
      <div class="sports-page-title">
        <div class="left">
          <BaseIcon name="spt-sort-az" />
          <span>{{ $t('order_by_alpha') }}</span>
        </div>
      </div>
    </div>
    <AppSportsLoadingEmpty :list="sportlist" />
    <BaseSecondaryAccordion
      v-for="region, i in sportlist" :key="region.pgid"
      :title="region.pgn"
      level="1"
      :init="i === 0"
      icon="spt-game-intl"
    >
      <template #side="{ isOpen }">
        <div v-show="!isOpen" class="accordion-badge-wrap">
          <BaseBadge :count="region.list.length" :max="99999" />
        </div>
      </template>
      <div class="content is-open">
        <div class="acc-box">
          <AppOutrightPreview
            v-for="league, ii in region.list" :key="league.ci"
            :auto-show="ii === 0" :data="league"
          />
        </div>
      </div>
    </BaseSecondaryAccordion>
  </div>

  <div v-else-if="isRegion" class="acc-box">
    <AppSportsLoadingEmpty :list="regionList" />
    <AppOutrightPreview
      v-for="league, i in regionList" :key="league.ci"
      :auto-show="i === 0" :data="league"
    />
  </div>

  <template v-else-if="isLeague">
    <AppSportsLoadingEmpty :list="leagueList" />
    <AppOutrightPreview
      v-for="item, i in leagueList" :key="item.ci"
      :auto-show="i === 0" :data="item"
    />
  </template>
</template>

<style lang='scss' scoped>
.sub-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-12);
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
