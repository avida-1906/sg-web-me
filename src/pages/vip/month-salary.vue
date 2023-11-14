<script lang="ts" setup>
const { t } = useI18n()

const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'vip',
    align: 'left',
    slot: 'vip',
  },
  {
    title: t('vip_month_salary_bonus'),
    dataIndex: 'bonus',
    align: 'center',
    slot: 'bonus',
  },
  {
    title: t('turnover_multiple'),
    dataIndex: 'multiple',
    align: 'right',
    slot: 'multiple',
  },
])

const data = reactive([
  { vip: 1, multiple: 0, bonus: '18.00' },
  { vip: 2, multiple: 1, bonus: '18.00' },
  { vip: 3, multiple: 2, bonus: '18.00' },
  { vip: 4, multiple: 3, bonus: '18.00' },
  { vip: 5, multiple: 4, bonus: '18.00' },
  { vip: 6, multiple: 5, bonus: '18.00' },
  { vip: 7, multiple: 6, bonus: '18.00' },
  { vip: 8, multiple: 7, bonus: '18.00' },
  { vip: 9, multiple: 8, bonus: '18.00' },
  { vip: 10, multiple: 9, bonus: '18.00' },
])
</script>

<template>
  <div class="vip-month-salary">
    <BaseTable :columns="columns" :data-source="data">
      <template #vip="{ record }">
        <div>VIP{{ record.vip }}</div>
      </template>
      <template #bonus="{ record }">
        <div class="flex-center color-orange">
          <AppAmount :amount="record.bonus" currency-type="USDT" />
        </div>
      </template>
      <template #multiple="{ record }">
        {{ record.multiple }}{{ t('multiple') }}
      </template>
    </BaseTable>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.color-orange {
  color: var(--tg-text-warn);
}
.flex-center {
  display: flex;
  justify-content: center;
}
.vip-month-salary {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-table-even-background: var(--tg-primary-main);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
