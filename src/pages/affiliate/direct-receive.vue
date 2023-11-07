<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: '统计日期',
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
    title: '领取总额',
    dataIndex: 'performanceNum',
    align: 'center',
  },
  {
    title: '活动',
    dataIndex: 'contributeNum',
    align: 'center',
  },
  {
    title: '反水',
    dataIndex: 'commission',
    align: 'center',
  },
  {
    title: '代理佣金',
    dataIndex: 'commission',
    align: 'center',
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
  <AppAffiliateContent>
    <template #default>
      <BaseTable
        class="page-direct-receive"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
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
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-direct-receive {
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-13);

  .flex-colum {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
