<script lang="ts" setup>
const { t } = useI18n()
const { selected: tab, list: tabList } = useSelect([
  { label: t('slot'), value: 'dz' },
  { label: t('fishing'), value: 'by' },
  { label: t('chess'), value: 'qp' },
  { label: t('live'), value: 'zr' },
  { label: t('sports'), value: 'ty' },
])

const {
  data,
  loading,
} = useRequest(ApiAgencyCommissionScale, { manual: false })

const columns: Column[] = [
  {
    title: t('class'),
    dataIndex: 'level',
    align: 'center',
    slot: 'level',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'effective_amount',
    align: 'center',
  },
  {
    title: t('rebate_amount'),
    dataIndex: 'rebate_ratio',
    align: 'center',
    slot: 'rebate_ratio',
  },
]

const list = computed(() => [])
</script>

<template>
  <div class="all-data-page">
    <pre>
      {{ data }}
    </pre>
    <div class="table-filter">
      <BaseTab
        v-model="tab"
        style="--tg-tab-style-color: var(--tg-text-lightgrey);"
        :list="tabList"
        line-style
        :center="false"
      />
    </div>
    <BaseTable
      class="page-commission-rate page-all-data"
      :columns="columns"
      :data-source="list"
      :loading="loading"
    >
      <template #commission="{ record }">
        <span style="color:var(--tg-text-warn)">{{ record.contributeNum }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.all-data-page {
  --tg-badge-size: 10px;
  --tg-table-th-padding: var(--tg-spacing-21);
  --tg-table-td-padding: var(--tg-spacing-21);
  --tg-table-font-size: var(--tg-font-size-xs);
  --tg-table-even-background: var(--tg-primary-main);
  --tg-table-th-color: var(--tg-text-white);
  --tg-table-line-height:1;
  --tg-table-th-font-weight: var(--tg-font-weight-normal);
  --tg-base-select-style-color: var(--tg-text-lightgrey);
  --tg-base-select-style-padding-y: var(--tg-spacing-8);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
  --tg-table-th-background: var(--tg-primary-main);
}

.hint {
  color: var(--tg-text-grey-lighter);
  margin-top: 4px;
}
.page-all-data {
  margin: 20px 0;
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  --tg-app-amount-font-weight: var(--tg-font-weight-normal);
  .flex-colum {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}

.table-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--tg-spacing-16);
  font-size: var(--tg-font-size-xs);
}
</style>
