<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '结算时间',
    dataIndex: 'settleTime',
    align: 'center',
    slot: 'settleTime',
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '业绩',
    dataIndex: 'performanceNum',
    align: 'center',
  },
  {
    title: '贡献人数',
    dataIndex: 'contributeNum',
    align: 'center',
  },
  {
    title: '佣金',
    dataIndex: 'commission',
    align: 'center',
    slot: 'commission',
  },
  {
    title: '详情',
    dataIndex: '',
    align: 'center',
    slot: 'operate',
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
  <div class="page-my-commission">
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
      <template #operate>
        <BaseButton type="text" padding0 font-size="12" style="color:var(--tg-text-blue)">
          查看
        </BaseButton>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.page-my-commission {
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
