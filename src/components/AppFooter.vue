<script lang="ts" setup>
import type { EnumLanguageKeys } from '~/modules/i18n'
import type { EnumSportsOddsType } from '~/stores/sports'

const { t } = useI18n()

const router = useLocalRouter()
const {
  currentGlobalCurrency,
  exchangeRateData,
  companyData,
} = storeToRefs(useAppStore())
const languageStore = useLanguageStore()
const { userLanguage, AllLanguages } = storeToRefs(languageStore)
const sportStore = useSportsStore()
const { sportsOddsType, AllOddsTypes } = storeToRefs(sportStore)
const { appContentWidth } = storeToRefs(useWindowStore())

const { data: footerThirdData } = useRequest(ApiMemberBrandDetail, {
  manual: false,
  defaultParams: [
    {
      tag: 'bottom',
    },
  ],
})

const supportCurrency = [
  '/png/footer/ltc.png',
  '/png/footer/bitcoin.png',
  '/png/footer/ethereum.png',
  '/png/footer/tron.png',
  '/png/footer/ripple.png',
  '/png/footer/dogecoin.png',
  '/png/footer/bitcoin_cash.png',
  '/png/footer/tether.png',
  '/png/footer/safe_gamble.png',
  // '/png/footer/18plus.png',
]
const partner = [
  { url: '/png/footer/verified.png', with: '120px' },
  { url: '/png/footer/official.png', with: '146.45px' },
  { url: '/png/footer/main.png', with: '82.82px' },
  { url: '/png/footer/ufc.png', with: '151.5px' },
]

const rate = computed(() => {
  const temp = exchangeRateData.value?.rates
  const code = currencyConfig[currentGlobalCurrency.value]
  if (temp && temp['706'] && code)
    return temp[code.cur]['706'] ? formatWithSubstring(floor(+temp[code.cur]['706'], 2).toFixed(2)) : '1.00'
  return '1.00'
})

const connectData = computed(() => {
  if (!footerThirdData.value)
    return []

  const keys = Object.keys(footerThirdData.value)
  if (!keys.length)
    return []

  const _data: any[] = [
    { title: 'Facebook', icon: true },
    { title: 'Twitter', icon: true },
    { title: 'Instagram', icon: true },
    { title: 'YouTube', icon: true },
    { title: 'TikTok', icon: true },
    { title: 'Telegram', icon: true },
  ]

  keys.forEach((key) => {
    if (footerThirdData.value[key].state === false) {
      const index = _data.findIndex(item => item.title.toLowerCase() === key)
      if (index !== -1)
        _data.splice(index, 1)
    }
  })

  _data.forEach((item) => {
    item.path = footerThirdData.value[item.title.toLowerCase()].url
  })

  return _data
})

const menuData = computed(() => [
  {
    title: t('sports'),
    children: [
      { title: t('home_space_title'), path: `/sports/${SPORTS_PLAT_ID}` },
      { title: t('sports_status_live'), path: `/sports/${SPORTS_PLAT_ID}/live` },
      { title: t('sports_rule'), icon: false },
    ],
  },
  {
    title: t('casino'),
    children: [
      { title: t('game'), path: '/casino' },
      { title: t('vip_club'), path: '/vip-club' },
      { title: t('promo_activity'), path: '/promotions' },
    ],
  },
  {
    title: t('support'),
    children: [
      { title: t('fairness') },
      { title: t('affiliate') },
      { title: t('responsible_casino') },
      { title: t('gameble_aware'), icon: true },
      { title: t('online_support') },
      { title: t('help_center'), icon: true },
    ],
  },
  {
    title: t('community'),
    children: [
      { title: t('blog') },
      { title: t('chat_forum'), icon: true },
      ...connectData.value,
      { title: t('online_shopping'), icon: true },
    ],
  },
  {
    title: t('about_us'),
    children: [
      { title: t('privacy_policy') },
      { title: t('license') },
      { title: t('anti_money_laundering_rule') },
      { title: t('terms_of_service') },
      { title: t('self_exclusion') },
      { title: 'Primedice', icon: true },
    ],
  },
])

function selectChange(v: EnumLanguageKeys) {
  languageStore.changeLanguage(v)
}
function selectOddsChange(v: EnumSportsOddsType) {
  sportStore.setSportsOddsType(v)
}
function pathTo(tmp: { path?: string; title: string; icon?: boolean }) {
  if (tmp.path)
    router.push(replaceSportsPlatId(tmp.path))
}
</script>

