<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('transaction_withdraw') })

const tabList = reactive([
  { label: t('currency_byte_coin'), value: 'byt_w_coin' },
  { label: t('currency_law_coin'), value: 'real_w_coin' },
])
</script>

<template>
  <section class="tg-withdrawals-record-page">
    <AppTabRecord
      :tabs="tabList"
      :empty-text="$t('finance_withdraw_empty_text')"
      :download-text="$t('finance_withdraw_download_text')"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
  </route>
