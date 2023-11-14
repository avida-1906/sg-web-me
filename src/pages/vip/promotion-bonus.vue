<script lang="ts" setup>
const { t } = useI18n()
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)

const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'vip',
    align: 'left',
    slot: 'vip',
  },
  {
    title: t('vip_promotion_exp'),
    dataIndex: 'exp',
    align: 'center',
    slot: 'exp',
  },
  {
    title: t('vip_promotion_bonus'),
    dataIndex: 'bonus',
    align: 'right',
    slot: 'bonus',
  },
])

const data = reactive([
  { vip: 1, exp: 0, bonus: '18.00' },
  { vip: 2, exp: 100, bonus: '18.00' },
  { vip: 3, exp: 500, bonus: '18.00' },
  { vip: 4, exp: 1000, bonus: '18.00' },
  { vip: 5, exp: 1500, bonus: '18.00' },
  { vip: 6, exp: 2000, bonus: '18.00' },
  { vip: 7, exp: 3000, bonus: '18.00' },
  { vip: 8, exp: 4000, bonus: '18.00' },
  { vip: 9, exp: 5000, bonus: '18.00' },
  { vip: 10, exp: 9000, bonus: '18.00' },
])
</script>

<template>
  <div class="vip-promotion-bonus">
    <BaseTable :columns="columns" :data-source="data">
      <template #vip="{ record }">
        <div>VIP{{ record.vip }}</div>
      </template>
      <template #exp="{ record }">
        <div
          :class="{
            'user-level-vip': userInfo && userInfo.vip && +userInfo.vip === record.vip,
          }"
        >
          <span
            v-if="userInfo && userInfo.vip && +userInfo.vip === record.vip"
          >1USDT/</span>{{ record.exp }}USDT
        </div>
      </template>
      <template #bonus="{ record }">
        <div class="flex-end color-orange">
          <AppAmount :amount="record.bonus" currency-type="USDT" />
        </div>
      </template>
    </BaseTable>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.color-orange {
  color: var(--tg-text-warn);
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.vip-promotion-bonus {
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
