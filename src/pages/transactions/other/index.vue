<script lang="ts" setup>
const tabList = reactive([
  { label: '全部', value: '' },
  { label: '奖金', value: 'bonus' },
  { label: '空投奖金', value: 'drop' },
  { label: '活动佣金取款', value: 'campaign_withdrawal' },
  { label: '充值奖金领取', value: 'reload_claim' },
  { label: '竞赛奖金', value: 'race_payout' },
  { label: '收到的红包雨', value: 'rains_received' },
  { label: '发出的红包雨', value: 'rains_sent' },
  { label: '已收回返水', value: 'rakeback_received' },
  { label: '体育博彩促销奖金支付', value: 'sportsbook_promotion_payout' },
  { label: '收到的小费', value: 'tips_received' },
  { label: '发送的小费', value: 'tips_sent' },
  { label: '保险库存款', value: 'vault_deposit' },
  { label: '保险库取款', value: 'vault_withdrawal' },
])
</script>

<template>
  <section class="tg-transactions-other-record-page">
    <AppTabRecord :tabs="tabList" />
  </section>
</template>

<style lang="scss" scoped>

</style>
