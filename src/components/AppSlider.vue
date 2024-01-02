<script lang="ts" setup name="app-slider">
interface Props {
  icon?: string
  title: string
  data: Array<any>
  showViewAll?: boolean
  showArrow?: boolean
  gameType?: string
  ty?: number
  cid?: string
  pid?: string
  useCloudImg?: boolean
  path?: string
  showManCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showViewAll: true,
  showArrow: true,
})

// await 10s
// await new Promise(resolve => setTimeout(resolve, 3000))

const { t } = useI18n()
const router = useLocalRouter()
const { appContentWidth } = storeToRefs(useWindowStore())

const pageInfo = reactive({
  total: 0,
  pageSize: 0,
  page: 1,
})
const sliderOuter = ref()
const gallery = ref()
const galleryClass = ref('')
const itemWidthPercent = ref(0) // 百分比

const { x } = useScroll(gallery, { behavior: 'smooth' }) // , isScrolling, arrivedState, directions

const outerWidth = computed(() => appContentWidth.value)
const pageWidth = computed(() =>
  pageInfo.pageSize * itemWidthPercent.value * outerWidth.value)
const isEnd = computed(() => {
  if (props.data) {
    const temp = (x.value + outerWidth.value)
      / (itemWidthPercent.value * outerWidth.value)
    return temp >= props.data.length - 0.1
  }
})
const scrollLeftItemsCount = computed(() => {
  return Math.round(x.value / (itemWidthPercent.value * outerWidth.value))
})

function nextPage() {
  x.value += pageWidth.value
}

function prevPage() {
  const temp = x.value - pageWidth.value
  if (temp > 0)
    x.value = temp
  else
    x.value = 0
}

function goAllPage() {
  if (props.ty === 1)
    router.push(`/casino/group/category?cid=${props.cid}&name=${props.title}`)
  else if (props.ty === 2)
    router.push(`/casino/group/provider?pid=${props.pid}&name=${props.title}`)
  else if (props.gameType === 'rec')
    router.push(`/casino/group/rec?name=${t('game_type_rec')}`)
}
function onTitleClick() {
  if (props.path)
    router.push(props.path)
}

watchEffect(() => {
  if (outerWidth.value >= 1150) {
    itemWidthPercent.value = 0.1333
    galleryClass.value = 'gallery-1150'
    pageInfo.pageSize = 7
  }
  else if (outerWidth.value >= 1000) {
    itemWidthPercent.value = 0.1538
    galleryClass.value = 'gallery-1150-1000'
    pageInfo.pageSize = 6
  }
  else if (outerWidth.value >= 850) {
    itemWidthPercent.value = 0.1818
    galleryClass.value = 'gallery-1000-850'
    pageInfo.pageSize = 5
  }
  else if (outerWidth.value >= 700) {
    itemWidthPercent.value = 0.2222
    galleryClass.value = 'gallery-850-700'
    pageInfo.pageSize = 4
  }
  else if (outerWidth.value >= 500) {
    itemWidthPercent.value = 0.25
    galleryClass.value = 'gallery-700-500'
    pageInfo.pageSize = 4
  }
  else {
    itemWidthPercent.value = 0.3333
    galleryClass.value = 'gallery-500'
    pageInfo.pageSize = 3
  }
})
</script>

