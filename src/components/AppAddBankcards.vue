<script setup lang='ts'>
import { getCurrentLanguage, getCurrentLanguageIdForBackend } from '~/modules/i18n'

interface Props {
  isFirst?: boolean // 是否首次绑定
  openName?: string // 户名
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
})
const closeDialog = inject('closeDialog', () => {})

const { openNotify } = useNotify()

const bankType = getCurrentLanguageIdForBackend()
const bankAreaCpf = ref('')
const { bool: isDefault, setFalse: setIsDefaultFalse } = useBoolean(false)
// '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡
const currentType = ref(getCurrentLanguage() === 'pt-BR' ? '2' : '1')
const bankTypeData = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
])
const pixTypeData = ref([
  { label: 'PIX', icon: 'fiat-bank', value: '2' },
])
const languageBankMap: IObject = {
  'zh-CN': '002',
  'vi-VN': '003',
}
const bankSelectOptions = ref<ISelectOption[]>([])

const { value: openName, errorMessage: usernameError, validate: usernameValidate, resetField: usernameReset } = useField<string>('username', (value) => {
  if (!value)
    return '请输入用户名'
  return ''
})
const { value: bankName, errorMessage: banknameError, validate: banknameValidate, resetField: banknameReset } = useField<string>('bankname', (value) => {
  if (!value)
    return '请选择银行'
  return ''
})
const { value: bankAccount, errorMessage: bankaccountError, validate: bankaccountValidate, resetField: bankaccountReset } = useField<string>('bankaccount', (value) => {
  if (!value)
    return '请输入账户号码'
  return ''
})

openName.value = props.openName

useApiMemberTreeList(languageBankMap[getCurrentLanguage()], {
  onSuccess(data: IBank[]) {
    bankSelectOptions.value = data.map((item: IBank) => {
      const temp = {
        label: item.name,
        icon: 'fiat-bank',
        value: item.name,
      }
      return temp
    })
  },
})
const { run: runBankcardInsert } = useRequest(ApiMemberBankcardInsert, {
  onSuccess(data) {
    openNotify({
      type: 'success',
      message: '添加成功',
    })
    usernameReset()
    banknameReset()
    bankaccountReset()
    bankAreaCpf.value = ''
    setIsDefaultFalse()
    closeDialog()
  },
})
const onBindBank = async function () {
  if (currentType.value === '2')
    bankName.value = 'PIX'
  await usernameValidate()
  await banknameValidate()
  await bankaccountValidate()
  if (!usernameError.value && !usernameError.value && !bankaccountError.value) {
    runBankcardInsert({
      bank_type: bankType,
      bank_name: bankName.value,
      open_name: openName.value,
      bank_area_cpf: bankAreaCpf.value,
      bank_account: bankAccount.value,
      is_default: isDefault.value ? 1 : 2,

    })
  }
}
</script>

<template>
  <div class="app-add-bankcards" :class="{ 'is-first': !props.isFirst }">
    <div class="bind-identity">
      <div v-if="props.isFirst" class="bind-tips">
        <BaseIcon name="uni-warning" />
        请先绑定提款方式，再进行提款！
      </div>
      <BaseLabel label="用户名" :must="props.isFirst" :label-content="props.isFirst ? '绑定后不可更改' : ''">
        <BaseInput v-model="openName" :msg="usernameError" :disabled="!props.isFirst" />
      </BaseLabel>
      <BaseLabel label="提款方式">
        <AppWithdrawalDepositType v-model="currentType" :deposit-type="currentType === '1' ? bankTypeData : pixTypeData" />
      </BaseLabel>
      <BaseLabel v-if="currentType === '1'" label="请选择银行" must>
        <BaseSelect v-model="bankName" :msg="banknameError" :options="bankSelectOptions" class="base-select" />
      </BaseLabel>
      <BaseLabel :label="currentType === '1' ? '银行账户' : '请输入第三方账户 '" must>
        <BaseInput v-model="bankAccount" :msg="bankaccountError" />
      </BaseLabel>
      <BaseInput v-if="currentType === '1'" v-model="bankAreaCpf" label="开户行地址" />
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
    padding: var(--tg-spacing-20) var(--tg-spacing-16) var(--tg-spacing-16) var(--tg-spacing-16);
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
