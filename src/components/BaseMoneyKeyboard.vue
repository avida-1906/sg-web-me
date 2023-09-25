<script setup lang='ts'>
// 123
interface Props {
  options: ISelectOption[]
}
withDefaults(defineProps<Props>(), {
  options: () => [
    { label: '100', value: 100 },
    { label: '500', value: 500 },
    { label: '1000', value: 1000 },
    { label: '5000', value: 5000 },
    { label: '10000', value: 10000 },
    { label: '50000', value: 50000 },
    { label: '100000', value: 100000 },
    { label: '200000', value: 200000 },
  ],
})
</script>

<template>
  <div class="base-money-keyboard">
    <div v-for="item of options" :key="item.label" class="item-key">
      <BaseButton type="text" style="width: 100%;">
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
  }
}
</style>
