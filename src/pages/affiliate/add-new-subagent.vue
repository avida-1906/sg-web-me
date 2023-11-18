<script lang="ts" setup>
const { t } = useI18n()
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: valiUsername,
} = useField<string>('password', fieldVerifyLoginPwd)
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
} = useField<string>('password', fieldVerifyLoginPwd)

function fieldVerifyLoginPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  return ''
}
</script>

<template>
  <div class="layout-spacing reset page-new-subagent">
    <BaseInput
      v-model="username"
      :msg="usernameErrorMsg"
      :placeholder="t('input_mem_account')"
    >
      <template #left-icon>
        <BaseIcon name="navbar-user" />
      </template>
    </BaseInput>
    <BaseInput
      v-model="password"
      :msg="pwdErrorMsg"
      :placeholder="t('pls_enter_password')"
      type="password"
    >
      <template #left-icon>
        <BaseIcon name="uni-lock" />
      </template>
    </BaseInput>
    <BaseButton bg-style="primary" size="md">
      {{ t('submit_reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.page-new-subagent{
  gap: var(--tg-spacing-20);
  max-width: 420px;
  margin: auto;
}
</style>
