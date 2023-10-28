<script setup lang="ts">
interface Props {
  currencyId?: string
  currencyName?: string
  callback?: (params?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  currencyId: '',
  currencyName: '',
})

const closeDialog = inject('closeDialog', () => { })

const { openPayPwdDialog, closePayPwdDialog } = usePayPwdDialog()
const {
  getVirtualCurrencyContractType,
} = useCurrencyData()
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
    return '请输入正确提币地址'
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
    closeAllDialog()
  },
})

const optionsContract = getCurContract() || []
const currentNetwork = ref(optionsContract[0]?.value || '')

// 获取协议类型
function getCurContract() {
  return getVirtualCurrencyContractType(props.currencyName)
}
// 关闭弹框
function closeAllDialog() {
  closeDialog()
  closePayPwdDialog()
}
async function handleBindAddress() {
  await valiAddress()
  if (!addressMsg.value) {
    openPayPwdDialog({
      runSubmit: (payPassword: string) => {
        runMemberWalletInsert({
          contract_type: currentNetwork.value,
          currency_id: props.currencyId,
          address: address.value,
          is_default: 2,
          pay_password: payPassword,
        })
      },
      toPayPwdSet: () => {
        closeAllDialog()
      },
      loading: addWalletInsertLoading,
    })
  }
}

onUnmounted(() => {
  props.callback && props.callback()
})
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
      :label="`您${currencyName}的${
        currencyName === currentNetwork ? '' : currentNetwork}地址`"
      must
    >
      <BaseInput v-model="address" :msg="addressMsg" />
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
