<script setup lang='ts'>
interface IBannerData {
  imgUrl: string
  title: string
  desc: string
  value: number
}

const { companyData } = storeToRefs(useAppStore())
const { t } = useI18n()
const {
  appContentWidth,
  widthBoundaryXs,
  widthBoundarySm,
} = storeToRefs(useWindowStore())

const bannerData = computed(() => {
  return [
    {
      imgUrl: '/png/vip-club/bespoke.png',
      title: 'Bespoke',
      desc: t('vip_banner_tip_1'),
      value: 1,
    },
    {
      imgUrl: '/png/vip-club/boost.png',
      title: t('booster_bonus'),
      desc: t('vip_banner_tip_2'),
      value: 2,
    },
    {
      imgUrl: '/png/vip-club/cashback.png',
      title: t('recent_game_perform_bonus'),
      desc: t('vip_banner_tip_3', { site: companyData.value?.name }),
      value: 3,
    },
    {
      imgUrl: '/png/vip-club/host.png',
      title: t('dedicated_vip_servicer'),
      desc: t('vip_banner_tip_4'),
      value: 4,
    },
    {
      imgUrl: '/png/vip-club/levelup.png',
      title: t('upgrade_bonus'),
      desc: t('vip_banner_tip_5'),
      value: 5,
    },
  ]
})

const dom = ref()
const offSet = ref(0)
const activeValue = ref(2)
const {
  bool: activeTransition,
  setTrue: setTransitionTrue,
  setFalse: setTransitionFalse,
} = useBoolean(false)
const sliderRef = ref<HTMLElement>()
const baseNumber = ref(0.3333)
const offSetNumber = ref(0)
const {
  bool: isDragging, setTrue:
  setDraggingTrue, setFalse:
  setDraggingFalse,
} = useBoolean(false)
const startPosition = ref(0)
const tempOffSet = ref(0)

const isXs = computed(() => appContentWidth.value < widthBoundaryXs.value)
const isSm = computed(() => {
  return appContentWidth.value < widthBoundarySm.value
  && appContentWidth.value > widthBoundaryXs.value
})
const mergeBannerData = computed(() => {
  return [...bannerData.value, ...bannerData.value, ...bannerData.value]
})
const cardWidth = computed(() => {
  return Number((appContentWidth.value * baseNumber.value).toFixed(2))
})
const sliderWidth = computed(() => cardWidth.value * 15)
const offSetInit = computed(() => cardWidth.value * 5)

// 左
const onPrev = throttle(() => {
  offSet.value = Number((offSet.value + cardWidth.value).toFixed(2))
  if (activeValue.value === 1)
    activeValue.value = 6
  setTransitionTrue()
  activeValue.value--
  if (offSet.value === -cardWidth.value) {
    setTimeout(() => {
      offSet.value = -(Number((cardWidth.value * 6).toFixed(2)))
    }, 900)
  }
  setTimeout(() => {
    setTransitionFalse()
  }, 800)
  offSetNumber.value = Math.abs(
    Number((offSet.value / cardWidth.value).toFixed()))
}, 1000, { leading: true, trailing: false })
// 右
const onNext = throttle(() => {
  offSet.value = Number((offSet.value - cardWidth.value).toFixed(2))
  if (activeValue.value === 5)
    activeValue.value = 0
  setTransitionTrue()
  activeValue.value++
  if (offSet.value === -(Number((cardWidth.value * 9).toFixed(2)))) {
    setTimeout(() => {
      offSet.value = -(Number((cardWidth.value * 4).toFixed(2)))
    }, 900)
  }
  setTimeout(() => {
    setTransitionFalse()
  }, 800)
  offSetNumber.value = Math.abs(
    Number((offSet.value / cardWidth.value).toFixed()))
}, 1000, { leading: true, trailing: false })
// 点击图片切换
const change = function (item: IBannerData) {
  if (isSm.value || isXs.value)
    return
  if (item.value < activeValue.value) {
    if (item.value === 1 && activeValue.value !== 2)
      onNext()
    else
      onPrev()
  }
  else if (item.value > activeValue.value) {
    if (item.value === 5 && activeValue.value !== 4)
      onPrev()
    else
      onNext()
  }
}
// 触碰
const onTouchstart = throttle((e: TouchEvent) => {
  dom.value.addEventListener('wheel', preventScroll)
  setDraggingTrue()
  startPosition.value = e.touches[0].clientX
  tempOffSet.value = offSet.value
}, 1000, { leading: true, trailing: false })
// 移动
const onTouchMove = function (e: TouchEvent) {
  if (!isDragging.value)
    return
  const currentPosition = e.touches[0].clientX
  offSet.value = tempOffSet.value + (currentPosition - startPosition.value)
}
// 抬起
const onTouchEnd = throttle((e: TouchEvent) => {
  dom.value.removeEventListener('wheel', preventScroll)
  setDraggingFalse()
  const currentPosition = e.changedTouches[0].clientX
  offSet.value = tempOffSet.value
  if (startPosition.value > currentPosition)
    onNext()
  else if (startPosition.value < currentPosition)
    onPrev()
}, 1000, { leading: true, trailing: false })

