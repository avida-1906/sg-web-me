<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  amount: string | number
  currencyType?: EnumCurrencyKey
  showName?: boolean
  /**
   * 是否显示颜色
   *
   * 大于等于0 显示红色
   *
   * 小于0 显示绿色
   */
  showColor?: boolean
  /** 是否需要显示popper */
  isPopper?: boolean
}

const props = defineProps<Props>()

const colorClass = computed(() => {
  if (!props.showColor)
    return ''

  const amount = Number(props.amount)
  return amount > 0 ? 'green' : 'red'
})
</script>

<template>
  <div>
    <template v-if="isPopper">
      <AppTooltip icon-name="uni-doc" :auto-hide="false" :triggers="['click', 'hover']">
        <template #content>
          <div class="app-amount">
            <span
              class="amount"
              :class="colorClass"
            >
              {{ props.amount }}
            </span>
            <AppCurrencyIcon
              v-if="currencyType"
              :show-name="showName"
              :currency-type="currencyType"
            />
          </div>
        </template>
        <template #popper>
          <div class="app-amount">
            <span
              class="amount"
              :class="colorClass"
            >
              {{ props.amount }}
            </span>
            <AppCurrencyIcon
              v-if="currencyType"
              :show-name="showName"
              :currency-type="currencyType"
            />
          </div>
        </template>
      </AppTooltip>
    </template>
    <div v-else class="app-amount">
      <span
        class="amount"
        :class="colorClass"
      >
        {{ props.amount }}
      </span>
      <AppCurrencyIcon
        v-if="currencyType"
        :show-name="showName"
        :currency-type="currencyType"
      />
    </div>
  </div>
</template>

<style>
:root{
  --tg-app-amount-width: auto;
  --tg-app-amount-max-width: 14ch;
  --tg-app-amount-font-weight: var(--tg-font-weight-semibold);
  --tg-app-amount-font-size: var(--tg-font-size-default);
}
</style>

<style lang='scss' scoped>
.app-amount {
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;
}

.amount {
  width: var(--tg-app-amount-width);
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
  margin-right: var(--tg-spacing-4);
  max-width: var(--tg-app-amount-max-width);
  font-size: var(--tg-app-amount-font-size);
  font-weight: var(--tg-app-amount-font-weight);
  &.red {
    color: var(--tg-primary-fail);
  }
  &.green {
    color: var(--tg-primary-success);
  }
}
</style>
