<script lang="ts" setup>
const { t } = useI18n()
const appStore = useAppStore()
const { vipConfigData } = storeToRefs(appStore)

const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'level',
    align: 'left',
    slot: 'level',
  },
  {
    title: t('vip_day_salary_bonus'),
    dataIndex: 'daily_gift',
    align: 'center',
    slot: 'daily_gift',
  },
  {
    title: t('turnover_multiple'),
    dataIndex: 'multiple',
    align: 'right',
    slot: 'multiple',
  },
])

const data = computed(() =>
  vipConfigData.value ? Object.values(vipConfigData.value).sort((a, b) => +a.level - +b.level) : [])
</script>

<template>
  <div class="vip-day-salary">
    <BaseTable :columns="columns" :data-source="data">
      <template #level="{ record }">
        <div>VIP{{ record.level }}</div>
      </template>
      <template #daily_gift="{ record }">
        <div class="flex-center color-orange">
          <AppAmount :amount="record.daily_gift" currency-type="USDT" />
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
.vip-day-salary {
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
