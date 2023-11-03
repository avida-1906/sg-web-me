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
    title: '账号',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '下级人数',
    dataIndex: 'performanceNum',
    align: 'center',
    sort: true,
    sortDirections: 'descend',
  },
  {
    title: '业绩',
    dataIndex: 'contributeNum',
    align: 'center',
    sort: true,
  },
  {
    title: '贡献佣金',
    dataIndex: 'commission',
    align: 'center',
    slot: 'commission',
    sort: true,
  },
]
const tableData = ref([
  {
    settleTime: '10/11/2011 23:56:56',
    type: '体育',
    performanceNum: '999,999',
    contributeNum: '999,999',
    commission: '999,999',
  },
  {
    settleTime: '10/11/2011 23:56:56',
    type: '体育',
    performanceNum: '999,999',
    contributeNum: '999,999',
    commission: '999,999',
  },
  {
    settleTime: '10/11/2011 23:56:56',
    type: '体育',
    performanceNum: '999,999',
    contributeNum: '999,999',
    commission: '999,999',
  },
])
</script>

<template>
  <div>
    <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
      <template #commission="{ record }">
        <span style="color:var(--tg-text-warn)">{{ record.contributeNum }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss">
:root {
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
}
</style>

<style lang="scss" scoped></style>
