<script lang="ts" setup>
interface Props {
  mode?: 'currency' | 'account'
}

withDefaults(defineProps<Props>(), {
  mode: 'currency',
})

const { t } = useI18n()

const {
  value: searchValue,
} = useField<string>('password')

const date = ref([])
const currentPage = ref(1)
const selectSize: Ref<number> = ref(0)
const selectTypeOptions = computed<ISelectOption[]>(() => [
  { label: t('label_all_type'), value: 0 },
])
const selectCurrencyOptions = computed<ISelectOption[]>(() => [
  { label: t('label_currency_types'), value: 0 },
])
</script>

<template>
  <div class="layout-spacing reset app-affiliate-content">
    <slot name="content-top" />
    <div class="table-filter">
      <BaseDatePicker
        v-model="date"
        init-start-date="1900-06-06"
        init-end-date="2000-06-08"
        min="1900-06-05"
      />
      <BaseSelect v-model="selectSize" :options="selectTypeOptions" />
      <BaseSelect
        v-if="mode === 'currency'"
        v-model="selectSize"
        :options="selectCurrencyOptions"
      />
      <div v-else style="max-width: 95px;">
        <BaseInput v-model="searchValue" :placeholder="t('user_account')">
          <template #right-icon>
            <BaseIcon name="uni-search" />
          </template>
        </BaseInput>
      </div>
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
  --tg-table-th-background: var(--tg-primary-main);
  gap: var(--tg-spacing-20);

  .table-filter {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--tg-spacing-16);
    font-size: var(--tg-font-size-xs);
  }
}
</style>
