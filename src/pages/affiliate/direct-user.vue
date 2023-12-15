<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
const { copy } = useClipboard()
const { openNotify } = useNotify()
const { userLanguage } = storeToRefs(useLanguageStore())

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
} = useList(ApiAgencyReportUser, {}, { page_size: 10, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })

const columns: Column[] = [
  {
    title: t('statistical_time'),
    dataIndex: 'created_at',
    align: 'center',
    slot: 'created_at',
  },
  {
    title: t('player_id'),
    dataIndex: 'username',
    align: 'center',
    slot: 'username',
  },
  {
    title: t('is_first_deposit'),
    dataIndex: 'deposit_count',
    align: 'center',
    slot: 'deposit_count',
    sort: true,
  },
  {
    title: t('last_login'),
    dataIndex: 'last_login_at',
    align: 'center',
    sort: true,
    slot: 'last_login_at',
  },
  {
    title: t('online_status'),
    dataIndex: 'online',
    align: 'center',
    sort: true,
    slot: 'online',
  },
]

const params = computed(() => {
  return {
    username: searchValue.value,
    currency_id: currency_id.value,
    // start_time: date.value[0],
    // end_time: date.value[1],
    page_size: page_size.value,
    page: page.value,
  }
})

function copyClick(msg: string) {
  copy(msg)
  openNotify({
    type: 'success',
    title: t('notify_title_success'),
    message: t('copy_success') + msg,
  })
}

useListSearch(params, runAsync, resetPage)
</script>

<template>
  <div class="all-data-page">
    <div class="table-filter">
      <BaseDatePicker
        v-model="date"
        :init-start-date="startTime"
        :init-end-date="endTime"
      />
      <BaseSelect
        v-model.lazy="currency_id"
        :options="currencyList"
      />
      <div style="max-width: 195px;">
        <BaseInput v-model="searchValue" :placeholder="t('user_account')">
          <template #right-icon>
            <BaseIcon name="uni-search" />
          </template>
        </BaseInput>
      </div>
      <slot name="grand-total" />
    </div>

    <BaseTable
      class="page-all-data page-direct-finance"
      :columns="columns"
      :data-source="list"
      :loading="loading"
    >
      <template #username="{ record }">
        <div
          class="center cursor-pointer"
          style="gap: var(--tg-spacing-4);"
          @click="copyClick(record.username)"
        >
          <BaseIcon name="chat-star-gold" />
          <span>{{ record.username }}</span>
          <BaseIcon name="uni-doc" />
        </div>
      </template>
      <template #th-online>
        <div style="margin-top: var(--tg-spacing-4);">
          {{ t('times') }}
        </div>
      </template>
      <template #created_at="{ record }">
        <span>
          {{ application.timestampToTime(record.created_at, userLanguage) }}
        </span>
      </template>
      <template #last_login_at="{ record }">
        <span>
          {{ application.timestampToTime(record.last_login_at, userLanguage) }}
        </span>
      </template>
    </BaseTable>
    <BasePagination
      v-if="total > 0"
      v-model:current-page="page"
      v-model:page-size="page_size"
      :total="total"
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

.hint {
  color: var(--tg-text-grey-lighter);
  margin-top: 4px;
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
  align-items: center;
  gap: var(--tg-spacing-16);
  font-size: var(--tg-font-size-xs);
}
</style>
