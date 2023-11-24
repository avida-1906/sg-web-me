<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('transaction_deposit') })

const tabList = reactive([
  { label: t('currency_byte_coin'), value: 'byte_coin' },
  { label: t('currency_law_coin'), value: 'real_coin' },
])
</script>

<template>
  <section class="tg-deposits-record-page">
    <AppTabRecord
      :tabs="tabList"
      :empty-text="$t('finance_deposit_empty_text')"
      :download-text="$t('finance_deposit_download_text')"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
  </route>
