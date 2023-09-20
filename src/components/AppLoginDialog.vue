<script setup lang='ts'>
// const { t } = useI18n()
</script>

<template>
  <div class="app-login">
    <AppLogin />
    <div class="app-login-icon">
      <BaseIcon font-size="58" name="navbar-user-bet" />
      <BaseIcon font-size="58" name="navbar-user-bet" />
      <BaseIcon font-size="58" name="navbar-user-bet" />
      <BaseIcon font-size="58" name="navbar-user-bet" />
    </div>

    <div class="app-login-text">
      <div class="text-white">
        忘记密码
      </div>
      <div class="reg-text">
        还未有账户？<span class="text-white">注册账户</span>
      </div>
      <div class="stake-text">
        Stake受hCaptcha保护，hCaptcha <span>隐私政策</span> 和 <span>服务条款</span> 适用
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-login {
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    .text-white {
      color: var(--tg-text-white) !important;
    }
    .reg-text {
      margin: 12px 0;
    }
    .stake-text {
      font-size: var(--tg-font-size-xs);
      padding-bottom: var(--tg-font-size-lg);
    }
  }
}
</style>
