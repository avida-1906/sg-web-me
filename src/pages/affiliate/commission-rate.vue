<script lang="ts" setup>
// loading加载
const { bool: loading } = useBoolean(false)
const tab = ref('dz')
const tabList = [
  { label: '电子', value: 'dz' },
  { label: '捕鱼', value: 'by' },
  { label: '棋牌', value: 'qp' },
  { label: '真人', value: 'zr' },
  { label: '体育', value: 'ty' },
]
const columns: Column[] = [
  {
    title: '级别',
    dataIndex: 'settleTime',
    align: 'center',
    slot: 'settleTime',
  },
  {
    title: '有效投注',
    dataIndex: 'contributeNum',
    align: 'center',
  },
  {
    title: '返佣金额',
    dataIndex: 'commission',
    align: 'center',
    slot: 'commission',
  },
]
const tableData = ref([
  {
    settleTime: '1',
    contributeNum: '1.00万+',
    commission: '55元/万',
  },
  {
    settleTime: '2',
    contributeNum: '1.00万+',
    commission: '55元/万',
  },
  {
    settleTime: '3',
    contributeNum: '1.00万+',
    commission: '55元/万',
  },
])
</script>

<template>
  <AppAffiliateContent>
    <template #content-top>
      <div style="display: inline-flex;">
        <BaseTab v-model="tab" :list="tabList" line-style />
      </div>
    </template>
    <template #default>
      <BaseTable
        class="page-my-performance"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
      >
        <template #commission="{ record }">
          <span style="color:var(--tg-text-warn)">{{ record.contributeNum }}</span>
        </template>
      </BaseTable>
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-my-performance {
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-21);

  .flex-colum {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
