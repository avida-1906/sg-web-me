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
    - {title: 概述, path: /affiliate/overview}
    - {title: 保留计划, path: /affiliate/retention}
    - {title: 佣金, path: /affiliate/commission}
    - {title: 资金, path: /affiliate/funds}
    - {title: 推荐用户, path: /affiliate/referred-users}
    - {title: 活动, path: /affiliate/campaigns}
</route>
