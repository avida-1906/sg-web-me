<script lang="ts" setup>
/* eslint-disable max-len */
const location = useBrowserLocation()
const appStore = useAppStore()
const { companyData } = storeToRefs(appStore)
</script>

<template>
  <div class="terms-conditions">
    <div class="terms-conditions-theme">
      Terms and Conditions
    </div>
    <div class="terms-conditions-title">
      1. {{ companyData?.name.toUpperCase() }}.COM
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
        2.1 BY REGISTERING ON <a class="link-inline"><span>{{ location.hostname?.toUpperCase() }}</span>
          <BaseIcon name="uni-jump-page" />
        </a>
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
        <a class="link-inline"><span>{{ location.hostname }}</span>
          <BaseIcon name="uni-jump-page" />
        </a> You (“You”, “Your”, Yourself” or the “Player” interchangeably)
        enter into an agreement with {{ companyData?.name }}.
      </p>
      <p>
        3.2 This Agreement should be read by You in its entirety prior to your
        use of {{ companyData?.name }}'s service or products.
        Please note that the Agreement constitutes a legally binding
        agreement between you and {{ companyData?.name }}.
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
        3.4 We are entitled to make amendments to these Terms and Conditions at any time and without advanced notice. If
        we make such amendments, we may take appropriate steps to bring such changes to your attention (such as by email
        or placing a notice on a prominent position on the Website, together with the amended terms and conditions) but it
        shall be your sole responsibility to check for any amendments, updates and/or modifications. Your continued use of
        the website services after any such amendment to the Terms and Conditions will be deemed as your acceptance and
        agreement to be bound by such amendments, updates and/or modifications.
      </p>
      <p>
        3.5 The terms of this Terms and Conditions shall prevail in the event of any conflict between the terms of this
        Terms and Conditions and of any of the game rules or other documents referred to in this Terms and Conditions.
      </p>
      <p>
        3.6 These Terms and Conditions may be published in several languages for informational purposes and ease of
        access by players. The English version is the only legal basis of the relationship between you and us and in the
        case of any discrepancy with respect to a translation of any kind, the English version of these Terms and
        Conditions shall prevail.
      </p>
    </div>

    <div class="terms-conditions-title">
      4. {{ companyData?.name.toUpperCase() }} ACCOUNT
    </div>
    <div class="terms-conditions-describe">
      <p class="bold-txt">
        Registration
      </p>
      <p>
        4.1 In order for you to be able to place bets on {{ location.hostname?.replace('www.', '') }}, you must first
        personally register an account with us ("{{ companyData?.name }} Account").
      </p>
      <p>
        4.2 For a person to be registered as a player with {{ companyData?.name }} and use the Website, that person must
        submit an application for registration and opening of a {{ companyData?.name }} account. The application for the
        opening of the {{ companyData?.name }} Account must be submitted personally, and will require You to provide a set
        of personal information, namely e-mail, full name, date of birth, address, etc.
      </p>
      <p>
        4.3 Where the information stipulated in 4.2. is not provided and/or is not deemed to be complete, accurate or
        up-to-date at any point in time, {{ companyData?.name }} reserves the right to suspend the {{ companyData?.name }}
        Account registration and treat any subsequent potentially accepted deposits to the Player’s {{ companyData?.name
        }} Account as invalid (and any winnings arising from such deposit as void). Where a {{ companyData?.name }}
        Account is suspended, You should contact customer support at <a class="link-inline"><span>support@{{
                                                                                              companyData?.name.toLowerCase() }}.com</span>
          <BaseIcon name="uni-jump-page" />
        </a>.
      </p>
      <p>
        4.4 All applicants must be 18 or such other legal age of majority as determined by any laws which are applicable
        to you, whichever age is greater or older. {{ companyData?.name }} reserves the right to ask for proof of age from
        any Player and suspend their {{ companyData?.name }} Account until satisfactory documentation is provided. {{
          companyData?.name }} takes its responsibilities in respect of under age and responsible gambling very seriously.
      </p>
      <p>4.5 {{ companyData?.name }} will not accept registration from individuals:</p>
      <p>a) Under 18 years old or under the legal age of majority or gambling in their jurisdiction;</p>
      <p>
        b) Residing in jurisdictions from where it is illegal or gambling is not permitted. {{ companyData?.name }} is
        not able to verify the legality of the Service in each jurisdiction and it is the User's responsibility to ensure
        that their use of the Service is lawful;
      </p>
      <p>c) Provide misleading information or try to pass by third parties.</p>
      <p>
        4.6 {{ companyData?.name }} reserves the right to refuse any application for a {{ companyData?.name }} Account,
        at its sole discretion.
      </p>
      <p class="bold-txt">
        Know Your Customer
      </p>
      <p>
        4.7 You represent and warrant that any information provided by You on Your application form is true, updated and
        correct.
      </p>
      <p>
        4.8 {{ companyData?.name }} reserves the right, at any time, to ask for any KYC documentation it deems necessary
        to determine the identity and location of a Player. {{ companyData?.name }} reserves the right to restrict the
        Service, payment or withdrawal until identity is sufficiently determined, or for any other reason in {{
          companyData?.name }}’s sole discretion. {{ companyData?.name }} also reserves the right to disclose a Player’s
        information as appropriate to comply with legal process or as otherwise permitted by the privacy policy of {{
          companyData?.name }} (owner and operator of {{ companyData?.name }}), and by using the Service, you acknowledge
        and consent to the possibility of such disclosure.
      </p>
      <p class="bold-txt">
        Multiple Accounts
      </p>
      <p>
        4.9 Only one {{ companyData?.name }} Account per Player is allowed. Should You attempt or successfully open more
        than one {{ companyData?.name }} Account, under Your own name or under any other name, or should You attempt or
        succeed in using the Website by means of any other person's {{ companyData?.name }} Account, {{ companyData?.name
        }} will be entitled to immediately close all Your {{ companyData?.name }} Account(s), retain all monies in such {{
          companyData?.name }} Accounts and ban You from future use of the Website.
      </p>
      <p>
        4.10 Should {{ companyData?.name }} have reason to believe that You have registered and/or used more than one {{
          companyData?.name }} Account, or colluded with one or more other individuals using a number of different {{
          companyData?.name }} Accounts, {{ companyData?.name }} shall be entitled to deem such accounts as constituting
        multiple {{ companyData?.name }} Accounts, and suspend or close all such {{ companyData?.name }} Accounts. {{
          companyData?.name }} will also be entitled to retain the funds till the Player proves that he did not attempt to
        create multiple accounts.
      </p>
      <p>
        4.11 If you notice that you have more than one registered {{ companyData?.name }} Account you must notify us
        immediately. Failure to do so may lead to your {{ companyData?.name }} Account being blocked and the funds
        retained.
      </p>
      <p class="bold-txt">
        User Responsibility
      </p>
      <p>
        4.12 It is your sole and exclusive responsibility to ensure that your login details are kept securely. You must
        not disclose your login details to anyone.
      </p>
      <p>
        4.13 We are not liable or responsible for any abuse or misuse of your {{ companyData?.name }} Account by third
        parties due to your disclosure, whether intentional, accidental, active or passive, of your login details to any
        third party.
      </p>
      <p>
        4.14 You are prohibited from selling, transferring or acquiring {{ companyData?.name }} Accounts to or from other
        Players.
      </p>
      <p>
        4.15 You will inform us as soon as you become aware of any errors with respect to your account or any
        calculations with respect to any bet you have placed. We reserve the right to declare null and void any bets that
        are subject to such an error.
      </p>
      <p>4.16 You are responsible for all activities that occur under your account.</p>
      <p class="bold-txt">
        Security Features
      </p>
      <p>4.17 We recommend that you enable two-factor authentication to enhance the security of your account.</p>
      <p>4.18 We may provide other security measures from time to time, and we encourage you to use them.</p>
      <p class="bold-txt">
        Suspension and Closure by {{ companyData?.name }}
      </p>
      <p>4.19 {{ companyData?.name }} shall be entitled to close or suspend Your {{ companyData?.name }} Account if:</p>
      <p>
        a) {{ companyData?.name }} considers that You are using or have used the Website in a fraudulent or collusive
        manner or for illegal and/or unlawful or improper purposes;
      </p>
      <p>
        b) {{ companyData?.name }} considers that You are using or have used the Website in an unfair manner, have
        deliberately cheated or taken unfair advantage of {{ companyData?.name }} or any of its customers or if Your {{
          companyData?.name }} Account is being used for the benefit of a third party;
      </p>
      <p>
        c) {{ companyData?.name }} is requested to do so by the police, any regulatory authority or court or if {{
          companyData?.name }} is unable to verify Your identity, profession or source of funds as is expressly required by
        the applicable regulations;
      </p>
      <p>
        d) You are in breach of these Terms and Conditions, the applicable regulations or the fair use of our services,
        or {{ companyData?.name }} has concerns that You are a compulsive problem gambler without being self-excluded;
      </p>
      <p>
        e) {{ companyData?.name }} considers that any of the events referred to in (a) to (e) above may have occurred or
        are likely to occur.
      </p>
      <p>
        4.20 If {{ companyData?.name }} closes or suspends Your {{ companyData?.name }} Account for any of the reasons
        referred to in 4.19, You shall, to the extent permitted by applicable laws, be liable for any and all claims,
        direct losses, liabilities, damages, costs and expenses incurred or suffered by {{ companyData?.name }} (together,
        the “Claims”) arising therefrom and shall, to the extent permitted by applicable laws, indemnify and hold {{
          companyData?.name }} harmless on demand for such Claims.
      </p>
      <p>
        4.21 In the circumstances referred to in 4.19, {{ companyData?.name }} shall also be entitled to void any bets
        placed by You following such actions by You or to withhold and/or retain any and all amounts which would otherwise
        have been paid or payable to you (including any winnings) to the extent permitted by law.
      </p>
      <p>
        4.22 We reserve the right to suspend or terminate your account at any time, with or without notice, if we suspect
        that you account has been compromised or is being used in breach of our Terms of Service.
      </p>
      <p>
        4.23 If {{ companyData?.name }} closes Your {{ companyData?.name }} Account it will inform You of the available
        means to withdraw the remaining balance on Your {{ companyData?.name }} Account.
      </p>
      <p class="bold-txt">
        Our Liability
      </p>
      <p>
        4.24 We take no responsibility for any loss or damage that you may suffer as a result of unauthorised access to
        your account.
      </p>
      <p>
        4.25 We take no responsibility for any loss or damage that you may suffer as a result of your failure to keep
        your login secure and private.
      </p>
    </div>

    <div class="terms-conditions-title">
      5. YOUR WARRANTIES
    </div>
    <div class="terms-conditions-describe">
      <p>5.1 Prior to your use of the Service and on an ongoing basis you represent, warrant, covenant and agree that:</p>
      <p class="bold-txt">
        Capacity
      </p>
      <p>
        a) You are over 18 or such other legal age of majority as determined by any laws which are applicable to you,
        whichever age is greater;
      </p>
      <p>
        b) You have full capacity to enter into a legally binding agreement with us and you are not restricted by any
        form of limited legal capacity;
      </p>
      <p>c) You are not diagnosed or classified as a compulsive or problem gambler;</p>
      <p>
        d) You are not currently self-excluded from any gambling site or gambling premises. You will inform {{
          companyData?.name }} immediately if you enter into a self-exclusion agreement with any gambling provider.
      </p>
      <p class="bold-txt">
        Jurisdiction
      </p>
      <p>
        e) You are accessing <a class="link-inline"><span>{{ location.hostname }}</span>
          <BaseIcon name="uni-jump-page" />
        </a> from a jurisdiction in which it is legal to do so;
      </p>
      <p>
        f) You will not use our services while located in any jurisdiction that prohibits the placing and/or accepting of
        bets online and/or playing casino and/or live games;
      </p>
      <p>
        g) You accept and acknowledge that we reserve the right to detect and prevent the use of prohibited techniques,
        including but not limited to fraudulent transaction detection, automated registration and signup, gameplay and
        screen capture techniques. These steps may include, but are not limited to, examination of Players device
        properties, detection of geo-location and IP masking, transactions and blockchain analysis;
      </p>
      <p class="bold-txt">
        Funds & Tax
      </p>
      <p>
        h) You are solely responsible for reporting and accounting for any taxes applicable to you under relevant laws
        for any winnings that you receive from us;
      </p>
      <p>
        i) You are solely responsible for any applicable taxes which may be payable on cryptocurrency awarded to you
        through your using the Service;
      </p>
      <p>
        j) There is a risk of losing cryptocurrency when using the Service and that {{ companyData?.name }} has no
        responsibility to you for any such loss;
      </p>
      <p>k) You will not deposit funds which originate from criminal or other unauthorised activity;</p>
      <p>l) You will not deposit funds using payment methods that do not belong to You;</p>
      <p>m) All the funds deposited shall exclusively be used for Services available on the Website;</p>
      <p>n) You will not withdraw or try to withdraw to a payment methods that do not belong to You;</p>
      <p>
        o) You understand that by participating in the Services available on the Website, You take the risk of losing
        money deposited.
      </p>
      <p>
        p) You accept and acknowledge that the value of cryptocurrency can change dramatically depending on the market
        value;
      </p>
      <p>q) {{ companyData?.name }} shall not be treated as a financial institution;</p>
      <p class="bold-txt">
        Others
      </p>
      <p>r) Your use of the Service is at your sole option, discretion and risk;</p>
      <p>s) You will not conduct criminal activities through the {{ companyData?.name }} Account;</p>
      <p>
        t) All information that you provide to us during the term of validity of this agreement is true, complete,
        correct, and that you shall immediately notify us of any change of such information;
      </p>
      <p>
        u) You participate in the Games strictly in your personal and non-professional capacity and participate for
        recreational and entertainment purposes only;
      </p>
      <p>v) You participate in the Games on your own behalf and not on the behalf of any other person;</p>
      <p>w) You have only one account with us and agree to not to open any more accounts with us;</p>
      <p>
        x) The telecommunications networks and Internet access services required for you to access and use the Service
        are entirely beyond the control of {{ companyData?.name }} and {{ companyData?.name }} shall have no liability
        whatsoever for any outages, slowness, capacity constraints or other deficiencies affecting the same;
      </p>
      <p>
        y) You will not be involved in any fraudulent, collusive, fixing or other unlawful activity in relation to Your
        or any third parties’ participation in any of the games and/or services on the Website, and shall not use any
        software-assisted methods or techniques or hardware devices for Your participation in any of the games and/or
        services on the Website;
      </p>
      <p>
        z) If you have access to non-public information related to an event or that can impact the outcome of an event or
        bet type, You will not bet on any event overseen by the relevant sport/event governing body;
      </p>
      <p>
        aa) If You are an athlete, coach, manager, owner, referee, or anyone with sufficient authority to influence the
        outcome of an event You will not bet on any event overseen by the relevant sport or event of the governing body;
      </p>
      <p>
        bb) If You are an owner (a person who is a direct or indirect legal or beneficial owner of 10 percent or greater)
        of a sport governing body or member team You will not bet on any event overseen by the sport governing body or any
        event in which a member team of that sport or event governing body participates;
      </p>
      <p>
        cc) If You are involved in a sport or event You will not be involved in compiling betting odds for the
        competition in which You are involved.
      </p>
      <p>
        5.2 In case of a breach of any of the representations, warrants or covenants mentioned in 5.1, {{
          companyData?.name }} reserves the right to close or suspend Your {{ companyData?.name }} account at its own
        discretion and void any bets to the extent applicable by law.
      </p>
    </div>

    <div class="terms-conditions-title">
      6. {{ companyData?.name.toUpperCase() }} WARRANTIES
    </div>
    <div class="terms-conditions-describe">
      <p>6.1 {{ companyData?.name }} warrants that they will:</p>
      <p>a) manage funds belonging to the Player in a secure and appropriate manner; and</p>
      <p>
        b) manage personal information pertaining to the Player in accordance with applicable law, and in accordance with
        its Privacy Policy.
      </p>
      <p>
        6.2 The software is provided "as is" without any warranties, conditions, undertakings or representations, express
        or implied, statutory or otherwise. {{ companyData?.name }} hereby excludes all implied terms, representations,
        conditions and warranties (including any of merchantability, merchantable quality, satisfactory quality and
        fitness for any particular purpose). {{ companyData?.name }} does not warrant that: (i) the Website and Services
        will meet Your requirements; (ii) the Website and Services will not infringe any third party’s intellectual
        property rights; (iii) the operation of the Website and Services will be error-free or uninterrupted; (iv) any
        defects in the Website and Services will be corrected; or (v) the Website or the servers are virus-free.
      </p>
      <p>
        6.3 {{ companyData?.name }} can be contacted by email on
        <a class="link-inline"><span>support@{{ companyData?.name.toLowerCase() }}.com</span>
          <BaseIcon name="uni-jump-page" />
        </a>
        or on its live chat 24/7. The live chat is available when logged into Your {{ companyData?.name }} Account. In the
        event that {{ companyData?.name }}, in its sole discretion, deems that Your behaviour, via live chat, email, or
        otherwise, has been abusive or derogatory towards any of {{ companyData?.name }}’s or its Affiliates or
        third-party service provider’s employees, {{ companyData?.name }} shall have the right to block or terminate Your
        {{ companyData?.name }} Account.
      </p>
    </div>

    <div class="terms-conditions-title">
      7. DEPOSITS
    </div>
    <div class="terms-conditions-describe">
      <p>
        7.1 You may participate in any Game only if you have sufficient funds on your {{ companyData?.name }} Account for
        such participation. For that purpose you shall use the payment methods available on the Website to deposit your
        funds. {{ companyData?.name }} will not give you any credit whatsoever for participation in any Game.
      </p>
      <p>
        7.2 You must deposit funds to Your {{ companyData?.name }} Account using the payment methods available at
        <a class="link-inline"><span>{{ location.hostname }}</span>
          <BaseIcon name="uni-jump-page" />
        </a>
        .
      </p>
      <p>
        7.3 You shall ensure that funds that You deposit into your {{ companyData?.name }} Account are not tainted with
        any illegality and, in particular, do not originate from any illegal activity or source.
      </p>
      <p>
        7.4 To deposit funds into your {{ companyData?.name }} Account, you can transfer funds from crypto-wallets under
        your control or through any other payment methods available on <a class="link-inline"><span>{{ location.hostname
                                                                                              }}</span>
          <BaseIcon name="uni-jump-page" />
        </a>. Deposits can only be made with your own funds.
      </p>
      <p>
        7.5 You should only deposit money into Your account for the purpose of You using such money to place bets/wager
        on the Website. {{ companyData?.name }} is entitled to suspend or close Your account if we reasonably believe that
        You are depositing funds without any intention to place sporting and/or gaming wagers. In such circumstances we
        may also report this activity to relevant authorities.
      </p>
      <p>
        7.6 You acknowledge and understand that funding Your {{ companyData?.name }} Account can only be funded by
        payment methods owned by You.
      </p>
      <p>
        7.7 You further understand, agree and acknowledge that if {{ companyData?.name }} discovers, detects and/or
        identifies that You:
      </p>
      <p>a) Funded/are funding Your {{ companyData?.name }} Account using third party payment methods; and/or</p>
      <p>
        b) Funded/are funding Your {{ companyData?.name }} Account with funds that are tainted with illegality, such
        activity will be deemed as constituting a violation of the Terms of Service amounting to fraud, and by extension:
      </p>
      <p>
        i) {{ companyData?.name }} reserves the right, at its own discretion, to suspend or close Your {{
          companyData?.name }} Account; and
      </p>
      <p>
        ii) {{ companyData?.name }} reserves the right, at its own discretion, to cancel, reverse or adjust any
        transactions and to forfeit funds deposited and/or winnings generated from the deposited funds.
      </p>
      <p>
        7.8 {{ companyData?.name }} can set at its own discretion a minimum deposit amount. The minimum deposit amount
        can be changed at all time at {{ companyData?.name }}’s discretion and will be identified on the website. Please
        be aware that depending on the payment method used by You, additional fees might be charged by the payment
        providers.
      </p>
      <p>
        7.9 The payment methods made available to you and the minimum and maximum deposit limit can be found in the
        wallet section on the Site. Applicable service fees may be applied and changed. Some payment methods may not be
        available in all countries.
      </p>
      <p>
        7.10 Deposits are immediately processed and the updated balance is shown in the {{ companyData?.name }} Account
        instantly whenever a payment service provider is used. {{ companyData?.name }} does not take responsibility for
        any delays caused due to its payment system or due to delays caused by any third party. Note that:
      </p>
      <p>
        a) some payment methods may include additional fees. In this case, the fee will be clearly visible for you in the
        cashier.
      </p>
      <p>
        b) your bank or payment service provider may charge you additional fees for deposits of currency conversion
        according to their terms and conditions and your user agreement.
      </p>
      <p>
        7.11 We reserve the right to use additional procedures and means to verify your identity when processing deposits
        into your {{ companyData?.name }} Account.
      </p>
      <p>
        7.12 Funds cannot be transferred from your {{ companyData?.name }} Account to the {{ companyData?.name }} Account
        of another Player.
      </p>
      <p>
        7.13 {{ companyData?.name }} can refuse any deposits at its own discretion. Users that have their accounts
        blocked, or suspended shall refrain from depositing at
        <a class="link-inline"><span>{{ location.hostname }}</span>
          <BaseIcon name="uni-jump-page" />
        </a>
        .
      </p>
      <p>
        7.14 In the event that a player tries to deposit when his account is blocked or suspended, {{ companyData?.name
        }} will have the right to retain the funds.
      </p>
    </div>

    <div class="terms-conditions-title">
      8. WITHDRAWALS
    </div>
    <div class="terms-conditions-describe">
      <p>
        8.1 {{ companyData?.name }} reserves the right to refuse any withdrawal by a Player from their {{
          companyData?.name }} Account until:
      </p>
      <p>
        a) the Player’s identity has been verified and {{ companyData?.name }} has confirmed the withdrawal is being made
        by a holder of the {{ companyData?.name }} Account;
      </p>
      <p>b) the withdrawal is being transferred to an account of which the Player is a legal holder;</p>
      <p>c) any additional information requested by {{ companyData?.name }} has been provided; and</p>
      <p>d) the Player has complied with the minimum wager requirement for each deposit.</p>
      <p>
        8.2 {{ companyData?.name }} reserves all rights to investigate Your account and gaming activity. If {{
          companyData?.name }} reasonably suspects that Your account or gaming activity has violated these terms of service
        or applicable laws or regulations, it may, in its sole discretion, delay or decline further deposits, withdrawals
        and/or game play while it conducts its investigation. You acknowledge and accept that {{ companyData?.name }} may
        not be in a position to provide an explanation as to the nature of its investigation.
      </p>
      <p>
        8.3 All withdrawals must be done through the same payment method chosen by you when placing a deposit, unless we
        decide otherwise or are unable to do so. If you deposit using a number of payment methods, we reserve the right to
        split your withdrawal across such payment methods and process each part through the respective payment method at
        our discretion and in accordance with anti-money laundering policies and regulation.
      </p>
      <p>
        8.4 If we mi{{ companyData?.name }}nly credit your {{ companyData?.name }} Account with winnings that do not
        belong to you, whether due to a technical error in the pay-tables, or human error or otherwise, the amount will
        remain our property and will be deducted from your {{ companyData?.name }} Account. If you have withdrawn funds
        that do not belong to you prior to us becoming aware of the error, the mi{{ companyData?.name }}nly paid amount
        will (without prejudice to other remedies and actions that may be available at law) constitute a debt owed by you
        to us. In the event of an incorrect crediting, you are obliged to notify us immediately by email.
      </p>
      <p class="bold-txt">
        FIAT Withdrawals
      </p>
      <p>8.5 You need to wager 100% of the value of your deposit in order to request a FIAT withdrawal.</p>
      <p>
        8.6 Withdrawals from {{ companyData?.name }} Account are made through payments addressed to the Player or
        transferred to a bank account held in the name of the Player, as advised to {{ companyData?.name }} by the Player.
        Before processing any withdrawal, {{ companyData?.name }} reserves the right to perform enhanced due diligence
        where deemed necessary.
      </p>
      <p>8.7 The minimum withdrawal amount will be identified on the website when performing a withdrawal.</p>
      <p>
        8.8 If You have multiple withdrawals pending, {{ companyData?.name }} reserves the right to reject all
        withdrawals and request You to perform one withdrawal with the sum of all multiple withdrawals.
      </p>
      <p>
        8.9 {{ companyData?.name }} will not charge You any fees on withdrawals. However, You are advised to check if the
        payment method You use imposes any additional charges. {{ companyData?.name }} will not be responsible for any
        commissions or processing fees charged to You by third parties such as Your bank as this is beyond our control.
      </p>
      <p class="bold-txt">
        Crypto Withdrawals
      </p>
      <p>
        8.10 Crypto withdrawals will be made to your stated cryptocurrency wallet address when making a valid withdrawal
        request.
      </p>
      <p>
        8.11 {{ companyData?.name }} reserves the right to carry out additional KYC verification procedures for any
        withdrawal. Players who wish to recover funds held in a closed, locked or excluded account, are advised to contact
        <a class="link-inline"><span>support@{{ companyData?.name.toLowerCase() }}.com</span>
          <BaseIcon name="uni-jump-page" />
        </a>.
      </p>
      <p>
        8.12 All transactions shall be checked in order to prevent money laundering. If a player becomes aware of any
        suspicious activity relating to any of the Games of the Website, s/he must report this to {{ companyData?.name }}
        immediately. {{ companyData?.name }} may suspend, block or close a {{ companyData?.name }} Account and withhold
        funds if requested to do so in accordance with the Prevention of Money Laundering Act or on any other legal basis
        requested by any state authority. You acknowledge that the funds in your account are consumed instantly when
        playing and we do not provide return of goods, refunds or retrospective cancellation of your account.
      </p>
    </div>

    <div class="terms-conditions-title">
      9. PLAYER FUNDS PROTECTION & CHARGEBACKS
    </div>
    <div class="terms-conditions-describe">
      <p>
        9.1 Any funds You deposit with us in Your {{ companyData?.name }} Account, along with any winnings, are held for
        You in separate customer bank accounts / crypto wallet for the sole and specific purpose for You to place sports
        and gaming wagers and to settle any fees or charges that You might incur in connection with the use of our
        Services. This means Your funds are protected from being used for any other purpose.
      </p>
      <p>
        9.2 If we incur any charge-backs, reversals or denial of payments or any loss suffered by {{ companyData?.name }}
        as a consequence thereof due to causes attributable to You in respect of Your {{ companyData?.name }} Account, we
        reserve the right to charge You for the relevant amounts incurred.
      </p>
      <p>
        9.3 We may, at any time, offset any positive balance on Your account against any amounts owed by You to {{
          companyData?.name }}.
      </p>
    </div>

    <div class="terms-conditions-title">
      10. PLACING BETS/WAGERS
    </div>
    <div class="terms-conditions-describe">
      <p>
        10.1 You are allowed to place Your bets/wagers on the markets/products offered in the Website. {{
          companyData?.name }} is not obliged to accept any bet/wager from You and bets/wagers will only be deemed as valid
        and finalised, and therefore as accepted by {{ companyData?.name }}, when You receive the confirmation from {{
          companyData?.name }} of the acceptance of Your bet/wager.
      </p>
      <p>
        10.2 {{ companyData?.name }} only accepts bets/wagers made online (including via mobile device). Bets/wagers are
        not accepted in any other form (post, email, fax, etc.) and where received will be invalid and void - win or lose.
      </p>
      <p>
        10.3 It is Your responsibility to ensure details of the bets/wagers are correct. Once bets/wagers have been
        placed they may not be cancelled by You. Bets can only be changed by You using our Edit Bet feature, where this is
        available. {{ companyData?.name }} can only cancel or amend a bet/wager if the relevant event has been suspended
        or cancelled, if there was an obvious error on the relevant bet or its odds, if the bet is placed in breach of the
        Terms or if required to do so for legal or regulatory reasons.
      </p>
      <p>
        10.4 Your funds will be allocated to bets/wagers in the order they are placed and will not be available for any
        other use. {{ companyData?.name }} reserves the right to void and/or reverse any transactions made after a
        bet/wager has been placed involving allocated funds, either at the time or retrospectively.
      </p>
    </div>

    <div class="terms-conditions-title">
      11. BET/WAGER CONFIRMATION
    </div>
    <div class="terms-conditions-describe">
      <p>
        11.1 Bets/wagers will only be valid once You receive the confirmation of the acceptance of Your bet/wager.
        Bets/wagers placed with insufficient funds in Your account will be void.
      </p>
      <p>
        11.2 A bet/wager that You request will only be valid once accepted by {{ companyData?.name }}. Each valid
        bet/wager will receive a unique transaction code. We shall not be liable for the settlement of any bets/wagers
        which are not issued with a unique transaction code. If You are unsure about the validity of a bet/wager, please
        check Your account history, or contact our Customer Support Team
        (<a class="link-inline"><span>support@{{ companyData?.name.toLowerCase() }}.com</span>
          <BaseIcon name="uni-jump-page" />
        </a>).
      </p>
      <p>
        11.3 Should a dispute arise regarding the content of a bet, You and {{ companyData?.name }} agree that the {{
          companyData?.name }} transaction log database of its internal control system will be the ultimate authority in
        such matters.
      </p>
    </div>

    <div class="terms-conditions-title">
      12. BONUS
    </div>
    <div class="terms-conditions-describe">
      <p>
        12.1 {{ companyData?.name }}, at its sole discretion, might offer from time to time, a number of Bonuses and
        Promotions. For example, The Million Dollar Race, the 50 Billionth Bet Bonanza, Coupons, Reloads, and Rakeback.
      </p>
      <p class="bold-txt">
        Eligibility
      </p>
      <p>
        12.2 Upon successful registration for a {{ companyData?.name }} Account, You may be eligible to receive {{
          companyData?.name }} Promotions and Bonuses. By accepting this agreement and registering for a {{
          companyData?.name }} Account on the Website, You are also acknowledging and accepting to be bound by the rules and
        regulations associated with any Promotions and Bonuses offered to You by {{ companyData?.name }}.
      </p>
      <p class="bold-txt">
        Bonus T&C
      </p>
      <p>
        12.3 All promotions, bonuses, or special offers are subject to the express terms of any bonus offered on the
        Website(s) and promotion-specific terms and conditions, if applicable, and any bonus credited to Your account must
        be used in adherence with such terms and conditions. By accepting a promotion, bonus, or special offer available
        on the Website(s), You consent to the terms and conditions of such promotion, bonus, or special offer and
        acknowledge that wagers must always be placed with cash balances before bonus balances can be used to wager. We
        reserve the right to withdraw any promotion, bonus, or special offer at any time.
      </p>
      <p class="bold-txt">
        Activation & Expiry
      </p>
      <p>
        12.4 By activating a Bonus or Promotion, You confirm that You also agree to the applicable terms and conditions.
      </p>
      <p>
        12.5 No promotion, bonus, or special offer will be accepted or honoured by the {{ companyData?.name }} following
        the expiration date of the promotion, bonus, or special offer, unless {{ companyData?.name }} in its sole
        discretion chooses to do so for any particular customer, promotion, bonus, or special offer. Expiration dates will
        be set forth in the specific rules or terms and conditions of the particular promotion, bonus, or special offer.
        Furthermore, {{ companyData?.name }} reserves the right, in its sole discretion, to change or modify any policy
        with respect to the earning or expiration of bonuses.
      </p>
      <p>
        12.6 Once forfeited or de-activated, the Bonus will no longer be available to You (and cannot be re-activated at
        any time thereafter). The amount of any Bonus Funds that have already been credited to your {{ companyData?.name
        }} Account Balance will remain available to You.
      </p>
      <p class="bold-txt">
        Bonus Abuse & Fraud
      </p>
      <p>
        12.7 In the event that {{ companyData?.name }} believes a Player of the Service is abusing or attempting to abuse
        a bonus or other promotion or is likely to benefit through abuse or lack of good faith from a policy adopted by {{
          companyData?.name }}, then {{ companyData?.name }} may, at its sole discretion, deny, withhold, or withdraw from
        any Player any bonus or promotion, or terminate that Player’s access to the Services, the Software, and/or lock
        that Player’s account, either temporarily or permanently.
      </p>
      <p>
        12.8 You may only open one (1) account on the Website. The opening of multiple accounts on the Website for the
        purpose of accumulating bonuses, promotions, special offers, or otherwise, shall be considered abusive behaviour.
      </p>
      <p class="bold-txt">
        {{ companyData?.name }} Rights
      </p>
      <p>
        12.9 {{ companyData?.name }} reserves the right to remove bonuses from all inactive accounts or accounts that are
        identified as “bonus abusers”.
      </p>
      <p>
        12.10 {{ companyData?.name }} reserves the right to cancel all bonuses that have not been claimed within the
        claiming period or 60 days, the shorter of the two.
      </p>
      <p>12.11 {{ companyData?.name }} reserves the right to cancel any bonus at its sole discretion.</p>
    </div>

    <div class="terms-conditions-title">
      13. AUTHORITY/TERMS OF SERVICE
    </div>
    <div class="terms-conditions-describe">
      <p>
        13.1 You agree to the game rules described on the {{ location.hostname?.replace('wwww.', '') }} website. {{
          companyData?.name }} retains authority over the issuing, maintenance, and closing of the Service. The decision of
        {{ companyData?.name }}'s management, concerning any use of the Service, or dispute resolution, is final and shall
        not be open to review or appeal.
      </p>
    </div>

    <div class="terms-conditions-title">
      14. PROHIBITED USES
    </div>
    <div class="terms-conditions-describe">
      <p class="bold-txt">
        PERSONAL USE
      </p>
      <p>
        14.1 The Service is intended solely for the User's personal use. The User is only allowed to wager for his/her
        personal entertainment. Users may not create multiple accounts for the purpose of collusion, sports betting and/or
        abuse of service.
      </p>
      <p class="bold-txt">
        AML & SANCTIONS COMPLIANCE
      </p>
      <p>
        14.2 {{ companyData?.name }} expressly prohibits and rejects the use of the Service for any form of illicit
        activity, including money laundering, terrorist financing or trade sanctions violations, consistent with various
        jurisdictions' laws, regulations and norms. To that end, the Service is not offered to individuals or entities
        subject to United States, European Union, or other global sanctions or watch lists. By using the Service, you
        represent and warrant that you are not so subject.
      </p>
      <p class="bold-txt">
        JURISDICTIONS
      </p>
      <p>
        14.3 Persons located in or reside in Afghanistan, Australia, Belarus, Belgium, Colombia, Côte d'Ivoire, Cuba,
        Curaçao, Czech Republic, Democratic Republic of the Congo, Denmark, France, Germany, Greece, Iran, Iraq, Italy,
        Liberia, Libya, Lithuania, Netherlands, North Korea, Ontario, Pakistan, Portugal, Serbia, Slovakia, South Sudan,
        Spain, Sudan, Syria, Sweden, Switzerland, United Kingdom, United States, Zimbabwe (the "Prohibited Jurisdictions")
        are not permitted make use of the Service. For the avoidance of doubt, the foregoing restrictions on engaging in
        real-money play from Prohibited Jurisdictions applies equally to residents and citizens of other nations while
        located in a Prohibited Jurisdiction. Any attempt to circumvent the restrictions on play by any persons located in
        a Prohibited Jurisdiction or Restricted Jurisdiction, is a breach of this Agreement. An attempt at circumvention
        includes, but is not limited to, manipulating the information used by {{ companyData?.name }} to identify your
        location and providing {{ companyData?.name }} with false or misleading information regarding your location or
        place of residence.
      </p>
      <p>
        14.4 The attempt to manipulate your real location through the use of VPN, proxy, or similar services or through
        the provision of incorrect or misleading information about your place of residence, with the intent to circumvent
        geo-blocking or jurisdiction restrictions, constitutes a breach of Clause 5 of this Terms of Service.
      </p>
    </div>

    <div class="terms-conditions-title">
      15. YOUR EQUIPMENT
    </div>
    <div class="terms-conditions-describe">
      <p>
        15.1 Your computer equipment or mobile device and internet connection may affect the performance and/or operation
        of the Website. {{ companyData?.name }} does not guarantee that the Website will operate without faults or errors
        or that {{ companyData?.name }} services will be provided without interruption. {{ companyData?.name }} does not
        accept any liability for any failures or issues that arise due to Your equipment, internet connection or internet
        or telecommunication service provider (including, for example, if You are unable to place bets or wagers or to
        view or receive certain information in relation to particular events).
      </p>
      <p>
        15.2 For customers using a mobile device for the placing of bets/wagers, please note that {{ companyData?.name }}
        will not be responsible for any damage to, or loss of data from the mobile device that the software is installed
        on, and will also not be responsible for any call, data or other charges incurred whilst using the software.
      </p>
      <p>
        15.3 Due to limited display sizes on mobile devices, the mobile experience might differ slightly from other
        platforms. Differences might include, but are not limited to, the location of certain information on the platform
        and game names not being visible on all game pages.
      </p>
    </div>

    <div class="terms-conditions-title">
      16. FAIR USE
    </div>
    <div class="terms-conditions-describe">
      <p>
        16.1 The Website and Services may only be used for recreational purposes by placing bets and wagers on events
        and/or gaming products.
      </p>
      <p>
        16.2 You must not use the Website for the benefit of a third party or for any purpose which is illegal,
        defamatory, abusive or obscene, or which {{ companyData?.name }} considers discriminatory, fraudulent, dishonest
        or inappropriate. {{ companyData?.name }} may report to the authorities any activity which it considers to be
        suspicious and/or in breach of this paragraph.
      </p>
      <p>
        16.3 If {{ companyData?.name }} has a reasonable suspicion that You are involved in fraudulent, dishonest or
        criminal acts, as set out under applicable laws, via or in connection with the Website or Services, {{
          companyData?.name }} may seek criminal and contractual sanctions against You. {{ companyData?.name }} will
        withhold payment to any customer where any of these are suspected or where the payment is suspected to be for the
        benefit of a third party.
      </p>
      <p>
        16.4 You shall indemnify and shall be liable to pay {{ companyData?.name }}, on demand, all costs, charges or
        losses sustained or incurred by us and our affiliates (including any direct, indirect or consequential losses,
        loss of profit and loss of reputation) in respect of all Claims arising directly or indirectly from Your
        fraudulent, dishonest or criminal acts while using the Website or Services
      </p>
      <p>
        16.5 Furthermore, we reserve the right not to accept, process and/or honour bets/wagers where it would be
        forbidden, unlawful or illegal under applicable law or regulation to do so.
      </p>
    </div>

    <div class="terms-conditions-title">
      17. SOFTWARE AND TECHNOLOGY ISSUES
    </div>
    <div class="terms-conditions-describe">
      <p>
        17.1 In order for You to use the Website and Services, You may need to download some software (for example,
        casino games that are made available via a flash player). Also, certain third party product providers may require
        You to agree to additional terms and conditions governing the use of their products that are available on or
        through the Website. If You do not accept those third party terms and conditions, do not use the relevant third
        party software. {{ companyData?.name }} does not accept any liability in respect of any third party software.
      </p>
      <p>
        17.2 You are only permitted to use any and all software made available to You via the Website for the purpose of
        using the Website and Services and, save to the extent permitted by applicable law, for no other purposes
        whatsoever.
      </p>
      <p>
        17.3 We hereby grant to You a personal, non-exclusive, non-transferable right to use the Website for the sole
        purpose of accessing and using the Services on the Website, in accordance with these Terms and Conditions. This
        right to use our Website and will be immediately terminated once Your user registration is cancelled for any
        reason, and specially, but not limited to, if You make use of that right with the aim of generating a parallel
        enterprise based in our Website or our products, or with the aim of making use of an automated service or software
        analysing, capturing or somehow using the information shown in our Website.
      </p>
      <p>17.4 You are not permitted to:</p>
      <p>
        a) install or load the software that forms part of the Website onto a server or other networked device or take
        other steps to make the software available via any form of "bulletin board", online service or remote dial-in or
        network to any other person;
      </p>
      <p>
        b) sub-license, assign, rent, lease, loan, transfer or copy (except as expressly provided elsewhere in these
        Terms and Conditions) Your right to use the Website, or the software that forms part of the Website, or make or
        distribute copies of same;
      </p>
      <p>
        c) enter, access or attempt to enter or access or otherwise bypass {{ companyData?.name }}’s security system or
        interfere in any way (including but not limited to, robots or similar devices) with the products or the Website or
        attempt to make any modifications to the software and/or any features or components thereof;
      </p>
      <p>d) copy or translate any user documentation provided 'online' or in electronic format.</p>
      <p>
        e) In addition, except to the minimum extent permitted by applicable law in relation to computer programs, You
        are not permitted to: (i) translate, reverse engineer, decompile, disassemble, modify, create derivative works
        based on, or otherwise modify the Website; or (ii) reverse engineer, decompile, disassemble, modify, adapt,
        translate, make any attempt to discover the source code of the software that forms part of the Website or to
        create derivative works based on the whole or on any part of the Website.
      </p>
      <p>
        17.5 You do not own the software that forms part of the Website. Such software is owned and is the exclusive
        property of {{ companyData?.name }} or a third party software provider company (any such third party provider, the
        "Software Provider"). Any software and accompanying documentation which have been licensed to {{ companyData?.name
        }} are proprietary products of the Software Provider and protected throughout the world by copyright law. Your use
        of the software does not give You ownership of any intellectual property rights in the software.
      </p>
      <p>
        17.6 The software is provided "as is" without any warranties, conditions, undertakings or representations,
        express or implied, statutory or otherwise. {{ companyData?.name }} hereby excludes all implied terms, conditions
        and warranties, including any of merchantability, merchantable quality, satisfactory quality and fitness for any
        particular purpose, completeness or accuracy of the services or the software or infringement of applicable laws
        and regulations. {{ companyData?.name }} does not warrant or condition that: (i) the software will meet Your
        requirements; (ii) the software will not infringe any third party’s intellectual property rights; (iii) the
        operation of the software will be error free or uninterrupted; (iv) any defects in the software will be corrected;
        or (v) the software or the servers are virus-free.
      </p>
      <p>
        17.7 In the event of communications or system errors occurring in connection with the settlement of accounts or
        other features or components of the software, neither {{ companyData?.name }} nor the Software Provider will have
        any liability to You or to any third party in respect of such errors. {{ companyData?.name }} reserves the right
        in the event of such errors to remove all relevant products from the Website and take any other action to correct
        such errors.
      </p>
      <p>
        17.8 You hereby acknowledge that how You use the software is outside of {{ companyData?.name }}’s control.
        Accordingly, You install and/or use the software at Your own risk. {{ companyData?.name }} will not have any
        liability to You or to any third party in respect of Your receipt of and/or use of the software.
      </p>
      <p>
        17.9 The software may include confidential information which is secret and valuable to the Software Provider
        and/or {{ companyData?.name }}. You are not entitled to use or disclose that confidential information other than
        strictly in accordance with these Terms and Conditions.
      </p>
      <p>
        17.10 {{ companyData?.name }} shall not be liable if for any reason the Website is unavailable at any time or for
        any period. We reserve the right to make changes or corrections to or to alter, suspend or discontinue any aspect
        of the Website and the content or services or products available through it, including Your access to it.
      </p>
      <p>
        17.11 You must not misuse the Website by introducing viruses, trojans, worms, logic bombs or other material which
        is malicious or technologically harmful. In particular, You must not access the Website without authority,
        interfere with, damage or disrupt the Website or any part of it, any equipment or network on which the Website is
        hosted, any software used in connection with the provision of the Website, or any equipment, software or website
        owned or used by a third party. You must not attack our Website via a denial-of-service attack. We will not be
        liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically
        harmful material that may infect Your computer equipment, computer programs, data or other proprietary material
        arising due to Your use of the Website, software or to Your downloading of any material posted on it, or on any
        website linked to it.
      </p>
    </div>

    <div class="terms-conditions-title">
      18. THIRD PARTY CONTENT
    </div>
    <div class="terms-conditions-describe">
      <p>
        18.1 {{ companyData?.name }} receives feeds, commentaries and content from a number of suppliers. Certain third
        party product providers may require You to agree to additional terms and conditions governing the use of their
        feeds, commentaries and content. If You do not accept the relevant third party terms and conditions, You agree to
        not use the relevant feeds, commentaries or content.
      </p>
      <p>
        18.2 {{ companyData?.name }} does not accept any liability in respect of any third party feeds, commentaries and
        content.
      </p>
      <p>
        18.3 Where the Website contains links to third party websites and resources, these links are provided for Your
        information only. {{ companyData?.name }} has no control over the content of these sites or resources, and accepts
        no liability for them or for any loss or damage that may arise from Your use of them. The inclusion of a link to a
        third party website does not constitute an endorsement of that third party’s website, product or services, if
        applicable.
      </p>
    </div>

    <div class="terms-conditions-title">
      19. ERRORS
    </div>
    <div class="terms-conditions-describe">
      <p>
        19.1 {{ companyData?.name }} will not be liable in the event You try to or obtain an advantage from any errors in
        respect of bets or wagers on the Website if You were deliberately acting in bad-faith, including where: (i) there
        is an obvious error in the relevant odds, spreads, handicap, totals, cash-out; (ii) {{ companyData?.name }}
        continues to accept bets or wagers on closed or suspended markets; (iii) {{ companyData?.name }} incorrectly
        calculates or pays a settlement amount, including where a bet is Cashed Out for the full settlement amount, or a
        bet is made void incorrectly, where ‘Void if player does not start’ was selected at bet placement; or (iv) any
        error occurs in a random number generator or pay tables included, incorporated or used in any game or product.
      </p>
    </div>

    <div class="terms-conditions-title">
      20. BREACH
    </div>
    <div class="terms-conditions-describe">
      <p>
        20.1 Without prejudice to any other rights, if a User breaches in whole or in part any provision contained
        herein, {{ companyData?.name }} reserves the right to take such action as it sees fit, including terminating this
        Agreement or any other agreement in place with the User and/or taking legal action against such User.
      </p>
      <p>
        20.2 You agree to fully indemnify, defend and hold harmless {{ companyData?.name }} and its shareholders,
        directors, agents and employees from and against all claims, demands, liabilities, damages, losses, costs and
        expenses, including legal fees and any other charges whatsoever, howsoever caused, that may arise as a result of:
      </p>
      <p>a) your breach of this Agreement, in whole or in part;</p>
      <p>b) violation by you of any law or any third party rights; and</p>
      <p>c) use by you of the Service.</p>
    </div>

    <div class="terms-conditions-title">
      21. LIMITATIONS AND LIABILITY
    </div>
    <div class="terms-conditions-describe">
      <p>
        21.1 Under no circumstances, including negligence, shall {{ companyData?.name }} be liable for any special,
        incidental, direct, indirect or consequential damages whatsoever (including, without limitation, damages for loss
        of business profits, business interruption, loss of business information, or any other pecuniary loss) arising out
        of the use (or misuse) of the Service even if {{ companyData?.name }} had prior knowledge of the possibility of
        such damages.
      </p>
      <p>
        21.2 Nothing in this Agreement shall exclude or limit {{ companyData?.name }}'s liability for death or personal
        injury resulting from its negligence.
      </p>
    </div>

    <div class="terms-conditions-title">
      22. INTELLECTUAL PROPERTY
    </div>
    <div class="terms-conditions-describe">
      <p>
        22.1 {{ companyData?.name }} and its licensors are the sole holders of all rights in and to the Service and code,
        structure and organisation, including copyright, trade secrets, intellectual property and other rights. You may
        not, within the limits prescribed by applicable laws: (a) copy, distribute, publish, reverse engineer, decompile,
        disassemble, modify, or translate the website; or (b) use the Service in a manner prohibited by applicable laws or
        regulations (each of the above is an "Unauthorised Use"). {{ companyData?.name }} reserves any and all rights
        implied or otherwise, which are not expressly granted to the User hereunder and retain all rights, title and
        interest in and to the Service. You agree that you will be solely liable for any damage, costs or expenses arising
        out of or in connection with the commission by you of any Unauthorized Use. You shall notify {{ companyData?.name
        }} immediately upon becoming aware of the commission by any person of any Unauthorised Use and shall provide {{
          companyData?.name }} with reasonable assistance with any investigations it conducts in light of the information
        provided by you in this respect.
      </p>
      <p>
        22.2 The term "{{ companyData?.name }}", its domain names and any other trade marks, or service marks used by {{
          companyData?.name }} as part of the Service (the "Trade Marks"), are solely owned by {{ companyData?.name }}. In
        addition, all content on the website, including, but not limited to, the images, pictures, graphics, photographs,
        animations, videos, music, audio and text (the "Site Content") belongs to {{ companyData?.name }} and is protected
        by copyright and/or other intellectual property or other rights. You hereby acknowledge that by using the Service,
        you obtain no rights in the Site Content and/or the Trade Marks, or any part thereof. Under no circumstances may
        you use the Site Content and/or the Trade Marks without {{ companyData?.name }}'s prior written consent.
        Additionally, you agree not to do anything that will harm or potentially harm the rights, including the
        intellectual property rights of {{ companyData?.name }}.
      </p>
    </div>

    <div class="terms-conditions-title">
      23. DISPUTES
    </div>
    <div class="terms-conditions-describe">
      <p>
        23.1 If a User wishes to make a complaint, please contact {{ companyData?.name }}'s customer service team at
        <a class="link-inline"><span>support@{{ companyData?.name.toLowerCase() }}.com</span>
          <BaseIcon name="uni-jump-page" />
        </a>
        . Should any dispute not be resolved to your satisfaction you may pursue remedies in the governing law
        jurisdiction set forth below.
      </p>
    </div>

    <div class="terms-conditions-title">
      24. AMENDMENT
    </div>
    <div class="terms-conditions-describe">
      <p>
        24.1 {{ companyData?.name }} reserves the right to update or modify this Agreement or any part thereof at any
        time or otherwise change the Service without notice and you will be bound by such amended Agreement upon posting.
        Therefore, we encourage you check the terms and conditions contained in the version of the Agreement in force at
        such time. Your continued use of the Service shall be deemed to attest to your agreement to any amendments to the
        Agreement.
      </p>
    </div>

    <div class="terms-conditions-title">
      25. GOVERNING LAW
    </div>
    <div class="terms-conditions-describe">
      <p>
        25.1 The Agreement and any matters relating hereto shall be governed by, and construed in accordance with, the
        laws of Curaçao. You irrevocably agree that, subject as provided below, the courts of Curaçao shall have exclusive
        jurisdiction in relation to any claim, dispute or difference concerning the Agreement and any matter arising
        therefrom and irrevocably waive any right that it may have to object to an action being brought in those courts,
        or to claim that the action has been brought in an inconvenient forum, or that those courts do not have
        jurisdiction. Nothing in this clause shall limit the right of {{ companyData?.name }} to take proceedings against
        you in any other court of competent jurisdiction, nor shall the taking of proceedings in any one or more
        jurisdictions preclude the taking of proceedings in any other jurisdictions, whether concurrently or not, to the
        extent permitted by the law of such other jurisdiction.
      </p>
    </div>

    <div class="terms-conditions-title">
      26. SEVERABILITY
    </div>
    <div class="terms-conditions-describe">
      <p>
        26.1 If a provision of this Agreement is or becomes illegal, invalid or unenforceable in any jurisdiction, that
        shall not affect the validity or enforceability in that jurisdiction of any other provision hereof or the validity
        or enforceability in other jurisdictions of that or any other provision hereof.
      </p>
    </div>

    <div class="terms-conditions-title">
      27. ASSIGNMENT
    </div>
    <div class="terms-conditions-describe">
      <p>
        27.1 {{ companyData?.name }} reserves the right to assign this agreement, in whole or in part, at any time
        without notice. The User may not assign any of his/her rights or obligations under this Agreement.
      </p>
    </div>

    <div class="terms-conditions-title">
      28. MISCELLANEOUS
    </div>
    <div class="terms-conditions-describe">
      <p>
        28.1 No waiver by {{ companyData?.name }} of any breach of any provision of this Agreement (including the failure
        of {{ companyData?.name }} to require strict and literal performance of or compliance with any provision of this
        Agreement) shall in any way be construed as a waiver of any subsequent breach of such provision or of any breach
        of any other provision of this Agreement.
      </p>
      <p>
        28.2 Nothing in this Agreement shall create or confer any rights or other benefits in favour of any third parties
        not party to this Agreement.
      </p>
      <p>
        28.3 Nothing in this Agreement shall create or be deemed to create a partnership, agency, trust arrangement,
        fiduciary relationship or joint venture between you and {{ companyData?.name }}.
      </p>
      <p>
        28.4 {{ companyData?.name }} may assign, transfer, charge, sub-license, or deal in any other manner with this
        Agreement, or sub-contract any of its rights and obligations under this Agreement, to any other party.
      </p>
      <p>
        28.5 This Agreement constitutes the entire understanding and agreement between you and {{ companyData?.name }}
        regarding the Service and supersedes any prior agreement, understanding, or arrangement between you and {{
          companyData?.name }}.
      </p>
    </div>

    <div class="terms-conditions-title">
      29. COMPLAINTS
    </div>
    <div class="terms-conditions-describe">
      <p>
        29.1 If you have a complaint to make regarding our services, you may contact our customer support via Live Chat or
        by email
        (<a class="link-inline"><span>support@{{ companyData?.name.toLowerCase() }}.com</span>
          <BaseIcon name="uni-jump-page" />
        </a>). We will endeavour to resolve the matter promptly.
      </p>
    </div>
  </div>
</template>

<style>
:root {
  --app-terms-theme-size: var(--tg-font-size-base);
  --app-terms-title-size: var(--tg-font-size-base);
  --app-terms-desc-size: var(--tg-font-size-default);
}
</style>

<style lang="scss" scoped>
.terms-conditions {
  max-height: 100%;
  text-align: left;
  border-radius: var(--tg-radius-default);
  transition: all 0.5s;

  .theme {
    margin: var(--tg-spacing-12) 0;
  }

  .terms-conditions-theme {
    color: var(--tg-text-white);
    font-size: var(--app-terms-theme-size);
    font-weight: var(--tg-font-weight-semibold);
  }

  .terms-conditions-title {
    color: var(--tg-text-white);
    font-size: var(--app-terms-title-size);
    font-weight: var(--tg-font-weight-semibold);
    margin: var(--tg-spacing-32) 0 var(--tg-spacing-8);
    line-height: 24px;
  }

  .terms-conditions-describe {
    color: var(--tg-secondary-light);
    font-size: var(--app-terms-desc-size);
    font-weight: 400;
    line-height: 21px;

    >p+p {
      margin-top: var(--tg-spacing-12);
    }
  }
}
</style>
