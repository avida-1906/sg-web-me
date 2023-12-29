<script setup lang='ts'>
// import type { IMemberReg } from '~/apis/types'

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const appStore = useAppStore()
const { companyData } = storeToRefs(appStore)
// const { openNotify } = useNotify()
const { openLoginDialog } = useLoginDialog()
const { openTermsConditionsDialog } = useTermsConditionsDialog()
// const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(true)
// const {
//   bool: isShowPasswordVerify,
//   setTrue: setShowPasswordVerifyTrue,
//   setFalse: setShowPasswordVerifyFalse,
// } = useBoolean(false)
// const {
//   bool: needSaveFormData,
//   setTrue: setNeedSaveFormDataTrue,
// } = useBoolean(true)

// const emailRef = ref()
// const userNameRef = ref()
// const passwordRef = ref()
// const curExists = ref<1 | 2>(2)
const steps = ref(1)
// const birthdayInputRef = ref()
// const birthday = ref('')
// const parentUid = ref(Session.get<string>(STORAGE_REG_PARENT_UID)?.value ?? '')
const registerFormRef = ref()

// const {
//   value: password,
//   errorMessage: pwdErrorMsg,
//   validate: validatePassword,
//   meta: pwdMeta,
// } = useField<string>('password', (value) => {
//   if (!value)
//     return t('password_least_8_characters')
//   else if (value.length < 8)
//     return t('password_least_8_characters')
//   else if (!upperLowerReg.test(value))
//     return t('password_uppercase_lowercase_letter')
//   else if (!lastOneNumberReg.test(value))
//     return t('password_least_1_number')
//   return ''
// })
// const {
//   value: email,
//   errorMessage: emailErrorMsg,
//   validate: validateEmail,
//   setErrors: setEmailErrors,
// } = useField<string>('email', (value) => {
//   const lastAtIdx = value ? value.lastIndexOf('@') : -1
//   const lastDotIdx = value ? value.lastIndexOf('.') : -1
//   if (!value)
//     return t('no_support_email')

//   else if (!value.includes('@'))
//     return [t('email_add_char', { delta: '@' })]

//   else if (!value.includes('.'))
//     return t('email_add_char', { delta: '.' })

//   else if (lastDotIdx === value.length - 1)
//     return t('no_support_email')

//   else if (value === password.value)
//     return t('email_no_equal_password')

//   else if (!emailReg.test(value))
//     return t('pls_input_email')

//   // 请在您的电邮地址中加入 “@” 符号
//   // 请在您的电邮地址中加入 “.” 符号
//   // 电子邮件域不受支持
//   // 请输入有效的电邮地址
//   return ''
// })
// const {
//   value: username,
//   errorMessage: usernameErrorMsg,
//   validate: validateUsername,
//   setErrors: setUsernameErrors,
// } = useField<string>('username', (value) => {
//   if (!value)
//     return t('name_3_char')
//   else if (value.length < 3)
//     return t('name_3_char')
//   else if (value.match('[^a-z0-9]'))
//     return t('name_has_invalid_char')
//   else if (value.length > 14)
//     return t('name_14_char')
//   else if (value === password.value)
//     return t('name_no_equal_pwd')
//   else if (!usernameReg.test(value))
//     return t('validate_msg_user_name_tip')
//   // 此用户名已被使用，请选择另一用户名。
//   // 用户名含有无效的字符
//   // 您的用户名长度必须为 3 – 14 个字符。
//   return ''
// })

// const mailCodeRef = ref()
// const timer = ref()
// const countdown = ref(60)
// const {
//   value: emailCode,
//   errorMessage: emailCodeErrorMsg,
//   validate: valiemailCode,
//   resetField: resetEmailCode,
// } = useField<string>('emailCode', (value) => {
//   if (!value)
//     return t('validate_msg_input_code')
//   else if (value.length !== 6)
//     return t('validate_msg_regexp_code')
//   return ''
// })
// const {
//   runAsync: runAsyncMemberSendMailCode,
//   loading: sendMailCodeLoading,
// } = useRequest(ApiMemberSendMailCode, {
//   onSuccess() {
//     timer.value = setInterval(() => {
//       if (countdown.value <= 1) {
//         clearInterval(timer.value)
//         timer.value = null
//         countdown.value = 60
//       }
//       else { countdown.value-- }
//     }, 1000)
//     openNotify({
//       type: 'success',
//       title: t('notify_title_success'),
//       message: t('success_send_code'),
//     })
//   },
// })

