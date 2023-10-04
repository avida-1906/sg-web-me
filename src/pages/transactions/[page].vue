<script lang="ts" setup>
import type { Component } from 'vue'
import archive from './children/archive.vue'
import bets from './children/bets.vue'
import deposits from './children/deposits.vue'
import other from './children/other.vue'
import withdrawals from './children/withdrawals.vue'

const route = useRoute()

const comps: { [k: string]: Component } = {
  archive,
  bets,
  deposits,
  other,
  withdrawals,
}

const page = computed(() => route.params.page as string)
</script>

<template>
  <div>
    <Component :is="comps[page]" />
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  title: transaction_record
  icon: tabbar-bet
  menu: [{title: 存款, path: /transactions/deposits},{title: 提款, path: /transactions/withdrawals},{title: 投注, path: /transactions/bets},{title: 投注档案, path: /transactions/archive},{title: 其他, path: /transactions/other}]
</route>
