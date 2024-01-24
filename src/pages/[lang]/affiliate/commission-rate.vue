<script lang="ts" setup>
const { t } = useI18n()
// const { list: scaleList } = useScaleData()
// const { selected: tab, list: tabList } = useSelect(scaleList)
const tab = ref('')
const { isMobile } = storeToRefs(useWindowStore())

const tabList = ref<{ label: string; value: string; icon: string }[]>([])

const {
  data,
  loading,
  runAsync: runAsyncCommissionScale,
} = useRequest(ApiAgencyCommissionScale)
const {
  data: modelsList,
  runAsync: runAsyncModelsList,
} = useRequest(ApiAgencyCommissionModelsList, {
  onSuccess(data) {
    tab.value = data[0].id
    runAsyncCommissionScale().then((res) => {
      tabList.value = modelsList.value!.map((a, i) => {
        return {
          label: a.name,
          value: a.id,
          icon: res.conf[i].ico[0],
          useCloudImg: true,
        }
      })
    })
  },
})

const columns: Column[] = [
  {
    title: t('class'),
    dataIndex: 'level',
    align: 'center',
    slot: 'level',
    skeWidth: '50px',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'effective_amount',
    align: 'center',
    slot: 'effective_bat',
  },
  {
    title: t('menu_title_commission_rate'),
    dataIndex: 'rebate_ratio',
    align: 'center',
    slot: 'rebate_ratio',
    skeWidth: '100px',
  },
]

const list = computed(() => {
  const conf = data.value?.conf
  const currentSelected = tab.value
  console.log(currentSelected)
  if (!conf)
    return []
  const result = conf.reduce((acc, cur) => {
    const { levels, id } = cur
    // const modelIds = model_ids.split(',')
    if (id === currentSelected && Array.isArray(levels))
      acc.push(...levels)
    return acc
  }, [] as any[])

  return result
})

await application.allSettled([runAsyncModelsList()])
</script>

<template>
  <div class="all-data-page">
    <div class="table-filter">
      <BaseSquareTab v-if="isMobile" v-model="tab" :list="tabList ?? []" />
      <BaseTab
        v-else
        v-model="tab"
        style="--tg-tab-style-color: var(--tg-text-lightgrey);"
        :list="tabList ?? []"
        :center="false" use-cloud-img
      />
    </div>
    <BaseTable
      class="page-all-data page-commission-rate"
      :columns="columns"
      :data-source="list"
      :loading="loading"
      :skeleton-row="5"
    >
      <template #level="{ index }">
        {{ index + 1 }}
      </template>
      <template #th-effective_bat>
        <div class="center">
          <AppCurrencyIcon currency-type="USDT" />
        </div>
      </template>
      <template #rebate_ratio="{ record }">
        <span>
          {{ record.rebate_ratio }}%
        </span>
      </template>
      <template #effective_bat="{ record }">
        {{ record.effective_amount <= 0 ? `${toFixed(0)}+` : `${toFixed(+mul(record.effective_amount, 10000))}+` }}
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
  --tg-base-square-tab-padding-y: 7px;
  --tg-base-square-tab-font-weight: var(--tg-font-weight-normal);
  --tg-base-square-tab-padding-top: 9px;
  --tg-base-square-tab-dot-width: 14px;
}

.hint {
  color: var(--tg-text-grey-lighter);
  margin-top: 4px;
}
.page-all-data {
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
