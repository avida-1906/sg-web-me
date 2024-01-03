<script lang="ts" setup>
usePageTitle({ prefix: 'affiliate_plan', isT: true })
const { companyData } = storeToRefs(useAppStore())
</script>

<template>
  <div class="tg-affiliate-retention">
    <p>
      在 {{ companyData?.name }}.com 这里，玩家的满意度一直以来——也将一直都会——是第一要务。
      这是我们为以玩家和联盟会员身份与平台互动的用户们制定长期战略的核心。
      我们力求通过独特的计划和活动来奖励我们的玩家，达到玩家的满意。
    </p>
    <p>这些计划提供额外的资金和奖励，不仅为玩家们带来了更好的博彩体验，也有助于增加联盟佣金的总收入。</p>

    <p>计划包括：</p>
    <div>
      <ul>
        <li>返水</li>
        <li>周度奖金</li>
        <li>月度奖金</li>
        <li>每小时 / 每日充值奖金</li>
        <li>VIP 级别奖金</li>
      </ul>
    </div>

    <p>
      用这独特的方法，您的佣金是以实现这些成本后的庄家优势为依据。
      按照玩家获得福利的程度，您收到的庄家优势佣金将是任何游戏所宣传的大约少于 45% 的庄家优势。
    </p>
    <p>若您想要详细了解费用计算的细目，请随时通过支持人员与联盟经理联系。</p>

    <p class="tg-affiliate-retention-bottom">
      <BaseIcon name="uni-tips" />
      保留计划可让您的推荐用户在体育博彩和娱乐城里使用。
      不过，在计算体育投注的联盟佣金之前，保留计划的费用已被吸收，好让我们可设定标准的 3% 假定利润率。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.tg-affiliate-retention {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
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
    // font-size: var(--tg-font-size-default);
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
  p {
    line-height: 150%;
    color: var(--tg-text-lightgrey) !important;
  }
  ul{
    list-style-type: disc;
    padding: 0 var(--tg-spacing-16);
    li {
      margin: var(--tg-spacing-8) var(--tg-spacing-14);
      line-height: 150%;
      color: var(--tg-text-lightgrey) !important;
    }
  }
}
</style>

<route lang="yaml">
</route>
