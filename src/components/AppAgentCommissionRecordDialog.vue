<script lang="ts" setup>
interface IColumns {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
interface IPaginationData {
  pageSize: number
  page: number
  total: number
}

const { t } = useI18n()

const paginationData = ref<IPaginationData>(
  {
    pageSize: 10,
    page: 2,
    total: 21,
  },
)

const columns = reactive<IColumns[]>([
  {
    title: t('label_draw_time'),
    width: 90,
    dataIndex: 'time',
    slot: 'time',
    align: 'left',
  },
  {
    title: t('label_contribute_count'),
    width: 100,
    dataIndex: 'count',
    align: 'center',
  },
  {
    title: t('amount'),
    width: 130,
    dataIndex: 'amount',
    slot: 'amount',
    align: 'right',
  },
])

const tableData = reactive([
  { time: 1699517005157, count: 999, amount: '9999.8880', currencyType: 'BNB' },
  { time: 1699517005188, count: 888, amount: '9999.8880', currencyType: 'BNB' },
  { time: 1699517005122, count: 777, amount: '9999.8880', currencyType: 'BNB' },
  { time: 1699517005000, count: 666, amount: '9999.8880', currencyType: 'BNB' },
])

function onPrevious() {
  paginationData.value.page--
}

function onNext() {
  paginationData.value.page++
}
</script>

<template>
  <div class="app-agent-commission-record">
    <BaseTable
      :columns="columns"
      :data-source="tableData"
    >
      <!-- :loading="loading" -->
      <template #time="{ record }">
        <div>{{ record.time }}</div>
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
    <AppStack
      :pagination-data="paginationData"
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
}
</style>
