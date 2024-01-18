<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { CurrencyCode } from '~/composables/useCurrencyData'

interface Props {
  openName: string
  currencyId: CurrencyCode
  isWithdraw?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const currencyId = ref<CurrencyCode>(props.currencyId)
const auth_type = ref<'1' | '2'>('1')
// 是否设置为默认地址
const { bool: isDefaultAddress, setBool: setDefaultAddress } = useBoolean(false)
const { openWalletDialog } = useWalletDialog({ activeTab: 'cardHolder' })
const closeCurDialog = inject('closeDialog', () => {})

// #region 表单验证
const validationSchema = yup.object({
  xing: yup.string().trim().required(t('enter_your_content')),
  ming: yup.string().trim().required(t('enter_your_content')),
  country: yup.string().trim().required(t('enter_your_content')),
  city: yup.string().trim().required(t('enter_your_content')),
  bank_name: yup.string().trim().required(t('enter_your_content')),
  bank_account: yup.string().required(t('enter_your_content')).matches(/^[a-zA-Z0-9]{4,30}$/, t('validate_msg_regexp_pix_account')),
  pay_password: yup.string().trim().required(t('enter_your_content')),
})
// #endregion

// #region 表单数据
const { values, errors, handleSubmit, resetForm } = useForm({ validationSchema })
const { value: xing, errorMessage: xingError } = useField<string>('xing')
const { value: ming, errorMessage: mingError } = useField<string>('ming')
const { value: country, errorMessage: countryError } = useField<string>('country')
const { value: city, errorMessage: cityError } = useField<string>('city')
const { value: bank_name, errorMessage: bank_nameError } = useField<string>('bank_name')
const { value: bank_account, errorMessage: bank_accountError } = useField<number>('bank_account')
const { value: pay_password, errorMessage: pay_passwordError } = useField<string>('pay_password')
// #endregion

// #region 请求api
const { openNotify } = useNotify()
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
    closeCurDialog()
    openWalletDialog()
  },
})
// #endregion

// #region 国家和银行数据
const { data: countryList } = useRequest(ApiMemberBankcardBank, {
  defaultParams: [{
    currency_id: currencyId.value,
  }],
  manual: false,
})
const countryOptions = computed(() => {
  if (!countryList.value)
    return []
  return countryList.value.map((item) => {
    const temp = {
      label: item.country_name ? item.country_name : '--',
      value: item.country_id,
    }
    return temp
  })
})
const bank_nameOptions = computed(() => {
  if (!country.value)
    return []

  const temp = countryList.value?.find(item => item.country_id === country.value)
  return (temp?.bank_list ?? []).map((item) => {
    const temp = {
      label: item.name,
      value: item.name,
    }
    return temp
  })
})
// #endregion

// #region 提交表单
// 3、表单行为===============================================================================
// 提交表单：验证成功的处理和验证失败的处理
// 第一个参数：验证成功回调，入参为表单数据
// 第二个参数：验证失败回调，入参为表单数据、错误信息、验证结果
// 验证成功后，调用 resetForm()，重置表单
const onSubmit = handleSubmit((values) => {
  console.log('发送表单数据', values)
  runBankcardInsert({
    currency_id: currencyId.value,
    open_name: `${values.xing},${values.ming}`,
    bank_name: values.bank_name,
    bank_account: values.bank_account,
    is_default: isDefaultAddress.value ? 1 : 2,
    pay_password: values.pay_password,
    country: values.country,
    city: values.city,
    address: '',
    auth_type: +auth_type.value as any,
  })
  // resetForm() // 重置表单
})
// #endregion

// 默认选中第一个国家
watch(countryOptions, (val) => {
  if (val.length)
    country.value = val[0].value
})
</script>

<template>
  <div class="px-16 pb-16">
    <form class="border-tg-secondary border rounded-[4px] border-solid" @submit="onSubmit">
      <div class="px-20">
        <div class="border-tg-secondary border-b border-solid pb-15 pt-19 text-[18px] font-[600]">
          绑定PIX
        </div>
      </div>
      <div class="flex gap-14 px-20 pt-14">
        <div class="flex-1">
          <BaseLabel must label="名字">
            <BaseInput v-model="ming" :msg="mingError" />
          </BaseLabel>
        </div>
        <div class="flex-1">
          <BaseLabel must label="姓氏">
            <BaseInput v-model="xing" :msg="xingError" />
          </BaseLabel>
        </div>
      </div>
      <div class="flex gap-14 px-20 pt-14">
        <div class="flex-1">
          <BaseLabel must label="国家">
            <BaseSelect v-model="country" small :options="countryOptions" :msg="countryError" />
          </BaseLabel>
        </div>
        <div class="flex-1">
          <BaseLabel must label="城市">
            <BaseInput v-model="city" :msg="cityError" />
          </BaseLabel>
        </div>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="PIX账号类型">
          <BaseSelect v-model="bank_name" small :options="bank_nameOptions" :msg="bank_nameError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="PIX账号">
          <BaseInput v-model="bank_account" :msg="bank_accountError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <AppPasswordInput v-model="pay_password" v-model:modelType="auth_type" :err-pay-pwd="pay_passwordError" />
      </div>
      <div class="flex items-center px-20 py-14">
        <BaseCheckBox v-model="isDefaultAddress" />
        <span class="text-tg-secondary-light cursor-pointer" @click="setDefaultAddress(!isDefaultAddress)">{{ $t('is_default_addr') }}</span>
      </div>
      <div class="border-tg-secondary border-t rounded-b-[4px] border-solid px-20 pb-24">
        <div class="text-tg-secondary-light py-10">
          {{ $t('check_account_pls') }}
        </div>
        <BaseButton
          :loading="bankcardInsertLoading"
          bg-style="secondary"
          size="sm"
          class="min-w-90"
          origin-type="submit"
        >
          {{ $t('label_bind') }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>
