<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '加入时间',
    dataIndex: 'settleTime',
    align: 'center',
    slot: 'settleTime',
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
  <div class="page-my-performance">
    <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
      <template #settleTime>
        <div class="flex-colum">
          <div>10/11/2011 </div>
          <div>23:56:56</div>
        </div>
      </template>
      <template #commission="{ record }">
        <span style="color:var(--tg-text-warn)">{{ record.contributeNum }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.page-my-performance {
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
  --tg-table-line-height:1;
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-13);
  .flex-colum{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
