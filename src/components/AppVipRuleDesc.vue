<script lang="ts" setup>
</script>

<template>
  <div class="app-vip-rule-desc">
    <div class="h2">
      {{ $t('rule_desc', { vip: 'VIP' }) }}
    </div>
    <div class="ul">
      <div class="h3">
        {{ $t('up_rule') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_1`) }}</div>
      </div>
      <div class="h3">
        {{ $t('vip_day_salary') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_2`) }}</div>
      </div>
      <div class="h3">
        {{ $t('vip_week_salary') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_3`) }}</div>
      </div>
      <div class="h3">
        {{ $t('vip_month_salary') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_4`) }}</div>
      </div>
      <div class="h3">
        {{ $t('keep_level_desc') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_5`) }}</div>
      </div>
      <div class="h3">
        {{ $t('check_desc') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_6`) }}</div>
      </div>
      <div class="h3">
        {{ $t('activity_desc') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_7`) }}</div>
      </div>
      <div class="h3">
        {{ $t('explain_desc') }}
      </div>
      <div class="li">
        <div>{{ $t(`vip_rule_8`) }}</div>
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
  padding: var(--tg-spacing-12);
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  h2, .h2 {
    font-size: 20px;
    font-weight: 600;
    color: white;
    line-height: 26px;
  }
  h3, .h3 {
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
