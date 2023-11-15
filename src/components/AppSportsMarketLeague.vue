<script setup lang='ts'>
interface Props {
  showBreadcrumb?: boolean
  isStandard?: boolean
  showMore?: boolean
  autoShow?: boolean
  leagueName: string
  leagueId: string
  baseType: string
  isRegionOpen: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isStandard: true,
  autoShow: true,
})
const route = useRoute()
const sport = route.params.sport
const isRegionOpen = computed(() => props.isRegionOpen)

const { data, run, loading } = useRequest(() =>
  ApiSportEventList({ si: +sport, m: 5, ci: [props.leagueId], page: 1, page_size: 100 }),
)
const eventList = computed(() => data.value ? data.value.list : [])
const eventCount = computed(() => data.value ? data.value.list.length : 0)

// 获取数据
function getEventsData() {
  if (data.value || loading.value)
    return
  run()
}

function onAccordionOpen() {
  getEventsData()
}

watch(isRegionOpen, (a) => {
  if (a)
    getEventsData()
})

onMounted(() => {
  if (props.autoShow)
    getEventsData()
})
</script>

<template>
  <BaseSecondaryAccordion
    :title="leagueName"
    :show-more="showMore"
    level="2"
    :init="autoShow"
    @open="onAccordionOpen"
  >
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="eventCount" />
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <AppSportsMarketInfo
          v-for="item, i in eventList" :key="item.hti"
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
