<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { TTreeListType } from '~/composables/useApiMemberTreeList'

interface Props {
  /** 是否第一次绑定 */
  isFirst?: boolean
  /** 是否在存款内绑定 */
  isWithdraw?: boolean
  /** 户名 */
  openName?: string
  /** 是否需要padding */
  container?: boolean
  /** 货币对象 */
  activeCurrency: CurrencyData<TTreeListType>
  /** '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡 */
  currentType: '1' | '2'
  /** 回调 */
  callback?: () => void
}
interface IBank {
  id: string
  name: string
  pid: string
  sortlevel: string
}

const props = withDefaults(defineProps<Props>(), {
  isFirst: false,
  openName: '',
  container: true,
  isWithdraw: false,
})

const emit = defineEmits(['added'])
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()

const { openNotify } = useNotify()

/** '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡 */
const currentType = ref<'1' | '2'>(props.currentType)
const currencyId = ref(props.activeCurrency.cur ?? '')
const { bool: isDefault, setFalse: setIsDefaultFalse } = useBoolean(false)
// const bankTypeData = ref([{ label: '银行转账', icon: 'fiat-bank', value: '1' }])
// const pixTypeData = ref([{ label: 'PIX', icon: 'fiat-pix', value: '2' }])
const callback = ref<(() => void) | undefined>(props.callback)

// const currentTypeBanks = computed(() =>
//   props.currentType === '1' ? bankTypeData.value : pixTypeData.value)

const isBankType = computed(() => {
  return currentType.value === '1'
})

const {
  value: openName,
  errorMessage: usernameError,
  validate: usernameValidate,
  resetField: usernameReset,
} = useField<string>('username', (value) => {
  if (!value || value.trim() === '' || value.trim().length > 20)
    return t('validate_msg_input_name')
  return ''
})
const {
  value: bankName,
  errorMessage: banknameError,
  validate: banknameValidate,
  resetField: banknameReset,
} = useField<string>('bankname', (value) => {
  if (!value)
    return isBankType.value ? t('validate_msg_choose_bank') : t('validate_msg_choose_pix_account_type')
  return ''
})
const {
  value: bankAccount,
  errorMessage: bankaccountError,
  validate: bankaccountValidate,
  resetField: bankaccountReset,
} = useField<string>('bankaccount', (value) => {
  if (!value)
    return isBankType.value ? t('validate_msg_input_bank_number') : t('validate_msg_input_third_account')
  else if (value.length < 4 || value.length > 30)
    return isBankType.value ? t('validate_msg_regexp_bank_number') : t('validate_msg_regexp_pix_account')
  return ''
})
const {
  value: bankAreaCpf,
  errorMessage: bankAreaCpfError,
  validate: bankAreaCpfValidate,
  resetField: bankAreaCpfReset,
} = useField<string>('bankAreaCpf', (value) => {
  if (value && value.length > 100)
    return t('validate_msg_input_branch_address')
  return ''
})

const { openPayPwdDialog, closePayPwdDialog } = usePayPwdDialog()
const {
  data: bankList,
  run: runBankTreeList,
} = useApiMemberTreeList(props.activeCurrency.bankTree)
const {
  run: runBankcardInsert,
  loading: bankcardInsertLoading,
} = useRequest(ApiMemberBankcardInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: t('label_bind'),
      message: t('success_bind'),
    })
    usernameReset()
    banknameReset()
    bankaccountReset()
    bankAreaCpfReset()
    setIsDefaultFalse()
    closePayPwdDialog()
    if (!props.isWithdraw)
      closeDialog()
    emit('added')
  },
})

const bankSelectOptions = computed(() => {
  if (!bankList.value)
    return []
  return bankList.value.map((item: IBank) => {
    const temp = {
      label: item.name,
      icon: 'fiat-bank',
      value: item.name,
    }
    return temp
  })
})

