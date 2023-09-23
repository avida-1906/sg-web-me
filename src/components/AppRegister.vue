<script setup lang='ts'>
const { t } = useI18n()

const appStore = useAppStore()
const birthday = ref('')
const { bool: checkboxValue } = useBoolean(false)

const closeDialog = inject('closeDialog', () => {})

const {
  openTermsConditionsDialog,
} = useTermsConditionsDialog()

const { value: email, errorMessage: emailErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_address')

  if (!emailReg.test(value))
    return t('email_address_incorrect')

  return ''
})
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')

  if (!usernameReg.test(value))
    return t('username_incorrect')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  if (!passwordReg.test(value))
    return t('password_incorrect')

  return ''
})

const { run: runMemberReg, loading: isLoading } = useRequest(() => ApiMemberReg({
  email: username.value,
  username: username.value,
  password: password.value,
  parent_id: '',
  birthday: birthday.value,
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
  onSuccess: async (res: any) => {
    // toast(res)
    appStore.setToken(res)
    closeDialog()
    await nextTick()
    openTermsConditionsDialog()
  },
  onError: (err: any) => {
    toast(err)
  },
})

const isDisabled = computed(() => {
  return (!emailReg.test(email.value) || !usernameReg.test(username.value)) || !passwordReg.test(password.value)
})
</script>

<template>
  <div class="app-register">
    <div class="app-register-title">
      {{ t('reg_step1') }}
    </div>
    <!-- <form></form> -->
    <div class="app-register-input-box">
      <BaseInput v-model="email" :label="t('email_address')" :msg="emailErrorMsg" :placeholder="t('pls_enter_email_address')" must />
      <BaseInput v-model="username" :label="t('username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_username')" must />
      <BaseInput v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must autocomplete="current-password" />
      <BaseInputBirthday v-model="birthday" must />
    </div>
    <div class="app-register-check-box">
      <BaseCheckBox v-model="checkboxValue">
        {{ t('code_optional') }}
      </BaseCheckBox>
      <BaseButton :loading="isLoading" :disabled="isDisabled" class="app-register-btn" bg-style="secondary" @click.stop="runMemberReg">
        {{ t('continue') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-register {
  &-title {
    color: #B1BAD3;
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-bottom: var(--tg-spacing-button-padding-vertical-xs);
  }
  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
  }
  &-check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-14);
    padding-top: var(--tg-spacing-button-padding-vertical-xs);
  }
  &-btn {
    width: 100%;
  }
}
</style>