function preventScroll(event: any) {
  event.preventDefault()
}

watch(() => isSm.value, () => {
  if (isSm.value)
    baseNumber.value = 0.5
  else if (!isSm.value && !isXs.value)
    baseNumber.value = 0.3333
}, { immediate: true })
watch(() => isXs.value, () => {
  if (isXs.value)
    baseNumber.value = 1
  else if (!isSm.value && !isXs.value)
    baseNumber.value = 0.3333
}, { immediate: true })
watch(() => appContentWidth.value, () => {
  offSet.value = -Number(
    Math.abs(offSetNumber.value * cardWidth.value).toFixed(2))
})

onMounted(() => {
  dom.value = document.getElementById('main-content-scrollable')
  setTimeout(() => {
    offSet.value = -offSetInit.value
    offSetNumber.value = Math.abs(
      Number((offSet.value / cardWidth.value).toFixed()))
  }, 0)
  // 滑动
  sliderRef.value?.addEventListener('touchstart', onTouchstart)
  sliderRef.value?.addEventListener('touchmove', onTouchMove)
  sliderRef.value?.addEventListener('touchend', onTouchEnd)
})
onUnmounted(() => {
  sliderRef.value?.removeEventListener('touchstart', onTouchstart)
  sliderRef.value?.removeEventListener('touchmove', onTouchMove)
  sliderRef.value?.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <div class="app-banner-unlimited">
    <div class="banner-wrap">
      <div ref="sliderRef" class="slider-wrap">
        <div
          class="slider"
          :style="{
            transform: `translate(${offSet}px, 0px)`,
            width: `${sliderWidth}px`,
          }"
          :class="{ 'is-transition': activeTransition }"
        >
          <div
            v-for="item in mergeBannerData"
            :key="item.value"
            class="slider-item"
            :class="{
              'active': item.value === activeValue && !isSm && !isXs,
              'active-sm': isSm,
              'active-xs': isXs,
            }"
            :style="{ width: `${cardWidth}px` }"
            @click.stop="change(item)"
          >
            <div class="item-box">
              <div class="item-img">
                <BaseImage :url="item.imgUrl" />
              </div>
              <p class="item-title">
                {{ item.title }}
              </p>
              <p class="item-desc">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
        <div class="slider-btn">
          <div class="button prev" @click="onPrev">
            <BaseIcon name="uni-arrow-left" />
          </div>
          <div class="button next" @click="onNext">
            <BaseIcon name="uni-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-banner-unlimited{
  .banner-wrap{
    width: 100%;
    max-width: 1200px;
    overflow: hidden;
    .slider-wrap{
      width: 100%;
      min-height: 430px;
      position: relative;
      .slider{
        display: flex;
        position: relative;
        overflow-x: auto;
        // width: 6000px;
        &.is-transition {
          transition: all .8s;
        }
        .slider-item{
          // width: 400px;
          min-height:430px;
          transform: scale(.85);
          transition: transform .7s ease,opacity 1s ease;
          .item-box{
            height: 100%;
            padding: var(--tg-spacing-16) var(--tg-spacing-28);
            background-color: var( --tg-secondary-dark);
            border-radius: var(--tg-radius-md);
            margin: 0 var(--tg-spacing-7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: .5rem;
          }
          &.active{
            transform: scale(1);
            .item-box{
              background-color: var(--tg-secondary-grey);
            }
          }
          &.active-sm{
            transform: scale(1);
            margin: 0 var(--tg-spacing-16);
            .item-box{
              background-color: var(--tg-secondary-grey);
            }
          }
          &.active-xs{
            transform: scale(1);
            margin: var(--tg-spacing-16);
            .item-box{
              background-color: var(--tg-secondary-grey);
            }
          }
          .item-img{
            width: 160px;
            height: 160px;
            margin: var(--tg-spacing-40) 0 var(--tg-spacing-32);
          }
          .item-title{
            line-height: 1.3;
            font-size: var(--tg-font-size-lg);
            color: var(--tg-text-white);
            font-weight: var(--tg-font-weight-semibold);
            text-align: center;
          }
          .item-desc{
            padding: 0 var(--tg-spacing-40);
            margin-top: var(--tg-spacing-8);
            line-height: 1.5;
            text-align: center;
            color: var(--tg-text-lightgrey);
          }
        }
      }
      .slider-btn{
          .button{
            width: 16px;
            height: 16px;
            position: absolute;
            top:0;
            bottom: 0;
            margin: auto;
            transition: all .2s;
            cursor: pointer;
            font-size: var(--tg-font-size-base);
            &:hover{
              transform: scale(1.2);
              --tg-icon-color:var(--tg-text-white);
            }
          }
          .next{
            right: 0;
          }
        }

    }
  }
}
</style>
