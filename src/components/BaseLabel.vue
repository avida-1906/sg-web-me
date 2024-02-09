<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  label?: string // 标签
  labelContent?: string // 标签内容
  contentColor?: string // 内容颜色
  contentSize?: string // 内容字体
  must?: boolean // 必填
  mustSmall?: boolean // 小
  rightText?: string // 右侧文本
  icon?: string // icon
  currentCurrency?: EnumCurrencyKey
  needFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  contentColor: '--tg-text-warn',
  contentSize: '12',
  must: false,
})

const baseLabelRef = ref()

function catchIt() {
  if (props.needFocus)
    baseLabelRef.value?.querySelector('input').focus()
}
</script>

<template>
  <div ref="baseLabelRef" class="base-label" @click="catchIt">
    <div class="label-wrap">
      <div class="label-left">
        <BaseIcon v-if="props.icon" :name="props.icon" />
        <AppCurrencyIcon v-if="currentCurrency" :currency-type="currentCurrency" />
        <div class="label-title">
          {{ props.label }}
          <div
            v-if="props.must || props.mustSmall"
            :class="{ 'label-must': props.must, 'label-must-small': props.mustSmall }"
          >
            <span>*</span>
          </div>
        </div>
        <div
          class="label-content"
          :style="`color:var(${props.contentColor});font-size:${props.contentSize}px`"
        >
          {{ props.labelContent }}
        </div>
      </div>
      <div class="label-right">
        {{ props.rightText }}
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang='scss' scoped>
.base-label{
  font-size: var(--tg-font-size-default);
  .label-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: var(--tg-spacing-4);
      .label-title{
        color: var(--tg-secondary-light);
        font-weight: var(--tg-font-weight-semibold);
        font-size: var(--tg-font-size-default);
        display: flex;
        justify-content: center;
        align-items: center;
        .label-must{
          color: var(--tg-text-error);
        }
        .label-must-small{
          color: var(--tg-text-error);
          margin-left: var(--tg-spacing-4);
        }
      }
    }
  }
}
</style>
