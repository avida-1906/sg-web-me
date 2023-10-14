<script setup lang='ts'>
import type { IMemberReg } from '~/apis'

const closeDialog = inject('closeDialog', () => {})

const { openNotify } = useNotify()
const { t } = useI18n()
const appStore = useAppStore()
const { bool: needBack, setFalse: setNeedBackFalse } = useBoolean(true)
const { bool: isRead, setTrue: setReadTrue } = useBoolean(false)
const { bool: checkboxValue } = useBoolean(false)
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const {
  errorMessage: checkedErrorMsg,
  validate: valiChecked,
} = useField<string>('checkbox', () => {
  if (!checkboxValue.value)
    return t('agree_terms_conditions')
  return ''
})

const scrollRef = ref()
const delayId = ref()

const regParams = computed(() => {
  return Session.get<IMemberReg>(STORAGE_REG_PARAMS_KEYWORDS)?.value
})
const {
  run: runMemberReg,
  loading: isLoading,
} = useRequest(ApiMemberReg, {
  manual: true,
  onSuccess: async (res) => {
    appStore.setToken(res)
    Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
    setNeedBackFalse()
    openNotify({
      type: 'success',
      message: '注册成功!',
    })
    await nextTick()
    closeDialog()
  },
})

function handleScroll() {
  clearTimeout(delayId.value)
  delayId.value = setTimeout(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.value
    const _atBottom = scrollHeight - scrollTop - clientHeight < 100
    if (_atBottom)
      setReadTrue()
  }, 500)
}
async function getStartGame() {
  valiChecked()
  if (checkboxValue.value && !checkedErrorMsg.value && regParams.value)
    runMemberReg(regParams.value)
}
async function toLogin() {
  setNeedBackFalse()
  closeDialog()
  await nextTick()
  openLoginDialog()
}

onMounted(() => {
  scrollRef.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  scrollRef.value.removeEventListener('scroll', handleScroll)
  if (needBack.value)
    openRegisterDialog()
})
</script>

<template>
  <div class="app-register-terms-conditions">
    <div class="title">
      步骤 2/2： 阅读并接受条款与条件
    </div>
    <div ref="scrollRef" class="scroll-y terms-conditions">
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
    <div class="check-box">
      <BaseCheckBox
        v-model="checkboxValue"
        :disabled="!isRead"
        :msg="checkedErrorMsg"
        @click.stop="valiChecked"
      >
        {{ t('read_terms_conditions') }}
      </BaseCheckBox>
      <BaseButton
        :loading="isLoading"
        :disabled="!isRead"
        class="app-register-terms-conditions-btn"
        bg-style="secondary" @click.stop="getStartGame"
      >
        {{ t('start_game') }}
      </BaseButton>
    </div>
    <div class="app-bottom">
      <div class="app-bottom-text">
        <div>
          {{ t('have_account') }}
          <span class="text-white" @click.stop="toLogin">{{ t('login') }}</span>
        </div>

        <div class="stake-text">
          {{ t('stake_hCaptcha') }}
          <span>{{ t('privacy_policy') }}</span> {{ t('and') }}
          <span>{{ t('terms_of_service') }}</span> {{ t('applicable') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-register-terms-conditions {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  .title {
    color: var(--tg-text-lightgrey);
    text-align: center;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: var(--tg-font-weight-semibold);
    line-height: normal;
  }
  .terms-conditions {
    max-height: 50vh;
    padding: var(--tg-spacing-20) var(--tg-spacing-12);
    text-align: left;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-grey);
    transition: all 0.5s;
    .theme {
      margin: var(--tg-spacing-12) 0;
    }
    .terms-conditions-theme{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
    }
    .terms-conditions-title{
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
  .app-bottom {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
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
        font-weight: var(--tg-font-weight-semibold);
        font-size: var(--tg-font-size-xs);
        padding-bottom: var(--tg-spacing-20);
        cursor: pointer;
        span:hover {
          color: var(--tg-text-white) !important;
        }
      }
    }
    .app-bottom-text{
      span{
        cursor: pointer;
      }
    }
  }
}
</style>
