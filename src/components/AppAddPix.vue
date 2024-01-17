<script setup lang='ts'>
interface Props {
  title?: string
  /** 是否第一次绑定 */
  isFirst?: boolean
  /** 户名 */
  openName?: string
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

const emit = defineEmits(['added'])
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const { openNotify } = useNotify()
const { bool: isDefault, setFalse: setIsDefaultFalse } = useBoolean(false)

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
    return t('validate_msg_choose_pix_account_type')
  return ''
})
const {
  value: bankAccount,
  errorMessage: bankaccountError,
  validate: bankaccountValidate,
  resetField: bankaccountReset,
} = useField<string>('bankaccount', (value) => {
  if (!value)
    return t('validate_msg_input_third_account')
  else if (value.length < 4 || value.length > 30)
    return t('validate_msg_regexp_pix_account')
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
const passwordRef = ref()
const password = ref('')

const { openPayPwdDialog, closePayPwdDialog } = usePayPwdDialog()
const { data: bankList } = useApiMemberTreeList('019002')
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
          currency_id: '702',
          bank_name: bankName.value,
          open_name: openName.value,
          bank_area_cpf: bankAreaCpf.value,
          bank_account: bankAccount.value,
          is_default: isDefault.value ? 1 : 2,
          pay_password: payPassword,
        })
      },
      toPayPwdSet: () => {
        // callback.value = undefined
        closeDialog()
        closePayPwdDialog()
      },
      loading: bankcardInsertLoading,
    })
  }
}
</script>

<template>
  <div class="px-16 pb-16">
    <div class="border-tg-secondary border-[1px] rounded-t-[4px] border-solid px-20 pb-14 pt-19">
      <div class="text-[18px] font-medium leading-[1.4]">
        {{ title }}
      </div>
      <div class="bg-tg-secondary my-15 h-1 w-full" />
      <div class="flex flex-col gap-14">
        <!-- 姓名 -->
        <div class="flex items-center gap-14">
          <BaseLabel class="grow" must :label="t('first_name')">
            <BaseInput />
          </BaseLabel>
          <BaseLabel class="grow" must :label="t('last_name')">
            <BaseInput />
          </BaseLabel>
        </div>
        <!-- 地区 -->
        <div class="flex items-center gap-14">
          <BaseLabel class="grow" must :label="t('country_pls')">
            <BaseInput />
          </BaseLabel>
          <BaseLabel class="grow" must :label="t('city_pls')">
            <BaseInput />
          </BaseLabel>
        </div>
        <BaseSelect
          :label="t('select_pix_type_pls')"
          must small
        />
        <BaseLabel must :label="t('pix_account')">
          <BaseInput />
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
        {{ t('check_account_pls') }}
      </div>
      <BaseButton
        bg-style="secondary"
        :loading="bankcardInsertLoading"
        size="sm"
        class="min-w-90"
        @click="onBindBank"
      >
        {{ t('label_bind') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
