<script setup lang='ts'>
interface Props {
  modelValue?: string
}

withDefaults(defineProps<Props>(), {

})

const emit = defineEmits(['update:modelValue'])

// const { width } = storeToRefs(useWindowStore())
const {
  renderCurrencyList,
} = useCurrencyData()

// const isMobile = computed(() => width.value < 385)

// function handleKey(item: ISelectOption) {
//   emit('update:modelValue', item.value)
// }
</script>

<template>
  <div class="app-currency-grid">
    <div class="grid-label">
      <span class="title">存款币种</span>
      <BaseButton
        style="--tg-base-button-font-weight: var(--tg-font-weight-normal);"
        type="text" size="none"
      >
        <span style="padding-right: var(--tg-spacing-4);">更多</span>
        <BaseIcon name="uni-d-arrow-right" />
      </BaseButton>
    </div>
    <div class="grid-box">
      <template
        v-for="item, index of renderCurrencyList"
        :key="item.cur"
      >
        <div class="item">
          <AppCurrencyIcon :currency-type="item.type" />
          <span>{{ item.type }}</span>
        </div>
        <div
          v-if="((index + 1) % 4) && index + 1 !== renderCurrencyList.length"
          class="vertical-line"
        />
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.grid-label{
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.4;
  margin-bottom: var(--tg-spacing-8);
  .title{
    color: var(--tg-text-white);
  }
}
.grid-box {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr;
  background-color: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
  justify-items: center;
  align-items: center;
  padding: var(--tg-spacing-12) var(--tg-spacing-16);
  row-gap: var(--tg-spacing-16);
  column-gap: var(--tg-spacing-25);
  --tg-app-currency-icon-size: var(--tg-font-size-lg);
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
    color: var(--tg-text-white);
    line-height: 1.4;
    cursor: pointer;
    &:active{
      transform: scale(0.96);
    }
  }
  .vertical-line{
    height: 24px;
    width: 1px;
    background-color: var(--tg-secondary-main);
  }
}
</style>
