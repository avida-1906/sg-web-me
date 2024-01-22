<script setup lang="ts">
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  currencyId?: string
  currencyName?: EnumCurrencyKey
  isWithdraw?: boolean
  contractId?: string
  callback?: (params?: any) => void
  title?: string
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
  resetField: resetAddress,
} = useField<string>('address', (value) => {
  if (!value)
    // return t('this_field_is_required')
    return t('input_draw_coin_addr')
  else if (!virtualCoinAddressReg.test(value))
    return t('pls_input_virtual_addr')
  return ''
})

const passwordRef = ref()
const password = ref('')

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
    if (props.isWithdraw)
      emit('added')

    else closeAllDialog()
  },
})

const currentNetwork = ref()

// 获取协议类型
const curContractList = computed(() => {
  return getVirtualCurrencyContractType(props.currencyName)
})

// 设置协议默认值
function getTypeVal() {
  currentNetwork.value = props.contractId || (curContractList.value ? curContractList.value[0]?.value : '')
}

// 关闭弹框
function closeAllDialog() {
  closeDialog()
}
async function handleBindAddress() {
  await valiAddress()
  passwordRef.value.setTouchTrue()
  await passwordRef.value.validatePassword()
  if (!addressMsg.value && !passwordRef.value.errPassword) {
    runMemberWalletInsert({
      contract_type: Number(currentNetwork.value),
      currency_id: props.currencyId,
      address: address.value,
      is_default: isDefault.value ? 1 : 2,
      pay_password: password.value,
      auth_type: +passwordRef.value.authType,
    })
  }
}

watch(() => curContractList.value, () => {
  getTypeVal()
})
watch(() => props.contractId, () => {
  resetAddress()
  currentNetwork.value = props.contractId
})

onMounted(() => {
  getTypeVal()
})

onUnmounted(() => {
  callback.value && callback.value()
})
</script>

<template>
  <div class="px-16 pb-16">
    <div class="border-tg-secondary border-[1px] rounded-t-[4px] border-solid px-20 pb-14 pt-19">
      <div class="text-[18px] font-medium leading-[1.4]">
        {{ title }}
      </div>
      <div class="bg-tg-secondary my-15 h-1 w-full" />
      <div class="flex flex-col gap-14">
        <BaseSelect
          v-if="curContractList?.length && !isWithdraw"
          v-model="currentNetwork"
          :label="t('choose_proto_pls')"
          :options="curContractList"
          small must
        />
        <BaseLabel :label="t('vir_address')" must-small>
          <BaseInput v-model="address" :msg="addressMsg" />
        </BaseLabel>
        <AppPasswordInput ref="passwordRef" v-model="password" />
        <div class="flex items-center">
          <BaseCheckBox v-model="isDefault" />
          <span class="text-tg-secondary-light leading-[1.4]">{{ t('is_default_addr') }}</span>
        </div>
      </div>
    </div>

    <div class="border-tg-secondary border-[1px] border-t-0 rounded-b-[4px] border-solid px-20 pb-14 pt-10">
      <div class="text-tg-secondary-light mb-10 leading-[1.4]">
        {{ t('check_vir_address_pls') }}
      </div>
      <BaseButton
        bg-style="secondary"
        :loading="addWalletInsertLoading"
        size="sm"
        class="min-w-90"
        @click="handleBindAddress"
      >
        {{ isWithdraw ? t('submit') : t('label_bind_crypto_address') }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
