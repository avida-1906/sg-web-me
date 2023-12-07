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
          <p>b) Stake considers that You are using or have used the Website in an unfair manner, have deliberately cheated or taken unfair advantage of Stake or any of its customers or if Your Stake Account is being used for the benefit of a third party;</p>
          <p>c) Stake is requested to do so by the police, any regulatory authority or court or if Stake is unable to verify Your identity, profession or source of funds as is expressly required by the applicable regulations;</p>
          <p>d) You are in breach of these Terms and Conditions, the applicable regulations or the fair use of our services, or Stake has concerns that You are a compulsive problem gambler without being self-excluded;</p>
          <p>e) Stake considers that any of the events referred to in (a) to (e) above may have occurred or are likely to occur.</p>
          <p>4.20 If Stake closes or suspends Your Stake Account for any of the reasons referred to in 4.19, You shall, to the extent permitted by applicable laws, be liable for any and all claims, direct losses, liabilities, damages, costs and expenses incurred or suffered by Stake (together, the “Claims”) arising therefrom and shall, to the extent permitted by applicable laws, indemnify and hold Stake harmless on demand for such Claims.</p>
          <p>4.21 In the circumstances referred to in 4.19, Stake shall also be entitled to void any bets placed by You following such actions by You or to withhold and/or retain any and all amounts which would otherwise have been paid or payable to you (including any winnings) to the extent permitted by law.</p>
          <p>4.22 We reserve the right to suspend or terminate your account at any time, with or without notice, if we suspect that you account has been compromised or is being used in breach of our Terms of Service.</p>
          <p>4.23 If Stake closes Your Stake Account it will inform You of the available means to withdraw the remaining balance on Your Stake Account.</p>
          <p>Our Liability</p>
          <p>4.24 We take no responsibility for any loss or damage that you may suffer as a result of unauthorised access to your account.</p>
          <p>4.25 We take no responsibility for any loss or damage that you may suffer as a result of your failure to keep your login secure and private.</p>
        </div>

        <div class="terms-conditions-title">
          5. YOUR WARRANTIES
        </div>
        <div class="terms-conditions-describe">
          <p>5.1 Prior to your use of the Service and on an ongoing basis you represent, warrant, covenant and agree that:</p>
          <p>Capacity</p>
          <p>a) You are over 18 or such other legal age of majority as determined by any laws which are applicable to you, whichever age is greater;</p>
          <p>b) You have full capacity to enter into a legally binding agreement with us and you are not restricted by any form of limited legal capacity;</p>
          <p>c) You are not diagnosed or classified as a compulsive or problem gambler;</p>
          <p>d) You are not currently self-excluded from any gambling site or gambling premises. You will inform Stake immediately if you enter into a self-exclusion agreement with any gambling provider.</p>
          <p>Jurisdiction</p>
          <p>e) You are accessing stake.com from a jurisdiction in which it is legal to do so;</p>
          <p>f) You will not use our services while located in any jurisdiction that prohibits the placing and/or accepting of bets online and/or playing casino and/or live games;</p>
          <p>g) You accept and acknowledge that we reserve the right to detect and prevent the use of prohibited techniques, including but not limited to fraudulent transaction detection, automated registration and signup, gameplay and screen capture techniques. These steps may include, but are not limited to, examination of Players device properties, detection of geo-location and IP masking, transactions and blockchain analysis;</p>
          <p>Funds & Tax</p>
          <p>h) You are solely responsible for reporting and accounting for any taxes applicable to you under relevant laws for any winnings that you receive from us;</p>
          <p>i) You are solely responsible for any applicable taxes which may be payable on cryptocurrency awarded to you through your using the Service;</p>
          <p>j) There is a risk of losing cryptocurrency when using the Service and that Stake has no responsibility to you for any such loss;</p>
          <p>k) You will not deposit funds which originate from criminal or other unauthorised activity;</p>
          <p>l) You will not deposit funds using payment methods that do not belong to You;</p>
          <p>m) All the funds deposited shall exclusively be used for Services available on the Website;</p>
          <p>n) You will not withdraw or try to withdraw to a payment methods that do not belong to You;</p>
          <p>o) You understand that by participating in the Services available on the Website, You take the risk of losing money deposited.</p>
          <p>p) You accept and acknowledge that the value of cryptocurrency can change dramatically depending on the market value;</p>
          <p>q) Stake shall not be treated as a financial institution;</p>
          <p>Others</p>
          <p>r) Your use of the Service is at your sole option, discretion and risk;</p>
          <p>s) You will not conduct criminal activities through the Stake Account;</p>
          <p>t) All information that you provide to us during the term of validity of this agreement is true, complete, correct, and that you shall immediately notify us of any change of such information;</p>
          <p>u) You participate in the Games strictly in your personal and non-professional capacity and participate for recreational and entertainment purposes only;</p>
          <p>v) You participate in the Games on your own behalf and not on the behalf of any other person;</p>
          <p>w) You have only one account with us and agree to not to open any more accounts with us;</p>
          <p>x) The telecommunications networks and Internet access services required for you to access and use the Service are entirely beyond the control of Stake and Stake shall have no liability whatsoever for any outages, slowness, capacity constraints or other deficiencies affecting the same;</p>
          <p>y) You will not be involved in any fraudulent, collusive, fixing or other unlawful activity in relation to Your or any third parties’ participation in any of the games and/or services on the Website, and shall not use any software-assisted methods or techniques or hardware devices for Your participation in any of the games and/or services on the Website;</p>
          <p>z) If you have access to non-public information related to an event or that can impact the outcome of an event or bet type, You will not bet on any event overseen by the relevant sport/event governing body;</p>
          <p>aa) If You are an athlete, coach, manager, owner, referee, or anyone with sufficient authority to influence the outcome of an event You will not bet on any event overseen by the relevant sport or event of the governing body;</p>
          <p>bb) If You are an owner (a person who is a direct or indirect legal or beneficial owner of 10 percent or greater) of a sport governing body or member team You will not bet on any event overseen by the sport governing body or any event in which a member team of that sport or event governing body participates;</p>
          <p>cc) If You are involved in a sport or event You will not be involved in compiling betting odds for the competition in which You are involved.</p>
          <p>5.2 In case of a breach of any of the representations, warrants or covenants mentioned in 5.1, Stake reserves the right to close or suspend Your Stake account at its own discretion and void any bets to the extent applicable by law.</p>
        </div>

        <div class="terms-conditions-title">
          6. STAKE WARRANTIES
        </div>
        <div class="terms-conditions-describe">
          <p>6.1 Stake warrants that they will:</p>
          <p>a) manage funds belonging to the Player in a secure and appropriate manner; and</p>
          <p>b) manage personal information pertaining to the Player in accordance with applicable law, and in accordance with its Privacy Policy.</p>
          <p>6.2 The software is provided "as is" without any warranties, conditions, undertakings or representations, express or implied, statutory or otherwise. Stake hereby excludes all implied terms, representations, conditions and warranties (including any of merchantability, merchantable quality, satisfactory quality and fitness for any particular purpose). Stake does not warrant that: (i) the Website and Services will meet Your requirements; (ii) the Website and Services will not infringe any third party’s intellectual property rights; (iii) the operation of the Website and Services will be error-free or uninterrupted; (iv) any defects in the Website and Services will be corrected; or (v) the Website or the servers are virus-free.</p>
          <p>
            6.3 Stake can be contacted by email on
            support@stake.com
            or on its live chat 24/7. The live chat is available when logged into Your Stake Account. In the event that Stake, in its sole discretion, deems that Your behaviour, via live chat, email, or otherwise, has been abusive or derogatory towards any of Stake’s or its Affiliates or third-party service provider’s employees, Stake shall have the right to block or terminate Your Stake Account.
          </p>
        </div>

        <div class="terms-conditions-title">
          7. DEPOSITS
        </div>
        <div class="terms-conditions-describe">
          <p>7.1 You may participate in any Game only if you have sufficient funds on your Stake Account for such participation. For that purpose you shall use the payment methods available on the Website to deposit your funds. Stake will not give you any credit whatsoever for participation in any Game.</p>
          <p>
            7.2 You must deposit funds to Your Stake Account using the payment methods available at
            www.stake.com
            .
          </p>
          <p>7.3 You shall ensure that funds that You deposit into your Stake Account are not tainted with any illegality and, in particular, do not originate from any illegal activity or source.</p>
          <p>7.4 To deposit funds into your Stake Account, you can transfer funds from crypto-wallets under your control or through any other payment methods available on stake.com. Deposits can only be made with your own funds.</p>
          <p>7.5 You should only deposit money into Your account for the purpose of You using such money to place bets/wager on the Website. Stake is entitled to suspend or close Your account if we reasonably believe that You are depositing funds without any intention to place sporting and/or gaming wagers. In such circumstances we may also report this activity to relevant authorities.</p>
          <p>7.6 You acknowledge and understand that funding Your Stake Account can only be funded by payment methods owned by You.</p>
          <p>7.7 You further understand, agree and acknowledge that if Stake discovers, detects and/or identifies that You:</p>
          <p>a) Funded/are funding Your Stake Account using third party payment methods; and/or</p>
          <p>b) Funded/are funding Your Stake Account with funds that are tainted with illegality, such activity will be deemed as constituting a violation of the Terms of Service amounting to fraud, and by extension:</p>
          <p>i) Stake reserves the right, at its own discretion, to suspend or close Your Stake Account; and</p>
          <p>ii) Stake reserves the right, at its own discretion, to cancel, reverse or adjust any transactions and to forfeit funds deposited and/or winnings generated from the deposited funds.</p>
          <p>7.8 Stake can set at its own discretion a minimum deposit amount. The minimum deposit amount can be changed at all time at Stake’s discretion and will be identified on the website. Please be aware that depending on the payment method used by You, additional fees might be charged by the payment providers.</p>
          <p>7.9 The payment methods made available to you and the minimum and maximum deposit limit can be found in the wallet section on the Site. Applicable service fees may be applied and changed. Some payment methods may not be available in all countries.</p>
          <p>7.10 Deposits are immediately processed and the updated balance is shown in the Stake Account instantly whenever a payment service provider is used. Stake does not take responsibility for any delays caused due to its payment system or due to delays caused by any third party. Note that:</p>
          <p>a) some payment methods may include additional fees. In this case, the fee will be clearly visible for you in the cashier.</p>
          <p>b) your bank or payment service provider may charge you additional fees for deposits of currency conversion according to their terms and conditions and your user agreement.</p>
          <p>7.11 We reserve the right to use additional procedures and means to verify your identity when processing deposits into your Stake Account.</p>
          <p>7.12 Funds cannot be transferred from your Stake Account to the Stake Account of another Player.</p>
          <p>
            7.13 Stake can refuse any deposits at its own discretion. Users that have their accounts blocked, or suspended shall refrain from depositing at
            www.stake.com
            .
          </p>
          <p>7.14 In the event that a player tries to deposit when his account is blocked or suspended, Stake will have the right to retain the funds.</p>
        </div>

        <div class="terms-conditions-title">
          8. WITHDRAWALS
        </div>
        <div class="terms-conditions-describe">
          <p>8.1 Stake reserves the right to refuse any withdrawal by a Player from their Stake Account until:</p>
          <p>a) the Player’s identity has been verified and Stake has confirmed the withdrawal is being made by a holder of the Stake Account;</p>
          <p>b) the withdrawal is being transferred to an account of which the Player is a legal holder;</p>
          <p>c) any additional information requested by Stake has been provided; and</p>
          <p>d) the Player has complied with the minimum wager requirement for each deposit.</p>
          <p>8.2 Stake reserves all rights to investigate Your account and gaming activity. If Stake reasonably suspects that Your account or gaming activity has violated these terms of service or applicable laws or regulations, it may, in its sole discretion, delay or decline further deposits, withdrawals and/or game play while it conducts its investigation. You acknowledge and accept that Stake may not be in a position to provide an explanation as to the nature of its investigation.</p>
          <p>8.3 All withdrawals must be done through the same payment method chosen by you when placing a deposit, unless we decide otherwise or are unable to do so. If you deposit using a number of payment methods, we reserve the right to split your withdrawal across such payment methods and process each part through the respective payment method at our discretion and in accordance with anti-money laundering policies and regulation.</p>
          <p>8.4 If we mistakenly credit your Stake Account with winnings that do not belong to you, whether due to a technical error in the pay-tables, or human error or otherwise, the amount will remain our property and will be deducted from your Stake Account. If you have withdrawn funds that do not belong to you prior to us becoming aware of the error, the mistakenly paid amount will (without prejudice to other remedies and actions that may be available at law) constitute a debt owed by you to us. In the event of an incorrect crediting, you are obliged to notify us immediately by email.</p>
          <p>FIAT Withdrawals</p>
          <p>8.5 You need to wager 100% of the value of your deposit in order to request a FIAT withdrawal.</p>
          <p>8.6 Withdrawals from Stake Account are made through payments addressed to the Player or transferred to a bank account held in the name of the Player, as advised to Stake by the Player. Before processing any withdrawal, Stake reserves the right to perform enhanced due diligence where deemed necessary.</p>
          <p>8.7 The minimum withdrawal amount will be identified on the website when performing a withdrawal.</p>
          <p>8.8 If You have multiple withdrawals pending, Stake reserves the right to reject all withdrawals and request You to perform one withdrawal with the sum of all multiple withdrawals.</p>
          <p>8.9 Stake will not charge You any fees on withdrawals. However, You are advised to check if the payment method You use imposes any additional charges. Stake will not be responsible for any commissions or processing fees charged to You by third parties such as Your bank as this is beyond our control.</p>
          <p>Crypto Withdrawals</p>
          <p>8.10 Crypto withdrawals will be made to your stated cryptocurrency wallet address when making a valid withdrawal request.</p>
          <p>
            8.11 Stake reserves the right to carry out additional KYC verification procedures for any withdrawal. Players who wish to recover funds held in a closed, locked or excluded account, are advised to contact
            support@stake.com
            .
          </p>
          <p>8.12 All transactions shall be checked in order to prevent money laundering. If a player becomes aware of any suspicious activity relating to any of the Games of the Website, s/he must report this to Stake immediately. Stake may suspend, block or close a Stake Account and withhold funds if requested to do so in accordance with the Prevention of Money Laundering Act or on any other legal basis requested by any state authority. You acknowledge that the funds in your account are consumed instantly when playing and we do not provide return of goods, refunds or retrospective cancellation of your account.</p>
        </div>

        <div class="terms-conditions-title" />
        <div class="terms-conditions-describe">
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
