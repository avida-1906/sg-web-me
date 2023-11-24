<script lang="ts" setup>
usePageTitle({ prefix: 'affiliate_bonus', isT: true })
</script>

<template>
  <div class="tg-affiliate-commission">
    <div class="commission-wrap">
      <div class="item">
        <h1>{{ $t('casino') }}</h1>
        <p>{{ $t('commission_cal_tip') }}：</p>
        <code>(Edge as decimal * wagered / 2) * commission rate</code>
      </div>
      <div class="item">
        <h1>{{ $t('sports') }}</h1>
        <p>{{ $t('sports_cal_tip', { rate: '3%' }) }}：</p>
        <code>(0.03 * wagered / 2) * commission rate</code>
      </div>
    </div>
    <div class="tg-affiliate-commission-bottom">
      <BaseIcon name="uni-tips" />
      {{ $t('commission_encourage') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-affiliate-commission {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  .commission-wrap {
    display: flex;
    align-items: baseline;
    gap: var(--tg-spacing-16);
    .item {
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-14);
      h1 {
        font-weight: 600;
        color: var(--tg-text-white);
        font-size: var(--tg-font-size-md);
        padding-bottom: var(--tg-spacing-6);
      }
      p {
        line-height: 150%;
        color: var(--tg-text-lightgrey);
        font-size: var(--tg-font-size-base);
      }
      code {
        text-align: left;
        justify-content: flex-start;
        line-height: 1.5;
        font-weight: 400;
        color: var(--tg-text-lightgrey);
        font-size: var(--tg-font-size-default);
        background-color: var(--tg-secondary-grey);
        padding: var(--tg-spacing-8);
        border-radius: var(--tg-radius-default);
        font-family: monospace;
      }
    }
  }
  .commission-wrap .item:nth-child(2) {
    padding-left: var(--tg-spacing-16);
    border-left: 1px solid var(--tg-secondary-border-color-grey);
  }

  &-bottom {
    line-height: 1.5;
    border-color: var(--tg-secondary-light);
    display: flex;
    background-color: var(--tg-secondary-dark);
    padding: var(--tg-spacing-16);
    gap: var(--tg-spacing-12);
    border: 2px dashed;
    border-radius: var(--tg-radius-xs);
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
    .app-svg-icon {
      pointer-events: none;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
      flex-shrink: 0;
      display: inline-block;
      font-size: var(--tg-font-size-base);
      margin: var(--tg-spacing-3) 0 0 0;
    }
  }
}
</style>

<route lang="yaml">
</route>
