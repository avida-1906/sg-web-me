<script lang="ts" setup>
import type { notifyType } from '~/composables/useNotify'

interface Props {
  /** 提示文字 && 有值表示钱包中使用，没有表示设置中使用 */
  tipText?: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { openNotify } = useNotify()
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const visibility = useDocumentVisibility()

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
const notifyData = ref({
  type: '' as notifyType,
  title: '',
  message: '',
})
const { runAsync: runMemberUpdate } = useRequest(ApiMemberUpdate, {
  onSuccess(data, params) {
    if (params[0].record.email) {
      setEmailDisabledBtnTrue()
      emailCheck(false)
    }
    notifyData.value = {
      type: 'email',
      title: t('success_update_email'),
      message: `${t('tip_email_to')} ${email.value}`,
    }
    // emailCheck(false)
    appStore.updateUserInfo()
  },
})
const {
  run: runEmailCheckRequest,
  loading: loadingEmailCheckRequest,
} = useRequest(ApiMemberEmailCheckRequest, {
  onSuccess() {
    openNotify(notifyData.value)
  },
})

const emailVerified = computed(() => userInfo.value?.email_check_state === 1)
const isDialog = computed(() => !!props.tipText)

/**
 * 邮箱提交按钮是否禁用
 */
const emailSubmitBtnDisabled = computed(() => {
  if (!email.value)
    return true

  const initEmailText = userInfo.value?.email
  if (email.value === initEmailText)
    return true

  return emailVerified.value
})

/**
 * 重新发送邮件按钮是否禁用
 */
const emailCheckBtnDisabled = computed(() => {
  if (!email.value)
    return true

  return emailVerified.value
})

async function emailSubmit() {
  await emailValidate()
  if (!emailErrormsg.value)
    runMemberUpdate({ record: { email: email.value }, uid: userInfo.value?.ext.uid })
}
async function emailCheck(manual: boolean) {
  await emailValidate()
  if (!emailErrormsg.value) {
    manual && (notifyData.value = {
      type: 'email',
      title: t('tip_email_sent'),
      message: `${t('email_update_to')} ${email.value}`,
    })
    runEmailCheckRequest({ email: email.value })
  }
}
function emailPaste() {
  setTimeout(() => {
    setEmailDisabledBtnFalse()
  }, 0)
}
function goGmail() {
  window.open(`https://mail.google.com/mail/u/#search/from:@${location.origin}`)
}

/**
 * 重新发送
 */
function emailCheckAgain() {
  const initEmailText = userInfo.value?.email
  if (email.value !== initEmailText)
    emailSubmit()
  else
    emailCheck(true)
}

/** 监听邮箱改变 */
watch(() => email.value, (newValue, oldValue) => {
  if (oldValue && newValue && newValue !== oldValue)
    setEmailDisabledBtnFalse()
  else
    setEmailDisabledBtnTrue()
})
watch(() => userInfo.value?.email, (newValue) => {
  setEmail(newValue ?? '')
})

watch(visibility, (newValue) => {
  if (newValue === 'visible')
    appStore.updateUserInfo()
})

onMounted(() => {
  setEmail(userInfo.value?.email ?? '')
})
</script>

<template>
  <div class="tg-settings-general">
    <AppSettingsContentItem
      :last-one="isDialog"
      :dialog-box="isDialog"
      :title="t('pop_up_wallet_withdraw_verify_title_email_address')" :verified="emailSubmitBtnDisabled"
      :badge="emailVerified" @submit="emailSubmit"
    >
      <template v-if="isDialog" #top-desc>
        {{ t('must_verify_email_then', { delta: `${tipText}`.toLowerCase() }) }}{{ t('period') }}
      </template>
      <div :class="{ 'verify-content': isDialog }">
        <BaseLabel :label="t('pop_up_wallet_withdraw_verify_label_email_address')" must-small>
          <div v-if="emailVerified" class="email-erified-box cursor-pointer">
            {{ email }}
          </div>
          <BaseInput
            v-else v-model="email" :disabled="emailVerified" :msg="emailErrormsg"
            :msg-after-touched="msgAfterTouched"
            style="--tg-base-input-style-pad-left: 0.5em"
            @blur="setMsgAfterTouchedFalse"
            @focus="setMsgAfterTouchedTrue" @paste="emailPaste"
          />
        </BaseLabel>
      </div>
      <template #btm-left>
        <div v-if="email?.includes('@gmail.com') && (emailVerified || emailDisabledBtn)">
          <BaseButton bg-style="primary" @click="goGmail">
            <div class="open-gmail">
              {{ t('open') }} Gmail
              <BaseIcon name="uni-jump-page" />
            </div>
          </BaseButton>
        </div>
      </template>
      <template #btm-right>
        <BaseButton
          type="text" :disabled="emailCheckBtnDisabled"
          :loading="loadingEmailCheckRequest" size="none"
          @click="emailCheckAgain()"
        >
          <span :class="{ 'not-verified-span': !emailVerified }">
            {{ t('resend_email') }}
          </span>
        </BaseButton>
      </template>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-general {
  // padding: 0 16px 16px;
  .verify-content{
    display: flex;
    flex-direction: column;
    // padding: 0 16px 16px;
    gap: var(--tg-spacing-16);
  }
  .email-erified-box {
    width: 100%;
    height: 40.5px;
    background-color: var(--tg-secondary-main);
    line-height: 20.5px;
    color: var(--tg-text-white);
    padding: var(--tg-spacing-input-padding-vertical) var(--tg-base-input-style-pad-x);
    padding-left: 0.5em;
    font-weight: var(--tg-font-weight-semibold);
    border-radius: var(--tg-radius-default);
    border-width: var(--tg-border-width-sm);
    border-style: solid;
    border-color: var(--tg-border-color-main);
    transition: all ease 0.25s;
    &:hover {
      border-color: var(--tg-border-color-deep-grey);
    }
  }
  .open-gmail {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    --tg-icon-color: var(--tg-text-white);
  }
  .not-verified-span {
    color: var(--tg-text-white);
  }
}
</style>
