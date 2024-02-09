<script lang="ts" setup>
const { startTime, endTime } = getDaIntervalMap(new Date().getTime(), 30)

const { t } = useI18n()
const { isLogin } = storeToRefs(useAppStore())
const {
  list,
  page,
  page_size,
  loading,
  total,
  runAsync,
  resetPage,
} = useList(ApiAgencyReportUser, {}, { page_size: 5, isWatchPageOrPageSize: false })

const date = ref([])
const searchValue = useDebouncedRef({ value: '', delay: 1000 })

const columns: Column[] = [
  {
    title: t('register_time'),
    dataIndex: 'created_at',
    align: 'center',
    slot: 'created_at',
    skeWidth: '100px',
  },
  {
    title: t('user_account'),
    dataIndex: 'username',
    align: 'center',
    slot: 'username',
  },
  {
    title: t('is_first_deposit'),
    dataIndex: 'deposit_count',
    align: 'center',
    slot: 'deposit_count',
    skeWidth: '50px',
  },
  {
    title: t('last_login'),
    dataIndex: 'last_login_at',
    align: 'center',
    slot: 'last_login_at',
    skeWidth: '100px',
  },
  {
    title: t('online_status'),
    dataIndex: 'online',
    align: 'right',
    slot: 'online',
    skeWidth: '50px',
  },
]

const params = computed(() => {
  return {
    username: searchValue.value,
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
      <div>
        <BaseInput v-model="searchValue" :placeholder="t('player_id')" clearable>
          <template #left-icon>
            <div class="center" style="padding-right: var(--tg-spacing-4);">
              <BaseIcon name="uni-search" />
            </div>
          </template>
        </BaseInput>
      </div>
    </div>

    <BaseTable
      class="page-all-data page-direct-finance"
      :columns="columns"
      :data-source="list"
      :loading="loading"
      :skeleton-row="5"
    >
      <template #username="{ record }">
        <AppReportUserName :username="record.username" :level="`${record.vip}`" />
      </template>
      <template #deposit_count="{ record }">
        <span
          :style="{
            color: record.deposit_count <= 0 ? 'var(--tg-text-error)' : '',
          }"
        >
          {{ record.deposit_count
            ? t('attribute_collector_positive') : t('attribute_collector_negative') }}
        </span>
      </template>
      <template #created_at="{ record }">
        {{ `${timeToDateFormat(record.created_at)} ${timeToCustomizeFormat(
          record.created_at, 'HH:mm:ss')}` }}
      </template>
      <template #last_login_at="{ record: { last_login_at } }">
        {{ last_login_at ? `${timeToDateFormat(last_login_at)} ${timeToCustomizeFormat(last_login_at, 'HH:mm:ss')}` : '-' }}
      </template>
      <template #online="{ record }">
        <div class="center" style="justify-content: flex-end;">
          <div
            class="center"
            :class="{
              online: record.online === '2',
              offline: record.online === '1',
            }"
          >
            <BaseIcon v-if="record.online === '2'" name="uni-computer" />
          </div>
          <span>{{ record.online === '2' ? t('active_state') : t('offline') }}</span>
        </div>
      </template>
    </BaseTable>
    <BasePagination
      v-if="total > page_size"
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

.online {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--tg-text-green);
    margin-right: var(--tg-spacing-2);
    font-size: 8px;
}
.offline {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: var(--tg-spacing-2);
  background-color: var(--tg-text-grey-lighter);
}
.page-all-data {
  --tg-app-amount-font-weight: var(--tg-font-weight-normal);
}

.table-filter {
  &>:last-child{
    grid-column-start: span 2;
  }
}
</style>
