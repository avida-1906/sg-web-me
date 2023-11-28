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
    return t('pls_enter_username')
  else if (!usernameReg.test(value))
    return t('validate_msg_user_name_tip')
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
  runThirdReg({
    email: props.data.email ?? email.value,
    username: username.value,
    third_id: props.data.id,
    third_type: props.ty,
  })
}

onMounted(() => {
  if (props.data && !props.data.email)
    setEmailShow(true)
})
</script>

<template>
  <div class="app-auth-third-form">
    <div class="app-register-input-box">
      <BaseLabel v-if="isEmailEmptyAndMust" :label="t('email_address')" must-small>
        <BaseInput
          ref="emailRef" v-model="email" :msg="emailErrorMsg"
          @blur="onEmailUsernameBlur(2)"
        />
      </BaseLabel>
      <!-- msg-after-touched  -->
      <BaseLabel :label="t('username')" must-small>
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
  .app-register-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
  }
}
</style>
