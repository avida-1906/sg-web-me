<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('menu_title_my_promotion') })

const {
  isLessThanSm,
  widthBoundaryMd,
  width,
  widthBoundarySm,
} = storeToRefs(useWindowStore())

const location = useBrowserLocation()
const { data: proData, loading: loadMyData } = useRequest(ApiGetMyPro, { manual: false })
// const proData = ref({
//   link_url: '/?uid=dsfoxuf223k3h42',
//   commission: {
//     accumulated: '999',
//     received: '999',
//     last_commission: '999',
//   },
//   performance: {
//     team_num: 2,
//     direct_num: 2,
//     other_num: 2,
//     performance_amount: '999',
//     direct_amount: '999',
//     other_amount: '999',
//   },
//   subordinate: {
//     valid_bet_amount: '999',
//     bet_num: 999,
//     net_amount: '999',
//   },
// })

const baseQrRef = ref()

const qrUrl = computed(() => `${location.value.origin}${proData.value?.link_url ?? ''}`)

// 921-975
const less975 = computed(() => {
  return width.value > 921 && width.value < widthBoundaryMd.value
})
// 921-768
const less921 = computed(() => {
  return width.value < 921 && width.value > widthBoundarySm.value
})

const socialData = [
  {
    label: 'Facebook',
    img: '/png/settings/social-facebook.png',
  },
  {
    label: 'WhatsApp',
    img: '/png/settings/social-whatsapp.png',
  },
  {
    label: 'Telegram',
    img: '/png/settings/social-telegram.png',
  },
  { label: 'Line', img: '/png/settings/social-line.png' },
  { label: 'X', img: '/png/settings/social-x.png' },
  { label: 'Zalo', img: '/png/settings/social-zalo.png' },
  { label: 'Viber', img: '/png/settings/social-viber.png' },
  { label: 'WeChat', img: '/png/settings/social-wechat.png' },
]

const commission = computed(() => [
  { label: t('accu_commission'), value: proData.value?.commission?.accumulated ?? '' },
  { label: t('received_commission'), value: proData.value?.commission?.received ?? '' },
  {
    label: t('last_commission'),
    value: proData.value?.commission?.last_commission ?? '',
  },
])

const performance = computed(() => [
  { label: t('team_num'), value: `${proData.value?.performance?.team_num}人` },
  { label: t('direct_mem'), value: `${proData.value?.performance?.direct_num}人` },
  { label: t('other_mem'), value: `${proData.value?.performance?.other_num}人` },
  {
    label: t('total_performance'),
    value: `${proData.value?.performance?.performance_amount}`,
  },
  {
    label: t('direct_performance'),
    value: `${proData.value?.performance?.direct_amount}`,
  },
  {
    label: t('other_performance'),
    value: `${proData.value?.performance?.other_amount}`,
  },
])

const bet = computed(() => [
  {
    label: t('total_effect_bets'),
    value: proData.value?.subordinate?.valid_bet_amount ?? '',
  },
  { label: t('total_bet_order'), value: proData.value?.subordinate?.bet_num ?? '' },
  {
    label: t('slash_win_lose_total'),
    value: proData.value?.subordinate?.net_amount ?? '',
  },
])

function downloadQr() {
  baseQrRef.value.downloadClick()
}
</script>

