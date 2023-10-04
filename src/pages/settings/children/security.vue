<script lang="ts" setup>
const password = ref('')
const newPassword = ref('')
const againNewPassword = ref('')
const twoStepPassword = ref('')

const twoStepCode = ref('HM3XE2DLGVWECZDYK5BUMNTQORGVCKBVO5MG4JBSG46EGMCSHZEA')
</script>

<template>
  <div class="tg-settings-security">
    <AppSettingsContentItem title="密码">
      <BaseLabel label="旧密码" must-small>
        <BaseInput v-model="password" type="password" />
      </BaseLabel>
      <BaseLabel label="新密码" must-small>
        <BaseInput v-model="newPassword" type="password" />
      </BaseLabel>
      <BaseLabel label="确认新密码" must-small>
        <BaseInput v-model="againNewPassword" type="password" />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="双重验证" last-one>
      <template #top-desc>
        启用双重验证以让您的账户更加安全。
      </template>
      <div class="two-step-verification">
        <p class="text">
          将代码复制到您的身份验证器应用程序（Authenticator App）
        </p>
        <AppCopyLine :msg="twoStepCode" />
        <p class="mt-16">
          防止他人看到此页！
        </p>
        <div class="qr-wrap">
          <BaseQrcode url="www.baidu.com" class="mt-16" />
        </div>
        <div class="mt-16">
          <BaseLabel label="密码" must-small>
            <BaseInput v-model="password" :msg="pwdErrorMsg" placeholder="请输入用户名" type="password" />
          </BaseLabel>
          <div class="mt-16">
            <BaseLabel label="双重验证" must-small>
              <BaseInput v-model="twoStepPassword" :msg="pwdErrorMsg" />
            </BaseLabel>
          </div>
        </div>
      </div>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-security {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  .two-step-verification{
    .text{
      padding-bottom: var(--tg-spacing-4);
    }
    .mt-16{
      margin-top: var(--tg-spacing-16);
    }
    .qr-wrap{
      width: 144px;
      height: 144px;
    }

  }
}
</style>
