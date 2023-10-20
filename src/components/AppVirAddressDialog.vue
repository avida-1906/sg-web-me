<script setup lang="ts">
interface Props {
  contractType?: string
  currencyId?: string
  currencyName?: string
}

const props = withDefaults(defineProps<Props>(), {
  currencyId: '',
  contractType: '',
})

const closeDialog = inject('closeDialog', () => { })

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

async function handleBindAddress() {
  await valiAddress()
  await paypasswordValidate()
  if (!addressMsg.value) {
    runMemberWalletInsert({
      contract_type: props.contractType,
      currency_id: props.currencyId,
      address: address.value,
      pay_password: payPassword.value,
    })
  }
}
</script>

<template>
  <div class="layout-spacing reset app-vir-address">
    <BaseLabel
      :label="`您${currencyName}的${currencyName === contractType ? '' : contractType}地址`"
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
