<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()

const registerFormRef = ref()

const {
  run: runAgencyInsert,
  loading: loadingAgencyInsert,
} = useRequest(ApiAgencyInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: t('success_register'),
    })
    registerFormRef.value?.resetForm()
  },
})

async function submitRegister() {
  registerFormRef.value?.getMemberReg((paramsReg: {
    username: string
    password: string
    email: string
    birthday: string
  }) => {
    if (paramsReg) {
      runAgencyInsert({
        username: paramsReg.username,
        password: paramsReg.password,
        email: paramsReg.email,
        birthday: paramsReg.birthday,
      })
    }
  })
}
</script>

<template>
  <div class="layout-spacing reset page-new-subagent">
    <div class="title">
      注册子代理
    </div>
    <AppRegisterForm ref="registerFormRef" />
    <BaseButton
      bg-style="secondary" size="md"
      :loading="loadingAgencyInsert" @click="submitRegister"
    >
      {{ t('submit_reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.page-new-subagent{
  gap: var(--tg-spacing-20);
  max-width: 420px;
  margin: 0 auto;
  .title{
    text-align: center;
    color:var(--tg-text-white);
    font-size: var(--tg-font-size-md);
    font-weight: var(--tg-font-weight-semibold);
  }
  .hint {
    padding: var(--tg-spacing-8) var(--tg-spacing-4) var(--tg-spacing-4) 0;
    font-size: var(--tg-font-size-xs);
    color: var(--tg-secondary-light);
  }
}
</style>
