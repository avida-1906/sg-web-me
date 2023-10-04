<script lang="ts" setup>
import type { Component } from 'vue'
import campaigns from './children/campaigns.vue'
import commission from './children/commission.vue'
import funds from './children/funds.vue'
import overview from './children/overview.vue'
import referredUsers from './children/referred-users.vue'
import retention from './children/retention.vue'

const route = useRoute()

const comps: { [k: string]: Component } = {
  'campaigns': campaigns,
  'commission': commission,
  'funds': funds,
  'overview': overview,
  'referred-users': referredUsers,
  'retention': retention,
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
  title: affiliate
  icon: chess-affiliate
  menu: [{title: 概述, path: /affiliate/overview},{title: 保留计划, path: /affiliate/retention},{title: 佣金, path: /affiliate/commission},{title: 资金, path: /affiliate/funds},{title: 推荐用户, path: /affiliate/referred-users},{title: 活动, path: /affiliate/campaigns}]
</route>
