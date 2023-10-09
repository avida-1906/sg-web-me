<script setup lang='ts'>
interface Props {
  isLive?: boolean
}
withDefaults(defineProps<Props>(), {
  isLive: true,
})
</script>

<template>
  <BaseSecondaryAccordion title="ATP / ATP上海站，中国，男单">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" style="--tg-badge-font-size: 12px;margin-right: 16px;">
        <BaseBadge :count="9" />
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <AppSportsMarketInfo :index="0" />
        <AppSportsMarketInfo :index="1" />
        <AppSportsMarketInfo :index="2" />
      </div>
    </template>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
</style>