<template>
  <div class="app-footer">
    <div class="footer-nav">
      <div v-for="item, index of menuData" :key="index" class="layout-spacing reset">
        <div class="nav-head">
          {{ item.title }}
        </div>
        <div v-for="tmp of item.children" :key="tmp.title" @click="pathTo(tmp)">
          {{ tmp.title }}<BaseIcon v-if="tmp.icon" name="uni-jump-page" />
        </div>
      </div>
      <div class="layout-spacing reset last-nav">
        <div class="nav-head">
          {{ t('language_title') }}
        </div>
        <div class="select-wrap">
          <BaseSelect
            :model-value="userLanguage"
            popper
            plain-popper-label
            :options="AllLanguages.map(a => ({ ...a, label: a.title }))"
            @select="selectChange"
          />
        </div>
        <div>{{ t('sports_odds_title') }}</div>
        <div class="select-wrap">
          <BaseSelect
            :model-value="sportsOddsType"
            popper
            plain-popper-label
            :options="AllOddsTypes.map(a => ({ ...a, label: a.title }))"
            @select="selectOddsChange"
          />
        </div>
      </div>
    </div>
    <BaseDivider />
    <div class="footer-support">
      <BaseImage
        v-for="url, index of supportCurrency"
        :key="index"
        style="margin: 0 auto;"
        width="133.33px"
        :url="url"
      />
      <BaseImage
        style="margin: 0 auto;"
        width="66.66px"
        url="/png/footer/18plus.png"
      />
    </div>
    <BaseDivider />
    <div class="footer-sponsor" :class="{ 'only-one': appContentWidth < 344 }">
      <BaseImage
        v-for="item, index of partner"
        :key="index"
        :width="item.with"
        :url="item.url"
      />
    </div>
    <BaseDivider />
    <div class="footer-copyright">
      <BaseLogo :static="false" />
      <div class="copy-right">
        © {{ companyData.copyright }} | {{ t('copyright') }}
      </div>
      <div>
        1 {{ currentGlobalCurrency }} = ${{ rate }}
      </div>
    </div>
    <div class="footer-description">
      {{ t('footer_description', { name: companyData.name, email: companyData.email }) }}
    </div>
    <div class="footer-description limit-width">
      <span>{{ t('support') }}</span>
      <span class="">{{ companyData.email }}</span> |
      <span>{{ t('partner') }}</span>
      <span>{{ companyData.partnerEmail }}</span> |
      <span>{{ t('media') }}</span>
      <span>{{ companyData.newsEmail }}</span>
    </div>
    <div class="center" style="gap: var(--tg-spacing-36)">
      <BaseImage
        width="32px"
        height="32px"
        url="/png/footer/rz_red.png"
      />
      <BaseImage
        width="28px"
        height="28px"
        url="/png/footer/rz_blue.png"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrap {
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
}
.app-footer {
  --tg-base-divider-bg-color: var(--tg-secondary-grey);
  /* background-color: #0F212E; */
  width: 100%;
  display: grid;
  grid-gap: 2rem;
  padding: 32px 0;
  .footer-nav{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(16ch,1fr));
    grid-gap: var(--tg-spacing-16);
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-normal);
    .layout-spacing{
      align-items: flex-start;
      gap: var(--tg-spacing-8);
    }
    .nav-head{
      font-size: var(--tg-font-size-base);
      font-weight: 500;
      color: var(--tg-text-white);
      margin-bottom: var(--tg-spacing-6);
    }
    .nav-head~div{
      cursor: pointer;
      font-weight: var(--tg-font-weight-semibold);
      white-space: nowrap;
      display: flex;
      align-items: center;
      font-size: var(--tg-font-size-default);
      .app-svg-icon {
        font-size: var(--tg-font-size-xs);
        margin-left: var(--tg-spacing-8);
        font-weight: var(--tg-font-weight-normal);
      }
      &:hover{
        --tg-icon-color: var(--tg-text-white);
        color: var(--tg-text-white);
      }
    }
    .last-nav{
      color:var(--tg-text-white);
      gap: var(--tg-spacing-14);
      .nav-head{
         margin-bottom: var(--tg-spacing-0);
      }
    }
  }
  .footer-support{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 32px;
  }
  .footer-sponsor{
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-gap: 26px 24px;
    grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
    justify-items: center;
  }
  .only-one{
    flex-direction: column;
    gap: 1.55rem;
  }
  .footer-copyright{
    width: 100%;
    display: grid;
    justify-content: center;
    justify-items: center;
    align-items: center;
    color: var(--tg-text-lightgrey);
    gap:0.5rem;
    font-size: var(--tg-font-size-default);
    line-height: 1.5;
  }
  .footer-description{
    line-height: 1.5;
    text-align: center;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-xs);
    span:nth-child(even) {
      color: var(--tg-text-white);
    }
  }
  .limit-width{
    display: flex;
    flex-wrap: wrap;
    gap: var(--tg-spacing-4);
    line-height: 1.375;
    margin: auto;
    text-align: left;
  }
}
</style>
