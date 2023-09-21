<script setup lang='ts'>
const { t } = useI18n()

const { bool: checkboxValue } = useBoolean(false)
</script>

<template>
  <div class="app-register-terms-conditions">
    <!-- <div class="app-register-title">
      {{ t('reg_step1') }}
    </div> -->
    <div class="app-register-title">
      {{ t('reg_step2') }}
    </div>
    <div class="terms-conditions">
      <div class="theme">
        Terms and Conditions
      </div>
      <div class="title">
        1.STAKE.COM
      </div>
      <div class="describe">
        1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head office at Korporaalweg 10, Willemstad, Curaçao. Stake is licensed and regulated by the Government of Curaçao under the gaming license 8048/JAZ issued to Antillephone. Some credit card payment processing are handled by its wholly owned subsidiary, Medium Rare Limited.
      </div>

      <div class="title">
        2. IMPORTANT NOTICE
      </div>
      <div class="describe">
        2.1 BY REGISTERING ON WWW.XXX.COM
        (THE “WEBSITE”), YOU ENTER INTO A CONTRACT WITH MEDIUM RARE N.V., AND AGREE TO BE BOUND BY (I) THESE TERMS AND CONDITIONS; (II) OUR PRIVACY POLICY; (III) OUR COOKIES POLICY AND (IV) THE RULES APPLICABLE TO OUR BETTING OR GAMING PRODUCTS AS FURTHER REFERENCED IN THESE TERMS AND CONDITIONS (“TERMS AND CONDITIONS” OR “AGREEMENT”), AND THE BETTING AND/OR GAMING SPECIFIC RULES, AND ARE DEEMED TO HAVE ACCEPTED AND UNDERSTOOD ALL THE TERMS.
      </div>
      <div class="describe">
        2.2 PLEASE READ THIS AGREEMENT CAREFULLY TO MAKE SURE YOU FULLY UNDERSTAND ITS CONTENT. IF YOU HAVE ANY DOUBTS AS TO YOUR RIGHTS AND OBLIGATIONS RESULTING FROM THE ACCEPTANCE OF THIS AGREEMENT, PLEASE CONSULT A LEGAL ADVISOR IN YOUR JURISDICTION BEFORE FURTHER USING THE WEBSITE(S) AND ACCESSING ITS CONTENT. IF YOU DO NOT ACCEPT THE TERMS, DO NOT USE, VISIT OR ACCESS ANY PART (INCLUDING, BUT NOT LIMITED TO, SUB-DOMAINS, SOURCE CODE AND/OR WEBSITE APIS, WHETHER VISIBLE OR NOT) OF THE WEBSITE.
      </div>

      <div class="title">
        3. GENERAL
      </div>
    </div>
    <div class="app-register-check-box">
      <BaseCheckBox v-model="checkboxValue">
        {{ t('read_terms_conditions') }}
      </BaseCheckBox>
      <BaseButton class="app-register-terms-conditions-btn" bg-style="secondary">
        {{ t('start_game') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-register-terms-conditions {
  .terms-conditions {
    .theme {
      margin: 12px 0;
    }
    .title,.theme  {
      color: #FFF;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
    .describe {
      color: #B1BAD3;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
    width: 327px;
    height: 600px;
    margin: 0 auto;
    padding: 20px 12px;
    text-align: left;
    border-radius: 4px;
    background: #2F4553;
    overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      width: 0px !important;
      height: 0px !important;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.3);
    }
    &::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,.3);
    }
  }
  &-btn {
    width: 100%;
  }
}
</style>
