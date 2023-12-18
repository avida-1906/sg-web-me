<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Cookies Policy' })
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
