<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('affiliate_refer_user') })

const sortedOptions = [
  { label: t('finance_funds_campaign_sort_created'), value: '0' },
  { label: t('finance_funds_campaign_sort_deposit_count'), value: '1' },
  { label: t('finance_funds_transfer_sort_commission'), value: '2' },
]

const sortedBy = ref(sortedOptions[0].value)

const campaignOptions = [
  { label: 'Wade001(0 存款)', value: '0' },
]

const campaignName = ref(campaignOptions[0].value)

const columns = [
  {
    title: t('username'),
    dataIndex: 'name',
    align: 'left',
    slot: 'name',
  },
  {
    title: t('register_date'),
    dataIndex: 'register',
    align: 'center',
    slot: 'register',
  },
  {
    title: t('total_deposits'),
    dataIndex: 'totalDeposits',
    align: 'center',
    slot: 'totalDeposits',
  },
  {
    title: t('last_deposits'),
    dataIndex: 'lastDeposits',
    align: 'center',
    slot: 'lastDeposits',
  },
  {
    title: t('wagered'),
    dataIndex: 'wagered',
    align: 'center',
    slot: 'wagered',
  },
  {
    title: t('finance_funds_transfer_sort_commission'),
    dataIndex: 'commission',
    align: 'right',
    slot: 'commission',
  },
]

const data = reactive([
])
</script>

<template>
  <div class="tg-affiliate-referred-users">
    <div class="select-sort-wrap">
      <div class="select-sort">
        <BaseSelect
          v-model="campaignName"
          :label="t('activity_name')"
          :options="campaignOptions"
        />
      </div>
      <div class="select-sort">
        <BaseSelect
          v-model="sortedBy"
          :label="t('casino_filter_label_sort')"
          :options="sortedOptions"
        />
      </div>
    </div>
    <div class="content">
      <BaseTable
        :columns="columns"
        :data-source="data"
        :skeleton-row="5"
      >
        <template #name="{ record }">
          <div class="line-height-2">
            {{ record.name }}
          </div>
        </template>
      </BaseTable>
    </div>
    <div class="tg-mt-24 page-stack-wrap">
      <AppStack />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-height-2 {
  line-height: 2;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.select-sort-wrap {
  display: grid;
  gap: var(--tg-spacing-16);
  justify-content: left;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 200px));
}
.select-sort {
  --tg-base-select-style-padding-x: var(--tg-spacing-7);
  --tg-base-select-style-padding-y: var(--tg-spacing-7);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
  margin-bottom: var(--tg-spacing-16);
}
</style>

<route lang="yaml">
</route>
