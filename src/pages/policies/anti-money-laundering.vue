<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Anti-Money Laundering' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <div class="content-block pd-24">
    <h1>Anti-Money Laundering, Anti-Terrorist Financing statement</h1>
    <h2>1. Company Business Model</h2>
    <div class="p">
      Medium Rare N.V. (“Meibo” or the “Company”) is a company incorporated under Curaçao Law that was established in 2017 and operates the online casino
      www.Meibo.com
      under the licence n.º 1668/JAZ. Meibo presently supports users in more than 169 countries globally.
    </div>
    <div class="p">
      As part of its global operations, Meibo has established compliance measures commensurate with its services and products that are reasonably designed to deter and detect illicit activity on its platform. Such measures include onboarding and compliance screenings of its customers and transaction action-based controls.
    </div>
    <h2>2. Company Policy Statement</h2>
    <div class="p">
      Meibo is not a financial institution within the meaning of applicable law of Curaçao and is accordingly not directly subject to the statutes and regulations applicable to certain financial institutions, money transfer, or virtual asset service providers. However, in accordance with the 2016 Regulations for Anti-Money Laundering and Combating the Financing of Terrorism (“AML/CFT”) applicable for the Curaçao jurisdiction as provided by the Curaçao Gaming Control Board, Meibo expressly prohibits and rejects the use of Meibo products for any form of illicit activity, including money laundering, terrorist financing or trade sanctions violations, consistent with various national anti-money laundering (“AML”) laws, regulations and norms. Meibo continues to monitor norm setting parameters promulgated by the Financial Action Task Force (“FATF”) and certain gaming trade groups in addition to the Curaçao Gaming Control Board and will take necessary action as it deems appropriate to reflect changes in law.
    </div>
    <div class="p">
      Meibo’s intention is to follow global best practices in guarding against Meibo products being used to facilitate such activities. Those best practices include:
    </div>
    <ul>
      <li>
        <div class="p">
          Adoption of a written policy, and procedures and controls, reasonably designed to guard against money laundering, terrorist financing and trade sanctions violations;
        </div>
      </li>
      <li>
        <div class="p">
          Where appropriate, designation of a compliance officer to oversee the implementation of the policy, procedures and controls;
        </div>
      </li>
      <li>
        <div class="p">
          Provision of related education and training to relevant personnel; and
        </div>
      </li>
      <li>
        <div class="p">
          Independent reviews, monitoring and maintenance of the policy, procedures and controls.
        </div>
      </li>
    </ul>
    <h2>3. Definitions</h2>
    <div class="p">
      The following defined terms are widely used in the industry:
    </div>
    <div class="p">
      <span class="bold-txt">Money Laundering</span>: The process of making illegally-gained proceeds appear legal. This process is generally broken down into three steps: placement, layering and integration.
    </div>
    <div class="p">
      <span class="bold-txt">Placement</span>: The process of placing unlawful proceeds into traditional financial institutions, through deposits or other avenues.
    </div>
    <div class="p">
      <span class="bold-txt">Layering</span>: The process of separating proceeds of criminal activity from their origin through the use of layers of complex financial transactions, such as converting cash into traveler’s checks, money orders, wire transfers, letters of credit, stocks, bonds or purchasing assets.
    </div>
    <div class="p">
      <span class="bold-txt">Integration</span>: Using apparently legitimate transactions to disguise the illicit proceeds, allowing the laundered funds to be distributed back to the criminal; integrating the now clean money back into normal use.
    </div>
    <div class="p">
      <span class="bold-txt">Suspicious Activity</span>: Activity conducted by a user or non-user using the institution where there are indications that the persons engaging in the transaction may be doing so for fraudulent or illegal purposes.
    </div>
    <div class="p">
      <span class="bold-txt">Sanctions</span>: Sanctions are activities conducted by the international community to prohibit or constrain activities of the target of the sanctions.For example, they are used:
    </div>
    <ul>
      <li>
        <div class="p">
          To encourage a change in behaviour for a target country or regime;
        </div>
      </li>
      <li>
        <div class="p">
          To apply pressure on a target country to comply with set objectives;
        </div>
      </li>
      <li>
        <div class="p">
          As an enforcement tool when international peace and security has been threatened and diplomatic efforts have failed; or
        </div>
      </li>
      <li>
        <div class="p">
          To prevent and suppress the financing of terrorists or terrorist acts.
        </div>
      </li>
    </ul>
    <h2>4. Governance and Oversight</h2>
    <div class="p">
      Meibo has appointed a Chief Compliance Officer (“CCO”) that is responsible for coordinating the implementation of the AML Policy and policy program. The Chief Compliance Officer’s duties also include developing AML initiatives, work with other Meiboholders to revising the AML policy, assessing new regulatory requirements and investigate potentially suspicious or unusual activity. Meibo also provides AML training to all of its employees on a regular basis.
    </div>
    <h2>5. Know Your Customer and Transaction Monitoring</h2>
    <div class="p">
      Meibo will apply appropriate user due diligence and ongoing monitoring measures required by law. Meibo will endeavour to prevent users from engaging in illicit or otherwise unauthorised activity. Meibo uses a combination of its software development and other service agreements, which are enforced through internal operational features to ensure that it complies with the applicable law.
    </div>
    <h3>Know Your Customer</h3>
    <div class="p">
      A. Customer Due Diligence.
    </div>
    <div class="p">
      Meibo has adopted a risk based CDD to enable Meibo to understand the nature and purpose of the user relationship to the Meibo platform in order to develop a customer risk profile. In order to do so, Meibo collects certain documentary and non-documentary information at account-opening commensurate with the nature of the type account and services that Meibo offers. Meibo maintains different CDD for different accounts and services.
    </div>
    <div class="p">
      For instance, the CDD requires users go through Meibo’s customer identification program (“CIP”). The CIP consists of procedures for:
    </div>
    <ul>
      <li>
        <div class="p">
          Collecting baseline (e.g., wallet address, email address) information at account creation through Meibo’s user onboarding portal;
        </div>
      </li>
      <li>
        <div class="p">
          Monitoring the risk profile associated with the underlying cryptocurrency wallet used to fund the user’s account;
        </div>
      </li>
      <li>
        <div class="p">
          Maintaining records of the information used to identify the user; and
        </div>
      </li>
      <li>
        <div class="p">
          Determining if a user appears on any list of known or suspected terrorists or terrorist organisations provided to the financial institutions based on the above information.
        </div>
      </li>
    </ul>
    <div class="p">
      The above steps are operationalised using the following measures:
    </div>
    <ul>
      <li>
        <div class="p">
          Identity and Age Verification. A third-party service provider will support’s Meibo’s ability to determine the legitimacy of the identification information other KYC materials or information provided and will confirm that the user is permissible. The service provider also will confirm that the user does not appear to be located in a comprehensively-sanctioned or otherwise prohibited jurisdiction and will search global sanctions lists to confirm that the user does not appear thereon using onboarding information such as wallet addresses.
        </div>
      </li>
      <li>
        <div class="p">
          Customer Information. Meibo will collect details on each user to form a reasonable belief that Meibo knows the identity of its users commensurate with the user’s risk profile. For instance, Meibo may collect such details as the wallet address, name, address, country, date of birth, or postal code (collectively, “KYC Information”). Meibo will collect any of the above KYC Information prior to issuing a Meibo funding address (e.g., QR code) to users. Meibo does not presently allow users who are non-natural persons.Meibo may, at its own description rely on the performance by another institution of some or all of the elements of our CIP.
        </div>
      </li>
      <li>
        <div class="p">
          Geo-blocking for Prohibited Jurisdictions. Meibo will require contractual client certifications that, through IP address-based geo-blocking, no gaming services will be offered in countries where such activity is not permitted.
        </div>
      </li>
      <li>
        <div class="p">
          Geo-blocking for Sanctioned Jurisdictions. Meibo also will require contractual client certifications that such users are not subject to United States, European Union, or other global sanctions or watch lists, including individuals or entities associated with the United States’ comprehensively sanctioned jurisdictions, Iran, Cuba, North Korea, Syria and the Crimean region of Ukraine. Meibo will rely on various risk-based measures to verify these representations including as in the below-described know-your-user (“KYC”) measures and through IP address-based geo-blocking.
        </div>
      </li>
      <li>
        <div class="p">
          Contractual Prohibitions on Users Onboarding from Prohibited Jurisdictions. Users are notified at onboarding that Meibo does not offer services in restricted jurisdictions. Meibo’s policy on restricting user activity stems from a combination of its risk, fraud prevention, and AML standards, as well as any assessments associated with the permissibility of its services in certain jurisdictions.
        </div>
      </li>
    </ul>
    <div class="p">
      B. Enhanced Due Diligence and Ongoing Monitoring
    </div>
    <div class="p">
      Meibo performs ongoing monitoring on its users in order to detect any behaviours or indicators that might raise suspicions in regard to money laundering and terrorism financing practices. For that purpose, Meibo has implemented a set of red flag indicators that help it determine such behaviours and require further action from Meibo in assessing the customer information.
    </div>
    <div class="p">
      Whenever one of those red flags is triggered, the user account will be suspended and Meibo will pursue enhanced due diligence. Enhanced KYC diligence under this policy is deemed to include, but not limit to, the provision of:
    </div>
    <ul>
      <li>
        <div class="p">
          Full legal name;
        </div>
      </li>
      <li>
        <div class="p">
          Country of citizenship;
        </div>
      </li>
      <li>
        <div class="p">
          Permanent Address (which, for an individual, must be a residential or business street address, and for an entity, must be a principal place of business, local office or other physical location);
        </div>
      </li>
      <li>
        <div class="p">
          Identification number (either a taxpayer identification number, or, if unavailable, a passport number and country of issuance, alien identification card number or number and country of issuance of another government-issued document evidencing nationality or residence and bearing a photograph or similar safeguard);
        </div>
      </li>
      <li>
        <div class="p">
          Identification Document; and
        </div>
      </li>
      <li>
        <div class="p">
          Source of Funds and Source of Wealth.
        </div>
      </li>
    </ul>
    <div class="p">
      Meibo may use third party service provider to verify any of the above information as determined to establish a reasonable basis to know the true identity of the user where the user’s activity warrants such action.
    </div>
    <div class="p">
      C. Acceptance Policy
    </div>
    <div class="p">
      Meibo will not accept a and will block the users that:
    </div>
    <ul>
      <li>
        <div class="p">
          Do not provide the identification information requested by Meibo;
        </div>
      </li>
      <li>
        <div class="p">
          Provide fake identification documents;
        </div>
      </li>
      <li>
        <div class="p">
          Try to use different means to deceive about their location;
        </div>
      </li>
      <li>
        <div class="p">
          Are from restricted or prohibited jurisdictions; or
        </div>
      </li>
      <li>
        <div class="p">
          Are subjected to United States, European Union, or other global sanctions or watch lists;
        </div>
      </li>
      <li>
        <div class="p">
          Are gambling addicted or have mental health issues;
        </div>
      </li>
      <li>
        <div class="p">
          Its source of funds are originated or exchanges in restricted jurisdictions;
        </div>
      </li>
    </ul>
    <div class="p">
      Meibo reserves the right to block and suspend player for any other reasons at its own description
    </div>
    <h3>Transactions Monitoring</h3>
    <div class="p">
      Meibo is firmly committed to complying with economic and trade sanctions programs imposed by jurisdictions in which the firm conducts business. For that purpose Meibo established a transaction monitoring program with controls and processes to identify and detect any unusual activity in real time and in its ongoing monitoring.
    </div>
    <div class="p">
      Meibo will conduct ongoing monitoring on a regular basis using rule-based systems developed in-house and others from third-party vendors to review user history and patterns of activity to detect and report any unusual activity as required and to develop and implement any additional controls or limits in its platform.
    </div>
    <div class="p">
      Meibo implemented procedures addressing the following two key components of unusual or suspicious activity management:
    </div>
    <ul>
      <li>
        <div class="p">
          identification of unusual activity through methods of identification may include employee and customer identification, law enforcement inquiries, other referrals, or transaction and surveillance monitoring system reports; and
        </div>
      </li>
      <li>
        <div class="p">
          alert management that focuses on processes used to investigate, evaluate and document identified unusual or potentially suspicious activity.
        </div>
      </li>
    </ul>
    <div class="p">
      Meibo will use the following processes to achieve both goals:
    </div>
    <ul>
      <li>
        <div class="p">
          Transaction Monitoring for Sanctioned or Prohibited Jurisdictions. Meibo may in its reasonable discretion impose certain due diligence requests at user balance withdrawal. Meibo presently conducts a mixture of manual and automated transaction monitoring processes to identify “red flag” behaviour. Where such red flag behaviour is identified, Meibo may refuse to process any withdrawal attempts or collect additional information from the recipient. Meibo will further endeavour to limit any attempted user account funding from prohibited jurisdictions (which are identified in the Meibo user facing disclosures and updated from time to time internally) where the associated wallet address indicates that the user or the user’s funds are located in such a prohibited jurisdiction. For instance, Meibo may prohibit a user from funding their Meibo account using a known U.S. based exchange wallet as such assets indicate that the user is a U.S. person. Users will have the ability to rebut any suspension with additional information as part of Meibo’s ongoing transaction monitoring and user due diligence standards.
        </div>
      </li>
      <li>
        <div class="p">
          Screening for Sanctioned Parties. Prior to issuing a Meibo funding address to a user, Meibo will screen a user’s wallet address against applicable sanctions databases. Such screening measures will rely on third party blockchain forensics vendors such as Chainalysis. Meibo will periodically re-screen wallet addresses against such databases.
        </div>
      </li>
      <li>
        <div class="p">
          Identification of Unusual Activity. Meibo will monitor account activity for unusual size, volume, pattern or type of transactions, taking into account risk factors and red flags that are appropriate to its business. Monitoring will be conducted running regular reports of unusual, high risk, or suspicious user activity.
        </div>
      </li>
      <li>
        <div class="p">
          Anti-Mixing Measures.Meibo will utilise software designed to detect other suspicious deposit or withdrawal patterns. Such instances will be dealt with on a case-by-case basis, depending on the perceived level of risk. In such instances, a user may be required to explain their methodology and purpose for using the platform.
        </div>
      </li>
      <li>
        <div class="p">
          Chainalysis Review. Every single crypto deposit or withdrawal both indirect and direct will run through Chainalysis and reviewed for signs of fraud or suspicious behaviour. A user’s account will be suspended and reviewed upon alert of potential illicit behaviour. Sufficient proof of wealth may be requested from high-risk accounts. Meibo may refuse to withdraw to certain “high-risk” addresses as determined in consultation with Chainalysis risk scoring.
        </div>
      </li>
      <li>
        <div class="p">
          Withdrawal Threshold KYC. Additionally, and independently, every account, wherever or with whomever associated, will be suspended until adequate KYC diligence occurs once that account reaches a withdrawal threshold dependent on the accounts risk characterisation over the life of the account.
        </div>
      </li>
    </ul>
    <div class="p">
      D. Other Ongoing Monitoring Controls
    </div>
    <div class="p">
      Additionally to the above mentioned controlling procedures, Meibo has also implemented the following procedures to complement its know your customer and ongoing monitoring procedures:
    </div>
    <ul>
      <li>
        <div class="p">
          Ban Evasion Detection. In addition, Meibo will utilise third-party service provider software designed to detect the use by one user of multiple accounts. This software relies on detection of links between the same devices used to access multiple accounts. Such instances will be dealt with on a case-by-case basis, depending on the perceived level of risk. In such instances, a user may be required to explain their methodology and purpose for using the platform. Meibo accounts are funded by users using local (non-custodial) or hosted (custodial) wallets. In addition to a Chainalysis screening, Meibo monitors user activity within the Meibo platform and any withdrawals must meet Meibo’s and its third-party service provider’s verification processes. Meibo further prohibits peer-to-peer account transfers within the Meibo platform infrastructure. Any attempts to circumvent this restriction will be treated as a red flag.
        </div>
      </li>
      <li>
        <div class="p">
          Time Zone Monitoring. Meibo has implemented time zone controls that detects the users device information and crosses it with restricted jurisdiction to understand if they are trying to use geo location software to hide the jurisdictions where they are connecting from.
        </div>
      </li>
      <li>
        <div class="p">
          Products and Services Review. Meibo will establish additional procedures to avoid facilitating user attempts to exploit the Meibo platform. Meibo has a robust set of user-facing terms that users attest to in order to utilise the Meibo platform. Meibo will establish certain additional safeguards to mitigate against the risk of such misuse. For instance, Meibo may establish policies or procedures for limiting which user assets can be onboarded to the Meibo platform. Meibo lists the assets that are available for use on the Meibo platform. Meibo does not allow the use of anonymity enhancing technologies such as mixers, tumblers, or certain coins and tokens. Where Meibo becomes aware that an anonymity enhancing technology is being used on the Meibo platform, Meibo will disallow such use.
        </div>
      </li>
      <li>
        <div class="p">
          Vendor Management. Meibo works with reputable third-party service providers as part of its compliance infrastructure. Meibo will periodically assess the strength of its key third party service providers to determine if additional services are needed, the third-party service provider is not performing consistent with its contractual obligations, or if other remedial action is necessary for Meibo to comply with this policy. Meibo may request information from any third-party service provider as part of its vendor review process.
        </div>
      </li>
      <li>
        <div class="p">
          Compliance Innovation. In addition to vendor management, Meibo will continuously monitor any non documentary compliance mechanisms to determine their viability for the Meibo program. Meibo may run test or trial programs on a limited basis with such compliance vendors to determine the effectiveness of such programs. Blockchain native compliance tools include fraud prevention services, on-chain KYC providers, and other tools designed to reflect the technological features associated with blockchain platforms.
        </div>
      </li>
    </ul>
    <h2>6. Education and Training</h2>
    <div class="p">
      Meibo, with the assistance of its legal counsel and under the oversight of its CCO, may provide employees AML, anti-terrorist financing and trade sanctions compliance training on a periodic basis, as deemed appropriate.
    </div>
    <h2>7. Reporting</h2>
    <div class="p">
      Meibo is obliged to report any unusual or suspicious transactions, in accordance with the National Ordinance. Customers that are identified as being on a sanctions list, linked to money laundering or terrorism financing or other criminal activities will be reported as suspicious activity to the regulator.
    </div>
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
