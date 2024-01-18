<script lang="ts" setup>
const { t } = useI18n()
const { getRate } = useExchangeRate()
const expData = computed(() => {
  return getCurrencyOptions().map((item) => {
    return {
      currency: item.label,
      num: '1.00',
      exp: getRate(item.label, 'USDT', 8)?.targetNum || 0,
    }
  })
})

const { data } = useRequest(ApiMemberVipMultiple, { manual: false })
const tableData = computed(() => {
  if (data.value) {
    return expData.value.map((a) => {
      const sportsRate = data.value?.find(b => b.game_type === EnumGlobalGameType.sports)?.rate ?? 1
      const casinoRate = data.value?.find(b => b.game_type === EnumGlobalGameType.casino)?.rate ?? 1
      const slotRate = data.value?.find(b => b.game_type === EnumGlobalGameType.slot)?.rate ?? 1
      const fishRate = data.value?.find(b => b.game_type === EnumGlobalGameType.fish)?.rate ?? 1
      return {
        ...a,
        sports: toFixed(+a.exp * +sportsRate, 8).toString().slice(0, 10) + t('integral'),
        casino: toFixed(+a.exp * +casinoRate, 8).toString().slice(0, 10) + t('integral'),
        slot: toFixed(+a.exp * +slotRate, 8).toString().slice(0, 10) + t('integral'),
        fish: toFixed(+a.exp * +fishRate, 8).toString().slice(0, 10) + t('integral'),
      }
    })
  }
  return []
})

const column = [
  {
    title: t('bet_currency'),
    slot: 'currency',
    dataIndex: 'currency',
    align: 'center',
  },
  {
    title: t('sports_integral'),
    slot: 'sports',
    dataIndex: 'sports',
    align: 'center',
  },
  {
    title: t('casino_integral'),
    slot: 'casino',
    dataIndex: 'casino',
    align: 'center',
  },
  {
    title: t('slot_integral'),
    slot: 'slot',
    dataIndex: 'slot',
    align: 'center',
  },
  {
    title: t('fish_integral'),
    slot: 'fish',
    dataIndex: 'fish',
    align: 'center',
  },
]
</script>

<template>
  <div class="app-vip-exp-rule">
    <div class="rule-title">
      {{ t('rule_text_title') }}
    </div>
    <div class="rule-text">
      1.{{ t('rule_text_one') }}{{ $t('period') }}
    </div>
    <div class="rule-text">
      2.{{ t('rule_text_two') }}{{ $t('period') }}
    </div>
    <div class="rule-text">
      3.{{ t('rule_text_three') }}{{ $t('period') }}
    </div>
    <div class="rule-text">
      4.{{ t('diff_game_diff_rate') }}
    </div>

    <BaseTable :columns="column" :data-source="tableData">
      <template #currency="{ record }">
        <div class="flex gap-4">
          {{ record.num }}
          <AppCurrencyIcon :currency-type="record.currency" />
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.app-vip-exp-rule {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px 16px;
  font-size: var(--tg-font-size-default);
  font-weight: 500;
  .rule-title{
    font-size: var(--tg-font-size-md);
    line-height: 1.4;
    margin-bottom: 8px;
  }
  .rule-text{
    font-size: var(--tg-font-size-default);
    line-height: 1.4;
    color: var(--tg-secondary-light);
  }
}
</style>
