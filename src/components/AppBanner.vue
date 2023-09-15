<script setup lang="ts">
const {
  isFixed,
  isFixedSmall,
  // isFullScreen,
} = storeToRefs(useWindowStore())
// interface Props {
//
// }
// withDefaults(defineProps<Props>(), {
//
// })
// const bannerList = ref([
//   { url: '', id: '1' },
// ])

const scrollRef = ref()
const getGridAutoColumns = computed(() => {
  if (!isFixed.value)
    return { 'grid-auto-columns': '32.40%' }

  else if (isFixedSmall.value)
    return { 'grid-auto-columns': '47%' }

  else
    return { 'grid-auto-columns': '93%' }
})
function scrollLeft() {
  scrollRef.value.scrollLeft -= scrollRef.value.offsetWidth
}
function scrollRight() {
  scrollRef.value.scrollLeft += scrollRef.value.offsetWidth
}
</script>

<template>
  <div class="app-banner">
    <div ref="scrollRef" class="banner-scroll scroll-x" :style="getGridAutoColumns">
      <div v-for="i in 7" :key="i" class="banner-item">
        <BaseAspectRatio ratio="386/226">
          <BaseImage url="https://cdn.sanity.io/images/tdrhge4k/production/65949dde3eac8d7c7f59a020c5acf70bd3692a0c-1743x1026.jpg?auto=format&q=90&w=760" />
          <div class="item-msg">
            <div class="msg-type">
              促销活动
            </div>
            <div class="msg-title">
              挑战升级
            </div>
            <div class="msg-tips">
              投注瓜分千万奖金！
              <span>阅读更多</span>
            </div>
            <div class="come-play">
              马上来玩
            </div>
          </div>
        </BaseAspectRatio>
      </div>
    </div>
    <div class="arrow arrow-left" @click="scrollLeft">
      <BaseIcon name="uni-arrow-left" />
    </div>
    <div class="arrow arrow-right" @click="scrollRight">
      <BaseIcon name="uni-arrow-right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-banner {
  width: 100%;
  position: relative;
  .banner-scroll{
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    .banner-item{
      position: relative;
      scroll-snap-align: start;
      border-radius: var(--tg-radius-md);
      overflow: hidden;
      cursor: pointer;
      .item-msg{
        position: absolute;
        color: var(--tg-text-white);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // display: flex;
        // flex-direction: column;
        // flex-wrap: nowrap;
        padding: 20px;
        div+div{
          margin-top: 10px;
        }
        .msg-type{
          display: inline-block;
          vertical-align: middle;
          color:var(--tg-secondary-grey);
          padding: 4px 8px;
          font-size: var(--tg-font-size-xs);
          font-weight: 500;
          border-radius: var(--tg-radius-default);
          background:var(--tg-text-white);
        }
        .msg-title{
          font-size: var(--tg-font-size-xl);
          font-weight: var(--tg-font-weight-semibold);
        }
        .msg-tips{
          color:var(--tg-text-white);
          font-size: var(--tg-font-size-xs);
          font-weight: var(--tg-font-weight-normal);
        }
        .come-play{
          position: absolute;
          bottom: 20px;
          display: inline-block;
          border-radius: var(--tg-radius-default);
          padding: 8px 65px;
          border: 1px solid var(--tg-text-white);
          background: var(--tg-secondary-grey);
          font-size: var(--tg-font-size-default);
          font-weight: 500;
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
    font-size: var(--tg-font-size-md);
    transform: translateY(-40%);
    transition: opacity 0.3s;
    cursor: pointer;
    --tg-icon-color:var(--tg-text-white);
  }
  .arrow-left{
    left: -30px;
    top: 50%;
  }
  .arrow-right{
    right: -30px;
  }
}
</style>
