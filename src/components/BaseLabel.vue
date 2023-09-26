<script setup lang='ts'>
interface Props {
  label?: string // 标签
  labelContent?: string // 标签内容
  contentColor?: string // 内容颜色
  contentSize?: string // 内容字体
}
const props = withDefaults(defineProps<Props>(), {
  contentColor: '--tg-text-warn',
  contentSize: '12',
})
// const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="base-label">
    <div class="label-wrap">
      <div class="label-title">
        {{ props.label }}
      </div>
      <div class="label-content" :style="`color:var(${props.contentColor});font-size:${props.contentSize}px`">
        {{ props.labelContent }}
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang='scss' scoped>
.base-label{
  .label-wrap{
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: var(--tg-spacing-4);
    .label-title{
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-semibold);
    }
  }
}
</style>
