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
    <ul>
      <li class="title">
        <div class="left">
          {{ $t('effective_bet') }}
        </div>
        <div class="right">
          VIP{{ $t('game_water_experience') }}
        </div>
      </li>
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
  padding: 0 16px 16px;
  font-size: 14px;
  font-weight: 500;
  ul {
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
      .right {
        // text-align: right;
      }
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
