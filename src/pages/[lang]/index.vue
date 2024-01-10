<script setup lang="ts">
import { getCurrentLanguageForBackend } from '~/modules/i18n'

defineOptions({
  name: 'KeepAliveIndexHome',
})

const location = useBrowserLocation()
const width = 430
const { t } = useI18n()
const { isLogin, userInfo, companyData } = storeToRefs(useAppStore())
const router = useLocalRouter()
const { openRegisterDialog } = useRegisterDialog()
const { openSwiperNoticeDialog } = useDialogSwiperNotice(width)
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)
usePageTitle({
  prefix: t('index_title_prefix', { site: companyData.value?.name }),
  suffix: t('index_title_suffix'),
  isHost: false,
})

const {
  appContentWidth,
  widthBoundarySm,
} = storeToRefs(useWindowStore())
// const { openNoticeDialog } = useDialogNotice()

const hostSite = computed(() => (
  { host: location.value.hostname?.replace('www.', ''), site: companyData.value?.name }
))

// 公告弹框和跑马灯
const {
  data: noticeData,
  run: runMemberNoticeAllList,
  loading: memberNoticeAllListLoading,
} = useRequest(ApiMemberNoticeAllList, {
  onSuccess(data) {
    for (const item of data.notice)
      item.value = item.id
    data.notice.length > 0 && openSwiperNoticeDialog(data.notice)
  },
})

const btnText = computed(() => showMore.value ? t('view_less') : t('view_more_2'))

const isSm = computed(() => appContentWidth.value <= widthBoundarySm.value)

const onShowMore = function () {
  toggleShowMore()
}

function goVip() {
  router.push('/vip/promotion-bonus')
}

runMemberNoticeAllList()
</script>

