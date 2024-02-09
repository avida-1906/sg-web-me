<script setup lang='ts'>
import type { ISportOutrightsInfo } from '~/apis/types'
import type { ISportsBreadcrumbs } from '~/types'

interface Props {
  autoShow: boolean
  leagueName: string
  leagueId: string
  isRegionOpen: boolean // 父级是否展开
  count: number
}
const props = defineProps<Props>()
const route = useRoute()
const sport = route.params.sport
const { width } = storeToRefs(useWindowStore())
const { bool: isSelfOpen } = useBoolean(props.autoShow)
const { push } = useLocalRouter()

// 冠军数据
const params = ref({ si: +sport, ci: props.leagueId, page: 1, page_size: 100 })
const { data, run, runAsync, loading } = useRequest(ApiSportOutrightList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

const isRegionOpen = computed(() => props.isRegionOpen)
const isH5Layout = computed(() => width.value < 575)
const eventList = computed(() => {
  if (data.value && data.value.d)
    return data.value.d

  return []
})

// 组件开关时判断是否需要获取数据
function getEventsData() {
  if (eventList.value.length > 0 || loading.value)
    return
  run(params.value)
  startTimer()
}

function onAccordionOpen() {
  isSelfOpen.value = true
  getEventsData()
}
function onAccordionClose() {
  isSelfOpen.value = false
}
// 联赛跳转
function onBreadcrumbsClick({ list, index }:
{ list: ISportsBreadcrumbs[]; index: number },
) {
  if (isH5Layout.value)
    push(replaceSportsPlatId(list[2].path))
  else
    push(replaceSportsPlatId(list[index].path))
}
// 冠军投注页面
function goOutrightsPage(item: ISportOutrightsInfo) {
  const { si, ci, ei } = item
  push(`/sports/${getSportsPlatId()}/outrights?si=${si}&ci=${ci}&ei=${ei}`)
}

watch(isRegionOpen, (a) => {
  if (a && props.autoShow)
    getEventsData()
})

onBeforeUnmount(() => {
  stopTimer()
})

if (props.autoShow && props.isRegionOpen)
  await application.allSettled([runAsync(params.value).then(() => startTimer())])
</script>

<template>
  <BaseSecondaryAccordion
    :title="leagueName"
    level="2"
    :init="autoShow"
    @open="onAccordionOpen"
    @close="onAccordionClose"
  >
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="count" :max="99999" />
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <AppSportsOutrightsInfoSkeleton v-if="loading" :num="count" />
        <template v-else>
          <div v-for="item, i in eventList" :key="item.ei" class="fixture-wrapper">
            <div v-if="i > 0" class="line" />
            <div
              class="outright-preview"
            >
              <span class="name">
                <a class="link">
                  {{ item.oen }}
                </a>
              </span>
              <div class="breadcrumb">
                <BaseBreadcrumbs
                  :list="sportsDataBreadcrumbs(item)" :only-last="isH5Layout"
                  @item-click="onBreadcrumbsClick"
                />
              </div>
              <span class="market-count">
                <BaseButton type="text" size="none" @click="goOutrightsPage(item)">
                  +{{ item.ml[0].ms.length }}
                </BaseButton>
              </span>
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
.outright-preview {
  display: grid;
  grid-column-gap: var(--tg-spacing-8);
  padding: var(--tg-spacing-14) var(--tg-spacing-20);
  grid-template-areas:
      "name marketCount"
      "breadcrumb marketCount";
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.3;
}
.line{
  width: 100%;
  height: 1px;
  background-color: var(--tg-primary-main);
}

.name {
  grid-area: name;
  color: #fff;
}
.breadcrumb {
  grid-area: breadcrumb;
}
.market-count {
  grid-area: marketCount;
  margin: auto 0 auto auto;
  color: var(--tg-secondary-light);
}
</style>
