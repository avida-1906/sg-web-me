<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-bottom">
    <div class="app-bottom-divider">
      <BaseDivider title-placement="center" spacing="8" size="1">
        <span>        {{ t('or_use') }}</span>
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
  gap: var(--tg-spacing-16);
  &-divider {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    span{
      color: var(--tg-text-lightgrey);
    }
  }
  &-icon {
    gap: var(--tg-spacing-8);

    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(50px,1fr));
    grid-auto-rows: auto;

    .item-svg {
      border-radius: var(--tg-radius-default);
      display: flex;
      justify-content: center;
      align-items: center;
      background:var(--tg-secondary-main);
      font-size: var(--tg-font-size-default);
    }
  }
}
</style>
