<script setup lang='ts'>
import type { IMemberReg } from '~/apis/types'

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const appStore = useAppStore()
const { companyData } = storeToRefs(appStore)
const { openNotify } = useNotify()
const { openLoginDialog } = useLoginDialog()
const { bool: isEmailMust } = useBoolean(true)
const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(true)
const { bool: isCode } = useBoolean(false)
const {
  bool: isShowPasswordVerify,
  setTrue: setShowPasswordVerifyTrue,
  setFalse: setShowPasswordVerifyFalse,
} = useBoolean(false)
const {
  bool: needSaveFormData,
  setTrue: setNeedSaveFormDataTrue,
} = useBoolean(false)
const { openTermsConditionsDialog } = useTermsConditionsDialog()

const emailRef = ref()
const userNameRef = ref()
const passwordRef = ref()
const curExists = ref<1 | 2>(2)
const steps = ref(1)
const code = ref('')
const birthdayInputRef = ref()
const birthday = ref('')

const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: validateEmail,
} = useField<string>('email', (value) => {
  if (!value)
    return t('pls_enter_email_address')
  else if (!emailReg.test(value))
    return t('email_address_incorrect')
  // 请在您的电邮地址中加入 “@” 符号
  // 请在您的电邮地址中加入 “.” 符号
  // 电子邮件域不受支持
  // 请输入有效的电邮地址
  return ''
})
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: validateUsername,
  setErrors: setUsernameErrors,
} = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')
  else if (!usernameReg.test(value))
    return t('validate_msg_user_name_tip')
  // 此用户名已被使用，请选择另一用户名。
  // 用户名含有无效的字符
  // 您的用户名长度必须为 3 – 14 个字符。
  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: validatePassword,
  meta: pwdMeta,
} = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  return ''
})

const regParams = computed(() => {
  return Session.get<IMemberReg>(STORAGE_REG_PARAMS_KEYWORDS)?.value
})
if (regParams.value) {
  email.value = regParams.value.email ?? ''
  username.value = regParams.value.username ?? ''
  birthday.value = regParams.value.birthday ?? ''
}

const {
  value: isAgree,
  errorMessage: agreeErrorMsg,
  validate: valiAgree,
} = useField<boolean>('checkbox', (value) => {
  if (!value)
    return t('agree_terms_conditions')
  return ''
}, { initialValue: true })

const {
  run: runMemberReg,
  loading: isLoading,
} = useRequest(ApiMemberReg, {
  manual: true,
  onSuccess: async (res) => {
    appStore.setToken(res)
    Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
    openNotify({
      type: 'success',
      message: t('success_register'),
    })
    await nextTick()
    closeDialog()
  },
})
const { run: runExists } = useRequest(ApiMemberExists, {
  async onSuccess() {
    if (curExists.value === 2) {
      await validateEmail()
      await validateUsername()
      await validatePassword()
      await valiAgree()
      await birthdayInputRef.value.valiBirthday()
      if (birthdayInputRef.value.msg)
        return

      if (!usernameErrorMsg.value && !pwdErrorMsg.value && !agreeErrorMsg.value
      ) {
        const paramsReg = {
          email: email.value,
          username: username.value,
          password: password.value,
          parent_id: '',
          device_number: application.getDeviceNumber(),
          birthday: birthday.value,
        }
        // runMemberReg(paramsReg)
        Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
        setNeedSaveFormDataTrue()
        closeDialog()
        await nextTick()
        openTermsConditionsDialog()
      }
    }
  },
  onError() {
    if (curExists.value === 1)
      setUsernameErrors(t('user_name_exist'))
  },
})
async function getMemberReg() {
  // 这个不要删：有错误时直接返回，否则重复的邮箱或用户名会因通过格式校验从而进行注册请求
  if (
    (isEmailMust.value && emailErrorMsg.value)
    || usernameErrorMsg.value
    || pwdErrorMsg.value
    || agreeErrorMsg.value
  ) return

  emailRef.value.setTouchTrue()
  userNameRef.value.setTouchTrue()
  passwordRef.value.setTouchTrue()
  await validateEmail()
  await validateUsername()
  await validatePassword()
  await valiAgree()
  if (pwdErrorMsg.value)
    setShowPasswordVerifyTrue()
  await birthdayInputRef.value.valiBirthday()
  if (birthdayInputRef.value.msg)
    return

  if (isEmailMust.value) {
    emailRef.value.setTouchTrue()
    await validateEmail()
    !emailErrorMsg.value && onEmailUsernameBlur(2)
  }
  else {
    if (!usernameErrorMsg.value && !pwdErrorMsg.value && !agreeErrorMsg.value
    ) {
      const paramsReg = {
        email: email.value,
        username: username.value,
        password: password.value,
        parent_id: '',
        device_number: application.getDeviceNumber(),
      }
      // appStore.setMqttConnectedFalse()
      // runMemberReg(paramsReg)
      Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
      setNeedSaveFormDataTrue()
      closeDialog()
      await nextTick()
      openTermsConditionsDialog()
    }
  }
}
function onPasswordFocus() {
  setShowPasswordVerifyTrue()
}
function onPasswordBlur() {
  if (pwdMeta.dirty) {
    passwordRef.value.setTouchTrue()
    validatePassword()
  }
  if (pwdStatus.value)
    setShowPasswordVerifyFalse()
}
function passwordVerifyPass(status: boolean) {
  setPwdStatus(status)
}
function onEmailUsernameBlur(type: 1 | 2) {
  curExists.value = type
  if (type === 1 && username.value && !usernameErrorMsg.value)
    runExists({ ty: type, val: username.value, noNotify: true })
  if (type === 2 && email.value && !emailErrorMsg.value)
    runExists({ ty: type, val: email.value })
}
async function toLogin() {
  closeDialog()
  await nextTick()
  openLoginDialog()
}

