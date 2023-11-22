<script lang="ts" setup>
import type { EnumCurrencyKey } from '~/apis/types'

interface IColumns {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
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

const { renderBalanceList } = useCurrencyData()

const columns = reactive<IColumns[]>([
  {
    title: t('label_draw_time'),
    width: 90,
    dataIndex: 'created_at',
    slot: 'created_at',
    align: 'left',
  },
  {
    title: t('receive_type'),
    width: 100,
    dataIndex: 'cash_type',
    slot: 'cash_type',
    align: 'center',
  },
  {
    title: t('amount'),
    width: 130,
    dataIndex: 'receive_amount',
    slot: 'receive_amount',
    align: 'right',
  },
])

const { run: runGetRecord, data } = useRequest(ApiMemberVipBonusRecord)

runGetRecord()

function getCurrencyName(id: string | number): EnumCurrencyKey {
  return renderBalanceList.value.filter(c => +c.cur === +id)[0].type
}

function getCashType(cashType: string) {
  const temp
    = Object.entries(PromoTransactionType)
      .filter(([k, v]) => +k > 0 && +k === +cashType)[0]
  return temp ? t(`transaction_${temp[1]}`) : '-'
}

// function onPrevious() {
//   paginationData.value.page--
// }

// function onNext() {
//   paginationData.value.page++
// }
</script>

<template>
  <div class="app-vip-bonus-record">
    <BaseTable
      v-if="data && data.length"
      :columns="columns"
      :data-source="data"
    >
      <!-- :loading="loading" -->
      <template #created_at="{ record }">
        <div>{{ record.created_at }}</div>
      </template>
      <template #cash_type="{ record }">
        {{ getCashType(record.cash_type) }}
      </template>
      <template #receive_amount="{ record }">
        <div class="to-right">
          <AppAmount
            :amount="record.receive_amount"
            :currency-type="getCurrencyName(record.receive_currency_id)"
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
.app-vip-bonus-record {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
}
</style>
