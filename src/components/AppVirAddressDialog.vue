<script setup lang="ts">
interface Props {
  currencyId?: string
  currencyName?: string
}

const props = withDefaults(defineProps<Props>(), {
  currencyId: '',
  currencyName: '',
})

const closeDialog = inject('closeDialog', () => { })

const {
  // renderBalanceList,
  getVirtualCurrencyContractType,
} = useCurrencyData()
// const { userCurrencyList } = useAppStore()
const { t } = useI18n()
const { openNotify } = useNotify()
const {
  value: address,
  errorMessage: addressMsg,
  validate: valiAddress,
} = useField<string>('address', (value) => {
  if (!value)
    return t('this_field_is_required')
  else if (!virtualCoinAddressReg.test(value))
    return '地址格式不正确'
  return ''
})
const {
  value: payPassword,
  errorMessage: paypasswordError,
  validate: paypasswordValidate,
} = useField<string>('paypassword', (value) => {
  if (!value)
    return '请输入交易密码'
  if (!payPasswordReg.test(value))
    return '您的交易密码含有6位数字'
  return ''
})
const {
  run: runMemberWalletInsert,
  loading: addWalletInsertLoading,
} = useRequest(ApiMemberWalletInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: '绑定',
      message: '恭喜你！绑定成功',
    })
    closeDialog()
  },
})

const optionsContract = getCurContract() || []
const currentNetwork = ref(optionsContract[0]?.value || '')

// 获取协议类型
function getCurContract() {
  return getVirtualCurrencyContractType(props.currencyName)
}
async function handleBindAddress() {
  await valiAddress()
  await paypasswordValidate()
  if (!addressMsg.value && !paypasswordError.value) {
    runMemberWalletInsert({
      contract_type: currentNetwork.value,
      currency_id: props.currencyId,
      address: address.value,
      is_default: 2,
      pay_password: payPassword.value,
    })
  }
}
</script>

<template>
  <div class="layout-spacing reset app-vir-address">
    <BaseSelect
      v-model="currentNetwork"
      label="选择协议"
      :options="optionsContract"
      small
    />
    <BaseLabel
      :label="`您${currencyName}的${currentNetwork}地址`"
      must
    >
      <BaseInput v-model="address" :msg="addressMsg" />
    </BaseLabel>
    <BaseLabel label="交易密码" must>
      <BaseInput
        v-model="payPassword"
        :msg="paypasswordError"
        type="password"
        max="6"
      />
    </BaseLabel>
    <BaseButton
      bg-style="primary"
      :loading="addWalletInsertLoading"
      size="md"
      @click="handleBindAddress"
    >
      绑定
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.app-vir-address {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
  gap: var(--tg-spacing-12);
}
</style>