onUnmounted(() => {
  if (!needSaveFormData.value)
    Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
})
</script>

<template>
  <div class="app-register">
    <template v-if="steps === 1">
      <div class="app-register-title">
        {{ t('reg_step1') }}
      </div>
      <div class="app-register-input-box">
        <BaseLabel v-if="isEmailMust" :label="t('email_address')" must-small>
          <BaseInput
            ref="emailRef" v-model="email" :msg="emailErrorMsg" msg-after-touched
            type="email"
            name="email"
          />
        </BaseLabel>
        <BaseLabel :label="t('username')" must-small>
          <BaseInput
            ref="userNameRef" v-model="username"
            :msg="usernameErrorMsg"
            name="name"
            msg-after-touched @blur="onEmailUsernameBlur(1)"
          />
          <div v-if="!usernameErrorMsg" class="hint">
            {{ t('username_incorrect') }}
          </div>
        </BaseLabel>
        <BaseLabel :label="t('password')" must-small>
          <BaseInput
            ref="passwordRef"
            v-model="password"
            :msg="pwdErrorMsg"
            type="password"
            name="password"
            autocomplete="current-password" msg-after-touched
            @focus="onPasswordFocus"
            @blur="onPasswordBlur"
          />
          <AppPasswordVerify
            v-show="isShowPasswordVerify"
            :password="password"
            :has-error-msg="!!pwdErrorMsg"
            @pass="passwordVerifyPass"
          />
        </BaseLabel>
        <BaseLabel label="出生日期" must-small>
          <BaseInputBirthday
            ref="birthdayInputRef" v-model="birthday"
          />
        </BaseLabel>
        <div style="display: flex;">
          <div class="code-label">
            <BaseCheckBox v-model="isCode">
              <span class="option-label">{{ t('code_optional') }}</span>
            </BaseCheckBox>
          </div>
          <div class="code-input">
            <BaseInput v-show="isCode" v-model="code" />
          </div>
        </div>
      </div>
      <div class="app-register-check-box">
        <BaseButton
          :loading="isLoading" class="app-register-btn" bg-style="secondary"
          size="xl" @click.stop="getMemberReg"
        >
          {{ t('continue') }}
        </BaseButton>
        <!-- <div class="agree">
          <BaseCheckBox v-model="isAgree" :msg="agreeErrorMsg">
            {{ t('read_and_agree') }}
            <BaseButton
              type="text" size="none"
              style="--tg-base-button-text-default-color:var(--tg-text-white);"
              @click="steps = 2"
            >
              {{ t('terms_conditions') }}
            </BaseButton>
          </BaseCheckBox>
        </div> -->
      </div>
      <AppAuthLogin />
    </template>
    <template v-else>
      <div class="app-register-terms-conditions">
        <div class="title">
          <BaseButton
            type="text" size="none" style="--tg-base-button-font-size:20px;"
            @click="steps = 1"
          >
            <BaseIcon name="uni-arrowleft-line" />
          </BaseButton>
          <span>{{ t('terms_conditions') }}</span>
        </div>
        <div class="scroll-y terms-conditions">
          <div>
            <div class="terms-conditions-theme">
              Terms and Conditions
            </div>
            <div class="terms-conditions-title">
              1.{{ companyData?.name }}.COM
            </div>
            <div class="terms-conditions-describe">
              1.1 {{ companyData?.name }}.com is owned and operated by Medium Rare,
              N.V. (hereinafter "{{ companyData?.name }}",
              "We" or "Us"), a company with head office
              at Korporaalweg 10, Willemstad, Curaçao.
              {{ companyData?.name }} is licensed and regulated by
              the Government of Curaçao under the gaming license 8048/JAZ
              issued to Antillephone. Some credit card payment processing
              are handled by its wholly owned subsidiary, Medium Rare Limited.
            </div>

            <div class="terms-conditions-title">
              2. IMPORTANT NOTICE
            </div>
            <div class="terms-conditions-describe">
              2.1 BY REGISTERING ON WWW.XXX.COM
              (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM
              RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND
              CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES
              POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING
              OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS
              AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”)
              , AND THE BETTING AND/OR GAMING SPECIFIC RULES,
              AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
            </div>
            <div class="terms-conditions-describe">
              2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE
              YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS
              AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE
              ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL
              ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE
              WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT
              ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART
              (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE
              CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
            </div>

            <div class="terms-conditions-title">
              3. GENERAL
            </div>

            <div class="terms-conditions-title">
              2. IMPORTANT NOTICE
            </div>
            <div class="terms-conditions-describe">
              2.1 BY REGISTERING ON WWW.XXX.COM
              (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V.,
              AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II)
              OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES
              APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER
              REFERENCED IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS”
              OR “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES,
              AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
            </div>
            <div class="terms-conditions-describe">
              2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY
              UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS
              AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT,
              PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE
              FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF
              YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS
              ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS,
              SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT)
              OF THE WEBSITE.
            </div>
            <div class="terms-conditions-title">
              2. IMPORTANT NOTICE
            </div>
            <div class="terms-conditions-describe">
              2.1 BY REGISTERING ON WWW.XXX.COM
              (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V.,
              AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II)
              OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES
              APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED
              IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR
              “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES,
              AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
            </div>
            <div class="terms-conditions-describe">
              2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY
              UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS
              AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT,
              PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE FURTHER
              USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT
              ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART (INCLUDING,
              BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE CODE AND/OR WEBSITE APIS,
              WHETHER VISIBLE OR NOT) OF THE WEBSITE.
            </div>
            <div class="terms-conditions-title">
              2. IMPORTANT NOTICE
            </div>
            <div class="terms-conditions-describe">
              2.1 BY REGISTERING ON WWW.XXX.COM
              (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V.,
              AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II) OUR
              PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES
              APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED
              IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR
              “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES,
              AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
            </div>
            <div class="terms-conditions-describe">
              2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY
              UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS
              AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT,
              PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE
              FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF
              YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS
              ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS,
              SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT)
              OF THE WEBSITE.
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="app-bottom">
      <div class="app-bottom-text">
        <div>
          {{ t('have_account') }}
          <span class="text-bold text-white" @click.stop="toLogin">{{ t('login') }}</span>
        </div>

        <!-- <div class="stake-text">
          {{ t('stake_hCaptcha', { site: companyData?.name }) }}
          <span class="semibold" style="color: var(--tg-secondary-light);">
            {{ t('privacy_policy') }}
          </span> {{ t('and') }}
          <span class="semibold" style="color: var(--tg-secondary-light);">
            {{ t('terms_of_service') }}
          </span> {{ t('applicable') }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.option-label {
  display: inline-block;
  padding-top: 6px;
  padding-bottom: 4px;
}
.hint {
  padding: var(--tg-spacing-8) var(--tg-spacing-4) var(--tg-spacing-4) 0;
  font-size: var(--tg-font-size-xs);
  color: var(--tg-secondary-light);
}
.text-bold {
  font-weight: var(--tg-font-weight-semibold);
}
.app-register {
  --tg-base-input-style-pad-x: 7px;
  --tg-spacing-input-padding-vertical: 7.25px;
  &-title {
    color: var(--tg-secondary-light);
    text-align: center;
    font-size: var(--tg-font-size-base);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 24px;
    padding-bottom: var(--tg-spacing-16);
    padding-top: var(--tg-spacing-16);
  }

  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    .code-label{
      display: flex;
      justify-content: flex-start;
    }
    .code-input {
        margin-top: 4px;
    }
  }

  &-check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    padding-top: 16px;

    .agree {
      display: flex;
      align-items: center;
    }
  }

  &-btn {
    width: 100%;
  }

  .app-register-btn {
    font-size: var(--tg-font-size-base);
  }
}

