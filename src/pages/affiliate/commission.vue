<script lang="ts" setup>
</script>

<template>
  <div class="tg-affiliate-commission">
    <div class="commission-wrap">
      <div class="item">
        <h1>娱乐城</h1>
        <p>我们所有的游戏都带有不同的庄家优势百分比。您可以使用以下公式来计算您的佣金：</p>
        <code>(Edge as decimal * wagered / 2) * commission rate</code>
      </div>
      <div class="item">
        <h1>体育博彩</h1>
        <p>所有体育投注均以 3% 的理论庄家优势进行。您可以使用以下公式来计算您的佣金：</p>
        <code>(0.03 * wagered / 2) * commission rate</code>
      </div>
    </div>
    <div class="tg-affiliate-commission-bottom">
      <BaseIcon name="uni-tips" />
      您若是个影响力极佳并能触及广大群众，或是处在其他特殊情况下的联盟会员，可请联系我们杰出的支持团队。经与联盟经理人讨论后，我们可争取为您定制一套联盟计划。这可能包括更高的佣金。
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
    color: var(--tg-text-lightgrey) !important;
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
