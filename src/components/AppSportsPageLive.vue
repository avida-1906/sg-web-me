<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const { sportLiveNavs, currentLiveNav } = storeToRefs(useSportsStore())
const { bool: isStandard } = useBoolean(true)
const baseType = ref('winner')
function onBaseTypeChange(v: string) {
  baseType.value = v
}

ApiSportEventList({ si: 1, m: 2, page: 1, page_size: 100 })
</script>

<template>
  <div class="tg-sports-type" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-ball-plate" />
        <h6>{{ t('sports_tab_live_events') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentLiveNav" :list="sportLiveNavs" />
    <div class="market-wrapper">
      <AppSportsMarket
        :is-standard="isStandard"
        :tournament="{ name: '澳大利亚 / 女子联赛', id: '123' }"
      />
      <AppSportsMarket
        :is-standard="isStandard"
        :tournament="{ name: '澳大利亚 / 女子联赛', id: '123' }"
      />
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
