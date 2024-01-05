<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
// const { userLanguage } = storeToRefs(useLanguageStore())

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
} = useList(ApiAgencyPerformance, {}, { page_size: 10, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })
const { sortMap, setSortMap } = useTableSort()

const columns: Column[] = [
  {
    title: t('join_time'),
    dataIndex: 'created_at',
    align: 'center',
    slot: 'created_at',
  },
  {
    title: t('user_account'),
    dataIndex: 'username',
    align: 'center',
    slot: 'username',
  },
  {
    title: t('sub_count'),
    dataIndex: 'direct_user_count',
    align: 'center',
    sort: true,
    sortDirections: 'descend',
  },
  {
    title: t('performance'),
    dataIndex: 'valid_bet_amount_direct',
    align: 'center',
    sort: true,
  },
  {
    title: t('label_contribute_commission'),
    dataIndex: 'commission_amount_direct',
    align: 'center',
    slot: 'commission_amount_direct',
    sort: true,
  },
]

const params = computed(() => {
  return {
    username: searchValue.value,
    currency_id: currency_id.value,
    start_time: date.value[0],
    end_time: date.value[1],
    page_size: page_size.value,
    page: page.value,
    ...sortMap.value,
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
        v-model.lazy="currency_id"
        :options="currencyList"
      />
      <div>
        <BaseInput v-model="searchValue" :placeholder="t('player_id')">
          <template #right-icon>
            <div class="center" style="padding-right: var(--tg-spacing-4);">
              <BaseIcon name="uni-search" />
            </div>
          </template>
        </BaseInput>
      </div>
    </div>
    <BaseTable
      class="page-all-data page-direct-finance"
      :columns="columns"
      :data-source="list"
      :loading="loading"
      @sort="setSortMap"
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

  --tg-base-select-style-padding-right: var(--tg-spacing-28);
}

.hint {
  color: var(--tg-text-grey-lighter);
  margin-top: 4px;
}
.page-all-data {
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  --tg-app-amount-font-weight: var(--tg-font-weight-normal);
}
</style>
