<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const { t } = useI18n()
const { upcomingNavs, currentUpcomingNav } = storeToRefs(useSportsStore())

const isAll = computed(() => currentUpcomingNav.value === 0)
const { bool: isStandard, setBool: setStandard } = useBoolean(true)
const baseType = ref('winner')
function onBaseTypeChange(v: string) {
  baseType.value = v
}
watch(currentUpcomingNav, (a) => {
  if (a === 0)
    setStandard(true)
})
</script>

<template>
  <div class="tg-sports-upcoming" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-timing" />
        <h6>{{ t('sports_tab_starting_soon') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :disabled="isAll" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentUpcomingNav" :list="upcomingNavs" />

    <div class="market-wrapper">
      <AppSportsMarket
        :is-standard="isStandard" show-breadcrumb
        :tournament="{ name: '网球', id: '123' }"
      />
    </div>

    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-upcoming {
  margin-top: var(--tg-spacing-24);
  &.on-page{
    margin-top: 0;
  }
}

.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>
