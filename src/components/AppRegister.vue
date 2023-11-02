<script setup lang='ts'>
const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const appStore = useAppStore()
const { openNotify } = useNotify()
const { bool: isEmailMust } = useBoolean(true)
const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(false)
const { openLoginDialog } = useLoginDialog()

const curExists = ref<1 | 2>(2)
const steps = ref(1)
const {
  bool: isShowPasswordVerify,
  setTrue: setShowPasswordVerifyTrue,
  setFalse: setShowPasswordVerifyFalse,
} = useBoolean(false)

const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: validateEmail,
  handleBlur: blurEmail,
  meta: metaEmail,
} = useField<string>('email', (value) => {
  if (!metaEmail.touched)
    return ''

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
    return '您的用户名长度必须为 3 – 14 个小写英文字母和数字组成'
  // 此用户名已被使用，请选择另一用户名。
  // 用户名含有无效的字符
  // 您的用户名长度必须为 3 – 14 个字符。
  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: validatePassword,
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
const {
  value: isAgree,
  errorMessage: agreeErrorMsg,
  validate: valiAgree,
} = useField<boolean>('checkbox', (value) => {
  if (!value)
    return t('agree_terms_conditions')
  return ''
}, { initialValue: false })

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
      message: '注册成功!',
    })
    await nextTick()
    closeDialog()
  },
})
const { run: runExists } = useRequest(ApiMemberExists, {
  async onSuccess() {
    if (curExists.value === 2) {
      await validateUsername()
      await validatePassword()
      await valiAgree()

      if (!usernameErrorMsg.value && !pwdErrorMsg.value && !agreeErrorMsg.value
      ) {
        const paramsReg = {
          email: email.value,
          username: username.value,
          password: password.value,
          parent_id: '',
          device_number: application.getDeviceNumber(),
        }
        runMemberReg(paramsReg)
      }
    }
  },
  onError() {
    if (curExists.value === 1)
      setUsernameErrors('用户名已存在,请重新填写用户名')
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

  await validateUsername()
  await validatePassword()
  await valiAgree()

  if (isEmailMust.value) {
    blurEmail()
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
      runMemberReg(paramsReg)
    }
  }
}
function onPasswordFocus() {
  setShowPasswordVerifyTrue()
}
function onPasswordBlur() {
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
</script>

<template>
  <div class="app-register">
    <template v-if="steps === 1">
      <div class="app-register-title">
        {{ t('reg_step') }}
      </div>
      <div class="app-register-input-box">
        <BaseLabel v-if="isEmailMust" :label="t('email_address')" must-small>
          <BaseInput
            v-model="email" :msg="emailErrorMsg" @blur="blurEmail();validateEmail()"
          />
        </BaseLabel>
        <BaseLabel :label="t('username')" must-small>
          <BaseInput
            v-model="username" :msg="usernameErrorMsg"
            @blur="onEmailUsernameBlur(1)"
          />
        </BaseLabel>
        <BaseLabel :label="t('password')" must-small>
          <BaseInput
            v-model="password"
            :msg="pwdErrorMsg"
            type="password"
            autocomplete="current-password" :password="password" @focus="onPasswordFocus"
            @blur="onPasswordBlur"
          />
          <AppPasswordVerify
            v-show="isShowPasswordVerify" :password="password"
            @pass="passwordVerifyPass"
          />
        </BaseLabel>
      </div>
      <div class="app-register-check-box">
        <BaseButton
          :loading="isLoading" class="app-register-btn" bg-style="primary"
          size="xl" @click.stop="getMemberReg"
        >
          {{ t('reg') }}
        </BaseButton>
        <div class="agree">
          <BaseCheckBox v-model="isAgree" :msg="agreeErrorMsg">
            我已阅读并同意
            <BaseButton
              type="text" padding0 style="--tg-base-button-text-default-color:var(--tg-text-blue);
          --tg-base-button-font-weight:var(--tg-font-weight-normal);" @click="steps = 2"
            >
              条款与条件
            </BaseButton>
          </BaseCheckBox>
        </div>
      </div>
      <AppAuthLogin />
    </template>
    <template v-else>
      <div class="app-register-terms-conditions">
        <div class="title">
          <BaseButton type="text" padding0 font-size="20" @click="steps = 1">
            <BaseIcon name="uni-arrowleft-line" />
          </BaseButton>
          <span>条款与条件</span>
        </div>
        <div class="scroll-y terms-conditions">
          <div>
            <div class="terms-conditions-theme">
              Terms and Conditions
            </div>
            <div class="terms-conditions-title">
              1.STAKE.COM
            </div>
            <div class="terms-conditions-describe">
              1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter
              "Stake", "We" or "Us"), a company with head office at Korporaalweg
              10, Willemstad, Curaçao. Stake is licensed and regulated by
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
          <span class="text-white" @click.stop="toLogin">{{ t('login') }}</span>
        </div>

        <div class="stake-text">
          {{ t('stake_hCaptcha') }}
          <span class="semibold">{{ t('privacy_policy') }}</span> {{ t('and') }}
          <span class="semibold">{{ t('terms_of_service') }}</span> {{ t('applicable') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-register {
  &-title {
    color: var(--tg-text-lightgrey);
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: var(--tg-font-weight-semibold);
    line-height: normal;
    padding-bottom: var(--tg-spacing-16);
  }

  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
  }

  &-check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    padding-top: var(--tg-spacing-button-padding-vertical-xs);

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
  gap: var(--tg-spacing-12);
  margin-top: var(--tg-spacing-12);

  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);

    .text-white {
      color: var(--tg-text-white) !important;
    }

    .stake-text {
      // font-weight: var(--tg-font-weight-semibold);
      font-size: var(--tg-font-size-xs);
      padding-bottom: var(--tg-spacing-20);
      cursor: pointer;

      span:hover {
        color: var(--tg-text-white) !important;
      }
    }
  }

  .app-bottom-text {
    span {
      cursor: pointer;
    }
  }
}
</style>
