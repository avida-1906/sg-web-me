<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
const { isLogin } = storeToRefs(useAppStore())
const {
  selected: currency_id,
  list: currencyList,
} = useSelect([
  {
    label: t('all_data_all_currencies'),
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
} = useList(ApiAgencyReportAll, {}, { page_size: 5, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })
const { sortMap, setSortMap } = useTableSort()

const columns: Column[] = [
  {
    title: t('statistical_time'),
    dataIndex: 'created_at',
    align: 'center',
    slot: 'created_at',
    skeWidth: '100px',
  },
  {
    title: t('user_account'),
    dataIndex: 'username',
    align: 'center',
    slot: 'username',
  },
  {
    title: t('deposit'),
    dataIndex: 'deposit_amount',
    align: 'center',
    isAmount: true,
    sort: true,
  },
  {
    title: t('effective_bet'),
    dataIndex: 'valid_bet_amount',
    align: 'center',
    isAmount: true,
    sort: true,
  },
  {
    title: t('total_win_lose'),
    dataIndex: 'net_amount',
    align: 'center',
    isAmount: true,
    sort: true,
    showColor: true,
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
  watch(() => isLogin.value, (newValue) => {
    newValue && useListSearch(params, runAsync, resetPage)
  }, { immediate: true })
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
        <BaseInput v-model="searchValue" :placeholder="t('player_id')" clearable>
          <template #left-icon>
            <div class="center" style="padding-right: var(--tg-spacing-4);">
              <BaseIcon name="uni-search" />
            </div>
          </template>
        </BaseInput>
      </div>
    </div>
    <BaseTable
      class="page-all-data"
      :columns="columns"
      :data-source="list"
      :loading="loading"
      :skeleton-row="5"
      is-amount-popper
      @sort="setSortMap"
    >
      <template #created_at="{ record }">
        {{ timeToDateFormat(record.created_at) }}
      </template>
      <template #username="{ record }">
        <AppReportUserName :username="record.username" :level="`${record.vip}`" />
      </template>
    </BaseTable>
    <BasePagination
      v-if="total > page_size"
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
.page-all-data {
  --tg-app-amount-font-weight: var(--tg-font-weight-normal);
}
</style>
