<script setup lang='ts'>
const { t } = useI18n()

const appStore = useAppStore()

const { bool: isRead, setTrue: setReadTrue } = useBoolean(false)
const { bool: checkboxValue } = useBoolean(false)
const { errorMessage: checkedErrorMsg, validate: valiChecked } = useField<string>('checkbox', (value) => {
  if (!checkboxValue.value)
    return t('agree_terms_conditions')

  return ''
})

const closeDialog = inject('closeDialog', () => {})
const { openLoginDialog } = useLoginDialog()

const $scrollList = ref(null)
const delayId = ref()

function handleScroll(evt: any) {
  const { scrollTop, scrollHeight, clientHeight } = evt.target
  const _atBottom = scrollHeight - scrollTop - clientHeight < 100

  clearTimeout(delayId.value)
  delayId.value = setTimeout(() => {
    if (_atBottom)
      setReadTrue()
  }, 100)
}

async function getStartGame() {
  valiChecked()
  if (checkboxValue.value && !checkedErrorMsg.value)
  // appStore.setToken('token')
    console.log(Session.get('reg_params'))
  await nextTick()
  // closeDialog()
}

async function toLogin() {
  closeDialog()
  await nextTick()
  openLoginDialog()
}

onBeforeUnmount(() => {
  clearTimeout(delayId.value)
})
</script>

<template>
  <div class="app-register-terms-conditions">
    <div class="title">
      {{ t('reg_step2') }}
    </div>
    <div ref="$scrollList" class="scroll-y terms-conditions" @scroll="handleScroll">
      <div>
        <div class="terms-conditions-theme">
          Terms and Conditions
        </div>
        <div class="terms-conditions-title">
          1.STAKE.COM
        </div>
        <div class="terms-conditions-describe">
          1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head office at Korporaalweg 10, Willemstad, Curaçao. Stake is licensed and regulated by the Government of Curaçao under the gaming license 8048/JAZ issued to Antillephone. Some credit card payment processing are handled by its wholly owned subsidiary, Medium Rare Limited.
        </div>

        <div class="terms-conditions-title">
          2. IMPORTANT NOTICE
        </div>
        <div class="terms-conditions-describe">
          2.1 BY REGISTERING ON WWW.XXX.COM
          (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES, AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
        </div>
        <div class="terms-conditions-describe">
          2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
        </div>

        <div class="terms-conditions-title">
          3. GENERAL
        </div>

        <div class="terms-conditions-title">
          2. IMPORTANT NOTICE
        </div>
        <div class="terms-conditions-describe">
          2.1 BY REGISTERING ON WWW.XXX.COM
          (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES, AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
        </div>
        <div class="terms-conditions-describe">
          2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
        </div>
        <div class="terms-conditions-title">
          2. IMPORTANT NOTICE
        </div>
        <div class="terms-conditions-describe">
          2.1 BY REGISTERING ON WWW.XXX.COM
          (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES, AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
        </div>
        <div class="terms-conditions-describe">
          2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
        </div>
        <div class="terms-conditions-title">
          2. IMPORTANT NOTICE
        </div>
        <div class="terms-conditions-describe">
          2.1 BY REGISTERING ON WWW.XXX.COM
          (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES, AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
        </div>
        <div class="terms-conditions-describe">
          2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
        </div>
      </div>
    </div>
    <div class="check-box">
      <BaseCheckBox v-model="checkboxValue" :disabled="!isRead" :msg="checkedErrorMsg" @click.stop="valiChecked">
        {{ t('read_terms_conditions') }}
      </BaseCheckBox>
      <BaseButton class="app-register-terms-conditions-btn" bg-style="secondary" @click.stop="getStartGame">
        {{ t('start_game') }}
      </BaseButton>
    </div>
    <div class="app-bottom">
      <div class="app-bottom-text">
        <div @click.stop="toLogin">
          {{ t('have_account') }}<span class="text-white">{{ t('login') }}</span>
        </div>

        <div class="stake-text">
          {{ t('stake_hCaptcha') }} <span>{{ t('privacy_policy') }}</span> {{ t('and') }} <span>{{ t('terms_of_service') }}</span> {{ t('applicable') }}
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
    color: #B1BAD3;
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    // padding-bottom: var(--tg-spacing-button-padding-vertical-xs);
  }
  .terms-conditions {
    .theme {
      margin: 12px 0;
    }
    .terms-conditions-title,.terms-conditions-theme  {
      color: #FFF;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
    .terms-conditions-describe {
      color: #B1BAD3;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
    max-height: 50vh;
    padding: 20px 12px;
    text-align: left;
    border-radius: 4px;
    background: #2F4553;
    transition: all 0.5s;
    // overflow-y: scroll !important;
    // overflow-x: hidden !important;
    // overflow-y: auto !important;
    // -webkit-overflow-scrolling: touch;
    // &::-webkit-scrollbar {
    //   width: 0px !important;
    //   height: 0px !important;
    // }
    // &::-webkit-scrollbar-track {
    //   -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
    // }
    // &::-webkit-scrollbar-thumb {
    //   -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,.3);
    // }
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
        font-size: var(--tg-font-size-xs);
        padding-bottom: var(--tg-spacing-20);
      }
    }
  }
}
</style>
