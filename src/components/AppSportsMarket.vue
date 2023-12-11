<script setup lang='ts'>
import type { ISportEventInfo } from '~/apis/types'

interface Props {
  showBreadcrumb?: boolean
  isStandard?: boolean
  showMore?: boolean
  autoShow?: boolean
  leagueName?: string
  eventCount?: number
  eventList: ISportEventInfo[]
  baseType: string
  loadingMore?: boolean
}
withDefaults(defineProps<Props>(), {
  isStandard: true,
  autoShow: true,
})
const emit = defineEmits(['more'])

function onMoreClick() {
  emit('more')
}
</script>

<template>
  <BaseSecondaryAccordion
    :title="leagueName"
    :show-more="showMore"
    level="2"
    :init="autoShow"
    :disabled="eventList.length === 0"
    @more="onMoreClick"
  >
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="eventCount" :max="99999" />
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <AppSportsMarketInfo
          v-for="item, i in eventList" :key="item.ei"
          :show-breadcrumb="showBreadcrumb"
          :is-standard="isStandard" :index="i"
          :data="item"
          :base-type="baseType"
          :is-last="i === eventList.length - 1"
        />
        <AppSportsMarketInfoSkeleton v-if="loadingMore" :num="10" />
      </div>
    </template>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
</style>
