<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
// 是否设置为默认地址
const { bool: isDefaultAddress, setBool: setDefaultAddress } = useBoolean(false)
const countryOptions = ref<ISelectOption[]>([
  { label: '中国', value: '1137' },
  { label: '美国', value: '1138' },
])
const bank_nameOptions = ref<ISelectOption[]>([
  { label: '中国银行', value: '中国银行' },
  { label: '中国农业银行', value: '中国农业银行' },
])

/**
 * {
    "currency_id": "701",
    "open_name": "张三1", //开户人姓名，如：李四
    "bank_name": "农业银行", //银行名称，如：农业银行
    "bank_account": "66232234112216261231", //银行账号
    "bank_area_cpf": "1111", //开户地区，如：广东省深圳市龙华
    "is_default": 1, //是否默认：1：是，2否
    "pay_password": "123456",
    "country": "1137", //国家
    "city": "shanghai", //城市
    "address": "abc test" //详细地址
  }
 */

// 1.3验证规则，核心
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

const { values, errors, handleSubmit, resetForm } = useForm({ validationSchema })
const { value: xing, errorMessage: xingError } = useField<string>('xing')
const { value: ming, errorMessage: mingError } = useField<string>('ming')
const { value: country, errorMessage: countryError } = useField<string>('country')
const { value: city, errorMessage: cityError } = useField<string>('city')
const { value: address, errorMessage: addressError } = useField<string>('address')
const { value: bank_name, errorMessage: bank_nameError } = useField<string>('bank_name')
const { value: bank_account, errorMessage: bank_accountError } = useField<number>('bank_account')
const { value: pay_password, errorMessage: pay_passwordError } = useField<string>('pay_password')

// 3、表单行为===============================================================================
// 提交表单：验证成功的处理和验证失败的处理
// 第一个参数：验证成功回调，入参为表单数据
// 第二个参数：验证失败回调，入参为表单数据、错误信息、验证结果
// 验证成功后，调用API，resetForm()，重置表单
const onSubmit = handleSubmit((values) => {
  console.log('发送表单数据', values)
  // resetForm() // 重置表单
}, (values, errors, results) => {
  console.log('表单数据', values)
  console.log('错误信息', errors)
  console.log('验证结果', results)
})
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
          bg-style="secondary"
          size="sm"
          class="min-w-90"
          origin-type="submit"
        >
          {{ $t('label_bind') }}
        </BaseButton>
      </div>
    </form>

    <div class="content200">
      <h3>表单所有字段值</h3>
      <h6>{{ values }}</h6>
      <h3>表单所有错误信息</h3>
      <h6>{{ errors }}</h6>
    </div>
  </div>
</template>
