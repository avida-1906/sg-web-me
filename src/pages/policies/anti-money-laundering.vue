<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Anti-Money Laundering' })
</script>

<template>
  <div class="content-block pd-24">
    <h1>Anti-Money Laundering, Anti-Terrorist Financing statement</h1>
    <h2>1. Company Business Model</h2>
    <div class="p">
      Medium Rare N.V. (“Stake” or the “Company”) is a company incorporated under Curaçao Law that was established in 2017 and operates the online casino
      www.stake.com
      under the licence n.º 1668/JAZ. Stake presently supports users in more than 169 countries globally.
    </div>
    <div class="p">
      As part of its global operations, Stake has established compliance measures commensurate with its services and products that are reasonably designed to deter and detect illicit activity on its platform. Such measures include onboarding and compliance screenings of its customers and transaction action-based controls.
    </div>
    <h2>2. Company Policy Statement</h2>
    <div class="p">
      Stake is not a financial institution within the meaning of applicable law of Curaçao and is accordingly not directly subject to the statutes and regulations applicable to certain financial institutions, money transfer, or virtual asset service providers. However, in accordance with the 2016 Regulations for Anti-Money Laundering and Combating the Financing of Terrorism (“AML/CFT”) applicable for the Curaçao jurisdiction as provided by the Curaçao Gaming Control Board, Stake expressly prohibits and rejects the use of Stake products for any form of illicit activity, including money laundering, terrorist financing or trade sanctions violations, consistent with various national anti-money laundering (“AML”) laws, regulations and norms. Stake continues to monitor norm setting parameters promulgated by the Financial Action Task Force (“FATF”) and certain gaming trade groups in addition to the Curaçao Gaming Control Board and will take necessary action as it deems appropriate to reflect changes in law.
    </div>
    <div class="p">
      Stake’s intention is to follow global best practices in guarding against Stake products being used to facilitate such activities. Those best practices include:
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
      Stake has appointed a Chief Compliance Officer (“CCO”) that is responsible for coordinating the implementation of the AML Policy and policy program. The Chief Compliance Officer’s duties also include developing AML initiatives, work with other stakeholders to revising the AML policy, assessing new regulatory requirements and investigate potentially suspicious or unusual activity. Stake also provides AML training to all of its employees on a regular basis.
    </div>
    <h2>5. Know Your Customer and Transaction Monitoring</h2>
    <div class="p">
      Stake will apply appropriate user due diligence and ongoing monitoring measures required by law. Stake will endeavour to prevent users from engaging in illicit or otherwise unauthorised activity. Stake uses a combination of its software development and other service agreements, which are enforced through internal operational features to ensure that it complies with the applicable law.
    </div>
    <h3>Know Your Customer</h3>
    <div class="p">
      A. Customer Due Diligence.
    </div>
    <div class="p">
      Stake has adopted a risk based CDD to enable Stake to understand the nature and purpose of the user relationship to the Stake platform in order to develop a customer risk profile. In order to do so, Stake collects certain documentary and non-documentary information at account-opening commensurate with the nature of the type account and services that Stake offers. Stake maintains different CDD for different accounts and services.
    </div>
    <div class="p">
      For instance, the CDD requires users go through Stake’s customer identification program (“CIP”). The CIP consists of procedures for:
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
ul {
  list-style-type: disc;
  padding-left: 32px;
  margin-bottom: 16px;
  li {
    margin: 4px 0;
  }
}
</style>
