<script setup lang='ts'>
const payPassword = ref('')
const payPwdErrorMsg = ref('')
</script>

<template>
  <div class="layout-spacing reset app-email-code">
    <BaseLabel label="验证码:">
      <div class="code-box">
        <BaseInputPassword
          v-model="payPassword"
          width-auto
          :msg="payPwdErrorMsg"
        />
      </div>
    </BaseLabel>
    <BaseButton bg-style="secondary" size="md">
      确定
    </BaseButton>
    <div class="second-tips">
      60秒后重新发送送邮件
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-email-code {
  padding: var(--tg-spacing-13) var(--tg-spacing-12) var(--tg-spacing-25);
  gap: var(--tg-spacing-25);
  .code-box{
    margin: auto;
    min-width: 300px;
    max-width: 78%;
  }
  .second-tips{
    font-size: var(--tg-font-size-default);
    font-weight: 500;
    color: var(--tg-text-lightgrey);
  }
}
</style>
