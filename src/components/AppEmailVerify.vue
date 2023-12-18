<script setup lang='ts'>
interface Props {
  tipText?: string
}

defineProps<Props>()

const { t } = useI18n()
// const closeDialog = inject('closeDialog', () => { })
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const { openNotify } = useNotify()
const {
  value: email,
  errorMessage: emailErrormsg,
  validate: emailValidate,
  setValue: setEmail,
} = useField<string>('email', (value) => {
  if (!value)
    return t('this_field_is_required')

  if (!emailReg.test(value))
    return t('this_contains_invalid_email_characters')
  return ''
})
const {
  bool: emailDisabledBtn,
  setTrue: setEmailDisabledBtnTrue,
  setFalse: setEmailDisabledBtnFalse,
} = useBoolean(true)
const {
  bool: msgAfterTouched,
  setFalse: setMsgAfterTouchedFalse,
  setTrue: setMsgAfterTouchedTrue,
} = useBoolean(true)
const {
  run: runEmailCheckRequest,
  loading: loadingEmailCheckRequest,
} = useRequest(ApiMemberEmailCheckRequest, {
  onSuccess() {
    openNotify({
      type: 'email',
      title: t('tip_email_sent'),
      message: `${t('tip_email_to')} +${email.value}`,
    })
  },
})
const {
  run: runMemberUpdate,
  loading: loadingMemberUpdate,
} = useRequest(ApiMemberUpdate, {
  onSuccess() {
    openNotify({
      type: 'email',
      title: t('success_update_email'),
      message: `${t('email_update_to')} ${email.value}`,
    })
    setEmailDisabledBtnTrue()
    emailCheck()
    appStore.updateUserInfo()
  },
})

const emailVerified = computed(() => userInfo.value?.email_check_state === 1)

function emailPaste() {
  setTimeout(() => {
    setEmailDisabledBtnFalse()
  }, 0)
}
async function emailCheck() {
  await emailValidate()
  if (!emailErrormsg.value)
    runEmailCheckRequest({ email: email.value })
}
async function emailSubmit() {
  await emailValidate()
  if (!emailErrormsg.value)
    runMemberUpdate({ record: { email: email.value }, uid: userInfo.value?.ext.uid })
}

/** 监听邮箱改变 */
watch(() => email.value, (newValue, oldValue) => {
  if (oldValue && newValue && newValue !== oldValue)
    setEmailDisabledBtnFalse()
  else
    setEmailDisabledBtnTrue()
})

onMounted(() => {
  setEmail(userInfo.value?.email ?? '')
})
</script>

<template>
  <div class="app-email-verify">
    <div class="verify-content">
      <div class="content-title">
        电邮地址
      </div>
      <div>您必须验证您的电邮地址才能进行{{ tipText }}。</div>
      <BaseLabel :label="t('email_address')" must-small>
        <BaseInput
          v-model="email"
          :msg="emailErrormsg"
          :msg-after-touched="msgAfterTouched"
          style="--tg-base-input-style-pad-left: 0.5em"
          @blur="setMsgAfterTouchedFalse"
          @focus="setMsgAfterTouchedTrue"
          @paste="emailPaste"
        />
      </BaseLabel>
    </div>
    <div class="verify-btns">
      <BaseButton
        type="text"
        :disabled="emailVerified"
        :loading="loadingEmailCheckRequest"
        size="none"
        @click="emailCheck"
      >
        <span :class="{ 'not-verified-span': !emailVerified }">
          {{ t('resend_email') }}
        </span>
      </BaseButton>
      <BaseButton
        bg-style="secondary"
        size="md"
        class="btn-width"
        :disabled="emailDisabledBtn"
        :loading="loadingMemberUpdate"
        @click="emailSubmit"
      >
        保存
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-email-verify{
  .verify-content{
    display: flex;
    flex-direction: column;
    padding: 0 16px 16px;
    gap: var(--tg-spacing-16);
    .content-title{
      color:var(--tg-text-white);
      font-size: var(--tg-font-size-lg);
    }
  }
  .verify-btns{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: var(--tg-spacing-12);
    border-top: 1px solid var(--tg-secondary-main);
    padding: var(--tg-spacing-16);
  }
}
</style>
