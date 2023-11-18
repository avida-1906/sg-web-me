<script setup lang="ts">
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  currencyId?: string
  currencyName?: EnumCurrencyKey
  isWithdraw?: boolean
  callback?: (params?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  currencyId: '',
  // 刚开始的默认值是空字符串，会导致不符合EnumCurrencyKey类型
  // 不确定是否有用。
  // 随意写了个默认值，符合EnumCurrencyKey类型
  currencyName: 'BTC',
})

const emit = defineEmits(['added'])
const closeDialog = inject('closeDialog', () => { })

const { bool: isDefault } = useBoolean(false)
const { openPayPwdDialog, closePayPwdDialog } = usePayPwdDialog()
const {
  getVirtualCurrencyContractType,
} = useCurrencyData()
const { t } = useI18n()
const { openNotify } = useNotify()

const callback = ref<(() => void) | undefined>(props.callback)

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
      message: '绑定成功',
    })
    if (props.isWithdraw) {
      closePayPwdDialog()
      emit('added')
    }
    else { closeAllDialog() }
  },
})

const currentNetwork = ref()

// 获取协议类型
const curContractList = computed(() => {
  return getVirtualCurrencyContractType(props.currencyName)
})

// 设置协议默认值
function getTypeVal() {
  currentNetwork.value = curContractList.value ? curContractList.value[0]?.value : ''
}

// 协议名称
const curNetworkName = computed(() => {
  if (curContractList.value) {
    return curContractList.value.find(
      (item: ISelectOption) => item.value === currentNetwork.value)?.label
  }
  return ''
})

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
          contract_type: Number(currentNetwork.value),
          currency_id: props.currencyId,
          address: address.value,
          is_default: isDefault.value ? 1 : 2,
          pay_password: payPassword,
        })
      },
      toPayPwdSet: () => {
        closeAllDialog()
        callback.value = undefined
      },
      loading: addWalletInsertLoading,
    })
  }
}

watch(() => curContractList.value, () => {
  getTypeVal()
})

onMounted(() => {
  getTypeVal()
})

onUnmounted(() => {
  callback.value && callback.value()
})
</script>

<template>
  <div class="layout-spacing reset app-vir-address">
    <BaseSelect
      v-if="curContractList?.length"
      v-model="currentNetwork"
      label="选择协议"
      :options="curContractList"
      small
    />
    <BaseLabel
      :label="`您${currencyName}的${curNetworkName}地址`"
      must
    >
      <BaseInput v-model="address" :msg="addressMsg" />
    </BaseLabel>
    <div class="checkbox-wrap">
      <span>是否设为默认地址</span>
      <BaseCheckBox v-model="isDefault" />
    </div>
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

<style>
:root{
  --tg-app-vir-address-style-padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
}
</style>

<style scoped lang="scss">
.app-vir-address {
  padding: var(--tg-app-vir-address-style-padding);
  gap: var(--tg-spacing-12);
  .checkbox-wrap{
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
      }
    }
}
</style>
