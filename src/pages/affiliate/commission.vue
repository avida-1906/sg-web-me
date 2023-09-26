<script lang="ts" setup>
</script>

<template>
  <div class="tg-affiliate-commission" />
  娱乐城
  我们所有的游戏都带有不同的庄家优势百分比。您可以使用以下公式来计算您的佣金：
  <code> (Edge as decimal * wagered / 2) * commission rate</code>

  体育博彩
  所有体育投注均以 3% 的理论庄家优势进行。您可以使用以下公式来计算您的佣金：
  <code>   (0.03 * wagered / 2) * commission rate</code>

  <div class="tg-affiliate-commission-bottom">
    您若是个影响力极佳并能触及广大群众，或是处在其他特殊情况下的联盟会员，可请联系我们杰出的支持团队。经与联盟经理人讨论后，我们可争取为您定制一套联盟计划。这可能包括更高的佣金。
  </div>
</template>

<style lang="scss">
.tg-affiliate-commission {
  &-bottom {
    line-height: 1.5;
    border-color: var(--tg-secondary-light);
    display: flex;
    background-color: var(--tg-secondary-dark);
    padding: var(--tg-spacing-16);
    gap: var(--tg-spacing-16);
    border: 2px dashed;
    border-radius: var(--tg-radius-xs);
    color: var(--tg-text-lightgrey) !important;
    // font-size: var(--tg-font-size-default);
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
