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
  },
  {
    title: '详情',
    dataIndex: '',
    align: 'center',
    slot: 'operate',
  },
]
const tableData: any = ref([
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
  --tg-table-font-size: var(--tg-font-size-xs)
}
</style>

<style lang="scss" scoped>

</style>
