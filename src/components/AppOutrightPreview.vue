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
defineProps<Props>()

const router = useRouter()
const { width } = storeToRefs(useWindowStore())

const isH5Layout = computed(() => width.value < 575)

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
  <BaseSecondaryAccordion :title="data.cn" level="2" :init="autoShow">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="data.list.length" :max="99999" />
      </div>
    </template>
    <div v-for="item, i in data.list" :key="item.ei" class="fixture-wrapper">
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
  </BaseSecondaryAccordion>
</template>

<style lang="scss" scoped>
.line{
  width: 100%;
  height: 1px;
  background-color: var(--tg-primary-main);
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
.group-time {
  display: flex;
  align-items: center;
  padding: calc(var(--tg-spacing-8) - 2px) var(--tg-spacing-16) var(--tg-spacing-8);
  position: sticky;
  top: -1px;
  z-index: 3;
  width: 100%;
  background: var(--tg-secondary-main);
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-xs);
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