const onBindBank = async function () {
  await usernameValidate()
  await banknameValidate()
  await bankaccountValidate()
  await bankAreaCpfValidate()
  if (!usernameError.value && !usernameError.value
  && !bankaccountError.value) {
    openPayPwdDialog({
      runSubmit: (payPassword: string) => {
        runBankcardInsert({
          currency_id: currencyId.value,
          bank_name: bankName.value,
          open_name: openName.value,
          bank_area_cpf: bankAreaCpf.value,
          bank_account: bankAccount.value,
          is_default: isDefault.value ? 1 : 2,
          pay_password: payPassword,
        })
      },
      toPayPwdSet: () => {
        callback.value = undefined
        closeDialog()
        closePayPwdDialog()
      },
      loading: bankcardInsertLoading,
    })
  }
}

watch(() => props.currentType, () => {
  currentType.value = props.currentType
})
watch(() => props.activeCurrency, () => {
  currencyId.value = props.activeCurrency.cur
  runBankTreeList({ level: props.activeCurrency.bankTree })
  usernameReset()
  banknameReset()
  bankaccountReset()
  bankAreaCpfReset()
})

onMounted(() => {
  if (props.openName)
    openName.value = props.openName
})
onUnmounted(() => {
  callback.value && callback.value()
})
</script>

<template>
  <div class="app-add-bankcards" :class="{ 'is-first': props.container }">
    <div class="bind-identity">
      <div v-if="props.isWithdraw " class="bind-tips">
        <BaseIcon name="uni-warning" />
        {{ t('validate_msg_withdraw_way') }}！
      </div>
      <BaseLabel
        :label="t('label_account_holder_name')"
        :must="props.isFirst"
        :label-content="props.isWithdraw ? t('tip_msg_bind_once') : ''"
      >
        <BaseInput
          v-model="openName"
          :msg="usernameError"
          :disabled="!props.isFirst"
        />
      </BaseLabel>
      <!-- <BaseLabel label="提款方式">
        <AppWithdrawalDepositType
          v-model="currentType"
          :current-type="currentTypeBanks"
        />
      </BaseLabel> -->
      <BaseLabel
        :label="isBankType
          ? t('validate_msg_choose_bank') : t('validate_msg_choose_pix_account_type')"
        must
      >
        <BaseSelect
          v-model="bankName"
          :msg="banknameError"
          :options="bankSelectOptions"
          style="--tg-base-select-style-padding-y: var(--tg-spacing-8)"
        />
      </BaseLabel>
      <BaseLabel
        :label="isBankType
          ? t('label_bank_number') : t('validate_msg_input_third_account')"
        must
      >
        <BaseInput
          v-model="bankAccount"
          :msg="bankaccountError"
        />
      </BaseLabel>
      <BaseInput
        v-if="isBankType"
        v-model="bankAreaCpf"
        :msg="bankAreaCpfError"
        :label="t('label_branch_address')"
      />
      <div v-if="currentType === '1'" class="checkbox-wrap">
        <span>{{ t('tip_msg_is_default_bank_number') }}</span>
        <BaseCheckBox v-model="isDefault" />
      </div>
      <BaseButton bg-style="primary" size="md" @click="onBindBank">
        {{ isWithdraw ? t('submit') : t('label_bind') }}
      </BaseButton>
      <div v-if="!isWithdraw" class="bind-point">
        {{ t('tip_msg_all_bind_account') }}
        <span>{{ t('tip_msg_name_identical') }}</span>，{{ t('tip_msg_name_edit') }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-add-bankcards{
  &.is-first{
    padding:
    var(--tg-spacing-20)
    var(--tg-spacing-16)
    var(--tg-spacing-16)
    var(--tg-spacing-16);
  }
  .bind-identity{
    display: flex;
    flex-direction: column;
    gap:.75rem;
    .bind-tips{
      text-align: center;
      color: var(--tg-text-warn);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .25rem;
      margin-bottom: var(--tg-spacing-5);
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
    .bind-point{
      color: #B1BAD3;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.4;
      span{
        color: #fff;
      }
    }
  }
}
</style>
