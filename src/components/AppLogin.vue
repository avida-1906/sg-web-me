<script setup lang='ts'>
const { t } = useI18n()
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_or_username')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  return ''
})
</script>

<template>
  <div>
    <BaseInput v-model="username" :label="t('email_or_username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_email_or_username')" must />
    <BaseInput v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must />
    <BaseButton class="btn" bg-style="secondary">
      {{ t('login') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
.btn {
  width: 100%;
}
</style>
