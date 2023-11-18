<script lang="ts" setup>
const { t } = useI18n()

// loading加载
const { bool: loading } = useBoolean(false)
const columns: Column[] = [
  {
    title: t('settle_time'),
    dataIndex: 'settleTime',
    align: 'center',
    slot: 'settleTime',
  },
  {
    title: t('label_type'),
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: t('performance'),
    dataIndex: 'performanceNum',
    align: 'center',
  },
  {
    title: t('label_contribute_count'),
    dataIndex: 'contributeNum',
    align: 'center',
  },
  {
    title: t('finance_funds_transfer_sort_commission'),
    dataIndex: 'commission',
    align: 'center',
    slot: 'commission',
  },
  {
    title: t('detail'),
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
  <AppAffiliateContent>
    <template #grand-total>
      <div>
        {{ t('accu_commission') }}：
        <span class="color-warn" style="font-weight: 500;">999,999,999.00</span>
      </div>
    </template>
    <template #default>
      <BaseTable
        class="page-my-commission"
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
          <span class="color-warn">{{ record.contributeNum }}</span>
        </template>
        <template #operate>
          <BaseButton
            type="text"
            size="none"
            style="color:var(--tg-text-blue);--tg-base-button-font-size:12px;"
          >
            {{ t('view_label') }}
          </BaseButton>
        </template>
      </BaseTable>
    </template>
  </AppAffiliateContent>
</template>

<style lang="scss" scoped>
.page-my-commission {
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-13);

  .flex-colum{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }

}
.color-warn{
  color:var(--tg-text-warn)
}
</style>
