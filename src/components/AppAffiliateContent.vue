<script lang="ts" setup>
const date = ref([])
const currentPage = ref(1)
const selectSize: Ref<number> = ref(0)
const selectTypeOptions: ISelectOption[] = [
  { label: '全部类型', value: 0 },
]
const selectCurrencyOptions: ISelectOption[] = [
  { label: '货币种类', value: 0 },
]
</script>

<template>
  <div class="layout-spacing reset app-affiliate-content">
    <slot name="content-top" />
    <div class="table-filter">
      <BaseDatePicker v-model="date" />
      <BaseSelect v-model="selectSize" :options="selectTypeOptions" />
      <BaseSelect v-model="selectSize" :options="selectCurrencyOptions" />
      <slot name="grand-total" />
    </div>
    <slot />
    <BasePagination v-model:current-page="currentPage" :total="1008" />
  </div>
</template>

<style lang="scss" scoped>
.app-affiliate-content {
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
  --tg-table-line-height:1;
  --tg-table-th-font-weight: var(--tg-font-weight-normal);
  --tg-base-select-style-color: var(--tg-text-lightgrey);
  --tg-base-select-style-padding-y: var(--tg-spacing-8);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
  gap: var(--tg-spacing-20);

  .table-filter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--tg-spacing-16);
    font-size: var(--tg-font-size-xs);
  }
}
</style>
