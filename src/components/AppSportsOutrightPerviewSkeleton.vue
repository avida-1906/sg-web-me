<script setup lang='ts'>
interface Props {
  num?: number
}
withDefaults(defineProps<Props>(), {
  num: 1,
})
</script>

<template>
  <div
    class="base-secondary-accordion is-open level-2"
  >
    <div class="no-active-scale header">
      <BaseSkeleton animated="ani-opacity" width="120px" height="21px" />
      <div class="arrow">
        <BaseIcon name="uni-stake-arrow-down" />
      </div>
    </div>
    <div class="is-open content">
      <div class="wrapper">
        <AppSportsOutrightsInfoSkeleton :num="num" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
:root {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
}
</style>

<style lang="scss" scoped>
.base-secondary-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 0;
  box-shadow: var(--tg-box-shadow), var(--tg-shadow-inset);
  border-radius: var(--tg-radius-default);
  background: var(--header-background);
  --header-background: var(--tg-secondaryAccordion-header-background);
  --title-color: var(--tg-secondaryAccordion-header-title-color);
  --content-background: var(--tg-secondaryAccordion-content-background);
  --content-border: var(--tg-secondaryAccordion-content-border-color);

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-base);
    width: var(--tg-spacing-18);
    height: var(--tg-spacing-18);
    transition: all ease .25s;
    --tg-icon-color: var(--tg-text-lightgrey);
    &.down{
      transform: rotate(90deg);
    }
  }
  .header {
    width: 100%;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--tg-spacing-12) var(--tg-spacing-16);
    cursor: pointer;
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
  }
  .content {
    background: var(--content-background);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);
    border-top: 2px solid var(--content-border);
  }
}
.wrapper{
  padding: var(--tg-spacing-8) 0;
}
</style>
