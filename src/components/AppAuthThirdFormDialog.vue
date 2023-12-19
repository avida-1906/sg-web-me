<script lang="ts" setup>
interface Props {
  data: {
    id: string
    email: string
    name: string
  }
  ty: 1 | 2 | 3 | 4
}

const props = defineProps<Props>()

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const appStore = useAppStore()
const { openTermsDialog } = useDialogAuthTerms()

const { bool: isEmailEmptyAndMust, setBool: setEmailShow } = useBoolean(false)
const emailRef = ref()
const userNameRef = ref()

const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: validateEmail,
} = useField<string>('email', (value) => {
  if (!value)
    return t('pls_enter_email_address')
  else if (!emailReg.test(value))
    return t('email_address_incorrect')
  return ''
})
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: validateUsername,
  // setErrors: setUsernameErrors,
} = useField<string>('username', (value) => {
  if (!value)
    return '最小字符长度为 3'
  else if (value.length < 3)
    return '最小字符长度为 3'
  else if (value.match('[^a-z0-9]'))
    return '用户名含有无效的字符'
  else if (value.length > 14)
    return '最大字符长度为 14'
  else if (!usernameReg.test(value))
    return t('validate_msg_user_name_tip')
  // 此用户名已被使用，请选择另一用户名。
  // 用户名含有无效的字符
  // 您的用户名长度必须为 3 – 14 个字符。
  return ''
})

const { run: runExists } = useRequest(ApiMemberExists, {
  async onSuccess() {
  },
  onError() {
  },
})

const { run: runThirdReg } = useRequest(ApiMemberThirdReg, {
  onSuccess: (data) => {
    appStore.setToken(data)
    closeDialog()
    setTimeout(() => {
      location.replace('/')
    }, 100)
  },
})

function onEmailUsernameBlur(type: 1 | 2) {
  if (type === 1 && username.value && !usernameErrorMsg.value)
    runExists({ ty: type, val: username.value, noNotify: true })
  if (type === 2 && email.value && !emailErrorMsg.value)
    runExists({ ty: type, val: email.value })
}

async function submit() {
  if (isEmailEmptyAndMust.value)
    await validateEmail()

  await validateUsername()
  // closeDialog()
  const thirdReg = {
    email: props.data.email ?? email.value,
    username: username.value,
    third_id: props.data.id,
    third_type: props.ty,
    device_number: application.getDeviceNumber(),
  }
  Session.set(STORAGE_THIRDREG_PARAMS_KEYWORDS, thirdReg)
  openTermsDialog()
  // runThirdReg({
  //   email: props.data.email ?? email.value,
  //   username: username.value,
  //   third_id: props.data.id,
  //   third_type: props.ty,
  //   device_number: application.getDeviceNumber(),
  // })
}

onMounted(() => {
  if (props.data && !props.data.email)
    setEmailShow(true)
})
</script>

<template>
  <div class="app-auth-third-form">
    <div class="app-register-title">
      {{ t('reg_step1') }}
    </div>
    <div class="app-register-input-box">
      <BaseLabel v-if="isEmailEmptyAndMust" :label="t('email_address')" must-small>
        <BaseInput
          ref="emailRef" v-model="email" :msg="emailErrorMsg"
          @blur="onEmailUsernameBlur(2)"
        />
      </BaseLabel>
      <!-- msg-after-touched  -->
      <BaseLabel label="请选择显示名称" must-small>
        <BaseInput
          ref="userNameRef" v-model="username"
          :msg="usernameErrorMsg"
          @blur="onEmailUsernameBlur(1)"
        />
      </BaseLabel>
      <BaseButton bg-style="secondary" size="md" @click="submit">
        {{ t('continue') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-auth-third-form {
  padding: var(--tg-spacing-button-padding-horizontal-sm) var(--tg-spacing-button-padding-horizontal-sm);
  padding-top: 0;
  .app-register-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
  }
}
.app-register-title {
  color: var(--tg-secondary-light);
  text-align: center;
  font-size: var(--tg-font-size-base);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 24px;
  padding-bottom: var(--tg-spacing-16);
}
</style>
