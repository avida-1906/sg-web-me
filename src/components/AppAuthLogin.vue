<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-bottom">
    <div class="app-bottom-divider">
      <BaseDivider title-placement="center">
        {{ t('or_use') }}
      </BaseDivider>
    </div>
    <div class="app-bottom-icon">
      <BaseButton class="item-svg">
        <BaseIcon name="facebook" />
      </BaseButton>
      <BaseButton class="item-svg">
        <BaseIcon name="google" />
      </BaseButton>
      <BaseButton class="item-svg">
        <BaseIcon name="line" />
      </BaseButton>
      <BaseButton class="item-svg">
        <BaseIcon name="messenger" />
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  &-divider {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    padding-top: var(--tg-spacing-button-padding-vertical-xs);
  }
  &-icon {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    gap: var(--tg-spacing-5);

    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(50px,1fr));
    grid-auto-rows: auto;

    .item-svg {
      // width: 70px;
      // height: 40px;
      // cursor: pointer;
      // flex-shrink: 0;
      border-radius: var(--tg-radius-default);
      display: flex;
      justify-content: center;
      align-items: center;
      background:var(--tg-secondary-main);
      font-size: var(--tg-font-size-default);
      // -tg-icon-color: var(--tg-text-lightgrey);
    }
  }
}
</style>
