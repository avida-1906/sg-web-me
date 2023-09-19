<script setup lang='ts'>
const { t } = useI18n()

const inputRef = ref()
function onInputClick() {
  inputRef.value.select()
}
const currentAddress = ref('0xa9869670e7f9db1f6b916b90b2b7ebc546480e67')
const currentNetwork = ref('1')
const networkList = [
  { label: '网络1', value: '1' },
  { label: '网络2', value: '2' },
  { label: '网络3', value: '3' },
  { label: '网络4', value: '4' },
]
</script>

<template>
  <div class="app-deposit">
    <div class="currency">
      <div class="c-option">
        <span class="semibold">{{ t('currency') }}</span>
        <AppWallet :wallet-btn="false" />
      </div>
      <div class="c-option">
        <span class="semibold">{{ t('network') }}</span>
        <BaseSelect v-model="currentNetwork" :options="networkList" popper />
      </div>
    </div>
    <div class="address">
      <span class="semibold">{{ t('your_currency_deposit_address', { currency: 'BTC' }) }}</span>
      <div class="input-box">
        <input ref="inputRef" type="text" readonly :value="currentAddress" @click="onInputClick">
        <div class="icon" @click="application.copy(currentAddress)">
          <BaseIcon name="uni-doc" />
        </div>
      </div>
    </div>
    <BaseQrcode url="www.google.com" />
    <span style="text-align: center;">请只发送 USDT 到此地址，需获 2 个确认让存款到账。</span>
  </div>
</template>

<style lang='scss' scoped>
.app-deposit {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);

  .currency {
    display: flex;
    justify-content: center;
    gap: var(--tg-spacing-16);

    .c-option {
      display: flex;
      flex-direction: column;
    }
  }

  .address {
    .input-box {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      box-shadow: var(--tg-box-shadow);
      border-radius: var(--tg-radius-default);
      overflow: hidden;
      background-color: var(--tg-secondary-main);

      input {
        width: 100%;
        background-color: transparent;
        color: var(--tg-text-white);
        outline: none;
        cursor: text;
        padding: var(--tg-spacing-7);
        border-width: var(--tg-border-width-sm);
        border-style: solid;
        border-color: var(--tg-secondary-main);
        border-radius: var(--tg-radius-default) 0 0 var(--tg-radius-default);
        font-weight: var(--tg-font-weight-semibold);

        &:hover {
          border-color: var(--tg-text-grey);
        }
      }

      .icon {
        padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
        cursor: pointer;

        &:hover {
          background-color: var(--tg-text-grey);
        }
      }
    }
  }
}
</style>
