<script lang="ts" setup>
const { t } = useI18n()
const { list: scaleList } = useScaleData()
const { selected: tab, list: tabList } = useSelect(scaleList)

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
    slot: 'effective_amount',
  },
  {
    title: t('rebate_amount'),
    dataIndex: 'rebate_ratio',
    align: 'center',
    slot: 'rebate_ratio',
  },
]

const list = computed(() => {
  const conf = data.value?.conf
  const currentSelected = tab.value

  if (!conf)
    return []
  const result = conf.reduce((acc, cur) => {
    const { model_ids, levels } = cur
    const modelIds = model_ids.split(',')

    if (modelIds.includes(currentSelected) && Array.isArray(levels))
      acc.push(...levels)

    return acc
  }, [] as any[])

  return result
})
</script>

<template>
  <div class="all-data-page">
    <div class="table-filter">
      <BaseTab
        v-model="tab"
        style="--tg-tab-style-color: var(--tg-text-lightgrey);"
        :list="tabList"
        :center="false"
      />
    </div>
    <BaseTable
      class="page-all-data page-commission-rate"
      :columns="columns"
      :data-source="list"
      :loading="loading"
    >
      <template #rebate_ratio="{ record }">
        <span style="color: var(--tg-text-warn)">
          {{ toFixed(record.rebate_ratio * 100, 2) }}%
        </span>
      </template>
      <template #effective_amount="{ record }">
        <div class="center">
          <AppAmount :amount="record.effective_amount" />
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.all-data-page {
  --tg-badge-size: 10px;
  --tg-base-select-style-color: var(--tg-text-lightgrey);
  --tg-base-select-style-padding-y: var(--tg-spacing-8);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
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
  align-items: flex-start;
  gap: var(--tg-spacing-16);
  font-size: var(--tg-font-size-xs);
}
</style>
