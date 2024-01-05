<script lang="ts" setup>
usePageTitle({ prefix: 'affiliate', isT: true })
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
@media screen and (max-width: 638px) {
  :deep(.table-filter){
    display: grid;
    grid-template-columns: 1fr 1fr;
    &>:first-child{
      grid-column-start: span 2;
    }
    gap: var(--tg-spacing-16) var(--tg-spacing-21);
    --tg-base-date-picker-width:100%;
    --tg-base-date-picker-wrap-flex: none;
    --tg-base-date-picker-bother: none;
    --tg-base-select-border: none;
    // --tg-base-select-box-shadow: none;
    --tg-base-input-style-border: none;
    --tg-base-select-style-padding-y: 10px;
    --tg-base-date-picker-padding: var(--tg-spacing-10) var(--tg-spacing-12);
    --tg-base-input-style-pad-y: 10px;
    --tg-base-date-picker-color: var(--tg-text-white);
    --tg-base-date-picker-font-weight: 500;
    --tg-base-select-style-padding-x: 12px;
    --tg-base-select-popper-font-weight: 500;
    --tg-base-select-icon-right: 12px;
    --tg-base-input-style-font-weight: 500;
  }
}
@media screen and (min-width: 638px) {
  :deep(.table-filter){
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--tg-spacing-16);
    font-size: var(--tg-font-size-xs);
    margin-bottom: 20px;
    --tg-base-date-picker-color: var(--tg-text-white);
    --tg-base-date-picker-font-weight: 500;
    --tg-base-select-style-padding-y: var(--tg-spacing-8);
    --tg-base-select-popper-font-weight: 500;
    --tg-base-input-style-font-weight: 500;
  }
}
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
      isT: true
    - title: menu_title_my_promotion
      path: /affiliate/my-promotion
      token: true
      isT: true
    - title: menu_title_my_commission
      path: /affiliate/my-commission
      token: true
      isT: true
    - title: menu_title_my_performance
      path: /affiliate/my-performance
      token: true
      isT: true
    - title: menu_title_all_data
      path: /affiliate/all-data
      token: true
      isT: true
    - title: menu_title_direct_finance
      path: /affiliate/direct-finance
      token: true
      isT: true
    - title: menu_title_direct_bet
      path: /affiliate/direct-bet
      token: true
      isT: true
    - title: menu_title_direct_user
      path: /affiliate/direct-user
      token: true
      isT: true
    - title: menu_title_direct_receive
      path: /affiliate/direct-receive
      token: true
      isT: true
    - title: menu_title_commission_rate
      path: /affiliate/commission-rate
      token: true
      isT: true
    - title: menu_title_add_new_subagent
      path: /affiliate/add-new-subagent
      token: true
      isT: true
</route>
