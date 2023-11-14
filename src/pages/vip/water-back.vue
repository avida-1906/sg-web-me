<script lang="ts" setup>
const { t } = useI18n()

const tab = ref('dz')
const tabList = reactive([
  { label: '电子', value: 'dz' },
  { label: '捕鱼', value: 'by' },
  { label: '棋牌', value: 'qp' },
  { label: '真人', value: 'zr' },
  { label: '体育', value: 'ty' },
])

const platforms = reactive([
  { name: 'PG' },
  { name: 'PT' },
  { name: 'MG' },
])

const data = reactive([
  { vip: 1, water: '1%' },
  { vip: 2, water: '1%' },
  { vip: 3, water: '1%' },
  { vip: 4, water: '1%' },
  { vip: 5, water: '1%' },
  { vip: 6, water: '1%' },
  { vip: 7, water: '1%' },
  { vip: 8, water: '1%' },
  { vip: 9, water: '1%' },
  { vip: 10, water: '1%' },
])

const columns = computed<Column[]>(() => [
  {
    title: `VIP${t('grade')}`,
    dataIndex: 'vip',
    align: 'center',
    slot: 'vip',
  },
  {
    title: 'PG电子',
    dataIndex: 'water',
    align: 'center',
    slot: 'water',
  },
  {
    title: 'PT电子',
    dataIndex: 'water',
    align: 'center',
    slot: 'water',
  },
  {
    title: 'MG电子',
    dataIndex: 'water',
    align: 'center',
    slot: 'water',
  },
])
</script>

<template>
  <div class="vip-water-back">
    <BaseTab
      v-model="tab"
      style="--tg-tab-style-color: var(--tg-text-lightgrey);"
      :list="tabList"
      line-style
      :center="false"
    />
    <BaseTable :columns="columns" :data-source="data">
      <template #vip="{ record }">
        <div>VIP{{ record.vip }}</div>
      </template>
    </BaseTable>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.vip-water-back {
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
