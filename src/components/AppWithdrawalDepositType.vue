<script setup lang='ts'>
interface Props {
  modelValue: string
  currentType: {
    label: string
    value: string
    icon?: string
    promo?: string
    pname?: string
  }[]
}
const props = withDefaults(defineProps<Props>(), {
})
const emit = defineEmits(['update:modelValue'])

const changeType = function (type: string) {
  const ref: HTMLElement | null = document.querySelector(`#id${type}`)
  const parentRef = ref?.parentElement
  if (parentRef && ref) {
    const parentHalfWidth = parentRef?.offsetWidth / 2
    const refHalfWidth = ref?.offsetWidth / 2
    const left = ref.offsetLeft - parentHalfWidth + refHalfWidth
    // parentRef.scrollLeft = ref.offsetLeft - parentHalfWidth + refHalfWidth
    parentRef.scrollTo({ left, behavior: 'smooth' })
  }
  emit('update:modelValue', type)
}
</script>

<template>
  <div class="scroll-x withdrawal-deposit-type">
    <div
      v-for="item in currentType"
      :id="`id${item.value}`"
      :key="item.value"
      class="type-btn"
      :class="item.value === props.modelValue ? 'active' : '' "
      @click="changeType(item.value)"
    >
      <BaseIcon
        :name="`/payment/deposit/${item.icon ?? 'dft'}.webp`"
        use-cloud-img
      />
      <span class="label">{{ item.label }}</span>
      <span v-if="item.pname === '赠送'" class="tag">送{{ Number(item.promo) }}%</span>
      <span
        v-else-if="item.pname === '推荐'
          || item.pname === '活动'
          || item.pname === '热门'"
        class="tag"
        :class="{ green: item.pname === '推荐', red: item.pname === '热门' }"
      >{{ item.pname }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.withdrawal-deposit-type{
  width: 100%;
  display: flex;
  gap: .75rem;
  padding: var(--tg-spacing-2) 0;
  // overflow: hidden;
  &::-webkit-scrollbar-thumb{
    display: none;
  }
  .type-btn{
    flex-shrink: 0;
    background: var(--tg-secondary-main);
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
    position: relative;
    overflow: hidden;
    &:active{
      .label, svg {
        transform: scale(.96);
      }
    }
    &:hover{
      opacity: .9;
    }
    &.active{
      background-color: var(--tg-text-blue);
    }
    .tag{
      background-color: var(--tg-text-warn);
      color: var(--tg-text-white);
      font-size: 18px;
      width: 90px;
      height: 30px;
      position: absolute;
      top: -6px;
      right: -36px;
      transform: scale(0.41) rotate(45deg);
      text-align: center;
      line-height: 30px;
    }
    .green{
      background-color: var(--tg-text-green);
    }
    .red{
      background-color: var(--tg-text-error);
    }
  }
}
</style>
