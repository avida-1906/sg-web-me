<script lang="ts" setup>
const { t } = useI18n()

// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: t('statistical_time'),
    dataIndex: 'settleTime',
    align: 'center',
    sort: true,
    sortDirections: 'descend',
    slot: 'settleTime',
  },
  {
    title: t('user_account'),
    dataIndex: 'account',
    align: 'center',
    slot: 'account',
  },
  {
    title: t('is_first_deposit'),
    dataIndex: 'isFirstLive',
    align: 'center',
    slot: 'firstLive',
    sort: true,
  },
  {
    title: t('last_login'),
    dataIndex: 'lastLogin',
    align: 'center',
    sort: true,
    slot: 'lastLogin',
  },
  {
    title: t('online_status'),
    dataIndex: 'isOnline',
    align: 'center',
    sort: true,
    slot: 'online',
  },
]
const tableData = ref([
  {
    settleTime: '10/11/2011 23:56:56',
    account: 'jacky666',
    isFirstLive: 1,
    lastLogin: '10/11/2011 23:56:56',
    isOnline: 1,
  },
  {
    settleTime: '10/11/2011 23:56:56',
    account: 'jacky666',
    isFirstLive: 0,
    lastLogin: '10/11/2011 23:56:56',
    isOnline: 0,
  },
  {
    settleTime: '10/11/2011 23:56:56',
    account: 'jacky666',
    isFirstLive: 1,
    lastLogin: '10/11/2011 23:56:56',
    isOnline: 1,
  },
])
</script>

<template>
  <AppAffiliateContent>
    <template #default>
      <BaseTable
        class="page-direct-user"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
        <template #th-online>
          <div style="margin-top: var(--tg-spacing-4);">
            {{ t('times') }}
          </div>
        </template>
        <template #settleTime>
          <div class="flex-colum">
            <div>10/11/2011 </div>
            <div>23:56:56</div>
          </div>
        </template>
        <template #lastLogin>
          <div class="flex-colum">
            <div>10/11/2011 </div>
            <div>23:56:56</div>
          </div>
        </template>
        <template #account="{ record }">
          <div class="center" style="gap: var(--tg-spacing-4);">
            <BaseIcon name="chat-star-gold" />
            <span>{{ record.account }}</span>
            <BaseIcon name="uni-doc" />
          </div>
        </template>
        <template #firstLive="{ record }">
          <span :style="{ color: record.isFirstLive ? '' : 'var(--tg-text-error)' }">
            {{ record.isFirstLive
              ? t('attribute_collector_positive') : t('attribute_collector_negative') }}
          </span>
        </template>
        <template #online="{ record }">
          <div class="flex-colum">
            <BaseBadge
              :color="record.isOnline
                ? 'var(--tg-text-green)' : 'var(--tg-text-lightgrey)'"
              :text="record.isOnline ? t('active_state') : t('offline')"
            />
            <div style="color: white;">
              8{{ t('seq') }}
            </div>
          </div>
        </template>
      </BaseTable>
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-direct-user{
  --tg-badge-size:10px;
  --tg-table-th-padding: var(--tg-spacing-13);
  --tg-table-td-padding: var(--tg-spacing-13);
  .flex-colum{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
