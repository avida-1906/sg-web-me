<script lang="ts" setup>
usePageTitle({ prefix: 'transaction_record', isT: true })
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  withMenuTitle: transaction_record
  withMenuIcon: tabbar-bet
  withMenuMenu:
    - {title: menu_title_settings_deposits, path: /transactions/deposits}
    - {title: menu_title_settings_withdrawals, path: /transactions/withdrawals}
    - {title: menu_title_settings_bets, path: /transactions/bets}
    - {title: menu_title_settings_archive, path: /transactions/archive}
    - {title: menu_title_settings_other, path: /transactions/other}
</route>
