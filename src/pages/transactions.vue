<script lang="ts" setup>
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  title: transaction_record
  icon: tabbar-bet
  menu: [{title: 存款, path: /transactions/deposits},{title: 提款, path: /transactions/withdrawals},{title: 投注, path: /transactions/bets},{title: 投注档案, path: /transactions/archive},{title: 其他, path: /transactions/other}]
</route>
