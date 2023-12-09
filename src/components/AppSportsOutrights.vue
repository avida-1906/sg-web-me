<script setup lang='ts'>
interface Props {
  level: 1 | 2 | 3
}
const props = defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const { sidebarData } = storeToRefs(useSportsStore())
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
// 球种名称
const sportName = computed(() => {
  if (sidebarData.value)
    return sidebarData.value.all.find(a => a.si === sportId)?.sn ?? '-'
  return '-'
})
const regionList = computed(() => {
  if (data.value && data.value.d) {
    const origin = data.value.d.filter(a => a.pgid === regionId)
    const arr = []
    for (let i = 0; i < origin.length; i++) {
      if (i === 0) {
        arr.push({ ci: origin[i].ci, cn: origin[i].cn, list: [origin[i]] })
        continue
      }
      const index = arr.findIndex(a => a.ci === origin[i].ci)
      if (index > -1)
        arr[index].list.push(origin[i])
      else
        arr.push({ ci: origin[i].ci, cn: origin[i].cn, list: [origin[i]] })
    }
    return arr
  }
  return []
})
const leagueList = computed(() => {
  if (data.value && data.value.d) {
    const orgin = data.value.d.filter(a => a.ci === leagueId)
    return orgin.length > 0
      ? { ci: orgin[0].ci, cn: orgin[0].cn, list: orgin }
      : { ci: '', cn: '', list: [] }
  }
  return { ci: '', cn: '', list: [] }
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
          <span>{{ $t('all') }} {{ sportName }} {{ t('champion_bet') }}</span>
        </div>
      </div>
    </div>
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
    <div v-show="sportlist.length === 0" class="empty">
      <BaseEmpty icon="empty-1" :description="t('search_no_result')" />
    </div>
  </div>

  <div v-else-if="isRegion" class="acc-box">
    <AppOutrightPreview
      v-for="league, i in regionList" :key="league.ci"
      :auto-show="i === 0" :data="league"
    />
    <div v-show="regionList.length === 0" class="empty">
      <BaseEmpty icon="empty-1" :description="t('search_no_result')" />
    </div>
  </div>

  <template v-else-if="isLeague">
    <AppOutrightPreview v-if="leagueList.list.length > 0" auto-show :data="leagueList" />
    <div v-else class="empty">
      <BaseEmpty icon="empty-1" :description="t('search_no_result')" />
    </div>
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
.empty{
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
