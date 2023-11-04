<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '统计时间',
    dataIndex: 'settleTime',
    align: 'center',
    sort: true,
    sortDirections: 'descend',
  },
  {
    title: '账号',
    dataIndex: 'account',
    align: 'center',
    slot: 'account',
  },
  {
    title: '是否首存',
    dataIndex: 'isFirstLive',
    align: 'center',
    slot: 'firstLive',
    sort: true,
  },
  {
    title: '上次登录',
    dataIndex: 'lastLogin',
    align: 'center',
    sort: true,
  },
  {
    title: '在线状态',
    dataIndex: 'online',
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
    online: '999,999',
  },
  {
    settleTime: '10/11/2011 23:56:56',
    account: 'jacky666',
    isFirstLive: 0,
    lastLogin: '10/11/2011 23:56:56',
    online: '999,999',
  },
  {
    settleTime: '10/11/2011 23:56:56',
    account: 'jacky666',
    isFirstLive: 1,
    lastLogin: '10/11/2011 23:56:56',
    online: '999,999',
  },
])
</script>

<template>
  <div class="page-direct-user">
    <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
      <template #th-online>
        <div>次数</div>
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
          {{ record.isFirstLive ? '是' : '否' }}
        </span>
      </template>
      <template #online>
        <div class="flex-colum">
          <BaseBadge
            color="var(--tg-text-green)"
            text="在线"
          />
          <div style="color: white;">
            8次
          </div>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss">
:root {
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
  --tg-badge-size:10px;
}
</style>

<style lang="scss" scoped>
.page-direct-user{
  .flex-colum{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
