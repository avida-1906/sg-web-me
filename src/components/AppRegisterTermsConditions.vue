<script setup lang='ts'>
/* eslint-disable max-len */
import type { IMemberReg } from '~/apis/types'

const closeDialog = inject('closeDialog', () => {})

const { openNotify } = useNotify()
const { t } = useI18n()
const appStore = useAppStore()
const { companyData } = storeToRefs(appStore)
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
    return '请完整阅读条款与条件，然后滚动至末尾将其接受。'
  return ''
})

const scrollRef = ref()
const delayId = ref()
const { bool: isCheckClicked, setTrue: setCCTrue } = useBoolean(false)

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
      message: t('success_register'),
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
  if (!isRead.value)
    return
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

function goPrev() {
  closeDialog()
}

function checkClick() {
  setCCTrue()
  valiChecked()
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
      <div class="arrow" @click.stop="goPrev">
        <BaseIcon name="uni-arrowleft-line" />
      </div>
      <div class="text">
        {{ t('step_label') }} 2/2： {{ t('read_and_accept') }}
      </div>
    </div>
    <div ref="scrollRef" class="scroll-y terms-conditions">
      <div>
        <div class="terms-conditions-theme">
          Terms and Conditions
        </div>
        <div class="terms-conditions-title">
          1.{{ companyData?.name }}.COM
        </div>
        <div class="terms-conditions-describe">
          <p>
            1.1 {{ companyData?.name }}.com is owned and operated by Medium Rare,
            N.V. (hereinafter "{{ companyData?.name }}",
            "We" or "Us"), a company with head office at Korporaalweg
            10, Willemstad, Curaçao.
            {{ companyData?.name }} is licensed and regulated by
            the Government of Curaçao under the gaming license 8048/JAZ
            issued to Antillephone. Some credit card payment processing
            are handled by its wholly owned subsidiary, Medium Rare Limited.
          </p>
        </div>

        <div class="terms-conditions-title">
          2. IMPORTANT NOTICE
        </div>
        <div class="terms-conditions-describe">
          <p>
            2.1 BY REGISTERING ON WWW.XXX.COM
            (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM
            RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND
            CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES
            POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING
            OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS
            AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”)
            , AND THE BETTING AND/OR GAMING SPECIFIC RULES,
            AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
          </p>
          <p>
            2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE
            YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS
            AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE
            ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL
            ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE
            WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT
            ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART
            (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE
            CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
          </p>
        </div>

        <div class="terms-conditions-title">
          3. GENERAL
        </div>
        <div class="terms-conditions-describe">
          <p>
            3.1 When registering on
            www.stake.com You (“You”, “Your”, Yourself” or the “Player” interchangeably)
            enter into an agreement with Stake.
          </p>
          <p>
            3.2 This Agreement should be read by You in its entirety prior to your
            use of Stake's service or products.
            Please note that the Agreement constitutes a legally binding
            agreement between you and Stake.
          </p>
          <p>
            3.3 These Terms and Conditions come into force as soon as you complete the
            registration process,
            which includes checking the box accepting these Terms and Conditions and
            successfully creating an account. By using any part of the Website following
            account creation, you agree to these Terms and Conditions applying to
            the use of the Website.
          </p>
          <p>
            3.4 We are entitled to make amendments to these Terms and Conditions at any time and without advanced notice. If we make such amendments, we may take appropriate steps to bring such changes to your attention (such as by email or placing a notice on a prominent position on the Website, together with the amended terms and conditions) but it shall be your sole responsibility to check for any amendments, updates and/or modifications. Your continued use of the website services after any such amendment to the Terms and Conditions will be deemed as your acceptance and agreement to be bound by such amendments, updates and/or modifications.
          </p>
          <p>3.5 The terms of this Terms and Conditions shall prevail in the event of any conflict between the terms of this Terms and Conditions and of any of the game rules or other documents referred to in this Terms and Conditions.</p>
          <p>3.6 These Terms and Conditions may be published in several languages for informational purposes and ease of access by players. The English version is the only legal basis of the relationship between you and us and in the case of any discrepancy with respect to a translation of any kind, the English version of these Terms and Conditions shall prevail.</p>
        </div>

        <div class="terms-conditions-title">
          4. STAKE ACCOUNT
        </div>
        <div class="terms-conditions-describe">
          <p>Registration</p>
          <p>4.1 In order for you to be able to place bets on stake.com, you must first personally register an account with us ("Stake Account").</p>
          <p>4.2 For a person to be registered as a player with Stake and use the Website, that person must submit an application for registration and opening of a Stake account. The application for the opening of the Stake Account must be submitted personally, and will require You to provide a set of personal information, namely e-mail, full name, date of birth, address, etc.</p>
          <p>4.3 Where the information stipulated in 4.2. is not provided and/or is not deemed to be complete, accurate or up-to-date at any point in time, Stake reserves the right to suspend the Stake Account registration and treat any subsequent potentially accepted deposits to the Player’s Stake Account as invalid (and any winnings arising from such deposit as void). Where a Stake Account is suspended, You should contact customer support at support@stake.com.</p>
          <p>4.4 All applicants must be 18 or such other legal age of majority as determined by any laws which are applicable to you, whichever age is greater or older. Stake reserves the right to ask for proof of age from any Player and suspend their Stake Account until satisfactory documentation is provided. Stake takes its responsibilities in respect of under age and responsible gambling very seriously.</p>
          <p>4.5 Stake will not accept registration from individuals:</p>
          <p>a) Under 18 years old or under the legal age of majority or gambling in their jurisdiction;</p>
          <p>b) Residing in jurisdictions from where it is illegal or gambling is not permitted. Stake is not able to verify the legality of the Service in each jurisdiction and it is the User's responsibility to ensure that their use of the Service is lawful;</p>
          <p>c) Provide misleading information or try to pass by third parties.</p>
          <p>4.6 Stake reserves the right to refuse any application for a Stake Account, at its sole discretion.</p>
          <p>Know Your Customer</p>
          <p>4.7 You represent and warrant that any information provided by You on Your application form is true, updated and correct.</p>
          <p>
            4.8 Stake reserves the right, at any time, to ask for any KYC documentation it deems necessary to determine the identity and location of a Player. Stake reserves the right to restrict the Service, payment or withdrawal until identity is sufficiently determined, or for any other reason in Stake’s sole discretion. Stake also reserves the right to disclose a Player’s information as appropriate to comply with legal process or as otherwise permitted by the privacy policy of Stake (owner and operator of Stake), and by using the Service, you acknowledge and consent to the possibility of such disclosure.
          </p>
          <p>Multiple Accounts</p>
          <p>4.9 Only one Stake Account per Player is allowed. Should You attempt or successfully open more than one Stake Account, under Your own name or under any other name, or should You attempt or succeed in using the Website by means of any other person's Stake Account, Stake will be entitled to immediately close all Your Stake Account(s), retain all monies in such Stake Accounts and ban You from future use of the Website.</p>
          <p>4.10 Should Stake have reason to believe that You have registered and/or used more than one Stake Account, or colluded with one or more other individuals using a number of different Stake Accounts, Stake shall be entitled to deem such accounts as constituting multiple Stake Accounts, and suspend or close all such Stake Accounts. Stake will also be entitled to retain the funds till the Player proves that he did not attempt to create multiple accounts.</p>
          <p>4.11 If you notice that you have more than one registered Stake Account you must notify us immediately. Failure to do so may lead to your Stake Account being blocked and the funds retained.</p>
          <p>User Responsibility</p>
          <p>4.12 It is your sole and exclusive responsibility to ensure that your login details are kept securely. You must not disclose your login details to anyone.</p>
          <p>4.13 We are not liable or responsible for any abuse or misuse of your Stake Account by third parties due to your disclosure, whether intentional, accidental, active or passive, of your login details to any third party.</p>
          <p>4.14 You are prohibited from selling, transferring or acquiring Stake Accounts to or from other Players.</p>
          <p>4.15 You will inform us as soon as you become aware of any errors with respect to your account or any calculations with respect to any bet you have placed. We reserve the right to declare null and void any bets that are subject to such an error.</p>
          <p>4.16 You are responsible for all activities that occur under your account.</p>
          <p>Security Features</p>
          <p>4.17 We recommend that you enable two-factor authentication to enhance the security of your account.</p>
          <p>4.18 We may provide other security measures from time to time, and we encourage you to use them.</p>
          <p>Suspension and Closure by Stake</p>
          <p>4.19 Stake shall be entitled to close or suspend Your Stake Account if:</p>
          <p>a) Stake considers that You are using or have used the Website in a fraudulent or collusive manner or for illegal and/or unlawful or improper purposes;</p>
          <p />
        </div>

        <div class="terms-conditions-title" />
        <div class="terms-conditions-describe">
          <p />
        </div>
      </div>
    </div>
    <div class="check-box">
      <BaseCheckBox
        v-model="checkboxValue"
        :disabled="!isRead"
        :error="isCheckClicked && !isRead"
        :msg="checkedErrorMsg"
        @click.stop="checkClick"
      >
        <span class="haha">{{ t('read_terms_conditions') }}</span>
      </BaseCheckBox>
      <BaseButton
        :loading="isLoading"
        size="xl"
        bg-style="secondary" @click.stop="getStartGame"
      >
        <span class="size-base">{{ t('start_game') }}</span>
      </BaseButton>
    </div>
    <div class="app-bottom">
      <div class="app-bottom-text">
        <div>
          {{ t('have_account') }}
          <span class="text-white" @click.stop="toLogin">{{ t('login') }}</span>
        </div>

        <!-- <div class="stake-text">
          {{ t('stake_hCaptcha', { site: companyData?.name }) }}
          <span>{{ t('privacy_policy') }}</span> {{ t('and') }}
          <span>{{ t('terms_of_service') }}</span> {{ t('applicable') }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.haha {
  display: inline-block;
  font-weight: 400;
  padding-top: 10px;
  padding-bottom: 7px;
  box-sizing: content-box;
}
.size-base {
  font-size: var(--tg-font-size-base);
}
.app-register-terms-conditions {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  padding-bottom: var(--tg-spacing-button-padding-horizontal-sm);
  .title {
    color: var(--tg-text-lightgrey);
    text-align: center;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: var(--tg-font-weight-semibold);
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .text {
      flex: 1;
    }
    svg, .arrow {
      cursor: pointer;
    }
    .arrow {
      display: flex;
    }
  }
  .terms-conditions {
    max-height: 50vh;
    padding: var(--tg-spacing-16);
    text-align: left;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-grey);
    transition: all 0.5s;
    .theme {
      margin: var(--tg-spacing-12) 0;
    }
    .terms-conditions-theme{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-base);
      font-weight: var(--tg-font-weight-semibold);
    }
    .terms-conditions-title{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-base);
      font-weight: var(--tg-font-weight-semibold);
      margin: var(--tg-spacing-32) 0 var(--tg-spacing-8);
      line-height: 24px;
    }
    .terms-conditions-describe {
      color: var(--tg-secondary-light);
      font-size: var(--tg-font-size-default);
      font-weight: 400;
      line-height: 21px;
      > p+p {
        margin-top: var(--tg-spacing-12);
      }
    }
  }
  .check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    --tg-base-checkbox-error-color: var(--tg-text-error-sub);
    --tg-base-checkbox-error-border-color: var(--tg-text-error-sub);
    --tg-base-checkbox-error-icon-size: var(--tg-font-size-xs);
    --tg-icon-color: var(--tg-text-error-sub);
    --tg-base-checkbox-msg-margin-top: 10px;
  }
  &-btn {
    width: 100%;
  }
  .app-bottom {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
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
