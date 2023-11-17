<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()
const { sportLiveNavs, currentLiveNav } = storeToRefs(useSportsStore())
const { currentGlobalCurrency } = useCurrencyData()
ApiSportGetFavoriteList({
  sis: [1],
  cur: currencyConfig[currentGlobalCurrency.value].cur,
})
</script>

<template>
  <div class="tg-sports-favourites" :class="{ 'on-page': onPage }">
    <AppSportsTab v-model="currentLiveNav" :list="sportLiveNavs" />
    timeToFromNow:{{ timeToFromNow() }}
    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-favourites {
  &.on-page {
    margin-top: 0;
  }
}

.dropdown {
  margin-bottom: var(--tg-spacing-24);
  display: inline-block;
}

.btn-arrow-down {
  font-size: var(--tg-font-size-default);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-8);
  line-height: 1.3;

  .icon {
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    .app-svg-icon {
      font-size: var(--tg-font-size-xs);
    }
  }

}

.clear-all {
  width: 100%;
  padding:
    var(--tg-spacing-button-padding-horizontal-xs) var(--tg-spacing-button-padding-vertical-xs);
  font-weight: var(--tg-font-weight-semibold);
  text-align: center;
  font-size: var(--tg-font-size-default);
  color: var(--tg-popper-color-bright);
  cursor: pointer;
  background-color: var(--tg-popper-bg-deep);
}

.base-check-pop-inner {
  padding: var(--tg-spacing-button-padding-horizontal-xs);
  display: flex;
  flex-direction: column;
  max-height: 340px;
  &::-webkit-scrollbar-thumb {
      background: var(--tg-secondary-light);
    }
}

.check-item-label {
  display: inline-flex;
  align-items: center;
  font-weight: var(--tg-font-weight-semibold);
  font-size: var(--tg-font-size-default);
  color: var(--tg-popper-color-default);
  transition: all 0.2s;
  letter-spacing: 0;
  padding-top: 6px;
  padding-bottom: 4px;
  justify-content: space-between;
  gap: 8px;
}

.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
