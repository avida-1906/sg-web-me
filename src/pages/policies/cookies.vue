<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Cookies Policy' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const location = useBrowserLocation()
const { companyData } = storeToRefs(useAppStore())
const hostSite = computed(() => (
  { host: location.value.hostname?.replace('www.', '').toUpperCase(), site: companyData.value?.name.toUpperCase() }
))
</script>

<template>
  <div class="content-block pd-24">
    <h1>Cookies Policy</h1>
    <div class="p">
      This website uses cookies to better the users experience while visiting the website. Where applicable this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer / device. This complies with recent legislation requirements for websites to obtain explicit consent from users before leaving behind or reading files such as cookies on a user’s computer / device.
    </div>
    <div class="p">
      The cookies in use are described in the table below.
    </div>
    <div class="table-wrap">
      <div class="table-wrapper scroll-x">
        <table class="stripey animate slideDownOdd table">
          <thead>
            <tr>
              <th>
                <span>Cookies</span>
              </th>
              <th><span>Owner</span> </th><th><span>Duration</span> </th><th><span>Description</span> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span>SAPISID APISID SSID HSID SID</span></td>
              <td><span>Google</span></td>
              <td><span>2 years</span></td>
              <td><span>This cookie stores the preferences and other information of the user. These include, in particular, the preferred language, the number of search results to be displayed on the page, and the decision whether or not to activate Google's SafeSearch filter.</span></td>
            </tr>
            <tr>
              <td><span>SIDCC</span></td>
              <td><span>Google</span></td>
              <td><span>1 day</span></td>
              <td><span>Security cookie that protects user data from unauthorized access</span></td>
            </tr>
            <tr>
              <td><span>__Secure-3PSID __Secure-3PAPISID __Secure-1PAPISID __Secure-1PSID</span></td>
              <td><span>Google</span></td>
              <td><span>2 years</span></td>
              <td><span>Builds a profile of website visitor interests to show relevant and personalized ads through retargeting.</span></td>
            </tr>
            <tr>
              <td><span>__Secure-3PSIDCC __Secure-1PSIDCC</span></td>
              <td><span>Google</span></td>
              <td><span>1 year</span></td>
              <td><span>Builds a profile of website visitor interests to show relevant and personalized ads through retargeting.</span></td>
            </tr>
            <tr>
              <td><span>NID</span></td>
              <td><span>Google</span></td>
              <td><span>6 months</span></td>
              <td><span>Stores visitors’ preferences and personalizes ads on Google websites based on recent searches and interactions.</span></td>
            </tr>
            <tr>
              <td><span>_ga</span></td>
              <td><span>Google</span></td>
              <td><span>-</span></td>
              <td><span>This cookie is a Google Analytics persistent cookie which is used to distinguish unique users.</span></td>
            </tr>
            <tr>
              <td><span>1P_JAR</span></td>
              <td><span>Google</span></td>
              <td><span>1 week</span></td>
              <td><span>Based on recent searches and previous interactions, custom ads are shown on Google sites.</span></td>
            </tr>
            <tr>
              <td><span>MUID</span></td>
              <td><span>Bing.com</span></td>
              <td><span>1 month</span></td>
              <td><span>Microsoft User Identifier tracking cookie used by Bing Ads.</span></td>
            </tr>
            <tr>
              <td><span>_EDGE_S</span></td>
              <td><span>Bing.com</span></td>
              <td><span>-</span></td>
              <td><span>This cookie is used to retarget website visitors via Bing.</span></td>
            </tr>
            <tr>
              <td><span>OTZ</span></td>
              <td><span>Google</span></td>
              <td><span>1 month</span></td>
              <td><span>Links activities of website visitors to other devices that are previously logged in via the Google account. In this way, advertisements are tailored to different devices.</span></td>
            </tr>
            <tr>
              <td><span>_gid</span></td>
              <td><span>Google</span></td>
              <td><span>1 day</span></td>
              <td><span>This cookie is installed by Google Analytics. The cookie is used to store information of how visitors use a website and helps in creating an analytics report of how the website is doing. The data collected including the number visitors, the source where they have come from, and the pages visited in an anonymous form.</span></td>
            </tr>
            <tr>
              <td><span>_uetvid</span></td>
              <td><span>Bing.com</span></td>
              <td><span>1 year</span></td>
              <td><span>Used to track visitors on multiple websites, in order to present relevant advertisement based on the visitor's preferences.</span></td>
            </tr>
            <tr>
              <td><span>_uetsid</span></td>
              <td><span>Bing.com</span></td>
              <td><span>1 day</span></td>
              <td><span>Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement.</span></td>
            </tr>
            <tr>
              <td><span>fp_token_* io_token_*</span></td>
              <td><span>Iovation</span></td>
              <td><span>-</span></td>
              <td><span>Analytics and customer support.</span></td>
            </tr>
            <tr>
              <td><span>incap_ses_* visid_incap_*</span></td>
              <td><span>Optimove</span></td>
              <td><span>-</span></td>
              <td><span>Marketing purposes.</span></td>
            </tr>
            <tr>
              <td><span>intercom-id-* intercom-session-*</span></td>
              <td><span>Intercom</span></td>
              <td><span>-</span></td>
              <td><span>Customer support.</span></td>
            </tr>
            <tr>
              <td><span>mp_*_mixpanel</span></td>
              <td><span>Mixpanel</span></td>
              <td><span>-</span></td>
              <td><span>Marketing purposes.</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h2>Opt-out</h2>
    <div class="p">
      In order to provide website visitors with more choice on how data is collected by Google Analytics, Google has developed the Google Analytics Opt-out Browser Add-on. The add-on communicates with the Google Analytics JavaScript (ga.js) to stop data being sent to Google Analytics. The Google Analytics Opt-out Browser Add-on does not affect usage of the website in any other way. A link to further information on the Google Analytics Opt-out Browser Add-on is provided below for your convenience. http://tools.google.com/dlpage/gaoptout?hl=None
    </div>
    <div class="p">
      For more information on the usage of cookies by Google Analytics please see the Google website. A link to the privacy advice for this product is provided below for your convenience. http://www.google.com/analytics/learn/privacy.html
    </div>
    <h2>Disabling Cookies</h2>
    <div class="p">
      If you would like to restrict the use of cookies you can control this in your Internet browser. Links to advice on how to do this for the most popular Internet browsers are provided below for convenience and will be available for the Internet browser of your choice either online or via the software help (normally available via key F1).
    </div>
    <ul>
      <li>
        <div class="p">
          Internet Explorer – http://windows.microsoft.com/en-GB/windows7/Block-enable-or-allow-cookies
        </div>
      </li>
      <li>
        <div class="p">
          Google Chrome – https://support.google.com/chrome/bin/answer.py?hl=en-GB&answer=95647&p=cpn_cookies
        </div>
      </li>
      <li>
        <div class="p">
          Mozilla Firefox – http://support.mozilla.org/en-US/kb/Blocking%20cookies
        </div>
      </li>
      <li>
        <div class="p">
          Apple Safari – http://docs.info.apple.com/article.html?artnum=32467
        </div>
      </li>
      <li>
        <div class="p">
          Sportsradar - by visiting the relevant Sportradar Advertising Preferences.
        </div>
      </li>
    </ul>
    <h4>
      Contact & Communication
    </h4>
    <div class="p">
      Users contacting this website and/or its owners do so at their own discretion and provide any such personal details requested at their own risk. Your personal information is kept private and stored securely until a time it is no longer required or has no use, as detailed in the Data Protection Regulation. Every effort has been made to ensure a safe and secure form to email submission process but advise users using such form to email processes that they do so at their own risk.
    </div>
    <div class="p">
      This website and its owners use any information submitted to provide you with further information about the products / services they offer or to assist you in answering any questions or queries you may have submitted. This includes using your details to subscribe you to any email newsletter program the website operates but only if this was made clear to you and your express permission was granted when submitting any form to email process. Or whereby you the consumer have previously purchased from or enquired about purchasing from the company a product or service that the email newsletter relates to. This is by no means an entire list of your user rights in regard to receiving email marketing material. Depending on the products you choose to use, we may need to share your Personal Information with the third parties that provide those services (e.g. Sportsradar).
    </div>
    <div class="p">
      We will only transfer your Personal Data where:
    </div>
    <div class="p">
      • It is necessary for us to set up or fulfill a contract you have entered into with us.
    </div>
    <div class="p">
      • To comply with a legal or regulatory obligation.
    </div>
    <div class="p">
      • Where the recipient is bound by standard contractual clauses or binding corporate rules or any other acceptable method that ensures the protection of your personal information.
    </div>
    <div class="p">
      In some instances, we may be compelled by law to disclose your Personal Data to a third party and may have limited control over how it is protected by that party.
    </div>
    <div class="p">
      By creating an account with {{ hostSite.host }} you accept and understand that you are providing your consent to {{ hostSite.host }} transferring Personal Information for the purposes described in this policy.
    </div>
    <h2>External Links</h2>
    <div class="p">
      Although this website only looks to include quality, safe and relevant external links, users are advised adopt a policy of caution before clicking any external web links mentioned throughout this website.
    </div>
    <div class="p">
      The owners of this website cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
    </div>
    <h2>Social Media Platforms</h2>
    <div class="p">
      Communication, engagement and actions taken through external social media platforms that this website and its owners participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.
    </div>
    <div class="p">
      Users are advised to use social media platforms wisely and communicate / engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.
    </div>
    <div class="p">
      This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.
    </div>
    <h2>Shortened Links in Social Media</h2>
    <div class="p">
      This website and its owners through their social media platform accounts may share web links to relevant web pages.
    </div>
    <div class="p">
      Users are advised to take caution and good judgement before clicking any shortened urls published on social media platforms by this website and its owners. Despite the best efforts to ensure only genuine urls are published many social media platforms are prone to spam and hacking and therefore this website and its owners cannot be held liable for any damages or implications caused by visiting any shortened links.
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
.table {
  width: 100%;
}
.table td, .table th {
  padding: 16px;
  word-wrap: break-word;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  color: var(--tg-secondary-light);
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
}
.table th {
  font-weight: 600;
  color: var(--tg-text-white);
}
.table td {
  max-width: 300px;
}
.table td:last-child, .table th:last-child {
  text-align: right;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.table td:first-child, .table th:first-child {
  text-align: left;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.table.stripey.slideDownOdd>tbody tr:nth-child(odd) {
    background: var(--tg-secondary-grey);
}
</style>