<template>
  <div class="tg-affiliate-retention">
    <div class="retention-item infos">
      <div class="item-title">
        <div class="title-left">
          {{ t('promo_info') }}
        </div>
        <!-- <div class="title-btn">
          <BaseButton type="text">
            {{ t('more') }}
          </BaseButton>
        </div> -->
      </div>
      <div
        class="item-content content-padding promotion-msg"
        :class="{
          'is-less-than-sm': isLessThanSm,
          'is-less-975': less975,
          'is-less-921': less921,
        }"
      >
        <div class="promotion-left">
          <BaseQrcode ref="baseQrRef" :url="qrUrl" :size="92" class="qr-code" />
          <p class="cursor-pointer" @click="downloadQr">
            {{ t('click_save_qr') }}
          </p>
        </div>
        <div class="promotion-right">
          <div class="link">
            <p>{{ t('my_link') }}</p>
            <AppCopyLine :msg="qrUrl" />
          </div>
          <div class="social-wrap" :class="{ 'is-less-than-sm': isLessThanSm }">
            <div v-for="(item, index) in socialData" :key="index" class="social">
              <BaseImage
                :url="item.img"
                width="28px"
                height="28px"
                class="promotion-base-image"
              />
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          {{ t('finance_funds_transfer_sort_commission') }}
        </div>
        <!-- <div class="title-btn">
          <BaseButton type="text" @click="$router.push('/affiliate/my-commission')">
            {{ t('more') }}
          </BaseButton>
        </div> -->
      </div>
      <div class="item-content grid-wrap" :class="{ 'is-less-than-sm': isLessThanSm }">
        <div v-for="(item, index) in commission" :key="index">
          <span>{{ item.label }} </span>
          <div class="yellow">
            <BaseSkeleton v-if="loadMyData" height="14px" animated="ani-opacity" />
            <AppAmount v-else :amount="item.value" currency-type="USDT" />
          </div>
        </div>
      </div>
    </div>
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          {{ t('performance') }}
        </div>
        <!-- <div class="title-btn">
          <BaseButton type="text" @click="$router.push('/affiliate/my-performance')">
            {{ t('more') }}
          </BaseButton>
        </div> -->
      </div>
      <div class="item-content grid-wrap" :class="{ 'is-less-than-sm': isLessThanSm }">
        <div v-for="(item, index) in performance" :key="index">
          <span>{{ item.label }} </span>
          <div>
            <BaseSkeleton v-if="loadMyData" height="14px" animated="ani-opacity" />
            <template v-else>
              <AppAmount v-if="index > 2" :amount="item.value" currency-type="USDT" />
              <span v-else> {{ item.value }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          {{ t('sub_bet') }}
        </div>
        <!-- <div class="title-btn">
          <BaseButton type="text" @click="$router.push('/affiliate/direct-bet')">
            {{ t('more') }}
          </BaseButton>
        </div> -->
      </div>
      <div class="item-content grid-wrap" :class="{ 'is-less-than-sm': isLessThanSm }">
        <div v-for="(item, index) in bet" :key="index">
          <span>{{ item.label }} </span>
          <div :class="{ green: index === 2 }">
            <BaseSkeleton v-if="loadMyData" height="14px" animated="ani-opacity" />
            <AppAmount v-else :amount="item.value" currency-type="USDT" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-affiliate-retention {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  > .retention-item+.retention-item {
    background-color: var(--tg-secondary-grey);
    padding: 0 24px 24px;
    border-radius: var(--tg-radius-default);
    .item-title {
      padding-left: 0;
    }
  }
  .retention-item{
    margin-bottom: var(--tg-spacing-12);
    .item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background-color: var(--tg-secondary-main);
      padding: 0 var(--tg-spacing-4) 0 var(--tg-spacing-16);
      border-radius: var(--tg-radius-default)  var(--tg-radius-default) 0 0;
      height: 36px;
      .title-left{
        font-weight: var(--tg-font-weight-semibold);
      }
      .title-btn{
        button{
          font-size: var(--tg-font-size-xs);
          font-weight: var(--tg-font-weight-normal);
        }
      }
    }
    .item-content{
      &.content-padding{
        padding: var(--tg-spacing-16);
      }
    }
    &.infos {
      .item-title, .promotion-msg {
        background: transparent;
      }
    }
  }
  .promotion-msg{
    display: flex;
    gap: var(--tg-spacing-50);
    background-color: var(--tg-primary-main);
    &.is-less-than-sm{
      flex-direction: column;
      gap: var(--tg-spacing-12);
    }
    &.is-less-975{
      gap: var(--tg-spacing-20);
    }
    &.is-less-921{
      .promotion-right{
        flex: 1;
      }
    }
    .promotion-left{
      text-align: center;
      .qr-code{
      margin-bottom: var(--tg-spacing-8);
    }
    }
    .promotion-right{
      flex: .8;
      padding-top: var(--tg-spacing-4);
      .link{
        p:nth-child(1){
          margin-bottom: var(--tg-spacing-6);
        }
      }
      .social-wrap{
        display: flex;
        gap: var(--tg-spacing-12);
        justify-content: space-between;
        margin-top: 14px;
        &.is-less-than-sm{
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .social{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--tg-spacing-8);
          font-size: var(--tg-font-size-xs);
          .promotion-base-image{
            width: 28px;
            height: 28px;
            --tg-base-img-style-radius: var(--tg-radius-default);
          }
        }
      }
    }
  }
  .grid-wrap{
    // background-color: var(--tg-secondary-main) !important;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    width: fit-content;
    &.is-less-than-sm{
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
      > div {
        width: auto;
      }
    }
    > div{
      width: 210px;
      background-color: var(--tg-secondary-dark);
      padding: var(--tg-spacing-16) var(--tg-spacing-16);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      line-height: 20px;
      flex-direction: column;
      border-radius: 8px;
      gap: 8px;
    }
  }
  .yellow{
    color: var(--tg-text-warn);
  }
  .green{
    color: var(--tg-primary-success);
  }
}
</style>

<route lang="yaml">
</route>
