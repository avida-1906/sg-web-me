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
</route>
