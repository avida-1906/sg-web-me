<script setup lang='ts'>
interface Props {
  label?: string // 标签
  labelContent?: string // 标签内容
  contentColor?: string // 内容颜色
  contentSize?: string // 内容字体
  must?: boolean // 必填
  rightText?: string // 右侧文本
}
const props = withDefaults(defineProps<Props>(), {
  contentColor: '--tg-text-warn',
  contentSize: '12',
  must: false,
})
// const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="base-label">
    <div class="label-wrap">
      <div class="label-left">
        <div class="label-title">
          {{ props.label }}
          <div v-if="props.must" class="label-must">
            *
          </div>
        </div>
        <div class="label-content" :style="`color:var(${props.contentColor});font-size:${props.contentSize}px`">
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
  .label-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label-left{
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: var(--tg-spacing-4);
      .label-title{
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
        display: flex;
        justify-content: center;
        align-items: center;
        .label-must{
          color: var(--tg-text-error);
        }
      }
    }
  }
}
</style>
