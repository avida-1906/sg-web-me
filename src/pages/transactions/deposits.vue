<script lang="ts" setup>
const tabList = reactive([
  { label: '加密货币', value: 'byte_coin' },
  { label: '法定货币', value: 'real_coin' },
])
</script>

<template>
  <section class="tg-deposits-record-page">
    <AppTabRecord :tabs="tabList" :empty-text="$t('finance_deposit_empty_text')" :download-text="$t('finance_deposit_download_text')" />
  </section>
</template>

<style lang="scss" scoped>

</style>
