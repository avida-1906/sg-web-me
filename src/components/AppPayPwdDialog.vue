<script setup lang='ts'>
interface Props {
  runSubmit?: (payPwd: string) => void
  toPayPwdSet?: () => void
  loading?: Ref<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  runSubmit: () => { },
  toPayPwdSet: () => { },
  loading: () => ref(false),
})

const router = useRouter()
const { userInfo } = useAppStore()
const closeDialog = inject('closeDialog', () => { })
const {
  value: payPassword,
  errorMessage: paypasswordError,
  validate: paypasswordValidate,
} = useField<string>('paypassword', (value) => {
  if (!value)
    return '请输入资金密码'
  if (!payPasswordReg.test(value))
    return '您的资金密码含有6位数字'
  return ''
})

function handleSet() {
  props.toPayPwdSet()
  router.push('/settings/security')
}
async function submit() {
  await paypasswordValidate()
  if (!paypasswordError.value)
    props.runSubmit(payPassword.value)
}
</script>

<template>
  <div class="layout-spacing reset app-email-code">
    <template v-if="userInfo?.pay_password === '1'">
      <div class="code-box">
        <BaseInputPassword
          v-model="payPassword"
          width-auto
          :msg="paypasswordError"
        />
      </div>
      <BaseButton bg-style="secondary" size="md" :loading="loading.value" @click="submit">
        确定
      </BaseButton>
    </template>
    <template v-else>
      <div class="set-tips">
        为了您的资金安全，请先设置资金密码。
      </div>
      <div class="box-btn">
        <BaseButton
          type="line"
          style="border-color: var(--tg-text-blue);
          color: var(--tg-text-blue);"
          size="sm"
          @click="closeDialog"
        >
          取消
        </BaseButton>
        <BaseButton bg-style="primary" size="md" @click="handleSet">
          前往设置
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.app-email-code {
    padding: var(--tg-spacing-13) var(--tg-spacing-12) var(--tg-spacing-25);
    gap: var(--tg-spacing-25);
    .code-box{
      margin: 0 auto;
      width: 100%;
      max-width: 360px;
    }
    .set-tips {
      text-align: center;
      font-size: var(--tg-font-size-default);
      font-weight: 500;
      color: var(--tg-text-lightgrey);
    }
    .box-btn {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap:  var(--tg-spacing-12);
    }
}
</style>
