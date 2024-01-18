<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface IBank {
  id: string
  name: string
  pid: string
  sortlevel: string
}

const { t } = useI18n()
const currencyId = ref('701')
const auth_type = ref<1 | 2>(1)
// 是否设置为默认地址
const { bool: isDefaultAddress, setBool: setDefaultAddress } = useBoolean(false)

// #region 表单验证
const validationSchema = yup.object({
  xing: yup.string().trim().required(t('enter_your_content')),
  ming: yup.string().trim().required(t('enter_your_content')),
  country: yup.string().trim().required(t('enter_your_content')),
  city: yup.string().trim().required(t('enter_your_content')),
  bank_name: yup.string().trim().required(t('enter_your_content')),
  address: yup.string().trim().required(t('enter_your_content')),
  bank_account: yup.number().required(t('enter_your_content')).typeError('银行卡号必须是数字'),
  pay_password: yup.string().trim().required(t('enter_your_content')),
})
// #endregion

// #region 表单数据
const { values, errors, handleSubmit, resetForm } = useForm({ validationSchema })
const { value: xing, errorMessage: xingError } = useField<string>('xing')
const { value: ming, errorMessage: mingError } = useField<string>('ming')
const { value: country, errorMessage: countryError } = useField<string>('country')
const { value: city, errorMessage: cityError } = useField<string>('city')
const { value: address, errorMessage: addressError } = useField<string>('address')
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
  },
})
// #endregion

// #region 银行数据
const {
  data: bankList,
  run: runBankTreeList,
} = useApiMemberTreeList('019001')

const bank_nameOptions = computed(() => {
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
// #endregion

// #region 国家数据
const {
  data: countryList,
  run: runCountryList,
} = useApiMemberTreeList('006')

const countryOptions = computed(() => {
  if (!countryList.value)
    return []
  return countryList.value.map((item: IBank) => {
    const temp = {
      label: item.name,
      value: item.id,
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
    open_name: values.xing + values.ming,
    bank_name: values.bank_name,
    bank_account: values.bank_account,
    is_default: isDefaultAddress.value ? 1 : 2,
    pay_password: values.pay_password,
    country: values.country,
    city: values.city,
    address: values.address,
    auth_type: auth_type.value,
  })
  // resetForm() // 重置表单
}, (values, errors, results) => {
  console.log('表单数据', values)
  console.log('错误信息', errors)
  console.log('验证结果', results)
})
// #endregion
</script>

<template>
  <div class="px-16 pb-16">
    <form class="border-tg-secondary border rounded-[4px] border-solid" @submit="onSubmit">
      <div class="px-20 pt-14">
        <BaseLabel must label="名字">
          <BaseInput v-model="xing" placeholder="请输入开户人名字" :msg="xingError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="姓氏">
          <BaseInput v-model="ming" placeholder="请输入开户人姓" :msg="mingError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="国家">
          <BaseSelect v-model="country" small :options="countryOptions" :msg="countryError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="城市">
          <BaseInput v-model="city" placeholder="请填写城市" :msg="cityError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="银行">
          <BaseSelect v-model="bank_name" small :options="bank_nameOptions" :msg="bank_nameError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel label="开户行地址">
          <BaseInput v-model="address" placeholder="请填写开户行地址" :msg="addressError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <BaseLabel must label="银行卡号">
          <BaseInput v-model="bank_account" placeholder="请输入银行卡号" :msg="bank_accountError" />
        </BaseLabel>
      </div>
      <div class="px-20 pt-14">
        <AppPasswordInput v-model="pay_password" />
        <p v-if="pay_passwordError">
          {{ pay_passwordError }}
        </p>
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
