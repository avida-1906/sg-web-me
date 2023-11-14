<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否标准盘
  disabled?: boolean
  baseType: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'baseTypeChange'])

const { t } = useI18n()

const marketTypeText = computed(() => props.modelValue
  ? t('sports_three_options')
  : t('sports_standard'),
)
// 标准盘选项
const baseType = ref(props.baseType)
const baseOptions = [
  { label: t('sports_winner_market'), value: EnumSportMarketType.WINNER },
  { label: t('sports_handicap_market'), value: EnumSportMarketType.HANDICAP },
  { label: t('sports_total_market'), value: EnumSportMarketType.TOTAL },
]
// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: t('home_space_title'), value: 'home' },
]

function toggleBase() {
  emit('update:modelValue', !props.modelValue)
}
function onBaseTypeChange(v: string) {
  emit('baseTypeChange', v)
}
</script>

<template>
  <div class="sports-market-type-select">
    <VTooltip placement="top">
      <BaseButton :disabled="disabled" size="sm" type="text" @click="toggleBase">
        <BaseIcon v-if="modelValue" name="uni-three-top" />
        <BaseIcon v-else name="uni-standard" />
      </BaseButton>
      <template #popper>
        <div class="tiny-menu-item-title">
          {{ marketTypeText }}
        </div>
      </template>
    </VTooltip>
    <BaseSelect
      v-if="modelValue"
      v-model="baseType"
      :options="baseOptions"
      popper
      :style="{ '--tg-base-select-popper-style-padding-y': 'var(--tg-spacing-13)' }"
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
