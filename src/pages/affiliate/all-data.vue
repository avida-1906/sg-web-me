<script lang="ts" setup>
const { t } = useI18n()

// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: t('join_time'),
    dataIndex: 'settleTime',
    align: 'center',
  },
  {
    title: t('player_id'),
    dataIndex: 'account',
    align: 'center',
    slot: 'account',
  },
  {
    title: t('deposit'),
    dataIndex: 'isFirstLive',
    align: 'center',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'lastLogin',
    align: 'center',
  },
  {
    title: t('total_win_lose'),
    dataIndex: 'isOnline',
    align: 'center',
  },
]
const tableData = ref([
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    isFirstLive: '87, 5654',
    lastLogin: '87,5654',
    isOnline: '87,5654',
  },
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    isFirstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '87,5654',
  },
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    isFirstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '87,5654',
  },
])
</script>

<template>
  <AppAffiliateContent mode="account">
    <template #default>
      <BaseTable
        class="page-all-data"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
        <template #account="{ record }">
          <div class="center" style="gap: var(--tg-spacing-4);">
            <BaseIcon name="chat-star-gold" />
            <span>{{ record.account }}</span>
            <BaseIcon name="uni-doc" />
          </div>
        </template>
      </BaseTable>
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-all-data {
  --tg-badge-size: 10px;
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-21);

  .flex-colum {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
