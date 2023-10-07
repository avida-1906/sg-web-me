<script lang="ts" setup>
interface Column {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}

const { bool: loading } = useBoolean(false)

const selectValue = ref('1')
const selectOptions = [
  { label: '全部', value: '1' },
  { label: '活跃', value: '2' },
  { label: '不活跃', value: '3' },
]
const columns: Column[] = [
  {
    title: '浏览器',
    dataIndex: 'browser',
    width: 180,
    align: 'left',
  },
  {
    title: '靠近',
    dataIndex: 'near',
    width: 120,
    align: 'center',
  },
  {
    title: 'IP地址',
    dataIndex: 'addr',
    width: 130,
    align: 'center',
  },
  {
    title: '最后使用',
    dataIndex: 'lastUsed',
    width: 100,
    align: 'center',
  },
  {
    title: '行动',
    dataIndex: 'action',
    slot: 'action',
    width: 100,
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
    <div class="session-table scroll-x">
      <BaseTable
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
        <template #action="{ record }">
          <div class="slot-action">
            <BaseButton type="text" size="xs" class="but-action">
              <span>
                {{ record.action }}
              </span>
            </BaseButton>
          </div>
        </template>
      </BaseTable>
    </div>
    <div class="session-page">
      <AppStack :pagination-data="paginationData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-sessions {
  font-size: var(--tg-font-size-default);
  // font-weight: var(--tg-font-weight-semibold);
  .session-select{
    width: 80px;
    margin-top: var(--tg-spacing-4);
    margin-bottom: var(--tg-spacing-16);
  }
  .session-table{
    font-weight: var(--tg-font-weight-default);
  }
  .session-page{
    margin-top: var(--tg-spacing-16);
  }
  .slot-action{
    span{
      color: var(--tg-text-error);
    }
    .but-action{
      padding: var(--tg-spacing-7) 0 var(--tg-spacing-8) !important;
    }
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 账户会话 – Stake.com
</route>
