<script setup lang='ts'>
interface Props {
  onPage?: boolean
  slipType?: number
}
const props = defineProps<Props>()

const { t } = useI18n()
const { appContentWidth } = storeToRefs(useWindowStore())
const { currentGlobalCurrency } = storeToRefs(useAppStore())

const currentType = ref(props.slipType ?? 0)
const typeOptions = [
  { label: t('sports_active'), value: 0 },
  { label: t('sports_settled'), value: 1 },
]

const { data, loading } = useRequest(() => ApiSportBetList({
  kind: 'normal',
  settle: currentType.value,
  cur: currencyConfig[currentGlobalCurrency.value].cur,
}),
{ manual: false, refreshDeps: [currentGlobalCurrency, currentType] })
const list = computed(() => data.value && data.value.list ? data.value.list : [])

const columnCount = computed(() => {
  if (appContentWidth.value > 1000)
    return 3
  else if (appContentWidth.value > 650)
    return 2
  return 1
})

watch(props, (a) => {
  if (a.slipType === 0 || a.slipType === 1)
    currentType.value = a.slipType
})
</script>

<template>
  <div class="sports-my-bets">
    <div v-if="onPage" class="sports-page-title title">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>{{ t('my_bets') }}</h6>
      </div>
      <div class="right">
        <BaseSelect
          v-model="currentType" style="
          --tg-base-select-popper-style-padding-y:var(--tg-spacing-13);
          --tg-base-select-popper-style-padding-x:var(--tg-spacing-16)"
          :options="typeOptions" popper
        />
      </div>
    </div>
    <AppSportsLoadingEmpty :loading="loading" :list="list" />
    <div
      v-if="!loading && list.length > 0"
      class="slip-wrapper" :style="`column-count:${columnCount}`"
    >
      <div v-for="item in list" :key="item.ono" class="child">
        <AppSportsMyBetSlip :data="item" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.title{
  margin-bottom: var(--tg-spacing-24);
}
.slip-wrapper {
  width: 100%;
  column-count: var(--column-count);
  column-gap: 16px;
  margin: var(--tg-spacing-24) 0;

  .child {
    margin-bottom: 3px;
    break-inside: avoid;
    width: 100%;
  }
}
</style>
