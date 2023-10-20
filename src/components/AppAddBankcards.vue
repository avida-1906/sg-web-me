<script setup lang='ts'>
import type { IUserCurrencyList } from '~/stores/app'
import type { TTreeListType } from '~/composables/useApiMemberTreeList'

interface Props {
  /** 是否首次绑定 */
  isFirst?: boolean
  /** 户名 */
  openName?: string
  /** 是否需要padding */
  container?: boolean
  /** 货币对象 */
  activeCurrency: IUserCurrencyList
  /** '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡 */
  currentType: '1' | '2'
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
})
const closeDialog = inject('closeDialog', () => {})

const { openNotify } = useNotify()

/** '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡 */
const currentType = ref<'1' | '2'>(props.currentType)
const currencyId = ref(props.activeCurrency.cur ?? '')
const { bool: isDefault, setFalse: setIsDefaultFalse } = useBoolean(false)

const isBankType = computed(() => {
  return currentType.value === '1'
})

const {
  value: openName,
  errorMessage: usernameError,
  validate: usernameValidate,
  resetField: usernameReset,
} = useField<string>('username', (value) => {
  if (!value || value.length > 20)
    return '请输入正确姓名'
  return ''
})
const {
  value: bankName,
  errorMessage: banknameError,
  validate: banknameValidate,
  resetField: banknameReset,
} = useField<string>('bankname', (value) => {
  if (!value)
    return isBankType.value ? '请选择银行' : '请选择PIX账户类型'
  return ''
})
const {
  value: bankAccount,
  errorMessage: bankaccountError,
  validate: bankaccountValidate,
  resetField: bankaccountReset,
} = useField<string>('bankaccount', (value) => {
  if (!value)
    return isBankType.value ? '请输入银行卡号码' : '请输入PIX账户'
  else if (value.length < 4 || value.length > 30)
    return isBankType.value ? '请输入 4 - 30 位数字组成的正确银行卡号' : '请输入 4 - 30 位数字组成的正确PIX账户'
  return ''
})
const {
  value: bankAreaCpf,
  errorMessage: bankAreaCpfError,
  validate: bankAreaCpfValidate,
  resetField: bankAreaCpfReset,
} = useField<string>('bankAreaCpf', (value) => {
  if (!value || value.length > 100)
    return '请输入正确开户支行地址'
  return ''
})
const {
  value: payPassword,
  errorMessage: paypasswordError,
  validate: paypasswordValidate,
  resetField: paypasswordReset,
} = useField<string>('paypassword', (value) => {
  if (!value)
    return '请输入交易密码'
  else if (!payPasswordReg.test(value))
    return '请输入6位数字组成的交易密码'
  return ''
})

const {
  data: bankList,
  run: runBankTreeList,
} = useApiMemberTreeList(props.activeCurrency.bank_tree as TTreeListType)
const {
  run: runBankcardInsert,
} = useRequest(ApiMemberBankcardInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: '添加成功',
    })
    usernameReset()
    banknameReset()
    bankaccountReset()
    bankAreaCpfReset()
    paypasswordReset()
    setIsDefaultFalse()
    closeDialog()
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
  await paypasswordValidate()
  if (!usernameError.value && !usernameError.value && !bankaccountError.value) {
    runBankcardInsert({
      currency_id: currencyId.value,
      bank_name: bankName.value,
      open_name: openName.value,
      bank_area_cpf: bankAreaCpf.value,
      bank_account: bankAccount.value,
      is_default: isDefault.value ? 1 : 2,
      pay_password: payPassword.value,
    })
  }
}

watch(() => props.currentType, () => {
  currentType.value = props.currentType
})
watch(() => props.activeCurrency, () => {
  currencyId.value = props.activeCurrency.cur
  runBankTreeList({ level: props.activeCurrency.bank_tree })
})

onMounted(() => {
  if (props.openName)
    openName.value = props.openName
})
</script>

<template>
  <div class="app-add-bankcards" :class="{ 'is-first': props.container }">
    <div class="bind-identity">
      <div v-if="props.isFirst " class="bind-tips">
        <BaseIcon name="uni-warning" />
        请先绑定提款方式，再进行提款！
      </div>
      <BaseLabel
        :label="isBankType ? '开户人姓名' : '账户人姓名'"
        :must="props.isFirst"
        :label-content="props.isFirst ? '绑定后不可更改' : ''"
      >
        <BaseInput
          v-model="openName"
          :msg="usernameError"
          :disabled="!props.isFirst"
        />
      </BaseLabel>
      <BaseLabel label="提款方式">
        <AppWithdrawalDepositType v-model="currentType" />
      </BaseLabel>
      <BaseLabel :label="isBankType ? '请选择银行' : '请选择PIX账户类型'" must>
        <BaseSelect
          v-model="bankName"
          :msg="banknameError"
          :options="bankSelectOptions"
          class="base-select"
        />
      </BaseLabel>
      <BaseLabel :label="isBankType ? '银行卡号' : 'PIX账户 '" must>
        <BaseInput
          v-model="bankAccount"
          :msg="bankaccountError"
        />
      </BaseLabel>
      <BaseInput
        v-if="isBankType"
        v-model="bankAreaCpf"
        :msg="bankAreaCpfError"
        label="开户行地址"
      />
      <BaseLabel label="交易密码" must>
        <BaseInput
          v-model="payPassword"
          :msg="paypasswordError"
          type="password"
          max="6"
        />
      </BaseLabel>
      <div class="checkbox-wrap">
        <span>是否设为默认卡号</span>
        <BaseCheckBox v-model="isDefault" />
      </div>
      <BaseButton bg-style="primary" size="md" @click="onBindBank">
        提交
      </BaseButton>
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
    .base-select{
      --tg-base-select-style-padding-y: var(--tg-spacing-8);
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
}
</style>