<template>
  <section ref="sliderOuter" class="tg-app-slider">
    <div class="header">
      <div class="title">
        <BaseButton
          type="text" size="none"
          style="--tg-base-button-text-default-color:var(--tg-text-white);"
          @click="onTitleClick"
        >
          <div v-if="icon" class="icon" style="--app-sport-image-error-icon-size:16px;">
            <AppImage
              v-if="useCloudImg"
              class="icon-img"
              style="width: 16px;height: 16px;"
              :url="icon" is-cloud loading="eager"
            />
            <BaseIcon v-else :name="icon" />
          </div>
          <h3>{{ title }}</h3>
        </BaseButton>
      </div>
      <div v-if="showArrow" class="arrows">
        <BaseButton
          type="round-line-left" size="none"
          :disabled="x <= 0" style="width: 51px;"
          @click="prevPage"
        >
          <div class="left a-inner">
            <BaseIcon class="left" name="uni-arrowleft-line" />
          </div>
        </BaseButton>
        <BaseButton
          size="none"
          type="round-line-right"
          :disabled="showViewAll ? scrollLeftItemsCount + pageInfo.pageSize
            >= data.length + 1 : scrollLeftItemsCount + pageInfo.pageSize
              >= data.length" @click="nextPage"
        >
          <div class="a-inner right">
            <BaseIcon class="right" name="uni-arrowright-line" />
          </div>
        </BaseButton>
      </div>
    </div>
    <template v-if="data.length > 0">
      <div ref="gallery" class="scroll-x gallery hide-scrollbar" :class="[galleryClass]">
        <div
          v-for="item, idx in data" :key="idx" class="slide" :class="{
            faded: idx === data.length - 1
              ? !isEnd : idx >= scrollLeftItemsCount + pageInfo.pageSize,
          }"
        >
          <div class="item">
            <slot :item="item">
              <BaseGameItem :game-info="item" :show-man-count="showManCount" />
            </slot>
            <div class="link-next" @click="nextPage" />
          </div>
        </div>
        <div
          v-if="data.length && (showViewAll || $slots.viewAll)" class="slide see-all"
          :class="{ faded: scrollLeftItemsCount + pageInfo.pageSize < data.length + 1 }"
        >
          <div class="item" @click="goAllPage">
            <slot name="viewAll">
              <BaseImage url="/png/casino/seeAll-en.png" />
              <div class="txt">
                <span>{{ $t('view_all') }}</span>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </template>
    <BaseEmpty v-else icon="empty-game" :description="$t('empty_game')" />
  </section>
</template>

<style lang="scss" scoped>
.tg-app-slider {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: var(--tg-spacing-24);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: var(--tg-font-size-xl);
      color: var(--tg-text-white);
      display: inline-flex;
      position: relative;
      align-items: center;
      font-weight: 500;

      h3 {
        font-size: var(--tg-font-size-md);
        line-height: 1.5;
      }

      .icon {
        font-size: var(--tg-font-size-base);
        margin-right: var(--tg-spacing-8);
        display: flex;
        align-items: center;
      }

      &:hover {
        --tg-icon-color: var(--tg-text-white);
        .icon-img{
          filter: brightness(2);
        }
      }
    }

    .arrows {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0;

      button {
        width: 50px;
        height: 37px;
        .a-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s;
          &.left svg {
            transform-origin: center center;
          }
          &.right svg {
            transform-origin: center center;
          }
        }
        &:not(:disabled) {
          .a-inner {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .2s;
            &:hover svg {
              transform: scale(1.1426);
              opacity: 0.8;
              color: var(--tg-text-white);
            }
            &.left svg {
              transform-origin: center center;
            }
            &.right svg {
              transform-origin: center center;
            }
          }
        }
        &:disabled {
          cursor: default;
        }
      }
      button:last-child {
        border-left: 0;
      }

      // button:disabled {
      //   cursor: default;
      // }
      button {
        border-color: var(--tg-secondary-main);
      }
      .app-svg-icon {
        font-size: var(--tg-font-size-default);
        --tg-icon-color: var(--tg-secondary-light);
      }
    }
  }

  .gallery {
    display: grid;
    grid-auto-flow: column;
    padding-top: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    // 以下数字代表 tg-app-slider 的宽度
    &.gallery-1150 {
      grid-auto-columns: calc(13.33% - 10px); // pageSize 7
      gap: 11px;
    }

    &.gallery-1150-1000 {
      grid-auto-columns: calc(15.38% - 15px); // 6
      gap: 16px;
    }

    &.gallery-1000-850 {
      grid-auto-columns: calc(18.18% - 15px); // 5
      gap: 16px;
    }

    &.gallery-850-700 {
      grid-auto-columns: calc(22.22% - 15px); // 4
      gap: 16px;
    }

    &.gallery-700-500 {
      grid-auto-columns: calc(25% - 5px); // 4
      gap: 6px;
    }

    &.gallery-500 {
      grid-auto-columns: calc(33.33% - 5px); // 3
      gap: 6px;
    }

    .slide {
      scroll-snap-align: start;
      will-change: opacity;
      transition: all .3s;

      .link-next {
        display: none;
        position: absolute;
        inset: 0 0 0 0;
        background: transparent;
      }

      &.faded {
        opacity: .2;
        cursor: pointer;

        .link-next {
          display: block;
        }
      }

      .item {
        border-radius: var(--tg-radius-md);
        position: relative;
        min-height: 20px;
      }

      &.see-all {
        .item {
          text-align: center;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;

          .link-next {
            display: none;
          }

          // &:hover {
          //   transform: translateY(-7px);
          // }

          img {
            display: block;
          }

          .txt {
            font-size: var(--tg-font-size-lg);
            color: var(--tg-text-white);
            position: absolute;
            inset: 0 0 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
