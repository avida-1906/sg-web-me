<script setup lang="ts">
interface Props {
  mode?: 'only' | 'default'
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
})

const {
  appContentWidth,
} = storeToRefs(useWindowStore())

// 1160 638 （370）
// 1555 1103
// 1024 600
const scrollRef = ref()
const getGridAutoColumns = computed(() => {
  if (props.mode === 'only') {
    return { 'grid-auto-columns': '100%' }
  }
  else {
    if (appContentWidth.value > 1024)
      return { 'grid-auto-columns': '33.33%' }

    else if (appContentWidth.value > 600)
      return { 'grid-auto-columns': '48.75%' }

    else
      return { 'grid-auto-columns': '95.5%' }
  }
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
        <BaseAspectRatio class="banner-ratio" ratio="386/226">
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
  // width: 100%;
  position: relative;
  margin: 0 -6px 0;
  .banner-scroll{
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    // grid-column-gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    --standard-lockup-shadow-offset: 8px;
    -webkit-mask: linear-gradient(90deg,transparent 0,var(--tg-secondary-deepdark) var(--standard-lockup-shadow-offset,15px),var(--tg-secondary-deepdark) calc(100% - var(--standard-lockup-shadow-offset,15px)),transparent 100%);
    &::-webkit-scrollbar {
      display: none;
    }
    .banner-item{
      position: relative;
      scroll-snap-align: start;
      cursor: pointer;
      padding: 0 6px;
      .banner-ratio{
        border-radius: var(--tg-radius-md);
        overflow: hidden;
      }
      .item-msg{
        position: absolute;
        color: var(--tg-text-white);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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
    left: -20px;
  }
  .arrow-right{
    right: -20px;
  }
}
</style>
