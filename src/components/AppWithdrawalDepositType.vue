<script setup lang='ts'>
interface Props {
  modelValue: string
  currentType: {
    label: string
    value: string
    icon?: string
  }[]
}
const props = withDefaults(defineProps<Props>(), {
})
const emit = defineEmits(['update:modelValue'])

const changeType = function (type: string) {
  emit('update:modelValue', type)
}
</script>

<template>
  <div class="scroll-x withdrawal-deposit-type">
    <div
      v-for="item in currentType" :key="item.value" class="type-btn"
      :class="item.value === props.modelValue ? 'active' : '' "
      @click="changeType(item.value)"
    >
      <BaseIcon :name="item.icon ?? 'fiat-bank'" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.withdrawal-deposit-type{
  display: flex;
  gap: .75rem;
  padding: var(--tg-spacing-2) 0;
  flex-wrap: wrap;
  .type-btn{
    background: var(--tg-secondary-main);
    // min-width: 102px;
    width: auto;
    padding: 0 var(--tg-spacing-12);
    text-align: center;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    // box-shadow: var(--tg-box-shadow);
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.30);
    border-radius: var(--tg-radius-default);
    color: var(--tg-text-white);
    cursor: pointer;
    &:active{
      span, svg {
        transform: scale(.96);
      }
    }
    &:hover{
      opacity: .9;
    }
    &.active{
      background-color: var(--tg-text-blue);
    }
  }
}
</style>
