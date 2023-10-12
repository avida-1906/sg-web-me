<script lang="ts" setup>
const tabs = [
  { value: 'live-upcoming', label: '滚球与即将开赛的盘口' },
  { value: 'outrights', label: '冠军投注' },
  { value: 'all', label: '全部 网球' },
]

const curTab = ref('')
</script>

<template>
  <div class="tg-sports-hotlive layout-spacing gap-medium">
    <BaseTab v-model="curTab" :list="tabs" size="large" :center="false" />
    <BaseSecondaryAccordion title="ATP" icon="spt-game-intl" level="1">
      <div class="acc-box">
        <AppSportsMarket type="live" :is-standard="true" />
      </div>
    </BaseSecondaryAccordion>
  </div>
</template>

<style lang="scss" scoped>
.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
  padding: var(--tg-spacing-8);
}
.tg-sports-hotlive {

}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
