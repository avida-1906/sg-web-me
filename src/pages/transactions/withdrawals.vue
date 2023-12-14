<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('transaction_withdraw') })

const tab = ref()
const tabList = reactive([
  { label: t('currency_byte_coin'), value: 'byt_w_coin' },
  { label: '电线', value: 'real_w_coin' },
])
</script>

<template>
  <section class="tg-withdrawals-record-page">
    <AppTabRecord
      v-model:tab-value="tab"
      content-type="withdraw"
      :tabs="tabList"
      :empty-text="tab === 'byt_w_coin' ? $t('finance_withdraw_empty_text') : '暂无法定货币提款'"
      :download-text="$t('finance_withdraw_download_text')"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
  </route>
