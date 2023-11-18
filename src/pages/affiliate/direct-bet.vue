<script lang="ts" setup>
const { t } = useI18n()

// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: t('player_id'),
    dataIndex: 'account',
    align: 'center',
    slot: 'account',
  },
  {
    title: t('statistical_time'),
    dataIndex: 'settleTime',
    align: 'center',
  },
  {
    title: t('withdraw_amount'),
    dataIndex: 'lastLogin',
    align: 'center',
    slot: 'lastLogin',
  },
  {
    title: t('total_win_lose'),
    dataIndex: 'isOnline',
    align: 'center',
    slot: 'online',
  },
]
const tableData = ref([
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    firstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '+87,565',
  },
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    firstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '-87,565',
  },
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    firstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '+87,565',
  },
])
</script>

<template>
  <AppAffiliateContent mode="account">
    <template #default>
      <BaseTable
        class="page-direct-bet"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
        <template #th-lastLogin>
          <div style="margin-top: var(--tg-spacing-4);">
            {{ t('bet_order_num') }}
          </div>
        </template>
        <template #account="{ record }">
          <div class="center" style="gap: var(--tg-spacing-4);">
            <BaseIcon name="chat-star-gold" />
            <span>{{ record.account }}</span>
            <BaseIcon name="uni-doc" />
          </div>
        </template>
        <template #lastLogin="{ record }">
          <div class="flex-colum">
            <div>{{ record.lastLogin }}</div>
            <div style="color: white;">
              46,785
            </div>
          </div>
        </template>
        <template #online="{ record }">
          <div class="flex-colum">
            <div
              :style="{
                color: record.isOnline[0] === '+'
                  ? 'var(--tg-primary-fail)' : 'var(--tg-primary-success)',
              }"
            >
              {{ record.isOnline }}
            </div>
          </div>
        </template>
      </BaseTable>
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-direct-bet {
  --tg-badge-size: 10px;
  --tg-table-th-padding: var(--tg-spacing-13);
  --tg-table-td-padding: var(--tg-spacing-13);

  .flex-colum {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
