<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Providers' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <div class="content-block pd-24">
    <h1>Provider Availability Policy</h1>
    <h2>1. Absolute Restriction</h2>
    <div class="p">
      NetEnt will not permit NetEnt Casino Games to be supplied to any entity that operates in any of the below jurisdictions (irrespective of whether or not NetEnt Casino Games are being supplied by the entity in that jurisdiction) without the appropriate licenses. Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark, Estonia, France, Italy, Latvia, Lithuania, Mexico, Portugal, Romania, Spain, Sweden, Switzerland, United Kingdom, United States of America.
    </div>
    <h2>2. Blacklisted Territories</h2>
    <div class="p">
      All NetEnt Casino Games may not be offered in the following territories: Afghanistan, Albania, Algeria, Angola, Australia, Bahamas, Botswana, Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark, Estonia, Ecuador, Ethiopia, France, Ghana, Guyana, Hong Kong, Italy, Iran, Iraq, Israel, Kuwait, Latvia, Lithuania, Mexico, Namibia, Nicaragua, North Korea, Pakistan, Panama, Philippines, Portugal, Romania, Singapore, Spain, Sweden, Switzerland, Sudan, Syria, Taiwan, Trinidad and Tobago, Tunisia, Uganda, United Kingdom, United States of America, Yemen, Zimbabwe.
    </div>
    <h2>3. Blacklisted Branded Games Territories</h2>
    <div class="p">
      The followed NetEnt Branded Games have some further restrictions in addition to the Blacklisted Territories set out above:
    </div>
    <ul>
      <li>
        <div class="p">
          i. In addition to the jurisdictions set out in paragraph 2, Planet of the Apes Video Slot must not be offered in the following territories: Azerbaijan, China, India, Malaysia, Qatar, Russia, Thailand, Turkey, Ukraine.
        </div>
      </li>
      <li>
        <div class="p">
          ii. In addition to the jurisdictions set out in paragraph 2, Vikings Video Slot must not be offered in the following jurisdictions: Azerbaijan, Cambodia, Canada, China, France, India, Indonesia, Laos, Malaysia, Myanmar, Papua New Guinea, Qatar, Russia, South Korea, Thailand, Turkey, Ukraine, United States of America.
        </div>
      </li>
      <li>
        <div class="p">
          iii. In addition to the jurisdictions set out in paragraph 2, Narcos Video Slot must not be offered in the following territories: Indonesia, South Korea.
        </div>
      </li>
      <li>
        <div class="p">
          iv. In addition to the jurisdictions set out in paragraph 2, Street Fighter Video Slot must not be offered in the following territories: Anguilla, Antigua and Barbuda, Argentina, Aruba, Barbados, Bahamas, Belize, Bermuda, Bolivia, Bonaire, Brazil, British Virgin Islands, Canada, Cayman Islands, China, Chile, Clipperton Island, Columbia, Costa Rica, Cuba, Curacao, Dominica, Dominican Republic, El Salvador, Greenland, Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Honduras, Jamaica, Japan, Martinique, Mexico, Montserrat, Navassa Island, Paraguay, Peru, Puerto Rico, Saba, Saint Barthelemy, Saint Eustatius, Saint Kitts and Nevis, Saint Lucia, Saint Maarten, Saint Martin, Saint Pierre and Miquelon, Saint Vincent and the Grenadines, South Korea, Suriname, Turks and Caicos Islands, United States of America, Uruguay, US Virgin Islands, Venezuela.
        </div>
      </li>
      <li>
        <div class="p">
          v. In addition to the jurisdictions set out in paragraph 2, Fashion TV Video Slot must not be offered in the following territories: Cuba, Jordan, Turkey, Saudi Arabia.
        </div>
      </li>
    </ul>
    <h4>4. Universal Monsters (Dracula, Creature from the Black Lagoon, Phantoms Curse and The Invisible Man) may only be played in the following territories:</h4>
    <div class="p">
      Andorra, Armenia, Azerbaijan, Belarus, Bosnia and Herzegovina, Georgia, Iceland, Liechtenstein, Moldova, Monaco, Montenegro, Norway, Russia, San Marino, Serbia, Ukraine, North Macedonia, Turkey, Austria, Cyprus, Finland, Germany, Greece, Hungary, Ireland, Luxembourg, Malta, Netherlands, Poland, Slovakia and Slovenia.
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
