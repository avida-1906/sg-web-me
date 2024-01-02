<script lang="ts" setup>
const expData = reactive([
  { coin: 'CNY', num: '1', exp: '1' },
  { coin: 'BRL', num: '1', exp: '0.5' },
  { coin: 'VND', num: '1', exp: '0.5' },
  { coin: 'THB', num: '1', exp: '0.5' },
  { coin: 'BTC', num: '0.001', exp: '1' },
  { coin: 'USDT', num: '1', exp: '1' },
  { coin: 'ETH', num: '1', exp: '1' },
  { coin: 'BNB', num: '1', exp: '1' },
])
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
          {{ item.exp }}VIP{{ $t('game_water_experience') }}
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
