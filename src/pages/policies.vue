<script lang="ts" setup>
usePageTitle({ prefix: 'Policies' })
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  withMenuTitle: policies
  withMenuIcon: uni-policies
  withMenuMenu:
    - {title: Terms of Service, path: /policies/terms, token: false}
    - {title: Wager Requirements, path: /policies/wager-requirements, token: false}
    - {title: Anti-Money Laundering, path: /policies/anti-money-laundering, token: false}
    - {title: Privacy, path: /policies/privacy, token: false}
    - {title: Coin Mixing, path: /policies/coin-mixing, token: false}
    - {title: Providers, path: /policies/providers, token: false}
    - {title: Sportsbook, path: /policies/spt-book, token: false}
    - {title: Cookies Policy, path: /policies/cookies, token: false}
    - {title: Self-Exclusion, path: /policies/self-exclusion, token: false}
</route>
