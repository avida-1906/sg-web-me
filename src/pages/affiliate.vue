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
    - {title: menu_title_promotion_tutorial, path: /affiliate/promotion_tutorial}
    - {title: menu_title_my_promotion, path: /affiliate/retention}
    - {title: menu_title_my_commission, path: /affiliate/commission}
    - {title: menu_title_my_performance, path: /affiliate/funds}
    - {title: menu_title_all_data, path: /affiliate/referred-users}
    - {title: menu_title_direct_finance, path: /affiliate/campaigns}
    - {title: menu_title_direct_bet, path: /affiliate/campaigns}
    - {title: menu_title_direct_user, path: /affiliate/campaigns}
    - {title: menu_title_direct_receive, path: /affiliate/campaigns}
    - {title: menu_title_commission_rate, path: /affiliate/campaigns}
    - {title: menu_title_add_new_subagent, path: /affiliate/campaigns}
</route>
