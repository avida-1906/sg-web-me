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
  title: 交易记录
  icon: tabbar-bet
  menu: [{title: 存款, path: /},{title: 提款, path: /},{title: 投注, path: /},{title: 投注档案, path: /casino/home},{title: 其他, path: /casino/home}]
</route>
