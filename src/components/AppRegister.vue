<script setup lang='ts'>
// import type { IMemberReg } from '~/apis/types'

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const appStore = useAppStore()
const { companyData } = storeToRefs(appStore)
const { openLoginDialog } = useLoginDialog()
const { openTermsConditionsDialog } = useTermsConditionsDialog()
const steps = ref(1)
const registerFormRef = ref()

async function getMemberReg() {
  registerFormRef.value.getMemberReg(() => {
    closeDialog()
    nextTick(() => {
      openTermsConditionsDialog()
    })
  })
}

async function toLogin() {
  closeDialog()
  await nextTick()
  openLoginDialog()
}
</script>

<template>
  <Suspense timeout="0">
    <div class="app-register">
      <template v-if="steps === 1">
        <div class="app-register-title">
          {{ t('pop_up_create_account_label_reg_step1') }}
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
    <template #fallback>
      <div class="register-height">
        <BaseLoading />
      </div>
    </template>
  </Suspense>
</template>

<style lang='scss' scoped>
.text-bold {
  font-weight: var(--tg-font-weight-semibold);
}
.register-height {
  padding: 100px 0;
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
