<script lang="ts" setup>
import type { ISportOutrightsInfo } from '~/apis/types'
import type { ISportsBreadcrumbs } from '~/types'

interface Props {
  autoShow: boolean
  data: {
    ci: string
    cn: string
    list: ISportOutrightsInfo[]
  }
}
const props = defineProps<Props>()

const router = useLocalRouter()
const { width } = storeToRefs(useWindowStore())

const isH5Layout = computed(() => width.value < 575)
const dateList = computed(() => {
  const origin = props.data.list.map((a) => {
    const date = timeToDateFormat(a.ed)
    return { ...a, date }
  })
  const arr: { date: string; list: ISportOutrightsInfo[] }[] = []
  for (let i = 0; i < origin.length; i++) {
    if (i === 0) {
      arr.push({ date: origin[i].date, list: [origin[i]] })
      continue
    }
    const index = arr.findIndex(a => a.date === origin[i].date)
    if (index > -1)
      arr[index].list.push(origin[i])
    else
      arr.push({ date: origin[i].date, list: [origin[i]] })
  }
  return { ci: props.data.ci, cn: props.data.cn, list: arr, c: props.data.list.length }
})

// 联赛跳转
function onBreadcrumbsClick({ list, index }:
{ list: ISportsBreadcrumbs[]; index: number },
) {
  if (isH5Layout.value)
    router.push(replaceSportsPlatId(list[2].path))
  else
    router.push(replaceSportsPlatId(list[index].path))
}
// 冠军投注页面
function goOutrightsPage(item: ISportOutrightsInfo) {
  const { si, ci, ei } = item
  router.push(`/sports/${getSportsPlatId()}/outrights?si=${si}&ci=${ci}&ei=${ei}`)
}
</script>

<template>
  <BaseSecondaryAccordion :title="dateList.cn" level="2" :init="autoShow">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="dateList.c" :max="99999" />
      </div>
    </template>
    <div class="wrapper">
      <div v-for="item in dateList.list" :key="item.date">
        <div class="date-time">
          {{ item.date }}
        </div>
        <div v-for="event, i in item.list" :key="event.ei" class="fixture-wrapper">
          <div v-if="i > 0" class="line" />
          <div
            class="outright-preview"
          >
            <span class="name">
              <a class="link">
                {{ event.oen }}
              </a>
            </span>
            <div class="breadcrumb">
              <BaseBreadcrumbs
                :list="sportsDataBreadcrumbs(event)" :only-last="isH5Layout"
                @item-click="onBreadcrumbsClick"
              />
            </div>
            <span class="market-count">
              <BaseButton type="text" size="none" @click="goOutrightsPage(event)">
                +{{ event.ml[0].ms.length }}
              </BaseButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  </BaseSecondaryAccordion>
</template>

<style lang="scss" scoped>
.wrapper{
  padding-bottom: var(--tg-spacing-8);
}
.date-time{
  padding: var(--tg-spacing-6) var(--tg-spacing-16) var(--tg-spacing-8);
  font-size: var(--tg-font-size-xs);
  background-color: var(--tg-secondary-main);
  color: var(--tg-text-lightgrey);
}
.line{
  width: 100%;
  height: 1px;
  background-color: var(--tg-primary-main);
}
.outright-preview {
  display: grid;
  grid-column-gap: var(--tg-spacing-8);
  padding: var(--tg-spacing-8) var(--tg-spacing-20);
  grid-template-areas:
      "name marketCount"
      "breadcrumb marketCount";
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.3;
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
