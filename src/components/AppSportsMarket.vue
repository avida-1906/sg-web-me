<script setup lang='ts'>
interface Props {
  type: 'live' | 'upcoming'
  isStandard?: boolean
  showMore?: boolean
  tournament?: SportTournament
}
withDefaults(defineProps<Props>(), {
  type: 'live',
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
        <AppSportsMarketInfo :type="type" :is-standard="isStandard" :index="0" />
        <AppSportsMarketInfo :type="type" :is-standard="isStandard" :index="1" />
        <AppSportsMarketInfo :type="type" :is-standard="isStandard" :index="2" is-last />
      </div>
    </template>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
</style>
