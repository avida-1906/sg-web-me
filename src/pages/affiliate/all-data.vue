<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '加入时间',
    dataIndex: 'settleTime',
    align: 'center',
  },
  {
    title: '玩家ID',
    dataIndex: 'account',
    align: 'center',
    slot: 'account',
  },
  {
    title: '存款',
    dataIndex: 'isFirstLive',
    align: 'center',
  },
  {
    title: '有效投注',
    dataIndex: 'lastLogin',
    align: 'center',
  },
  {
    title: '总输赢',
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
        class="page-direct-user"
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
.page-direct-user {
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
