<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '结算时间',
    dataIndex: 'settleTime',
    align: 'center',
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
  <div>
    <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
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

<style lang="scss">
:root {
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
}
</style>

<style lang="scss" scoped>

</style>
