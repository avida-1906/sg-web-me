<script setup lang="ts">
interface Props {
  contractType?: string
  currencyName?: string
}

const props = withDefaults(defineProps<Props>(), {
  currencyName: '',
  contractType: '',
})

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const { openNotify } = useNotify()
const { value: address, errorMessage: addressMsg, validate: valiAddress } = useField<string>('address', (value) => {
  if (!value)
    return t('this_field_is_required')
  if (!virtualCoinAddressReg.test(value))
    return '地址格式不正确'
  return ''
})
const { run: runMemberWalletInsert, loading: addWalletInsertLoading } = useRequest(() => ApiMemberWalletInsert({
  contract_type: props.contractType,
  currency_name: props.currencyName,
  wallet_address: address.value,
}), {
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
  if (!addressMsg.value)
    runMemberWalletInsert()
}
</script>

<template>
  <div class="layout-spacing reset app-vir-address">
    <BaseLabel :label="`您${currencyName}的${contractType}地址`" must>
      <BaseInput v-model="address" :msg="addressMsg" />
    </BaseLabel>
    <BaseButton bg-style="primary" :loading="addWalletInsertLoading" @click="handleBindAddress">
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