<template>
  <div class="home-index" :class="{ 'is-mobile': isSm }">
    <!-- 头部 -->
    <div class="dark-background">
      <div class="top-wrapper">
        <div
          v-if="!isLogin"
          class="unauthenticated-wrapper" :class="{ 'is-mobile': isSm }"
        >
          <div class="unauthenticated-content">
            <h1>{{ t('wise_bet') }}</h1>
            <BaseButton
              bg-style="primary"
              round
              size="md"
              @click="openRegisterDialog"
            >
              <span class="register-text">{{ t('reg_now') }}</span>
            </BaseButton>
            <AppAuthLogin />
          </div>
        </div>
        <div
          v-else
          class="top-vip-info"
          :class="isSm ? 'is-mobile max-width-mobile' : 'max-width'"
        >
          <AppVipProgress>
            <template #title>
              <h1>{{ t('welcome_back') }}，{{ userInfo?.username }}</h1>
            </template>
            <p @click="goVip">
              {{ t('user_vip_pro') }} <BaseIcon name="uni-arrowright-line" />
            </p>
          </AppVipProgress>
        </div>
        <div v-if="isLogin ? !isSm : true" class="top-banner">
          <!-- <AppBanner :mode="isSm ? 'default' : 'home'" /> -->
          <BaseImage
            fit="cover"
            object-position="left center"
            url="/png/home/banner.png"
          />
        </div>
      </div>
    </div>
    <!-- 滚动（跑马灯）消息 -->
    <div
      v-if="!memberNoticeAllListLoading && noticeData?.marquee.length"
      class="mt-24"
    >
      <BaseNoticeBar>
        <template #prefix>
          <div style="padding: 0 20px;">
            <BaseIcon name="uni-speaker" />
          </div>
        </template>
        <template #default>
          <div style="display: flex;gap: 100px;">
            <span
              v-for="item of noticeData?.marquee"
              :key="item.id"
            >{{ item.content[getCurrentLanguageForBackend()] }}</span>
          </div>
        </template>
      </BaseNoticeBar>
    </div>
    <!-- 玩法类型 -->
    <div class="index-features">
      <div class="features-casino" @click="router.push('/casino')">
        <div class="features-title">
          <BaseIcon name="tabbar-game" />
          <span>{{ t('casino') }}</span>
        </div>
        <div class="features-image">
          <BaseImage url="/png/home/casino.png" class="base-img" />
        </div>
        <div class="features-content">
          <p>{{ t('most_advance_casino') }}</p>
          <p>
            {{ t('casino_index_description', hostSite) }}
          </p>
        </div>
        <div class="features-button">
          <BaseButton bg-style="primary" class="w-100" size="md">
            {{ t('go_casino') }}
          </BaseButton>
        </div>
      </div>
      <div
        class="features-sports"
        @click="router.push(`/sports/${getSportsPlatId()}`)"
      >
        <div class="features-title">
          <BaseIcon name="spt-basketball" />
          <span>{{ t('sports') }}</span>
        </div>
        <div class="features-image">
          <BaseImage url="/png/home/sports.png" class="base-img" />
        </div>
        <div class="features-content">
          <p>{{ t('best_sports') }}</p>
          <p>
            {{ t('sports_index_description') }}
          </p>
        </div>
        <div class="features-button">
          <BaseButton bg-style="primary" class="w-100" size="md">
            {{ t('go_sports') }}
          </BaseButton>
        </div>
      </div>
    </div>
    <!-- 加密货币 -->
    <!-- <div
      class="index-buy-cryptocurrency"
      :class="[isXs ? 'flex-wrap' : 'grid-wrap']"
    >
      <div>
        没加密货币？没问题。
      </div>
      <div
        class="icons"
        :class="[isSm ? 'h-22' : 'h-30', appContentWidth > 860 ? 'big' : 'small']"
      >
        <BaseIcon name="cryptocurrency-logo-1" class="w-50" />
        <BaseIcon name="cryptocurrency-logo-2" class="w-70" />
        <BaseIcon name="cryptocurrency-logo-3" class="w-75" />
        <BaseIcon name="cryptocurrency-logo-4" class="w-65" />
      </div>
      <div>
        <BaseButton size="md" @click="openWalletDialog">
          购买加密货币
        </BaseButton>
      </div>
    </div> -->
    <!-- 投注 -->
    <div class="index-bet">
      <AppBetData mode="home" />
    </div>
    <!-- 公司介绍 -->
    <div v-if="!isLogin" class="index-introduction" :class="{ 'max-height': showMore }">
      <div class="introduction-content" :class="{ 'column-count': !isSm }">
        <p>
          {{ t('company_intro_tip_1',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_2',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_3',
               hostSite) }}
        </p>
        <h1>{{ t('company_intro_tip_title_1', hostSite) }}</h1>
        <p>
          {{ t('company_intro_tip_4', hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_5',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_6',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_7', hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_8', hostSite) }}
        </p>

        <h1>{{ t('company_intro_tip_title_2', hostSite) }}</h1>
        <p>
          {{ t('company_intro_tip_9', hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_10',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_11',
               hostSite) }}
        </p>
        <h1>
          {{ t('company_intro_tip_title_3',
               hostSite) }}
        </h1>
        <p>
          {{ t('company_intro_tip_12',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_13',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_14',
               hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_15', hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_16', hostSite) }}
        </p>
        <h1>{{ t('company_intro_tip_title_4', hostSite) }}</h1>
        <p>
          {{ t('company_intro_tip_17', hostSite) }}
        </p>
        <ul>
          <li>{{ t('company_intro_tip_step_1') }}</li>
          <li>
            {{ t('company_intro_tip_step_2') }}
          </li>
          <li>{{ t('company_intro_tip_step_3') }}</li>
          <li>
            {{ t('company_intro_tip_step_4', hostSite) }}
          </li>
        </ul>
        <p>
          {{ t('company_intro_tip_18', hostSite) }}
        </p>
        <p>
          {{ t('company_intro_tip_19') }}
        </p>
        <p>
          {{ t('company_intro_tip_20', hostSite) }}
        </p>
      </div>
      <div class="introduction-more">
        <BaseButton @click="onShowMore">
          {{ btnText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-index{
  padding: 0 0 32px;
  .dark-background{
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: -2000px;
      right: -2000px;
      top: 0;
      bottom: 0;
      background: var(--tg-secondary-dark);
    }
    .top-wrapper{
      display: grid;
      position: relative;
      grid-template-columns: 40% 50%;
      grid-gap: 2rem;
      justify-content: space-between;
      // background-position: left 25% center;
      // background-size: auto 120%;
      // background-repeat: no-repeat;
      // @include getBackgroundImage('/home/abstract_bg');
      .unauthenticated-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        align-self: center;
        padding: var(--tg-spacing-32) 0;
        position: relative;
        z-index: 2;
        &.is-mobile {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          @include getBackgroundImage('/home/abstract_bg');
        }
        .unauthenticated-content{
          display: grid;
          grid-auto-flow: row;
          gap: var(--tg-spacing-16);
          h1{
            color: var(--tg-text-white);
            font-size: var(--tg-font-size-lg);
            font-weight: var(--tg-font-weight-bold);
            text-align: center;
            line-height: 1.5;
          }
          .register-text{
            width: 264px;

          }
        }
      }
      .top-vip-info{
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: var(--tg-font-size-default);
        position: relative;
        z-index: 1;
        --tg-vip-style-icon-size: var(--tg-font-size-base);
        &.max-width{
          max-width: 350px;
        }
        &.max-width-mobile{
          width: calc(100% - 2em);
          margin: 0 auto;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          @include getBackgroundImage('/home/abstract_bg');
        }
        padding-top: var(--tg-spacing-32);
        padding-bottom: var(--tg-spacing-64);
        h1{
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-lg);
          font-weight: var(--tg-font-weight-semibold);
          margin-bottom: var(--tg-spacing-16);
          line-height: 1.5;
        }
        p{
          font-size: var(--tg-font-size-default);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          transition: all .25s;
          cursor: pointer;
          > svg {
            margin-left: var(--tg-spacing-8);
          }
          &:hover{
            transform: translateX(8px);
          }
        }
      }
      .top-banner{
        position: relative;
        // padding: var(--tg-spacing-4) 0;
        &:before {
          content: "";
          height: 100%;
          width: 100%;
          right: 75%;
          position: absolute;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          // background-image: var(--image);
          @include getBackgroundImage('/home/abstract_bg');
          // z-index: -1;
        }
        img {
          height: 100%;
          -o-object-fit: cover;
          object-fit: cover;
          -o-object-position: left;
          object-position: left;
        }
      }
    }
  }
  .index-features{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin-top: var(--tg-spacing-24);
    grid-gap: 2rem;
    .features-casino,.features-sports{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      cursor: pointer;
      position: relative;
      &:hover{
        .features-image{
          .base-img{
            transform: translateY(-0.25rem);
          }
        }
      }
      .features-title{
        display: flex;
        justify-content: left;
        align-items: center;
        // position: absolute;
        z-index: 1;
        line-height: 27px;
        > span {
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-md);
          font-weight: var(--tg-font-weight-semibold);
          margin-left: var(--tg-spacing-8);
        }
        &:hover{
          --tg-icon-color:var(--tg-text-white);
        }
      }
      .features-image{
        .base-img{
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          -webkit-user-select: none;
          transition: all .25s;
          // border-radius: var(--tg-radius-default);
          --tg-base-img-style-radius: var(--tg-radius-default);
        }
      }
      .features-content{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        p:nth-child(1){
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-base);
          font-weight: var(--tg-font-weight-bold);
          line-height: 24px;
        }
        p:nth-child(2){
          color: var(--tg-text-lightgrey);
          margin-top: var(--tg-spacing-8);
          line-height: 21px;
          font-size: var(--tg-font-size-default);
        }
      }
      .features-button {
        .w-100{
          width: 100%;
        }
      }
    }
  }
  .grid-wrap{ // pc 布局
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(3,1fr);
    &.index-more{
      div:nth-child(2){
        justify-content: center;
        width: auto;
        > svg {
          width: 100%;
        }
      }
    }
  }
  .index-more{
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    margin-top: var(--tg-spacing-24);
    padding: 0 var(--tg-spacing-24);
    div:nth-child(1){
      display: flex;
      justify-content: flex-start;
    }
    div:nth-child(2){
      display: flex;
      align-items: center;
      height: 80px;
      > svg {
        height: 60%;
      }
    }
    div:nth-child(3){
      display: flex;
      justify-content: flex-end;
      img{
        height: 80px;
        width: auto;
      }
    }
  }
  .index-buy-cryptocurrency{
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    margin-top: var(--tg-spacing-24);
    padding: var(--tg-spacing-24);
    div:nth-child(1){
      font-size: var(--tg-font-size-base);
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
    }
    div:nth-child(2){
      display: flex;
      align-items: center;
      justify-content: center;
      > svg {
        &.w-50 {
          width: 48px;
        }
        &.w-70 {
          width: 70px;
        }
        &.w-75 {
          width: 75px;
        }
        &.w-65 {
          width: 65px;
        }
      }
      &.h-30{
        // gap: var(--tg-spacing-16);
        > svg {
          height: 30px;
        }
      }
      &.big {
        gap: var(--tg-spacing-24);
      }
      &.small {
        gap: var(--tg-spacing-16);
      }
    }
    div:nth-child(3){
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .index-bet{
    margin-top: var(--tg-spacing-24);
  }
  .index-introduction{
    margin-top: var(--tg-spacing-24);
    background: var(--tg-secondary-dark);
    padding: var(--tg-spacing-16);
    width: 100%;
    color: var(--tg-text-lightgrey);
    position: relative;
    max-height: 250px;
    overflow: hidden;
    border-radius: 8px;
    &.max-height{
      max-height: 100%;
      .introduction-content::before{
        visibility: hidden;
      }
      .introduction-more{
        position: static;
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .introduction-content{
      &.column-count{
        column-count: 2;
        column-gap: 1.5rem;
      }
      &::before{
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: linear-gradient(
          0deg,
          var(--tg-secondary-dark) 0%,rgba(15,33,46,0) 100%
        );
      }
    }
    .introduction-more{
      position: absolute;
      z-index: 2;
      bottom: var(--tg-spacing-24);
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      margin-top: var(--tg-spacing-16);
    }
    h1{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-xl);
      margin-bottom: var(--tg-spacing-8);
      font-weight: var(--tg-font-weight-semibold);
    }
    p{
      margin-bottom: var(--tg-spacing-20);
      line-height: 24px;
    }
    a{
      font-weight: var(--tg-font-weight-semibold);
      &:hover{
        color: var(--tg-text-white);
      }
    }
    ul{
      list-style-type:disc;
      padding-left: var(--tg-spacing-32);
      p {
        margin: 0;
      }
      li{
        margin: var(--tg-spacing-4) 0;
      }
    }
  }
}
.pt-6{
  padding-top: var(--tg-spacing-6);
}
.is-mobile{
  .dark-background{
    &:before {
      // display: none;
    }
    .top-wrapper{
      grid-template-columns:100%;
      background:none;
      grid-gap: 0;
      .top-banner{
        padding: 0;
      }
    }
  }
  .index-features{
    grid-template-columns: none;
  }
}
// <888
.flex-wrap-reverse{
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    div:nth-child(2){
      justify-content: flex-start;
      width: 50%;
      > svg{
        width: 60%;
      }
    }
    div:nth-child(1){
      margin: auto 0;
    }
  }
.h-22{
  gap: var(--tg-spacing-4);
  > svg{
    height: 22px;
  }
}
// <768
.flex-wrap{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div:nth-child(1) {
    text-align: center;
  }
  div:nth-child(2) {
    justify-content: center;
    > svg{
      height: 22px;
    }
  }
  div:nth-child(3) {
    margin: 0 auto;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
