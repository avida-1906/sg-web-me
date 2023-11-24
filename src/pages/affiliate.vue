<script lang="ts" setup>
usePageTitle({ prefix: 'affiliate', isT: true })
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
  withMenuMobileType: tabs
  withMenuMenu:
    - title: menu_title_promotion_tutorial
      path: /affiliate/promotion-tutorial
      token: false
    - {title: menu_title_my_promotion, path: /affiliate/my-promotion, token: true}
    - {title: menu_title_my_commission, path: /affiliate/my-commission, token: true}
    - {title: menu_title_my_performance, path: /affiliate/my-performance, token: true}
    - {title: menu_title_all_data, path: /affiliate/all-data, token: true}
    - {title: menu_title_direct_finance, path: /affiliate/direct-finance, token: true}
    - {title: menu_title_direct_bet, path: /affiliate/direct-bet, token: true}
    - {title: menu_title_direct_user, path: /affiliate/direct-user, token: true}
    - {title: menu_title_direct_receive, path: /affiliate/direct-receive, token: true}
    - {title: menu_title_commission_rate, path: /affiliate/commission-rate, token: true}
    - {title: menu_title_add_new_subagent, path: /affiliate/add-new-subagent, token: true}
</route>
