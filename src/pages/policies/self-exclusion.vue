<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Self-Exclusion' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <div class="content-block pd-24">
    <h1>Self-Exclusion Policy</h1>
    <div class="p">
      If you feel you are no longer able to control your gambling or gamble safely, we offer you the option to self-exclude from betting with us. To begin the cooling off period as outlined below, please visit our Responsible Gambling page.
    </div>
    <h2>1. Overview</h2>
    <div class="p">
      For the majority of people, gambling is an enjoyable leisure and entertainment activity. But for some, gambling can have negative impacts. As a result, we have developed this policy to communicate our approach to responsible gambling and minimizing harm to consumers who may be vulnerable to problem gambling.
    </div>
    <h2>2. What is Responsible Gambling?</h2>
    <div class="p">
      “Responsible Gambling” is a broad concept that aims to ensure gambling is conducted in a manner whereby the potential for harm associated with problem gambling is minimized. It respects the responsibility of individuals for their own actions, but also acknowledges a responsibility on the part of service providers.
    </div>
    <h2>3. What is Problem Gambling?</h2>
    <div class="p">
      Problem gambling occurs when a person loses control over their gambling, particularly the amount of money gambled and the amount of time devoted to gambling.
    </div>
    <h2>4. Customer Care Principles</h2>
    <div class="p">
      At Meibo, we want to be an industry leader in providing a safe environment for our customers. We actively encourage and promote responsible gambling practices and provide tools to assist our customers in maintaining control of their gambling.
    </div>
    <h2>5. Responsible Gambling Policy</h2>
    <div class="p">
      We are committed to sharing responsibility, with Governments and communities and individuals, for helping customers control their gambling, and helping problem gamblers to identify their problem and seek assistance.
    </div>
    <div class="p">
      Some of the ways that we do this are: i. allowing our customers to self-exclude (either temporarily or permanently) from betting with us; ii. providing Responsible Gambling information and messages to our customers; iii. training our staff about Responsible Gambling at induction and at least once each year; iv. and referring our customers affected by problem gambling to gambling-related support services.
    </div>
    <div class="p">
      We aim to achieve the following outcomes:
    </div>
    <div class="p">
      i. minimizing the extent of gambling related harm to individuals and the broader community; ii. enabling customers to make informed decisions about their gambling practices; iii. enabling people adversely affected by gambling to have access to timely and appropriate assistance and information; iv. promoting a shared understanding between individuals, communities, the gambling industry and Government of responsible gambling practices; v. and ensuring the gambling industry provides safe and supportive environments for the delivery of gambling products and services.
    </div>
    <h2>6. Minors</h2>
    <div class="p">
      As a responsible operator, we are committed to protecting minors by actively taking steps to exclude minors from placing a wager using our betting platforms. Our services are designed to appeal to, and be used by persons who are at least 18 years old.
    </div>
    <h2>7. Filtering Options</h2>
    <div class="p">
      Filtering options can be enabled to help prevent persons from entering online casinos or online sports betting websites. If minors have access to the device that you use to access our betting platforms, we encourage you to use filtering software to prevent access to our betting platforms by minors.
    </div>
    <h2>8. Additional Help</h2>
    <div class="p">
      In the case of needed help please contact our support team at support@meibo.com or on our live chat system and one of our agents will be able to give you the details of associations and help phone numbers available in your country.
    </div>
    <h2>9. Conditions and Processes</h2>
    <div class="p">
      To self-exclude means to stop betting or gambling for a set time. Self-exclusion can be temporary or permanent.
    </div>
    <div class="p">
      By requesting one of our self-exclusion time periods on offer you agree to the following terms and conditions, which will be effective from the minute you receive a confirmation email of your chosen self-exclusion, this email will be sent to the email address used to register your account only and will display the date of self-exclusion completion.
    </div>
    <div class="p">
      Requests made via our Chat function will not be actioned. However, a customer support agent will direct you to our customer support email service.
    </div>
    <div class="p">
      On receipt of an email request for account closure, the requested account and any linked accounts will be placed on our first stage, 24-hr cooling off period which will disable your account or accounts, allowing no gambling activity. Once this time has passed; you will receive an email to confirm your desired self exclusion duration of 1-day, 1-week, 1-month, 3-months, 6-months, 1-year or permanent. There will be no variation of these time periods. If we do not receive a response within a further 24 - hrs, your account will be reopened.
    </div>
    <div class="p">
      If after reviewing our self-exclusion options you decide you would like to proceed with a permanent self-exclusion, you will be required to set an exclusion period when prompted. On occasion, we might decide to place an account on a short self-exclusion period if we believe it to be needed and or beneficial to the customer. This will be communicated by email; the above terms and conditions will apply.
    </div>
    <div class="p">
      You are not permitted to leave any balance in your account during a self-exclusion time period. You will not be able to access your account to withdraw any funds during your requested self-exclusion. If you have an account affected by a self-exclusion that has any active bets, the Cash Out function will be applied at the point of self-exclusion confirmation. Bets will not be void; meibos will not be returned or remain active throughout a self-exclusion time period. Bets will not be reinstated after a self-exclusion completion. While Self Excluded, you are not eligible for any form of benefits, bonuses or reloads.
    </div>
    <div class="p">
      Once a self-exclusion is applied to your account, it will stay in place until the request time has finished, it will not be reversed or decreased for any reason. Permanent self-exclusions will remain closed indefinitely.
    </div>
    <div class="p">
      We will use all reasonable endeavors to ensure compliance with our responsible gambling self-exclusion policy. However, you accept that we will not be held responsible or liable if you attempt to open any new account or indeed succeed. In addition, we will not be held liable or accountable if you continue to deposit and wager using additional accounts which have previously not been disclosed. Any future wagers, Reward funds and entries in any promotions during a requested self-exclusion time will be forfeited, resulting in no return of meibos or payment of winnings. We will not be able to reinstate these if the account is reopened after the self-exclusion period. After self-exclusion you acknowledge that:
    </div>
    <ul>
      <li>
        <div class="p">
          You should not attempt to, deposit or place any wager on any of your accounts from which you have requested to be excluded during your selected self-exclusion.
        </div>
      </li>
      <li>
        <div class="p">
          You should not attempt or proceed to open any new accounts during your self-exclusion period, or indefinitely if a permanent self-exclusion has been selected.
        </div>
      </li>
      <li>
        <div class="p">
          If you succeed in opening a new account during a self-exclusion period, we will endeavour to close any and all such accounts at our earliest detection.
        </div>
      </li>
      <li>
        <div class="p">
          Our responsibility is only to take reasonable steps to prevent you from gambling on any of our products. It is also the customer’s responsibility to refrain from breaching these agreed terms.
        </div>
      </li>
      <li>
        <div class="p">
          A self-exclusion request is a voluntary request made by you. If you proceed to act contrary to such a request, nor any of its employees or affiliated persons shall be held accountable or liable for any losses you may suffer. Any losses incurred during yourself-exclusion period will not be refunded.
        </div>
      </li>
      <li>
        <div class="p">
          If you act contrary to a self-exclusion request, we retain discretion to terminate or void any wagers you have placed and to take other appropriate action. Also, if we have suspicions or further investigation provides evidence that you have actively attempted to disguise the source of your account or accounts, which affects our ability to block your account or accounts promptly, the company retains discretion to terminate or void any wagers you have placed and to take other appropriate action.
        </div>
      </li>
      <li>
        <div class="p">
          Once your selected self-exclusion has come to an end, your account will automatically be reopened. However, you will receive an email confirmation of this information which will be sent to your registered email address.
        </div>
      </li>
    </ul>
    <div v-if="!isLogin" class="p buttons">
      <BaseButton type="text" size="none" @click="openLoginDialog()">
        {{ $t('login') }}
      </BaseButton>
      <span>{{ $t('or') }}</span>
      <BaseButton type="text" size="none" @click="openRegisterDialog()">
        {{ $t('reg') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  text-align: center;
  --tg-base-button-text-default-color: var(--tg-text-white);
  --tg-base-button-font-size: 16px;
  margin-top: 20px !important;
  :deep(button) {
    padding: 0 8px;
  }
}
.bold-txt {
  font-weight: 600;
}
.pd-24 {
  padding: 24px;
}
.p {
  line-height: 24px;
  font-size: 16px;
  color: var(--tg-secondary-light);
}
.content-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content-block>.p+.p {
  margin-top: 12px;
}
h1 {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
.content-block>h1:first-of-type {
  margin-top: 0;
}
h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
h4 {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
ul {
  list-style-type: disc;
  padding-left: 32px;
  margin-bottom: 16px;
  li {
    margin: 4px 0;
  }
}
</style>
