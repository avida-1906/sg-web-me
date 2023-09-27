<script lang="ts" setup>
const { t } = useI18n()
const tabList = reactive([
  { label: t('finance_other_tab_all'), value: '' },
  { label: t('finance_other_tab_bonus'), value: 'bonus' },
  { label: t('finance_other_tab_drop'), value: 'drop' },
  { label: t('finance_other_tab_campaign_withdrawal'), value: 'campaign_withdrawal' },
  { label: t('finance_other_tab_reload_claim'), value: 'reload_claim' },
  { label: t('finance_other_tab_race_payout'), value: 'race_payout' },
  { label: t('finance_other_tab_rains_received'), value: 'rains_received' },
  { label: t('finance_other_tab_rains_sent'), value: 'rains_sent' },
  { label: t('finance_other_tab_rakeback_received'), value: 'rakeback_received' },
  { label: t('finance_other_tab_sportsbook_promotion_payout'), value: 'sportsbook_promotion_payout' },
  { label: t('finance_other_tab_tips_received'), value: 'tips_received' },
  { label: t('finance_other_tab_tips_sent'), value: 'tips_sent' },
  { label: t('finance_other_tab_vault_deposit'), value: 'vault_deposit' },
  { label: t('finance_other_tab_vault_withdrawal'), value: 'vault_withdrawal' },
])
</script>

<template>
  <section class="tg-transactions-other-record-page">
    <AppTabRecord :tabs="tabList" :empty-text="$t('finance_other_empty_text')" />
  </section>
</template>

<style lang="scss" scoped>

</style>
