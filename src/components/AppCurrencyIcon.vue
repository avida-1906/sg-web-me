<script setup lang='ts'>
import { EnumCurrency } from '~/utils/enums'

interface Props {
  currencyType: EnumCurrency
  showName?: boolean
  iconAlign?: 'left' | 'right'
}
const props = defineProps<Props>()
const currencyName = computed(() => EnumCurrency[props.currencyType].toLocaleUpperCase())
const iconName = computed(() => EnumCurrency[props.currencyType].toLocaleLowerCase())
const getIsRight = computed(() => props.iconAlign === 'right')
</script>

<template>
  <div class="app-currency-icon">
    <BaseIcon v-if="!getIsRight" :name="`coin-${iconName}`" />
    <span v-if="showName" class="name" :style="`margin-${getIsRight ? 'right' : 'left'}: var(--tg-spacing-4);`">{{ currencyName }}</span>
    <slot name="network" />
    <BaseIcon v-if="getIsRight" :name="`coin-${iconName}`" />
  </div>
</template>

<style lang='scss' scoped>
.app-currency-icon {
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    // margin-left: var(--tg-spacing-4);
  }
}
</style>
