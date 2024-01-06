<script lang="ts" setup>
usePageTitle({ prefix: 'VIP' })
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  withMenuTitle: vip
  withMenuIcon: uni-checklist
  withMenuMobileType: tabs
  withMenuMenu:
    - title: vip_promotion_bonus
      path: /vip/promotion-bonus
      token: false
      isT: true
    - title: vip_total_bonus
      path: /vip/day-salary
      token: false
      isT: true
    - title: vip_water_back
      path: /vip/rebate
      token: false
      isT: true
    - title: receive
      path: /vip/receive
      token: false
      isT: true
    # - title: vip_day_salary
    #   path: /vip/day-salary
    #   token: false
    #   isT: true
    # - title: vip_week_salary
    #   path: /vip/week-salary
    #   token: false
    #   isT: true
    # - title: vip_month_salary
    #   path: /vip/month-salary
    #   token: false
    #   isT: true
  withMenuLayoutConf: {padding: 0 0, borderRadius: '0'}
</route>
