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
  <div class="app-virtual-deposit">
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
  </div>
</template>

<style lang='scss' scoped>
.app-virtual-deposit {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);

    .warn-msg {
        line-height: 1;
        color: var(--tg-text-error);
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
}
</style>
