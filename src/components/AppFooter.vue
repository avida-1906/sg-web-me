<script lang="ts" setup>
import type { EnumSportsOddsType } from '~/stores/sports'
import type { EnumLanguage } from '~/utils/enums'

const { t } = useI18n()

const router = useLocalRouter()
const languageStore = useLanguageStore()
const { userLanguage, AllLanguages } = storeToRefs(languageStore)
const sportStore = useSportsStore()
const { sportsOddsType, AllOddsTypes } = storeToRefs(sportStore)
const { brandDetail, companyData } = storeToRefs(useAppStore())

/**
 * 最后一栏语言和赔率显示状态
 */
const languageShowState = computed(() => {
  const langInfo = brandDetail.value?.bottom.quick_jump.find(item => item.id === '1')

  return {
    language: langInfo?.info.find(item => item.id === '1')?.content_state === 1,
    odds: langInfo?.info.find(item => item.id === '2')?.content_state === 1,
  }
})

const menuData = computed(() => {
  return brandDetail.value?.bottom.quick_jump.filter(
    item => item.id !== '1',
  ).map((item) => {
    return {
      title: item.name,
      children: item.info.map((tmp) => {
        return {
          title: tmp.name,
          path: tmp.jump_url,
          icon: router.isExternal(tmp.jump_url),
        }
      }),
    }
  })
})

/**
 * 合作伙伴
 */
const partnerData = computed(() => {
  const partner = brandDetail.value?.bottom.partner || {}
  const keys = Object.keys(partner)
  return keys
})

/**
 * 赞助商
 */
const sponsorData = computed(() => {
  const sponsor = brandDetail.value?.bottom.sponsor.data || []
  return sponsor.map((item) => {
    const [img, link] = item.split(',')
    return {
      img,
      link,
    }
  })
})

function selectChange(v: EnumLanguage) {
  languageStore.changeLanguage(v)
}
function selectOddsChange(v: EnumSportsOddsType) {
  sportStore.setSportsOddsType(v)
}
function pathTo(tmp: { path?: string; title: string; icon?: boolean }) {
  if (tmp.path)
    router.push(tmp.path)
}
</script>

<template>
  <div class="app-footer">
    <div class="footer-nav">
      <div v-for="item, index of menuData" :key="index" class="layout-spacing reset">
        <div class="nav-head">
          {{ item.title }}
        </div>
        <div
          v-for="tmp of item.children"
          :key="tmp.title"
          :title="JSON.stringify(item)"
          @click="pathTo(tmp)"
        >
          {{ tmp.title }}<BaseIcon v-if="tmp.icon" name="uni-jump-page" />
        </div>
      </div>
      <div class="layout-spacing reset last-nav">
        <template v-if="languageShowState.language">
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
        </template>
        <template v-if="languageShowState.odds">
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
        </template>
      </div>
    </div>
    <BaseDivider />
    <div class="footer-support">
      <BaseAspectRatio
        v-for="url, index of partnerData"
        :key="index"
        ratio="116/35"
        width="133.33px"
      >
        <div class="center">
          <AppImage
            :url="url"
            :style="{
              '--app-sport-image-error-icon-size': '40px',
            }"
            is-cloud
            err-icon="img-casino-error"
          />
        </div>
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-sponsor">
      <AppImage
        v-for="item, index of sponsorData"
        :key="index"
        :url="item.img"
        :style="{
          '--app-sport-image-error-icon-size': '40px',
        }"
        is-cloud
        err-icon="img-casino-error"
        width="auto"
        height="62px"
        @click="router.push(item.link)"
      />
    </div>
    <BaseDivider />
    <div class="footer-copyright">
      <BaseLogo />
      <div class="copy-right">
        © {{ companyData?.copyright }} | {{ t('copyright') }}
      </div>
      <div>1 USDT = US$1.00</div>
    </div>
    <div class="footer-description">
      {{ t('footer_desc',
           { email: `support@${companyData?.name}.com`, site: companyData?.name }) }}
    </div>
    <div class="footer-description">
      {{ t('support') }}
      <span>support@{{ companyData?.name }}.com</span> | {{ t('partner') }}
      <span>partners@{{ companyData?.name }}.com</span> | {{ t('media') }}
      <span>press@{{ companyData?.name }}.com</span>
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
    gap: 3.575rem;
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
