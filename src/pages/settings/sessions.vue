<script lang="ts" setup>
const selectValue = ref('1')
const selectOptions = [
  { label: '全部', value: '1' },
  { label: '活跃', value: '2' },
  { label: '不活跃', value: '3' },
]

interface Column {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '浏览器',
    dataIndex: 'browser',
    align: 'left',
  },
  {
    title: '靠近',
    dataIndex: 'near',
    align: 'center',
  },
  {
    title: 'IP地址',
    dataIndex: 'addr',
    align: 'center',
  },
  {
    title: '最后使用',
    dataIndex: 'lastUsed',
    align: 'center',
  },
  {
    title: '行动',
    dataIndex: 'action',
    align: 'right',
  },
]
const tableData = ref([
  {
    browser: 'Chrome (Unknown)',
    near: 'PH, Pasig',
    addr: '155.137.88.4',
    lastUsed: '38分钟前',
    action: '当前',
  },
  {
    browser: 'Chrome (Unknown)',
    near: 'PH, Pasig',
    addr: '155.137.88.4',
    lastUsed: '38分钟前',
    action: '当前',
  },
  {
    browser: 'Chrome (Unknown)',
    near: 'PH, Pasig',
    addr: '155.137.88.4',
    lastUsed: '38分钟前',
    action: '当前',
  },
])
// 上下页
const paginationData = {
  pageSize: 10,
  pageNumber: 1,
  total: 0,
}
</script>

<template>
  <div class="tg-settings-sessions">
    <div class="session-title">
      会话筛选器
    </div>
    <div class="session-select">
      <BaseSelect v-model="selectValue" :options="selectOptions" small />
    </div>
    <div class="session-table">
      <BaseTable
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      />
    </div>
    <div class="session-page">
      <AppStack :pagination-data="paginationData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-sessions {
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  .session-select{
    width: 80px;
    margin-top: var(--tg-spacing-4);
  }
  .session-page{
    margin-top: var(--tg-spacing-16);
  }
}
</style>
