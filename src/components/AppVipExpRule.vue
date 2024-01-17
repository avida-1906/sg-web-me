<script lang="ts" setup>
const { getRate } = useExchangeRate()
const { data } = useRequest(ApiMemberVipMultiple, {
  manual: false,
})

const sportMultipleRate = computed(() => {
  if (!data.value)
    return 0

  return (+(data.value.find(item => item.game_type === 4)?.rate || 0)).toFixed(0)
})

const expData = computed(() => {
  return getCurrencyOptions().map((item) => {
    return {
      coin: item.label,
      num: '1',
      exp: getRate(item.label, 'USDT', 8)?.targetNum || 0,
    }
  })
})
</script>

<template>
  <div class="app-vip-exp-rule">
    <div class="rule-title">
      {{ $t('rule_text_title') }}
    </div>
    <div class="rule-text">
      1.{{ $t('rule_text_one') }}{{ $t('period') }}
    </div>
    <div class="rule-text">
      2.{{ $t('rule_text_two') }}{{ $t('period') }}
    </div>
    <div class="rule-text">
      3.{{ $t('rule_text_three') }}{{ $t('period') }}
    </div>
    <div class="rule-text">
      4.{{ $t('vip_sports_tip_title', { rate: sportMultipleRate }) }}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;{{ $t('vip_sports_tip_content', { rate: sportMultipleRate }) }}
    </div>
    <ul>
      <!-- <li class="title">
        <div class="left">
          {{ $t('effective_bet') }}
        </div>
        <div class="right">
          VIP{{ $t('game_water_experience') }}
        </div>
      </li> -->
      <li v-for="item in expData" :key="item.coin">
        <div class="left">
          {{ item.num + item.coin }}
        </div>
        <div class="equal">
          =
        </div>
        <div class="right">
          {{ item.exp }}VIP{{ $t('integral') }}
        </div>
      </li>
    </ul>
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
  ul {
    margin-top: 12px;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      .left, .right {
        width: 45%;
      }
      .equal {
        width: 10%;
      }
      // .right {
      //   // text-align: right;
      // }
    }
    li:nth-child(odd) {
      background-color: var(--tg-secondary-grey);
      line-height: 28px;
    }
    li:nth-child(even) {
      line-height: 44px;
    }
  }
}
</style>
