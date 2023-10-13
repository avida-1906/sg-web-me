<script setup lang='ts'>
interface Props {
  showBreadcrumb?: boolean
  isStandard?: boolean
  showMore?: boolean
  tournament?: SportTournament
}
withDefaults(defineProps<Props>(), {
  isStandard: true,
})
</script>

<template>
  <BaseSecondaryAccordion title="ATP / ATP上海站，中国，男单" :show-more="showMore" level="2">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="9" />
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <AppSportsMarketInfo
          :show-breadcrumb="showBreadcrumb"
          :is-standard="isStandard" :index="0"
        />
        <AppSportsMarketInfo
          :show-breadcrumb="showBreadcrumb"
          :is-standard="isStandard" :index="1"
        />
        <AppSportsMarketInfo
          :show-breadcrumb="showBreadcrumb"
          :is-standard="isStandard" :index="2" is-last
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
