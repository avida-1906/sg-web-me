<script setup lang='ts'>
interface Props {
  options?: ISelectOption[]
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  options: () => [
    { label: '100', value: '100' },
    { label: '500', value: '500' },
    { label: '1000', value: '1000' },
    { label: '5000', value: '5000' },
    { label: '10000', value: '10000' },
    { label: '50000', value: '50000' },
    { label: '100000', value: '100000' },
    { label: '200000', value: '200000' },
  ],
})

const emit = defineEmits(['update:modelValue'])

const { width } = storeToRefs(useWindowStore())

const isMobile = computed(() => width.value < 385)

function handleKey(item: ISelectOption) {
  emit('update:modelValue', item.value)
}
</script>

<template>
  <div
    class="base-money-keyboard"
    :style="{ 'grid-template-columns': isMobile ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)' }"
  >
    <div
      v-for="item of options"
      :key="item.label"
      class="item-key"
      :class="{ active: item.value === modelValue }"
    >
      <BaseButton
        type="text"
        style="width: 100%;color:var(--tg-text-white);font-weight: 500;"
        @click="handleKey(item)"
      >
        {{ item.label }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-money-keyboard{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  .item-key{

    border-radius: var(--tg-radius-default);
    border: 2px solid var(--tg-secondary-main);
    background: var(--tg-secondary-dark);
    box-shadow: var(--tg-box-shadow);
    &.active{
      border-color: var(--tg-text-blue);
      border: 2px solid var(--tg-text-blue);
    }
  }
}
</style>
