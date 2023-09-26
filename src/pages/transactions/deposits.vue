<script lang="ts" setup>
const tabList = reactive([
  { label: '加密货币', value: 'byte_coin' },
  { label: '法定货币', value: 'real_coin' },
])
</script>

<template>
  <section class="tg-deposits-record-page">
    <AppTabRecord :tabs="tabList" />
  </section>
</template>

<style lang="scss" scoped>

</style>
