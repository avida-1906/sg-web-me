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
    slot: 'settleTime',
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
    slot: 'lastLogin',
  },
  {
    title: '在线状态',
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
  <div class="page-direct-user">
    <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
      <template #th-online>
        <div style="margin-top: var(--tg-spacing-4);">
          次数
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
          {{ record.isFirstLive ? '是' : '否' }}
        </span>
      </template>
      <template #online="{ record }">
        <div class="flex-colum">
          <BaseBadge
            :color="record.isOnline ? 'var(--tg-text-green)' : 'var(--tg-text-lightgrey)'"
            :text="record.isOnline ? '在线' : '离线'"
          />
          <div style="color: white;">
            8次
          </div>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.page-direct-user{
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
  --tg-badge-size:10px;
  --tg-table-line-height:1;
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
