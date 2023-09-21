<script setup lang='ts'>
const { t } = useI18n()

const birthday = ref('')
const { bool: checkboxValue } = useBoolean(false)

const { value: email, errorMessage: emailErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_address')

  return ''
})
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  return ''
})
</script>

<template>
  <div class="app-register">
    <div class="app-register-title">
      {{ t('reg_step1') }}
    </div>
    <!-- <div class="app-register-title">
      {{ t('reg_step2') }}
    </div> -->
    <BaseInput v-model="email" :label="t('email_address')" :msg="emailErrorMsg" :placeholder="t('pls_enter_email_address')" must />
    <BaseInput v-model="username" :label="t('username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_username')" must />
    <BaseInput v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must />

    <BaseInputBirthday v-model="birthday" must />

    <BaseCheckBox v-model="checkboxValue" class="app-register-check-box">
      {{ t('code_optional') }}
    </BaseCheckBox>
    <BaseButton class="app-register-btn" bg-style="secondary">
      {{ t('continue') }}
    </BaseButton>
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
  }
  .base-input,
  .base-input-birthday {
    margin-top: 12px;
  }
  &-check-box {
    margin: 14px 0;
  }
  &-btn {
    width: 100%;
  }
}
</style>
