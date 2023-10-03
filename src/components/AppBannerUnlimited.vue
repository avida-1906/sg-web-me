<script setup lang='ts'>
interface IBannerData {
  imgUrl: string
  title: string
  desc: string
  value: number
}
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])
const bannerData = [
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/bespoke.732ab8da.png',
    title: 'Bespoke',
    desc: '与您的专属 VIP 服务代表合作，根据您的投注需求定制福利。',
    value: 1,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/boost.82696ea3.png',
    title: '助推奖金',
    desc: '您可以预期每周和每月根据您的游戏量获得奖金。玩得越多，获得的奖金就越多。',
    value: 2,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/cashback.246348a4.png',
    title: '近期游戏表现奖金',
    desc: '运气不佳？Stake 会在您每次升级时根据您的损失提供额外资金。',
    value: 3,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/host.2f60d1cc.png',
    title: '专属 VIP 服务代表',
    desc: '被分配一名将支持并满足您的投注需求的专属 VIP 服务代表。',
    value: 4,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/levelup.ca1eacfa.png',
    title: '升级奖金',
    desc: '在每达到下个级别后获取奖金。所达级别越高，升级奖金就越大。',
    value: 5,
  },
]

const mergeBannerData = computed(() => {
  return [...bannerData, ...bannerData, ...bannerData]
})

const offSet = ref(-2000)
const activeValue = ref(2)
const activeTransition = ref(true)
const sliderRef = ref<HTMLElement>()
const translateX = ref(0)
const startX = ref(0)
const itemValue = ref<IBannerData>()

// 左
const onPrev = throttle(() => {
  offSet.value += 400
  if (activeValue.value === 1)
    activeValue.value = 6
  activeValue.value--

  if (offSet.value === -400) {
    setTimeout(() => {
      activeTransition.value = false
      offSet.value = -2400
      setTimeout(() => {
        activeTransition.value = true
      }, 100)
    }, 800)
  }
}, 1000)
// 右
const onNext = throttle(() => {
  offSet.value -= 400
  if (activeValue.value === 5)
    activeValue.value = 0
  activeValue.value++

  if (offSet.value === -3600) {
    setTimeout(() => {
      activeTransition.value = false
      offSet.value = -1600
      setTimeout(() => {
        activeTransition.value = true
      }, 100)
    }, 800)
  }
}, 1000)
// 点击图片切换
const change = function (item: IBannerData) {
  itemValue.value = item
  if (itemValue.value!.value < activeValue.value) {
    if (itemValue.value!.value === 1 && activeValue.value !== 2)
      onNext()
    else
      onPrev()
  }
  else if (itemValue.value!.value > activeValue.value) {
    if (itemValue.value!.value === 5 && activeValue.value !== 4)
      onPrev()
    else
      onNext()
  }
}

onMounted(() => {
  // 滑动
  // sliderRef.value?.addEventListener('mousedown', throttle((e: MouseEvent) => {
  //   translateX.value = offSet.value
  //   startX.value = e.clientX
  //   activeTransition.value = false
  // }, 1000))
  // sliderRef.value?.addEventListener('mousemove', (e: MouseEvent) => {
  //   if (startX.value)
  //     offSet.value = translateX.value + (e.clientX - startX.value)
  // })
  // sliderRef.value?.addEventListener('mouseup', throttle((e: MouseEvent) => {
  //   activeTransition.value = true
  //   setTimeout(() => {
  //     offSet.value = translateX.value
  //     if (startX.value > e.clientX)
  //       onNext()
  //     else if (startX.value < e.clientX)
  //       onPrev()
  //     else if (startX.value === e.clientX)
  //       change(true)
  //     startX.value = 0
  //   }, 0)
  // }, 1000))
})
</script>

<template>
  <div class="app-banner-unlimited">
    <div class="banner-wrap">
      <div ref="sliderRef" class="slider-wrap">
        <div class="slider" :style="{ transform: `translate(${offSet}px, 0px)` }" :class="{ 'is-transition': activeTransition }">
          <div v-for="item in mergeBannerData" :key="item.value" class="slider-item" :class="{ active: item.value === activeValue }" @click.stop="change(item)">
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
      height: 430px;
      position: relative;
      .slider{
        display: flex;
        position: relative;
        overflow-x: auto;
        width: 6000px;
        &.is-transition {
          transition: all .8s;
        }
        .slider-item{
          width: 400px;
          height:430px;
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
            transform: scale(.7);
            transition: all .2s;
            cursor: pointer;
            &:hover{
              transform: scale(.85);
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
