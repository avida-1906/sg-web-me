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
  withMenuTitle: affiliate
  withMenuIcon: chess-affiliate
  browserTitle: 联盟计划 – Stake.com
  withMenuMenu:
    - {title: menu_title_affiliate_overview, path: /affiliate/overview}
    - {title: menu_title_affiliate_retention, path: /affiliate/retention}
    - {title: menu_title_affiliate_commission, path: /affiliate/commission}
    - {title: menu_title_affiliate_funds, path: /affiliate/funds}
    - {title: menu_title_affiliate_users, path: /affiliate/referred-users}
    - {title: menu_title_affiliate_campaigns, path: /affiliate/campaigns}
</route>
