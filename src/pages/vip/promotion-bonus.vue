<script lang="ts" setup>
const { t } = useI18n()
const { vip, score, vipConfigArray } = useVipInfo()

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
</script>

<template>
  <div class="vip-promotion-bonus">
    <BaseTable :columns="columns" :data-source="vipConfigArray">
      <template #level="{ record }">
        <div>VIP{{ record.level }}</div>
      </template>
      <template #score="{ record }">
        <div
          class="score-wrap"
          :class="{
            'user-level-vip':
              +vip + 1 === +record.level,
          }"
        >
          <span
            class="text"
            :style="{ '--progress-width': floor(score / record.score, 1) }"
          >
            <span
              v-if="+vip + 1 === +record.level"
            >
              {{ score }}<BaseIcon name="coin-usdt" />/
            </span>
            {{ record.score }}<BaseIcon name="coin-usdt" />
          </span>
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
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    margin-left: var(--tg-spacing-8);
  }
}
.user-level-vip {
  background: rgba($color: var(--tg-color-green-rgb), $alpha: 0.3);
  color: var(--tg-text-black);
  max-width: 290px;
  margin: 0 auto;
  border-radius: 20px;
  font-weight: var(--tg-font-weight-semibold);
  position: relative;
  overflow: hidden;
  span {
    position: relative;
    display: flex;
    align-items: center;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--progress-width);
    height: 100%;
    background-color: var(--tg-text-green);
    border-radius: 20px;
  }
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
