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
const date = ref([])
const currentPage = ref(1)
const selectSize: Ref<number> = ref(0)
const selectTypeOptions: ISelectOption[] = [
  { label: '全部类型', value: 0 },
]
const selectCurrencyOptions: ISelectOption[] = [
  { label: '货币种类', value: 0 },
]
</script>

<template>
  <div class="layout-spacing reset page-my-commission">
    <div class="table-filter">
      <BaseDatePicker v-model="date" />
      <BaseSelect v-model="selectSize" :options="selectTypeOptions" />
      <BaseSelect v-model="selectSize" :options="selectCurrencyOptions" />
      <div>
        累计佣金：<span class="color-warn" style="font-weight: 500;">999,999,999.00</span>
      </div>
    </div>
    <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
      <template #settleTime>
        <div class="flex-colum">
          <div>10/11/2011 </div>
          <div>23:56:56</div>
        </div>
      </template>
      <template #commission="{ record }">
        <span class="color-warn">{{ record.contributeNum }}</span>
      </template>
      <template #operate>
        <BaseButton type="text" padding0 font-size="12" style="color:var(--tg-text-blue)">
          查看
        </BaseButton>
      </template>
    </BaseTable>
    <BasePagination v-model:current-page="currentPage" :total="1008" />
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
  --tg-table-th-font-weight: var(--tg-font-weight-normal);
  --tg-base-select-style-color: var(--tg-text-lightgrey);
  --tg-base-select-style-padding-y: var(--tg-spacing-8);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
  gap: var(--tg-spacing-20);
  .table-filter{
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-16);
    font-size: var(--tg-font-size-xs);
  }
  .flex-colum{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
  .color-warn{
    color:var(--tg-text-warn)
  }
}
</style>
