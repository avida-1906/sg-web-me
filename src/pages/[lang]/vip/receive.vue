<script lang="ts" setup>
import type { EnumCurrencyKey } from '~/apis/types'

const today = dayjs()

const { t } = useI18n()

const dayOptions = [
  { label: t('today'), value: '0' },
  { label: t('last_days_mid', { delta: 7 }), value: '6' },
  { label: t('last_days_mid', { delta: 30 }), value: '29' },
  { label: t('last_days_mid', { delta: 90 }), value: '89' },
]
const typeOptions = [
  {
    label: t('finance_other_tab_all'),
    value: '',
  },
  { label: t('vip_promotion_bonus'), value: '1' },
  { label: t('vip_day_salary_bonus'), value: '2' },
  { label: t('vip_week_salary_bonus'), value: '3' },
  { label: t('vip_month_salary_bonus'), value: '4' },
]

const { renderBalanceList } = useCurrencyData()

const columns = reactive<Column[]>([
  {
    title: t('label_draw_time'),
    dataIndex: 'updated_at',
    slot: 'updated_at',
    align: 'center',
    width: '33%',
  },
  {
    title: t('receive_type'),
    dataIndex: 'cash_type',
    slot: 'cash_type',
    align: 'center',
    width: '33%',
  },
  {
    title: t('receive_bonus_amount'),
    dataIndex: 'receive_amount',
    slot: 'receive_amount',
    align: 'center',
    width: '33%',
  },
])
const dayType = ref('89')
const bonusType = ref('')

const {
  list: records,
  runAsync: runGetRecordAsync,
  page,
  page_size,
  total,
  prev,
  next,
  data: backData,
  loading,
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
  nextTick(() => {
    runGetRecordAsync(params.value)
  })
})
</script>

<template>
  <div class="app-vip-bonus-record">
    <div class="filters">
      <BaseSelect v-model="dayType" :options="dayOptions" />
      <BaseSelect v-model="bonusType" :options="typeOptions" />
    </div>
    <BaseTable
      :loading="loading"
      :columns="columns"
      :data-source="records"
    >
      <template #updated_at="{ record }">
        <div>{{ timeToFormat(record.updated_at) }}</div>
      </template>
      <template #cash_type="{ record }">
        {{ getCashType(record.cash_type) }}
      </template>
      <template #receive_amount="{ record }">
        <div class="center">
          <AppAmount
            :amount="record.receive_amount"
            :currency-type="getCurrencyName(record.receive_currency_id)"
          />
        </div>
      </template>
    </BaseTable>
    <div v-if="total > 10" class="pages">
      <AppStack
        :pagination-data="{ page, pageSize: page_size, total }"
        @previous="onPrevious" @next="onNext"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  max-width: 425px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 20px;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  --tg-base-select-style-padding-y: var(--tg-spacing-6);
}

.pages {
  margin-top: var(--tg-spacing-16);
}
</style>
