<script setup lang='ts'>
// const { t } = useI18n()

// const inputRef = ref()
// function onInputClick() {
//   inputRef.value.select()
// }
interface Props {
  activeCurrency: any
}
withDefaults(defineProps<Props>(), {
  activeCurrency: () => {},
})

const emit = defineEmits(['show'])

const currentAddress = ref('0xa9869670e7f9db1f6b916b90b2b7ebc546480e67')

const depositStep = ref('1')

// const activeCurrency = ref()

// function changeCurrency(item: any) {
//   activeCurrency.value = item
// }
const username = ref('')
const usernameErrorMsg = ref('')

function getMoneyNum(item: ISelectOption) {
  username.value = item.value.toString()
}
function confirmPayment() {
  depositStep.value = '2'
  emit('show', false)
}

function cancelPayment() {
  depositStep.value = '1'
  emit('show', true)
}
</script>

<template>
  <div class="app-deposit">
    <template v-if="depositStep === '1'">
      <!-- <BaseSelect v-model="currentNetwork" :options="networkList" popper /> -->
      <BaseInput
        v-model="username" :label="`充值金额: ${activeCurrency ? EnumCurrency[activeCurrency.text] : ''}`"
        :msg="usernameErrorMsg"
      />
      <BaseMoneyKeyboard @click-key="getMoneyNum" />
      <BaseButton bg-style="primary" size="md" @click="confirmPayment">
        确认支付
      </BaseButton>
    </template>
    <template v-if="depositStep === '2'">
      <AppCurrencyIcon class="currency-icon" :show-name="true" :currency-type="1" />
      <BaseQrcode url="www.google.com" />
      <div>
        <BaseInput v-model="currentAddress" label="转入地址">
          <template #right-icon>
            <BaseIcon name="uni-doc" />
          </template>
        </BaseInput>
        <div class="warn-msg">
          请确认发送USDT到此地址，充值需要全网确认才能到账，请耐心等待！
        </div>
      </div>
      <div>
        <BaseInput v-model="username" label="转入金额: USDT">
          <template #right-icon>
            <BaseIcon name="uni-doc" />
          </template>
        </BaseInput>
        <div class="warn-msg">
          请确认收款地址存入完整金额（不含手续费），否则可能导致无法上分
        </div>
      </div>

      <div class="box-btn">
        <BaseButton
          type="line" style="border-color: var(--tg-text-blue);color: var(--tg-text-blue);" size="md"
          @click="cancelPayment"
        >
          取消存款申请
        </BaseButton>
        <BaseButton bg-style="primary" size="md">
          我已存款
        </BaseButton>
      </div>
    </template>
    <!-- <div class="address">
      <span class="semibold label">{{ t('your_currency_deposit_address', { currency: 'BTC' }) }}</span>
      <div class="input-box">
        <input ref="inputRef" type="text" readonly :value="currentAddress" @click="onInputClick">
        <div class="icon" @click="openGetNewCrypto">
          <BaseIcon name="uni-refresh" />
        </div>
        <div class="icon line" @click="application.copy(currentAddress)">
          <BaseIcon name="uni-doc" />
        </div>
      </div>
    </div> -->
    <!-- <BaseQrcode url="www.google.com" /> -->
    <!-- <span style="text-align: center;">请只发送 USDT 到此地址，需获 2 个确认让存款到账。</span> -->
  </div>
</template>

<style lang='scss' scoped>
.app-deposit {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);

    .warn-msg {
        line-height: 1;
        color: var(--tg-text-error);
        font-family: PingFang SC;
        font-size: var(--tg-font-size-xs);
        font-weight: 500;
    }

    .currency-icon {
        color: var(--tg-text-white);
        margin: 0 auto;
    }

    .box-btn {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 12px;
    }

    // .address {
    //   display: flex;
    //   flex-direction: column;

    //   .label {
    //     margin-bottom: var(--tg-spacing-4);
    //   }

    //   .input-box {
    //     width: 100%;
    //     display: flex;
    //     flex-shrink: 0;
    //     box-shadow: var(--tg-box-shadow);
    //     border-radius: var(--tg-radius-default);
    //     overflow: hidden;
    //     background-color: var(--tg-secondary-main);

    //     input {
    //       width: 100%;
    //       background-color: transparent;
    //       color: var(--tg-text-white);
    //       outline: none;
    //       cursor: text;
    //       padding: var(--tg-spacing-7);
    //       border-width: var(--tg-border-width-sm);
    //       border-style: solid;
    //       border-color: var(--tg-secondary-main);
    //       border-radius: var(--tg-radius-default) 0 0 var(--tg-radius-default);
    //       font-weight: var(--tg-font-weight-semibold);

    //       &:hover {
    //         border-color: var(--tg-text-grey);
    //       }
    //     }

    //     .icon {
    //       padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
    //       cursor: pointer;
    //       display: flex;
    //       position: relative;
    //       --tg-icon-color: var(--tg-text-white);

    //       &:hover {
    //         background-color: var(--tg-text-grey);
    //       }
    //     }
    //     .line{
    //       &::before {
    //         content: "";
    //         position: absolute;
    //         width: var(--tg-border-width-sm);
    //         background: var(--tg-primary-main);
    //         left: -1px;
    //         top: 25%;
    //         bottom: 25%;
    //       }
    //     }
    //   }
    // }
}
</style>
