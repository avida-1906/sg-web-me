<script setup lang='ts'>
const gameType = ref('')
const tabList = [
  { label: '大厅', value: 'all' },
  { label: '真人娱乐场', value: 'real' },
  { label: '特色老虎机', value: 'slot' },
  { label: '游戏节目', value: 'live' },
  { label: 'Stake 原创游戏', value: 'origin' },
]
</script>

<template>
  <div class="sports">
    <div class="layout-spacing">
      <div class="hero-wrapper mt-24">
        <AppBanner />
      </div>
      <div class="mt-24">
        <AppGameSearch game-type="2" />
      </div>
      <div class="mt-24">
        <BaseTab v-model="gameType" :list="tabList" />
      </div>
      <div class="content-wrapper mt-24">
        <AppAmount amount="0.01888888" :currency-type="EnumCurrency.BTC" />
        <AppAmount amount="0.00001234" :currency-type="19" />
        <AppAmount amount="0.00001234" :currency-type="20" />
        <AppAmount amount="0.00001234" :currency-type="21" />
        <AppAmount amount="0.00001234" :currency-type="22" />
        <AppAmount amount="0.00001234" :currency-type="23" />
        <AppAmount amount="0.00001234" :currency-type="24" />
      </div>
    </div>
    <div class="layout-spacing">
      <AppBetData mode="casino" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports{
}
</style>

<route lang="yaml">
meta:
  layout: home
  </route>
