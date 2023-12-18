<script lang="ts" setup>
</script>

<template>
  <div class="app-vip-rule-desc">
    <h2>VIP{{ $t('rule_desc') }}</h2>
    <div class="ul">
      <h3>晋级标准</h3>
      <div class="li">
        {{ $t(`vip_rule_1`) }}
      </div>
      <h3>日俸禄</h3>
      <div class="li">
        {{ $t(`vip_rule_2`) }}
      </div>
      <h3>周俸禄</h3>
      <div class="li">
        {{ $t(`vip_rule_3`) }}
      </div>
      <h3>月俸禄</h3>
      <div class="li">
        {{ $t(`vip_rule_4`) }}
      </div>
      <h3>保级说明</h3>
      <div class="li">
        {{ $t(`vip_rule_5`) }}
      </div>
      <h3>稽核说明</h3>
      <div class="li">
        {{ $t(`vip_rule_6`) }}
      </div>
      <h3>活动声明</h3>
      <div class="li">
        {{ $t(`vip_rule_7`) }}
      </div>
      <h3>解释说明</h3>
      <div class="li">
        {{ $t(`vip_rule_8`) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-vip-rule-desc {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-xs);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.5;
  background: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: white;
    line-height: 26px;
  }
  h3 {
    font-size: 20px;
    line-height: 16px;
    margin-bottom: 8px;
    margin-top: 24px;
    &:first-child {
      margin-top: 16px;
    }
  }
  ul, .ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    // gap: var(--tg-spacing-14);
    li, .li {
      line-height: 22px;
      color: var(--tg-secondary-light);
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
