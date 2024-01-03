<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
// const { userLanguage } = storeToRefs(useLanguageStore())

const { list: scaleList } = useScaleData()
const { selected: platformId, list: platformIdList } = useSelect([
  {
    label: t('finance_other_tab_all'),
    value: '',
  },
  ...scaleList,
])
const {
  selected: currency_id,
  list: currencyList,
} = useSelect([
  {
    label: t('finance_other_tab_all'),
    value: '',
  },
  ...getCurrencyOptions(),
])

const {
  list,
  page,
  page_size,
  loading,
  total,
  runAsync,
  resetPage,
} = useList(ApiAgencyCommission, {}, { page_size: 10, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })

const columns: Column[] = [
  {
    title: t('settle_time'),
    dataIndex: 'send_time',
    align: 'center',
    slot: 'send_time',
  },
  {
    title: t('label_type'),
    dataIndex: 'model_name',
    align: 'center',
  },
  {
    title: t('performance'),
    dataIndex: 'valid_bet_amount_direct',
    align: 'center',
  },
  {
    title: t('label_contribute_count'),
    dataIndex: 'direct_user_count',
    align: 'center',
  },
  {
    title: t('finance_funds_transfer_sort_commission'),
    dataIndex: 'commission_amount_direct',
    align: 'center',
  },
  {
    title: t('detail'),
    dataIndex: '',
    align: 'center',
    slot: 'operate',
  },
]

const params = computed(() => {
  return {
    username: searchValue.value,
    currency_id: currency_id.value,
    platform_id: platformId.value,
    start_time: date.value[0],
    end_time: date.value[1],
    page_size: page_size.value,
    page: page.value,
  }
})

onMounted(() => {
  useListSearch(params, runAsync, resetPage)
})
</script>

<template>
  <div class="all-data-page">
    <div class="table-filter">
      <BaseDatePicker
        v-model="date"
        :min="startTime"
        :max="endTime"
      />
      <BaseSelect
        v-model.lazy="platformId"
        :options="platformIdList"
      />
      <BaseSelect
        v-model.lazy="currency_id"
        :options="currencyList"
      />
    </div>

    <BaseTable
      class="page-all-data page-direct-finance"
      :columns="columns"
      :data-source="list"
      :loading="loading"
    >
      <template #username="{ record }">
        <AppReportUserName :username="record.username" :level="`${record.vip}`" />
      </template>
    </BaseTable>
    <BasePagination
      v-if="total > 0"
      v-model:current-page="page"
      v-model:page-size="page_size"
      :total="total"
    />
  </div>
</template>

<style lang="scss" scoped>
.all-data-page {
  --tg-badge-size: 10px;
  --tg-base-select-style-color: var(--tg-text-lightgrey);
  --tg-base-select-style-padding-y: var(--tg-spacing-8);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
}

.hint {
  color: var(--tg-text-grey-lighter);
  margin-top: 4px;
}
.page-all-data {
  margin: 20px 0;
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  --tg-app-amount-font-weight: var(--tg-font-weight-normal);
  .flex-colum {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}

.table-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--tg-spacing-16);
  font-size: var(--tg-font-size-xs);
}
</style>
