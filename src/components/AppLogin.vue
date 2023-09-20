<script setup lang='ts'>
// const { t } = useI18n()
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return '请输入电邮地址或用户名'

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return '请输入密码'

  return ''
})
</script>

<template>
  <div>
    <BaseInput v-model="username" label="电邮地址或用户名" :msg="usernameErrorMsg" placeholder="请输入电邮地址或用户名" must />
    <BaseInput v-model="password" label="密码" :msg="pwdErrorMsg" placeholder="请输入密码" type="password" must />
    <BaseButton class="login-btn" bg-style="secondary">
      登陆
    </BaseButton>
    <BaseDivider title-placement="center">
      或者使用
    </BaseDivider>
  </div>
</template>

<style lang='scss' scoped>
.login-btn {
  width: 100%;
}
</style>
