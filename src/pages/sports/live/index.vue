<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const currentGame = ref('2')
const gameList = [
  { name: '网球', id: '2', num: 22 },
  { name: '足球', id: '3', num: 30 },
  { name: '美式橄榄球', id: '4', num: 5 },
]
const isStandard = ref(true)
const baseType = ref('winner')
function onBaseTypeChange(v: string) {
  baseType.value = v
}
</script>

<template>
  <div class="tg-sports-type" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-ball-plate" />
        <h6>滚球盘</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentGame" :list="gameList" />
    <div class="market-wrapper">
      <AppSportsMarket :is-standard="isStandard" auto-show />
      <AppSportsMarket :is-standard="isStandard" auto-show />
    </div>

    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-type {
  margin-top: var(--tg-spacing-24);
  &.on-page{
    margin-top: 0;
  }
}
.market-wrapper{
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom:  var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
