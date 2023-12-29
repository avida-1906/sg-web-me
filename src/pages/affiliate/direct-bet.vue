<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
const { userLanguage } = storeToRefs(useLanguageStore())

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
} = useList(ApiAgencyReportBet, {}, { page_size: 10, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })

const columns: Column[] = [
  {
    title: t('player_id'),
    dataIndex: 'username',
    align: 'center',
    slot: 'username',
  },
  {
    title: t('time'),
    dataIndex: 'time',
    align: 'center',
    slot: 'time',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'valid_bet_amount',
    align: 'center',
    slot: 'valid_bet_amount',
  },
  {
    title: t('vip_win_lose'),
    dataIndex: 'net_amount',
    align: 'center',
    slot: 'net_amount',
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
      <div style="max-width: 195px;">
        <BaseInput v-model="searchValue" :placeholder="t('player_id')">
          <template #right-icon>
            <BaseIcon name="uni-search" />
          </template>
        </BaseInput>
      </div>
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
      <template #time="{ record }">
        <span>
          {{ application.timestampToTime(record.time * 1000, userLanguage) }}
        </span>
      </template>
      <template #valid_bet_amount="{ record }">
        <div class="center">
          <AppAmount
            :amount="record.valid_bet_amount"
            :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
          />
        </div>
      </template>
      <template #net_amount="{ record }">
        <div class="center">
          <AppAmount
            :amount="record.net_amount"
            :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
            show-color
          />
        </div>
      </template>
    </BaseTable>
    <BasePagination
      v-if="total > 10"
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
