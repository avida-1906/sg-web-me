<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '玩家ID',
    dataIndex: 'account',
    align: 'center',
    slot: 'account',
  },
  {
    title: '统计时间',
    dataIndex: 'settleTime',
    align: 'center',
  },
  {
    title: '存款金额',
    dataIndex: 'isFirstLive',
    align: 'center',
    slot: 'firstLive',
  },
  {
    title: '提款金额',
    dataIndex: 'lastLogin',
    align: 'center',
    slot: 'lastLogin',
  },
  {
    title: '存款和取款差额',
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
    isOnline: '87,565',
  },
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    firstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '87,565',
  },
  {
    settleTime: '10/11/2011',
    account: 'jacky666',
    firstLive: '87,5654',
    lastLogin: '87,5654',
    isOnline: '87,565',
  },
])
</script>

<template>
  <AppAffiliateContent mode="account">
    <template #default>
      <BaseTable
        class="page-direct-finance"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
        <template #th-online>
          <div style="margin-top: var(--tg-spacing-4);">
            当前余额
          </div>
        </template>
        <template #th-firstLive>
          <div style="margin-top: var(--tg-spacing-4);">
            次数
          </div>
        </template>
        <template #th-lastLogin>
          <div style="margin-top: var(--tg-spacing-4);">
            次数
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
          <div class="flex-colum">
            <div>{{ record.firstLive }}</div>
            <div style="color: white;">
              46,785
            </div>
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
            <div>{{ record.isOnline }}</div>
            <div style="color: white;">
              46,785
            </div>
          </div>
        </template>
      </BaseTable>
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-direct-finance {
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
