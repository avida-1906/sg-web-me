<script lang="ts" setup>
const { t } = useI18n()
const appStore = useAppStore()
const { userInfo, vipConfigData } = storeToRefs(appStore)

const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'level',
    align: 'left',
    slot: 'level',
  },
  {
    title: t('vip_promotion_exp'),
    dataIndex: 'score',
    align: 'center',
    slot: 'score',
  },
  {
    title: t('vip_promotion_bonus'),
    dataIndex: 'up_gift',
    align: 'right',
    slot: 'up_gift',
  },
])

const data = computed(() =>
  vipConfigData.value ? Object.values(vipConfigData.value).sort((a, b) => +a.level - +b.level) : [])
</script>

<template>
  <div class="vip-promotion-bonus">
    <BaseTable :columns="columns" :data-source="data">
      <template #level="{ record }">
        <div>VIP{{ record.level }}</div>
      </template>
      <template #score="{ record }">
        <div
          class="score-wrap"
          :class="{
            'user-level-vip':
              userInfo && +userInfo.vip === +record.level,
          }"
        >
          <span
            v-if="userInfo && userInfo.score && +userInfo.vip === +record.level"
          >{{ userInfo.score }}
            <BaseIcon name="coin-usdt" />/</span>{{ record.score }}
          <BaseIcon name="coin-usdt" />
        </div>
      </template>
      <template #up_gift="{ record }">
        <div class="flex-end color-orange">
          <AppAmount :amount="record.up_gift" currency-type="USDT" />
        </div>
      </template>
    </BaseTable>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.score-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: var(--tg-spacing-8);
  }
}
.user-level-vip {
  background-color: var(--tg-text-green);
  color: var(--tg-secondary-dark);
  max-width: 290px;
  margin: 0 auto;
  border-radius: 20px;
}
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