// const regParams = computed(() => {
//   return Session.get<IMemberReg>(STORAGE_REG_PARAMS_KEYWORDS)?.value
// })
// if (regParams.value) {
//   email.value = regParams.value.email ?? ''
//   username.value = regParams.value.username ?? ''
//   birthday.value = regParams.value.birthday ?? ''
// }

// const {
//   value: isAgree,
//   errorMessage: agreeErrorMsg,
//   validate: valiAgree,
// } = useField<boolean>('checkbox', (value) => {
//   if (!value)
//     return t('agree_terms_conditions')
//   return ''
// }, { initialValue: true })

// const { data: regCfg } = useRequest(() => ApiMemberBrandDetail({ tag: 'reg' }), {
//   manual: false,
// })

// const regWebCfg = computed(() => regCfg.value?.web)
// const needEmail = computed(() => true) // regWebCfg.value && regWebCfg.value.email !== false)
// const needName = computed(() => true) // regWebCfg.value && regWebCfg.value.username !== false)
// const needCheckEmail = computed(() =>
//   false) // regWebCfg.value && regWebCfg.value.email_check !== false)
// const pwdTouched = computed(() => passwordRef.value?.isTouched)

// const {
//   run: runMemberReg,
//   loading: isLoading,
// } = useRequest(ApiMemberReg, {
//   manual: true,
//   onSuccess: async (res) => {
//     appStore.setToken(res)
//     Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
//     openNotify({
//       type: 'success',
//       message: t('success_register'),
//     })
//     await nextTick()
//     closeDialog()
//   },
// })
// const { runAsync: runExists, loading: existLoading } = useRequest(ApiMemberExists, {
//   async onSuccess() {
//   },
//   onError() {
//     if (curExists.value === 1)
//       setUsernameErrors(t('choose_another_name'))
//     if (curExists.value === 2)
//       setEmailErrors(t('email_exists'))
//   },
// })

async function getMemberReg() {
  registerFormRef.value.getMemberReg(() => {
    closeDialog()
    nextTick(() => {
      openTermsConditionsDialog()
    })
  })
}
// function onPasswordFocus() {
//   setShowPasswordVerifyTrue()
// }
// function onPasswordBlur() {
//   if (pwdMeta.dirty) {
//     passwordRef.value.setTouchTrue()
//     validatePassword()
//   }
//   if (pwdStatus.value)
//     setShowPasswordVerifyFalse()
// }
// function passwordVerifyPass(status: boolean) {
//   setPwdStatus(status)
// }
// async function onEmailUsernameBlur(type: 1 | 2) {
//   curExists.value = type
//   if (type === 1 && username.value && !usernameErrorMsg.value)
//     await runExists({ ty: type, val: username.value, noNotify: true })
//   if (type === 2 && email.value && !emailErrorMsg.value)
//     await runExists({ ty: type, val: email.value })
// }
async function toLogin() {
  closeDialog()
  await nextTick()
  openLoginDialog()
}

// function setCheckTip(el: HTMLObjectElement, tip: string) {
//   el.checkValidity()
//   el.setCustomValidity(tip)
//   el.reportValidity()
// }

// onMounted(() => {
//   emailRef.value?.getFocus()
// })

// onUnmounted(() => {
//   const paramsReg = {
//     email: email.value,
//     username: username.value,
//     password: password.value,
//     parent_uid: parentUid.value,
//     device_number: application.getDeviceNumber(),
//     birthday: birthday.value,
//   }
//   if (!needSaveFormData.value)
//     Session.remove(STORAGE_REG_PARAMS_KEYWORDS)

//   else
//     Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
// })
</script>

<template>
  <div class="app-register">
    <template v-if="steps === 1">
      <div class="app-register-title">
        {{ t('reg_step1') }}
      </div>
      <AppRegisterForm ref="registerFormRef" is-register />
      <div class="app-register-check-box">
        <BaseButton
          class="app-register-btn" bg-style="secondary"
          size="xl"
          @click.stop="getMemberReg"
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
        <div class="terms-conditions scroll-y">
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
