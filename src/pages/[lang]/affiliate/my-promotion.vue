<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('menu_title_my_promotion') })

const { isMobile } = storeToRefs(useWindowStore())
const location = useBrowserLocation()
const { data: proData, loading: loadMyData } = useRequest(ApiGetMyPro, { manual: false })

const baseQrRef = ref()
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
  // { label: 'Line', img: '/png/settings/social-line.png' },
  { label: 'X', img: '/png/settings/social-x.png' },
  { label: 'Gmail', img: '/png/settings/social-gmail.png' },
  // { label: 'Zalo', img: '/png/settings/social-zalo.png' },
  // { label: 'Viber', img: '/png/settings/social-viber.png' },
  // { label: 'WeChat', img: '/png/settings/social-wechat.png' },
]
const squareTabList = [
  {
    value: '1',
    label: t('finance_funds_transfer_sort_commission'),
  },
  {
    value: '2',
    label: t('performance'),
  },
  {
    value: '3',
    label: t('sub_bet'),
  },
]
const squareVal = ref('1')

const qrUrl = computed(() => `${location.value.origin}${proData.value?.link_url ?? ''}`)
const getSquareVal = computed(() => {
  return isMobile.value ? squareVal.value : '123'
})
const commission = computed(() => [
  { label: t('accu_commission'), value: proData.value?.commission?.accumulated ?? '' },
  { label: t('received_commission'), value: proData.value?.commission?.received ?? '' },
  {
    label: t('last_commission'),
    value: proData.value?.commission?.last_commission ?? '',
  },
])

const performance = computed(() => [
  {
    label: t('team_num'),
    value: `${proData.value?.performance?.team_num}${t('people')}`,
  },
  {
    label: t('direct_mem'),
    value: `${proData.value?.performance?.direct_num}${t('people')}`,
  },
  {
    label: t('other_mem'),
    value: `${proData.value?.performance?.other_num}${t('people')}`,
  },
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
  <div class="tg-affiliate-retention" :class="{ 'is-mobile': isMobile }">
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          {{ t('promo_info') }}
        </div>
      </div>
      <div
        class="item-content promotion-msg"
        :class="{ 'is-less-than-sm': isMobile }"
      >
        <div class="promotion-left">
          <BaseQrcode ref="baseQrRef" :url="qrUrl" :size="92" class="qr-code" />
          <p class="cursor-pointer" @click="downloadQr">
            {{ t('click_save_qr') }}
          </p>
        </div>
        <div class="link">
          <p>{{ t('my_link') }}</p>
          <!-- <AppCopyLine :msg="qrUrl" /> -->
          <div class="url-wrap">
            <span style="word-break: break-all;">{{ qrUrl }}</span>
            <AppTooltip
              style="display: inline-block;vertical-align: -6%;margin-left: 4px;"
              :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
            >
              <template #content>
                <BaseButton size="none" type="text" @click="application.copy(qrUrl)">
                  <BaseIcon name="uni-doc" />
                </BaseButton>
              </template>
            </AppTooltip>
          </div>
        </div>
        <div class="social-wrap" :class="{ 'is-less-than-sm': isMobile }">
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
    <BaseSquareTab v-if="isMobile" v-model="squareVal" :list="squareTabList" />
    <div v-show="getSquareVal.includes('1')" class="retention-item">
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
      <div class="item-content grid-wrap" :class="{ 'is-less-than-sm': isMobile }">
        <div v-for="(item, index) in commission" :key="index">
          <span>{{ item.label }} </span>
          <div class="yellow">
            <BaseSkeleton v-if="loadMyData" height="14px" animated="ani-opacity" />
            <AppAmount v-else :amount="item.value" currency-type="USDT" />
          </div>
        </div>
      </div>
    </div>
    <div v-show="getSquareVal.includes('2')" class="retention-item">
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
      <div class="item-content grid-wrap" :class="{ 'is-less-than-sm': isMobile }">
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
    <div v-show="getSquareVal.includes('3')" class="retention-item">
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
      <div class="item-content grid-wrap" :class="{ 'is-less-than-sm': isMobile }">
        <div v-for="(item, index) in bet" :key="index">
          <span>{{ item.label }} </span>
          <div :class="{ green: index === 2 }">
            <BaseSkeleton v-if="loadMyData" height="14px" animated="ani-opacity" />
            <span v-else-if="index === 1">{{ item.value }}</span>
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
  --tg-base-square-tab-font-weight: 400;
  --tg-base-square-tab-padding-top: 18px;
  --tg-base-square-tab-padding-y: 18px;
  >.retention-item~.retention-item {
    background-color: var(--tg-secondary-grey);
    padding: 0 24px 24px;
    border-radius: var(--tg-radius-default);
    .item-title {
      padding-left: 0;
    }
  }
  >div~div{
    margin-top: var(--tg-spacing-16);
  }
  .item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .promotion-msg{
    width: 100%;
    max-width: 768px;
    display: grid;
    grid-template-columns: 108px auto;
    gap: 16px 10%;
    background-color: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-default);
    padding: var(--tg-spacing-16);
    .promotion-left{
      grid-row-start: span 2;
    }
    &.is-less-than-sm{
      width: 100%;
      gap: 16px 16px;
      justify-items: stretch;
      .promotion-left{
        grid-row-start: auto;
      }
      .social-wrap{
        grid-column-start: span 2;
      }
      .url-wrap{
        flex: 1;
        display: block;
      }
    }
    .link{
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .url-wrap{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: none;
      color: var(--tg-text-white);
      background: var(--tg-secondary-main);
      border: 2px solid var(--tg-secondary-main);
      border-radius: var(--tg-radius-default);
      font-weight: var(--tg-font-weight-semibold);
      transition: all .25s;
      cursor: text;
      font-size: var(--tg-font-size-default);
      padding: var(--tg-spacing-7);
      line-height: 1.4;
      &:hover {
        border-color: var(--tg-text-grey);
      }
    }
    .promotion-left{
      text-align: center;
      .qr-code{
        margin-bottom: var(--tg-spacing-8);
      }
    }
    .social-wrap{
      display: flex;
      gap: var(--tg-spacing-12);
      justify-content: space-between;
      &.is-less-than-sm{
        display: grid;
        grid-template-columns: repeat(auto-fit, 54px);
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
  .grid-wrap{
    width: 100%;
    max-width: 660px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    &.is-less-than-sm{
      max-width: 100%;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
    > div{
      width: 100%;
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
.is-mobile{
  .item-title{
    display: none;
  }
  >.retention-item~.retention-item {
    background: none;
    padding: 0;
  }
}
</style>

<route lang="yaml">
</route>
