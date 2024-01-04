<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis/types'
import { currencyConfig } from '~/composables/useCurrencyData'

interface Props {
  currencyType: EnumCurrencyKey
  showName?: boolean
  iconAlign?: 'left' | 'right'
}
const props = defineProps<Props>()

const getIsRight = computed(() => props.iconAlign === 'right')

const iconUrl = computed(() => {
  return `/currency/${currencyConfig[props.currencyType]?.cur}.webp`
})
</script>

<template>
  <div class="app-currency-icon">
    <div v-if="!getIsRight" class="icon" :title="currencyType">
      <BaseImage :url="iconUrl" is-cloud />
    </div>
    <span
      v-if="showName"
      class="name"
      :style="`margin-${getIsRight ? 'right' : 'left'}: var(--tg-spacing-4);`"
    >{{ currencyType }}</span>
    <slot name="network" />
    <div v-if="getIsRight" class="icon" :title="currencyType">
      <BaseImage :url="iconUrl" is-cloud />
    </div>
  </div>
</template>

<style lang="scss">
  :root{
    --tg-app-currency-icon-style-color: inherit;
    --tg-app-currency-icon-style-margin:0;
    --tg-app-currency-icon-size: var(--tg-font-size-default);
  }
</style>

<style lang='scss' scoped>
.app-currency-icon {
  font-size: inherit;
  color: --tg-app-currency-icon-style-color;
  display: flex;
  align-items: center;
  margin: --tg-app-currency-icon-style-margin;

  .icon {
    width: var(--tg-app-currency-icon-size);
    height: var(--tg-app-currency-icon-size);
  }

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }
}
</style>
