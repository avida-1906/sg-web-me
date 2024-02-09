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

const { t } = useI18n()
const router = useLocalRouter()
const { userInfo } = useAppStore()
const closeDialog = inject('closeDialog', () => { })
const {
  value: payPassword,
  errorMessage: paypasswordError,
  validate: paypasswordValidate,
} = useField<string>('paypassword', (value) => {
  if (!value)
    return t('validate_msg_input_pay_pwd')
  if (!payPasswordReg.test(value))
    return t('validate_msg_input_paypwd_6')
  return ''
})

function handleSet() {
  props.toPayPwdSet()
  router.push('/settings/security-safe-pwd')
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
        {{ t('confirm') }}
      </BaseButton>
    </template>
    <template v-else>
      <div class="set-tips">
        {{ t('tip_for_set_safepwd') }}
      </div>
      <div class="box-btn">
        <BaseButton
          type="line"
          style="border-color: var(--tg-text-blue);
          color: var(--tg-text-blue);"
          size="sm"
          @click="closeDialog"
        >
          {{ t('cancel') }}
        </BaseButton>
        <BaseButton bg-style="primary" size="md" @click="handleSet">
          {{ t('go_set') }}
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