.app-register-terms-conditions {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);

  .title {
    margin-top: var(--tg-spacing-12);
    color: var(--tg-text-lightgrey);
    text-align: center;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: var(--tg-font-weight-semibold);
    line-height: normal;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      flex: 1;
      text-align: center;
    }

    .icon {
      display: flex;
      align-items: center;
    }
  }

  .terms-conditions {
    max-height: 50vh;
    padding: var(--tg-spacing-20) var(--tg-spacing-12);
    text-align: left;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-main);
    transition: all 0.5s;

    .theme {
      margin: var(--tg-spacing-12) 0;
    }

    .terms-conditions-theme {
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
    }

    .terms-conditions-title {
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
      margin: var(--tg-spacing-32) 0 var(--tg-spacing-8);
    }

    .terms-conditions-describe {
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-xs);
      font-weight: var(--tg-font-weight-default);
      line-height: 22px;
    }
  }

  .check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
  }

  &-btn {
    width: 100%;
  }

}

.app-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  margin-top: var(--tg-spacing-16);

  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);

    .text-white {
      color: var(--tg-text-white);
    }

    .stake-text {
      font-size: var(--tg-font-size-xs);
      cursor: pointer;
    }
  }

  .app-bottom-text {
    span {
      cursor: pointer;
    }
  }
}
</style>
