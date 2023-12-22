<script setup lang='ts'>
type BaseType = ImportMetaEnv['VITE_SPORT_DEFAULT_MARKET_TYPE']
interface Props {
  modelValue: BaseType // 是否标准盘
  disabled?: boolean
  isStandard: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'marketTypeChange'])

const { t } = useI18n()

// const marketTypeText = computed(() => props.isStandard
//   ? t('sports_three_options')
//   : t('sports_standard'),
// )
// 标准盘选项
const baseType = ref(props.modelValue)
const baseTypeOptions = [
  { label: t('sports_winner_market'), value: EnumSportMarketType.WINNER },
  { label: t('sports_total_market'), value: EnumSportMarketType.TOTAL },
  { label: t('sports_handicap_market'), value: EnumSportMarketType.HANDICAP },
]
// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: t('home_space_title'), value: 'home' },
]

// function toggleMarket() {
//   emit('marketTypeChange', !props.isStandard)
// }
function onBaseTypeChange(v: BaseType) {
  emit('update:modelValue', v)
}

watch(() => props.modelValue, (a) => {
  baseType.value = a
})
</script>

<template>
  <div class="sports-market-type-select">
    <!-- <VTooltip placement="top">
      <BaseButton disabled size="sm" type="text" @click="toggleMarket">
        <BaseIcon v-if="isStandard" name="uni-three-top" />
        <BaseIcon v-else name="uni-standard" />
      </BaseButton>
      <template #popper>
        <div class="tiny-menu-item-title">
          {{ marketTypeText }}
        </div>
      </template>
    </VTooltip> -->
    <BaseSelect
      v-if="isStandard"
      v-model="baseType"
      :options="baseTypeOptions"
      popper
      style="
        --tg-base-select-hover-bg-color:var(--tg-secondary-grey);
         "
      @select="onBaseTypeChange"
    />
    <BaseSelect
      v-else
      v-model="threeType"
      :options="threeOptions"
      popper
      disabled
    />
  </div>
</template>

<style lang='scss' scoped>
.sports-market-type-select{
  display: flex;
}
</style>
