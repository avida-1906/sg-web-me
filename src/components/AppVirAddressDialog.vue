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
    // return t('this_field_is_required')
    return '请输入提币地址'
  else if (!virtualCoinAddressReg.test(value))
    return t('pls_input_virtual_addr')
  return ''
})
const {
  run: runMemberWalletInsert,
  loading: addWalletInsertLoading,
} = useRequest(ApiMemberWalletInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: t('label_bind'),
      message: t('success_bind'),
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
      :label="t('choose_protocol')"
      :options="curContractList"
      small
    />
    <div>
      <div class="label-wrap">
        {{ t('your_virtual_addr', { currencyName }) }}<span class="network">{{
          curNetworkName }}</span>{{ t('address') }}<span class="must">*</span>
      </div>
      <BaseInput v-model="address" :msg="addressMsg" />
    </div>
    <!-- </BaseLabel> -->
    <div class="checkbox-wrap">
      <span>{{ t('is_default_addr') }}</span>
      <BaseCheckBox v-model="isDefault" />
    </div>
    <BaseButton
      bg-style="primary"
      :loading="addWalletInsertLoading"
      size="md"
      @click="handleBindAddress"
    >
      {{ t('label_bind') }}
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
  .label-wrap{
    margin-bottom: var(--tg-spacing-4);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-lightgrey);
    .network{
      color: var(--tg-text-warn);
    }
    .must{
      color: var(--tg-text-error);
    }
  }
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
