<script lang="ts" setup>
const { t } = useI18n()

// loading加载
const { bool: loading } = useBoolean(false)
const tab = ref('dz')
const tabList = [
  { label: t('slot'), value: 'dz' },
  { label: t('fishing'), value: 'by' },
  { label: t('chess'), value: 'qp' },
  { label: t('live'), value: 'zr' },
  { label: t('sports'), value: 'ty' },
]
const columns: Column[] = [
  {
    title: t('class'),
    dataIndex: 'settleTime',
    align: 'center',
    slot: 'settleTime',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'contributeNum',
    align: 'center',
  },
  {
    title: t('rebate_amount'),
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
      <BaseTab
        v-model="tab"
        style="--tg-tab-style-color: var(--tg-text-lightgrey);"
        :list="tabList"
        line-style
        :center="false"
      />
    </template>
    <template #default>
      <BaseTable
        class="page-commission-rate"
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
.page-commission-rate {
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
