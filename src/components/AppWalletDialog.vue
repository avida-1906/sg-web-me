<script setup lang='ts'>
const { t } = useI18n()

const currentTab = ref('deposit')
const tabList = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('withdraw'), value: 'withdraw' },
  // { label: t('buy_cryptocurrency'), value: 'buy' },
  // { label: '法币提现', value: 'fiat' },
]
const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
// const isBuy = computed(() => currentTab.value === 'buy')
// const isFiat = computed(() => currentTab.value === 'fiat')
</script>

<template>
  <div class="app-wallet-dialog">
    <div class="content">
      <BaseTab v-model="currentTab" class="wallet-tab" :list="tabList" />
      <AppDeposit v-if="isDeposit" />
      <AppWithdraw v-else-if="isWithdraw" />
      <!-- <AppBuyCryptocurrency v-else-if="isBuy" />
      <AppFiatDeposit v-else-if="isFiat" /> -->
    </div>

    <!-- <div class="footer">
      <span>通过双重验证提高您的账户安全性</span>
      <BaseButton bg-style="primary" size="md">
        开启双重验证
      </BaseButton>
    </div> -->
  </div>
</template>

<style lang='scss' scoped>
.app-wallet-dialog {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-lightgrey);
  line-height: 1.5;
}

.content {
  padding-right: var(--tg-spacing-16);
  padding-left: var(--tg-spacing-16);
  padding-bottom: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  .wallet-tab{
    justify-content: center;
  }
}

.footer {
  padding-right: var(--tg-spacing-16);
  padding-left: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  background: var(--tg-secondary-dark);
  width: 100%;
  align-items: center;
  padding-top: var(--tg-spacing-20);
  padding-bottom: var(--tg-spacing-20);
  gap: var(--tg-spacing-12);
}
</style>
