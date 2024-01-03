<script lang="ts" setup>
// interface IPaginationData {
//   pageSize: number
//   page: number
//   total: number
// }

// const paginationData = ref<IPaginationData>(
//   {
//     pageSize: 10,
//     page: 2,
//     total: 21,
//   },
// )
const { t } = useI18n()
const { selected: platformId, list: platformIdList } = useSelect([
  {
    label: t('finance_other_tab_all'),
    value: '',
  },
  {
    label: t('commission_grant'),
    value: '1',
  },
  {
    label: t('commission_draw'),
    value: '2',
  },
])

const date = ref([])
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)
const columns = reactive<Column[]>([
  {
    title: t('label_type'),
    dataIndex: 'type',
    // slot: 'time',
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
    dataIndex: 'time',
    slot: 'time',
    align: 'center',
  },
  {
    title: t('order_id'),
    dataIndex: 'orderId',
    slot: 'order_id',
    align: 'center',
  },
])
const tableData = reactive([
  {
    time: 1699517005157,
    type: '佣金发放',
    amount: '9999.88',
    currencyType: 'CNY',
    orderId: '1234567789',
  },
  {
    time: 1699517005188,
    type: '佣金发放',
    amount: '9999.88',
    currencyType: 'CNY',
    orderId: '1234567789',
  },
  {
    time: 1699517005122,
    type: '佣金发放',
    amount: '9999.88',
    currencyType: 'CNY',
    orderId: '1234567789',
  },
  {
    time: 1699517005000,
    type: '佣金发放',
    amount: '9999.88',
    currencyType: 'CNY',
    orderId: '1234567789',
  },
])

// function onPrevious() {
//   paginationData.value.page--
// }

// function onNext() {
//   paginationData.value.page++
// }
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
          :options="platformIdList"
        />
      </div>
    </div>
    <BaseTable
      v-if="tableData && tableData.length"
      :columns="columns"
      :data-source="tableData"
    >
      <!-- :loading="loading" -->
      <template #time="{ record }">
        <div>{{ timeToFormat(record.time) }}</div>
      </template>
      <template #amount="{ record }">
        <div class="to-right">
          <AppAmount
            :amount="record.amount"
            :currency-type="record.currencyType"
          />
        </div>
      </template>
    </BaseTable>
    <!-- <AppStack
      :pagination-data="paginationData"
      @previous="onPrevious"
      @next="onNext"
    /> -->
    <BaseEmpty v-else :description="t('data_empty')" />
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
  --tg-base-date-picker-color:var(--tg-text-white);
  --tg-base-select-popper-font-weight: var(--tg-font-weight-normal);
  .grid-box{
    max-width: 315px;
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: var(--tg-spacing-10);
    .column-item{
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-4);
    }
  }
}
</style>
