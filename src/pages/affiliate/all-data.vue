<script lang="ts" setup>
const { t } = useI18n()

const {
  selected: currency_id,
  list: currencyList,
} = useSelect([
  {
    label: '全部',
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
} = useList(ApiAgencyReportAll, {}, { page_size: 10, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = ref('')

const columns: Column[] = [
  {
    title: t('join_time'),
    dataIndex: 'created_at',
    align: 'center',
  },
  {
    title: t('player_id'),
    dataIndex: 'username',
    align: 'center',
    slot: 'username',
  },
  {
    title: t('deposit'),
    dataIndex: 'deposit_amount',
    align: 'center',
    slot: 'deposit_amount',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'valid_bet_amount',
    align: 'center',
  },
  {
    title: t('total_win_lose'),
    dataIndex: 'net_amount',
    align: 'center',
  },
]

const params = computed(() => {
  return {
    username: searchValue.value,
    currency_id: currency_id.value,
  }
})

function change() {
  console.error(page.value, page_size.value)
  // runAsync(params.value)
}

function search() {
  resetPage()
  runAsync(params.value)
}

function pickerChange() {
  console.error(date)
}

// search()
</script>

<template>
  <div class="all-data-page">
    <div class="table-filter">
      <BaseDatePicker v-model="date" @change="pickerChange" />
      <BaseSelect
        v-model="currency_id"
        :options="currencyList"
        @change="search"
      />
      <div style="max-width: 95px;">
        <BaseInput v-model="searchValue" :placeholder="t('user_account')">
          <template #right-icon>
            <BaseIcon name="uni-search" />
          </template>
        </BaseInput>
      </div>
      <slot name="grand-total" />
    </div>
    <BaseTable
      class="page-all-data"
      :columns="columns"
      :data-source="list"
      :loading="loading"
    >
      <template #username="{ record }">
        <div class="center" style="gap: var(--tg-spacing-4);">
          <BaseIcon name="chat-star-gold" />
          <span>{{ record.username }}</span>
          <BaseIcon name="uni-doc" />
        </div>
      </template>
      <template #deposit_amount="{ record }">
        <span>{{ record.deposit_amount }}</span>
      </template>
    </BaseTable>
    <BasePagination
      v-model:current-page="page"
      v-model:page-size="page_size"
      :total="total"
      @change="change"
    />
  </div>
</template>

<style lang="scss" scoped>
.all-data-page {
  --tg-badge-size: 10px;
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-21);
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
  --tg-table-line-height:1;
  --tg-table-th-font-weight: var(--tg-font-weight-normal);
  --tg-base-select-style-color: var(--tg-text-lightgrey);
  --tg-base-select-style-padding-y: var(--tg-spacing-8);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
  --tg-table-th-background: var(--tg-primary-main);
}
.page-all-data {
  margin: 20px 0;
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
  align-items: center;
  gap: var(--tg-spacing-16);
  font-size: var(--tg-font-size-xs);
}
</style>
