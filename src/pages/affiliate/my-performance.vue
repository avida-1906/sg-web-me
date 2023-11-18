<script lang="ts" setup>
const { t } = useI18n()

// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: t('join_time'),
    dataIndex: 'settleTime',
    align: 'center',
    slot: 'settleTime',
  },
  {
    title: t('user_account'),
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: t('sub_count'),
    dataIndex: 'performanceNum',
    align: 'center',
    sort: true,
    sortDirections: 'descend',
  },
  {
    title: t('performance'),
    dataIndex: 'contributeNum',
    align: 'center',
    sort: true,
  },
  {
    title: t('label_contribute_commission'),
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
  <AppAffiliateContent>
    <template #default>
      <BaseTable
        class="page-my-performance"
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
.page-my-performance {
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
