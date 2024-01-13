<script lang="ts" setup>
const { t } = useI18n()
const {
  list,
  page,
  page_size,
  loading,
  total,
  runAsync,
  prev,
  next,
} = useList(ApiAgencyCommissionRecords,
  {}, { page_size: 10, isWatchPageOrPageSize: false })
const {
  data: recordsClass,
  runAsync: getRecordsClass,
} = useRequest(ApiAgencyCommissionRecordsClass, {
  onSuccess() {
    runAsync()
  },
})

const platformId = ref('')
const date = ref([])
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)
const columns = reactive<Column[]>([
  {
    title: t('label_type'),
    dataIndex: 'cash_type_name',
    slot: 'cash_type_name',
    align: 'center',
  },
  {
    title: t('amount'),
    dataIndex: 'amount',
    slot: 'amount',
    align: 'center',
  },
  {
    title: t('label_draw_time'),
    dataIndex: 'apply_at',
    slot: 'apply_at',
    align: 'center',
  },
  {
    title: t('order_id'),
    dataIndex: 'bill_no',
    slot: 'bill_no',
    align: 'center',
  },
])

const getOptions = computed(() => {
  return [{
    label: t('finance_other_tab_all'),
    value: '',
  }].concat(recordsClass.value?.map((item) => {
    return {
      label: item.CashTypeName,
      value: item.CashType,
    }
  }) ?? [])
})
const getPaginationData = computed(() => {
  return {
    pageSize: page_size.value,
    page: page.value,
    total: total.value,
  }
})

function onPrevious() {
  prev()
  runAsync()
}
function onNext() {
  next()
  runAsync()
}

await application.allSettled(
  [
    getRecordsClass(),
  ],
)
</script>

<template>
  <div class="app-agent-commission-record">
    <div class="grid-box">
      <div class="column-item">
        <span>{{ $t('time') }}</span>
        <BaseDatePicker
          v-model="date"
          :min="startTime"
          :max="endTime"
        />
      </div>
      <div class="column-item">
        <span>{{ $t('label_type') }}</span>
        <BaseSelect
          v-model.lazy="platformId"
          :options="getOptions"
        />
      </div>
    </div>
    <BaseTable
      :columns="columns"
      :data-source="list"
      :loading="loading"
      :skeleton-row="4"
    >
      <template #apply_at="{ record }">
        <div>{{ timeToCustomizeFormat(record.apply_at, 'MM/DD/YYYY') }}</div>
        <div>{{ timeToCustomizeFormat(record.apply_at, 'HH:mm:ss') }}</div>
      </template>
      <template #amount="{ record }">
        <div class="to-right">
          <AppAmount
            :amount="record.amount"
            :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
          />
        </div>
      </template>
    </BaseTable>
    <AppStack
      v-if="total > 10"
      :pagination-data="getPaginationData"
      @previous="onPrevious"
      @next="onNext"
    />
  </div>
</template>

<style lang="scss" scoped>
.to-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.app-agent-commission-record {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
  --tg-base-date-picker-width: auto;
  --tg-base-date-picker-bother: none;
  --tg-base-date-picker-font-size: var(--tg-font-size-xs);
  --tg-base-date-picker-padding: var(--tg-spacing-10) var(--tg-spacing-12);
  --tg-base-date-picker-font-weight: 500;
  --tg-base-select-border: none;
  --tg-base-select-box-shadow: none;
  --tg-base-select-style-padding-y: var(--tg-spacing-10);
  --tg-base-date-picker-color: var(--tg-text-white);
  --tg-base-select-popper-font-weight: var(--tg-font-weight-normal);
  --tg-table-margin-top-empty: 0;
  .grid-box{
    max-width: 375px;
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: var(--tg-spacing-10);
    .column-item{
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-4);
      color: var(--tg-secondary-light);
    }
  }
}
</style>
