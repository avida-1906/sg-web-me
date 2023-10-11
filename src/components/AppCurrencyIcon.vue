<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis'

interface Props {
  currencyType: EnumCurrencyKey
  showName?: boolean
  iconAlign?: 'left' | 'right'
}
const props = defineProps<Props>()

const { VITE_CURRENCY_ICON_URL } = getEnv()

const getIsRight = computed(() => props.iconAlign === 'right')
</script>

<template>
  <div class="app-currency-icon">
    <div
      v-if="!getIsRight"
      class="icon"
      :data-icon-url="VITE_CURRENCY_ICON_URL"
      :title="currencyType"
    />
    <span
      v-if="showName"
      class="name"
      :style="`margin-${getIsRight ? 'right' : 'left'}: var(--tg-spacing-4);`"
    >{{ currencyType }}</span>
    <slot name="network" />
    <div
      v-if="getIsRight"
      class="icon"
      :data-icon-url="VITE_CURRENCY_ICON_URL"
      :title="currencyType"
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
