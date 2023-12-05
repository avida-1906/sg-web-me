<script lang="ts" setup>
import type { EnumSportsOddsType } from '~/stores/sports'
import type { EnumLanguage } from '~/utils/enums'

const { t } = useI18n()
const { VITE_SITE_NAME } = getEnv()

const router = useRouter()
const languageStore = useLanguageStore()
const { userLanguage, AllLanguages } = storeToRefs(languageStore)
const sportStore = useSportsStore()
const { sportsOddsType, AllOddsTypes } = storeToRefs(sportStore)
const { brandDetail } = storeToRefs(useAppStore())

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
  '/png/footer/18plus.png',
]
const partner = [
  { url: '/png/footer/verified.png', ratio: '120/59.63', with: '120px' },
  { url: '/png/footer/official.png', ratio: '146.44/60', with: '146.44px' },
  { url: '/png/footer/main.png', ratio: '82.81/60', with: '82.81px' },
  { url: '/png/footer/ufc.png', ratio: '151/60', with: '151px' },
]

const menuData = computed(() => {
  // brandDetail.value?.bottom.quick_jump.map(item )
  return [
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
        { title: 'Gameble Aware', icon: true },
        { title: t('online_support') },
        { title: t('help_center'), icon: true },
      ],
    },
    {
      title: t('community'),
      children: [
        { title: t('blog') },
        { title: t('chat_forum'), icon: true },
        { title: 'Facebook', icon: true },
        { title: 'Twitter', icon: true },
        { title: 'Instagram', icon: true },
        { title: 'Youtube', icon: true },
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
  ]
})

function selectChange(v: EnumLanguage) {
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
      <BaseAspectRatio
        v-for="url, index of supportCurrency"
        :key="index"
        ratio="116/35"
        width="133.33px"
      >
        <BaseImage :url="url" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-sponsor">
      <BaseAspectRatio
        v-for="item, index of partner"
        :key="index"
        :ratio="item.ratio"
        :width="item.with"
      >
        <BaseImage :url="item.url" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-copyright">
      <BaseLogo />
      <div class="copy-right">
        © 2023 {{ VITE_SITE_NAME }}.com | {{ t('copyright') }}
      </div>
      <div>1 USDT = US$1.00</div>
    </div>
    <div class="footer-description">
      {{ t('footer_desc',
           { email: `support@${VITE_SITE_NAME}.com`, site: VITE_SITE_NAME }) }}
    </div>
    <div class="footer-description">
      {{ t('support') }}
      <span>support@{{ VITE_SITE_NAME }}.com</span> | {{ t('partner') }}
      <span>partners@{{ VITE_SITE_NAME }}.com</span> | {{ t('media') }}
      <span>press@{{ VITE_SITE_NAME }}.com</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrap {
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
}
.app-footer {
  /* background-color: #0F212E; */
  width: 100%;
  display: grid;
  grid-gap: 2rem;
  padding: 32px 0;
  .footer-nav{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(14ch,1fr));
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
    gap:2rem;
  }
  .footer-sponsor{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap:3.575rem;
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
    width: 100%;
    line-height: 1.5;
    text-align: center;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-xs);
    span {
      color: var(--tg-text-white);
    }
  }
}
</style>
