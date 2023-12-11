<script setup lang="ts">
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  mode?: 'home' | 'default'
  type?: 'casino' | 'sports'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
  type: 'casino',
})

const router = useRouter()
const { bool: showLeft, setBool: setShowLeftBool } = useBoolean(false)
const { bool: showRight, setBool: setShowRightBool } = useBoolean(true)
const { isMobile, appContentWidth } = storeToRefs(useWindowStore())
const {
  runAsync: runMemberBannerList,
  data: bannerList,
} = useRequest(ApiMemberBannerList, {
  onSuccess(data) {
    data.length <= 3 && setShowRightBool(false)
  },
})

const scrollRef = ref()

const getGridAutoColumns = computed(() => {
  if (props.mode === 'home') {
    return { 'grid-auto-columns': '100%' }
  }
  else {
    if (appContentWidth.value > 1024)
      return { 'grid-auto-columns': '33.33%' }

    else if (appContentWidth.value > 600)
      return { 'grid-auto-columns': '48.75%' }

    else
      return { 'grid-auto-columns': bannerList.value?.length === 1 ? '100%' : '95.5%' }
  }
})

function scrollLeft() {
  scrollRef.value.scrollLeft -= scrollRef.value.offsetWidth
}
function scrollRight() {
  scrollRef.value.scrollLeft += scrollRef.value.offsetWidth
}
function handleScroll(event: Event) {
  const target = event.target as Element
  target.scrollLeft <= 0 ? setShowLeftBool(false) : setShowLeftBool(true)
  target.scrollLeft >= (target.scrollWidth - target.clientWidth - 1) ? setShowRightBool(false) : setShowRightBool(true)
}
function jumpToUrl(item: { type: number; url: string }) {
  /** 跳转类型 1-自定义 2-娱乐城 3-体育 4-优惠活动 5-联盟中心 */
  switch (item.type) {
    case 1:
      window.location.href = item.url
      break
    case 2:
      router.push('/casino')
      break
    case 3:
      router.push(`/sports/${getSportsPlatId()}`)
      break
    case 4:
      router.push('/promotions')
      break
    case 5:
      router.push('/affiliate/promotion-tutorial')
      break
  }
}

await application.allSettled([runMemberBannerList({
  banner_type: props.type === 'casino' ? '1' : '2',
})])
</script>

<template>
  <div
    v-if="bannerList?.length" class="app-banner"
    :class="[isMobile ? 'mt-12' : 'mt-24']"
  >
    <div
      ref="scrollRef"
      class="banner-scroll scroll-x hide-scrollbar"
      :style="getGridAutoColumns"
      @scroll="handleScroll"
    >
      <div
        v-for="item in bannerList"
        :key="item.id"
        class="banner-item"
        :style="{ padding: isMobile ? '0 4px' : '0 8px' }"
        @click="jumpToUrl({ type: item.jump_type, url: item.jump_url })"
      >
        <!-- <BaseAspectRatio class="banner-ratio" ratio="5/3"> -->
        <BaseImage :url="item.image_url[getCurrentLanguageForBackend()]" is-network />
        <div class="item-msg">
          <!-- <div class="msg-type">
              {{ t('promo_activity') }}
            </div>
            <div class="msg-title">
              75,000{{ t('promo_lottery_activity') }}
            </div>
            <div class="msg-tips">
              {{ t('weekly_share') }}$20,000美元奖金
            </div> -->
          <div
            v-if="item.image_info.button_state === 1"
            class="come-play"
            @click.stop="jumpToUrl({
              type: item.image_info.button_jump_type,
              url: item.image_info.button_jump_url,
            })"
          >
            {{ item.image_info.button_text }}
          </div>
        </div>
        <!-- </BaseAspectRatio> -->
      </div>
    </div>
    <template v-if="appContentWidth > 768">
      <div v-show="showLeft" class="arrow arrow-left">
        <BaseButton
          type="text"
          style="--tg-base-button-font-size:24px;" @click="scrollLeft"
        >
          <BaseIcon name="uni-arrow-left" />
        </BaseButton>
      </div>
      <div v-show="showRight" class="arrow arrow-right">
        <BaseButton
          type="text"
          style="--tg-base-button-font-size:24px;" @click="scrollRight"
        >
          <BaseIcon name="uni-arrow-right" />
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.app-banner {
  position: relative;
  margin-left: -4px;
  margin-right: -4px;
  .banner-scroll{
    width: 100%;
    display: grid;
    // gap: 10px;
    grid-auto-flow: column;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    --standard-lockup-shadow-offset: 6px;
    -webkit-mask:
    linear-gradient(
      90deg,transparent 0,
      var(--tg-secondary-deepdark)
      var(--standard-lockup-shadow-offset,15px),
      var(--tg-secondary-deepdark)
      calc(100% - var(--standard-lockup-shadow-offset,15px)),transparent 100%);

    .banner-item{
      position: relative;
      scroll-snap-align: start;
      cursor: pointer;
      .banner-ratio{
        border-radius: var(--tg-radius-md);
        overflow: hidden;
      }
      .item-msg{
        position: absolute;
        color: var(--tg-text-white);
        left: 8px;
        top: 0;
        min-width: 182px;
        height: 100%;
        padding: 16px;
        div+div{
          margin-top: 10px;
        }
        .msg-type{
          display: inline-block;
          vertical-align: middle;
          line-height: 1.5;
          color:var(--tg-secondary-grey);
          padding: 0 4px;
          font-size: var(--tg-font-size-xs);
          font-weight: 500;
          border-radius: var(--tg-radius-default);
          background:var(--tg-text-white);
        }
        .msg-title{
          font-size: var(--tg-font-size-lg);
          font-weight: var(--tg-font-weight-semibold);
        }
        .msg-tips{
          color:var(--tg-text-white);
          font-size: var(--tg-font-size-xs);
          font-weight: var(--tg-font-weight-normal);
          line-height: 1.5;
        }
        .come-play{
          position: absolute;
          bottom: 16px;
          min-width: 120px;
          min-height: 40px;
          text-align: center;
          border-radius: var(--tg-radius-default);
          padding: 11px 16px;
          line-height: 1.15;
          border: var(--tg-border-width-default) solid var(--tg-text-white);
          font-size: var(--tg-font-size-default);
          font-weight: 500;
          transition: var(--tg-transition);
          &:hover{
            background-color: #{rgba($color: var(--tg-color-white-rgb), $alpha: 0.1)};
          }
        }
      }
    }
  }
  &:hover .arrow{
    opacity: 1;
  }
  .arrow{
    position: absolute;
    top: 50%;
    opacity: 0;
    font-size: var(--tg-font-size-base);
    transform: translateY(-50%);
    transition: opacity 0.3s;
    --tg-icon-color:var(--tg-text-white);
  }
  .arrow-left{
    left: -30px;
  }
  .arrow-right{
    right: -30px;
  }
}
.mt-12{
  margin-top: 12px;
}
</style>
