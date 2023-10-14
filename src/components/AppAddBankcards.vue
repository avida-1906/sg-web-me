<script setup lang='ts'>
import type { IUserCurrencyList } from '~/stores/app'
import type { TTreeListType } from '~/composables/useApiMemberTreeList'

type TUserCurrencyList = {
  bank_tree: TTreeListType
} & Pick<IUserCurrencyList, 'type' | 'balance' | 'balanceWithSymbol' | 'cur' | 'symbol'>

interface Props {
  /** 是否首次绑定 */
  isFirst?: boolean
  /** 户名 */
  openName?: string
  /** 是否需要padding */
  container?: boolean
  /** 货币对象 */
  activeCurrency: TUserCurrencyList
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
const bankAreaCpf = ref('')
const { bool: isDefault, setFalse: setIsDefaultFalse } = useBoolean(false)

const {
  value: openName,
  errorMessage: usernameError,
  validate: usernameValidate,
  resetField: usernameReset,
} = useField<string>('username', (value) => {
  if (!value)
    return '请输入用户名'
  return ''
})
const {
  value: bankName,
  errorMessage: banknameError,
  validate: banknameValidate,
  resetField: banknameReset,
} = useField<string>('bankname', (value) => {
  if (!value)
    return '请选择银行'
  return ''
})
const {
  value: bankAccount,
  errorMessage: bankaccountError,
  validate: bankaccountValidate,
  resetField: bankaccountReset,
} = useField<string>('bankaccount', (value) => {
  if (!value)
    return '请输入账户号码'
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
  return ''
})

const {
  data: bankList,
} = useApiMemberTreeList(props.activeCurrency.bank_tree)
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
    paypasswordReset()
    bankAreaCpf.value = ''
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
  if (currentType.value === '2')
    bankName.value = 'PIX'
  await usernameValidate()
  await banknameValidate()
  await bankaccountValidate()
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
        label="用户名"
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
      <BaseLabel v-if="currentType === '1'" label="请选择银行" must>
        <BaseSelect
          v-model="bankName"
          :msg="banknameError"
          :options="bankSelectOptions"
          class="base-select"
        />
      </BaseLabel>
      <BaseLabel :label="currentType === '1' ? '银行账户' : '请输入第三方账户 '" must>
        <BaseInput v-model="bankAccount" :msg="bankaccountError" />
      </BaseLabel>
      <BaseInput
        v-if="currentType === '1'"
        v-model="bankAreaCpf"
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
