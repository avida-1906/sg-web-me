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
  browserTitle: 联盟计划 – Stake.com
  withMenuTitle: affiliate
  withMenuIcon: chess-affiliate
  withMenuMobileType: tabs
  withMenuMenu:
    - {title: menu_title_promotion_tutorial, path: /affiliate/promotion-tutorial}
    - {title: menu_title_my_promotion, path: /affiliate/my-promotion}
    - {title: menu_title_my_commission, path: /affiliate/my-commission}
    - {title: menu_title_my_performance, path: /affiliate/my-performance}
    - {title: menu_title_all_data, path: /affiliate/all-data}
    - {title: menu_title_direct_finance, path: /affiliate/direct-finance}
    - {title: menu_title_direct_bet, path: /affiliate/direct-bet}
    - {title: menu_title_direct_user, path: /affiliate/direct-user}
    - {title: menu_title_direct_receive, path: /affiliate/direct-receive}
    - {title: menu_title_commission_rate, path: /affiliate/commission-rate}
    - {title: menu_title_add_new_subagent, path: /affiliate/add-new-subagent}
</route>
