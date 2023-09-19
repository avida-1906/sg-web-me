<script setup lang='ts'>
const { t } = useI18n()

const currentNetwork = ref('1')
const networkList = [
  { label: '网络1', value: '1' },
  { label: '网络2', value: '2' },
  { label: '网络3', value: '3' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
  { label: '网络4', value: '4' },
]
</script>

<template>
  <div class="app-deposit">
    <div class="currency">
      <div class="c-option">
        <span>{{ t('currency') }}</span>
        <AppWallet :wallet-btn="false" />
      </div>
      <div class="c-option">
        <span>{{ t('network') }}</span>
        <BaseSelect v-model="currentNetwork" :options="networkList" popper />
      </div>
    </div>
    <div class="address">
      <span>{{ t('your_currency_deposit_address', { currency: 'BTC' }) }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-deposit{
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  .currency{
    display: flex;
    justify-content: center;
    gap: var(--tg-spacing-16);
    .c-option{
      display: flex;
      flex-direction: column;
      line-height: 1.5;
    }
  }
}
</style>
