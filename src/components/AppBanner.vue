<script setup lang="ts">
interface Props {
  mode?: 'home' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
})

const { appContentWidth } = storeToRefs(useWindowStore())

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
    <div
      ref="scrollRef"
      class="banner-scroll scroll-x hide-scrollbar"
      :style="getGridAutoColumns"
    >
      <div v-for="i in 7" :key="i" class="banner-item">
        <BaseAspectRatio class="banner-ratio" ratio="320/188">
          <BaseImage url="/png/home/banner_bg.png" />
          <div class="item-msg">
            <div class="msg-type">
              促销活动
            </div>
            <div class="msg-title">
              75,000抽奖活动
            </div>
            <div class="msg-tips">
              每周瓜分$20,000美元奖金
              <!-- <span>阅读更多</span> -->
            </div>
            <div class="come-play">
              了解更多
            </div>
          </div>
        </BaseAspectRatio>
      </div>
    </div>
    <template v-if="appContentWidth > 768">
      <div class="arrow arrow-left">
        <BaseButton type="text" font-size="24" @click="scrollLeft">
          <BaseIcon name="uni-arrow-left" />
        </BaseButton>
      </div>
      <div class="arrow arrow-right">
        <BaseButton type="text" font-size="24" @click="scrollRight">
          <BaseIcon name="uni-arrow-right" />
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.app-banner {
  position: relative;
  margin: 0 -6px 0;
  .banner-scroll{
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    --standard-lockup-shadow-offset: 8px;
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
      padding: 0 6px;
      .banner-ratio{
        border-radius: var(--tg-radius-md);
        overflow: hidden;
      }
      .item-msg{
        position: absolute;
        color: var(--tg-text-white);
        left: 8px;
        top: 0;
        max-width: 182px;
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
          bottom: 20px;
          position: absolute;
          width: 100%;
          max-height: 2.5rem;
          text-align: center;
          border-radius: var(--tg-radius-default);
          padding: 13px 16px;
          border: var(--tg-border-width-default) solid var(--tg-text-white);
          // background: var(--tg-secondary-grey);
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
</style>
