<script lang="ts" setup>
</script>

<template>
  <div class="app-vip-rule-desc">
    <h3>VIP{{ $t('rule_desc') }}</h3>
    <ul>
      <li v-for="i in 8" :key="i">
        {{ `${i}.${$t(`vip_rule_${i}`)}` }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.app-vip-rule-desc {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-xs);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.5;
  h3 {
    font-size: var(--tg-font-size-default);
    padding-top: var(--tg-spacing-16);
    padding-bottom: var(--tg-spacing-8);
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--tg-spacing-14);
  }
}
</style>
