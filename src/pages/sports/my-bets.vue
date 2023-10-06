<script lang="ts" setup>
const currentTab = ref('1')
const tabList = [
  { label: '活跃', value: '1' },
  { label: '已结算', value: '2' },
]
</script>

<template>
  <div class="tg-sports-my-bets">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>我的投注</h6>
      </div>
    </div>
    <div class="tab-bar">
      <BaseTab v-model="currentTab" :list="tabList" :center="false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-my-bets {
  margin-top: var(--tg-spacing-24);
  padding-top: var(--tg-spacing-12);
  .tab-bar{
    margin-top: var(--tg-spacing-24);
    margin-bottom: var(--tg-spacing-24);
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
  top: sports-home
</route>
