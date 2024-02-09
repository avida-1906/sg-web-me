<script lang="ts" setup>
import type { EnumCurrencyKey } from '~/apis/types'

interface IColumns {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}

const today = dayjs()

const { t } = useI18n()

const dayOptions = [
  { label: t('today'), value: '0' },
  { label: t('last_days_mid', { delta: 7 }), value: '6' },
  { label: t('last_days_mid', { delta: 30 }), value: '29' },
]

const { renderBalanceList } = useCurrencyData()

const columns = reactive<IColumns[]>([
  {
    title: t('label_draw_time'),
    width: 90,
    dataIndex: 'updated_at',
    slot: 'updated_at',
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
const dayType = ref(dayOptions[0].value)

const {
  list: records,
  runAsync: runGetRecordAsync,
  page,
  page_size,
  total,
  prev,
  next,
  data: backData,
} = useList(ApiMemberVipBonusRecord, {}, { page_size: 10 })

const params = computed(() => ({
  page: page.value,
  page_size: page_size.value,
  start_time: today.subtract(+dayType.value, 'day').startOf('day').unix(),
  end_time: today.endOf('day').unix(),
}))

function getCurrencyName(id: string | number): EnumCurrencyKey {
  return renderBalanceList.value.filter(c => +c.cur === +id)[0].type
}

function getCashType(cashType: string) {
  const temp
    = Object.entries(PromoTransactionType)
      .filter(([k, v]) => +k > 0 && +k === +cashType)[0]
  return temp ? t(`transaction_${temp[1]}`) : '-'
}

function onPrevious() {
  prev()
}

function onNext() {
  next()
}

runGetRecordAsync(params.value)

watch(() => params.value.start_time, () => {
  setTimeout(() => {
    runGetRecordAsync(params.value)
  }, 0)
})
</script>

<template>
  <div class="app-vip-bonus-record">
    <div class="filters">
      <BaseSelect
        v-model="dayType"
        :options="dayOptions"
        class="select-box"
      />
      <div v-if="backData" class="total">
        <span class="label">{{ t('receive_amount') }}：</span>
        <AppAmount
          currency-type="USDT"
          :amount="+backData.total_amount > 0 ? backData.total_amount : '0.00'"
        />
      </div>
    </div>
    <template v-if="records && records.length">
      <BaseTable
        :columns="columns"
        :data-source="records"
      >
        <!-- :loading="loading" -->
        <template #updated_at="{ record }">
          <div>{{ timeToCustomizeFormat(record.updated_at) }}</div>
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
      <div class="pages">
        <AppStack
          :pagination-data="{ page, pageSize: page_size, total }"
          @previous="onPrevious"
          @next="onNext"
        />
      </div>
    </template>
    <BaseEmpty v-else :description="t('data_empty')" />
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  --tg-base-select-style-padding-y: var(--tg-spacing-6);
  .select-box {
    width: 80px;
  }
  .total {
    display: flex;
    color: var(--tg-text-warn);
    > .label {
      color: var(--tg-text-white);
    }
  }
}
.pages {
  margin-top: var(--tg-spacing-16);
}
.to-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.app-vip-bonus-record {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
}
</style>
