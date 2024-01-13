<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
const { isLogin } = storeToRefs(useAppStore())
const router = useLocalRouter()
// const { list: scaleList } = useScaleData()
// const { selected: platformId, list: platformIdList } = useSelect([
//   {
//     label: t('finance_other_tab_all'),
//     value: '',
//   },
//   ...scaleList,
// ])
const platformId = ref('')
const platformIdList = ref([
  {
    label: t('finance_other_tab_all'),
    value: '',
  },
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
useRequest(ApiAgencyCommissionModelsList, {
  manual: false,
  ready: isLogin,
  onSuccess(data) {
    platformIdList.value = platformIdList.value.concat(data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    }))
  },
})

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })

const columns: Column[] = [
  {
    title: t('settle_time'),
    dataIndex: 'send_time',
    align: 'center',
    slot: 'time',
  },
  {
    title: t('label_type'),
    dataIndex: 'model_name',
    align: 'center',
    slot: 'model_name',
  },
  {
    title: t('performance'),
    dataIndex: 'valid_bet_amount_direct',
    align: 'center',
    slot: 'bet_amount',
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
    slot: 'commission_amount',
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
      <template #time="{ record }">
        {{ `${timeToDateFormat(record.send_time)} ${timeToCustomizeFormat(
          record.send_time, 'HH:mm:ss')}` }}
      </template>
      <template #model_name="{ record }">
        <span>{{ platformIdList.find(
          item => item.value === record.model_id)?.label ?? '-' }}</span>
      </template>
      <template #bet_amount="{ record }">
        <div class="center">
          <AppAmount
            :amount="record.valid_bet_amount_direct"
            :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
          />
        </div>
      </template>
      <template #commission_amount="{ record }">
        <div class="center">
          <AppAmount
            :amount="record.commission_amount_direct"
            :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
          />
        </div>
      </template>
      <template #operate>
        <BaseButton
          size="none" type="text"
          @click="router.push('/affiliate/my-performance')"
        >
          {{ $t('view_label') }}
        </BaseButton>
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
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
}

.hint {
  color: var(--tg-text-grey-lighter);
  margin-top: 4px;
}
.page-all-data {
  --tg-app-amount-font-weight: var(--tg-font-weight-normal);
}
</style>
