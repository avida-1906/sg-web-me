<script setup lang='ts'>
interface Props {
  onPage?: boolean
  slipType?: number
}
const props = defineProps<Props>()

const { t } = useI18n()
const { appContentWidth } = storeToRefs(useWindowStore())
const columnCount = computed(() => {
  if (appContentWidth.value > 1000)
    return 3
  else if (appContentWidth.value > 650)
    return 2
  return 1
})

const currentType = ref(props.slipType ?? 0)
const typeOptions = [
  { label: t('sports_active'), value: 0 },
  { label: t('sports_settled'), value: 1 },
]

watch(props, (a) => {
  if (a.slipType)
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
    <div class="slip-wrapper" :style="`column-count:${columnCount}`">
      <div class="child">
        <AppSportsMyBetSlip />
      </div>
      <div class="child">
        <AppSportsMyBetSlip />
      </div>
      <div class="child">
        <AppSportsMyBetSlip />
      </div>
      <div class="child">
        <AppSportsMyBetSlip />
      </div>
      <div class="child">
        <AppSportsMyBetSlip />
      </div>
      <div class="child">
        <AppSportsMyBetSlip />
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
    margin-bottom: 8px;
    break-inside: avoid;
    width: 100%;
  }
}
</style>
