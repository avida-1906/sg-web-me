<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis'
import { currencyConfig } from '~/composables/useCurrencyData'

interface Props {
  currencyType: EnumCurrencyKey
  showName?: boolean
  iconAlign?: 'left' | 'right'
}
const props = defineProps<Props>()

const getIsRight = computed(() => props.iconAlign === 'right')

const iconUrl = computed(() => {
  return `/currency/${currencyConfig[props.currencyType].cur}.webp`
})
</script>

<template>
  <div class="app-currency-icon">
    <BaseIcon
      v-if="!getIsRight"
      :name="iconUrl"
      is-cloud-img
    />
    <span
      v-if="showName"
      class="name"
      :style="`margin-${getIsRight ? 'right' : 'left'}: var(--tg-spacing-4);`"
    >{{ currencyType }}</span>
    <slot name="network" />
    <BaseIcon
      v-if="getIsRight"
      :name="iconUrl"
      is-cloud-img
    />
  </div>
</template>

<style lang='scss' scoped>
.app-currency-icon {
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;

  .icon {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: red;
  }

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }
}
</style>
