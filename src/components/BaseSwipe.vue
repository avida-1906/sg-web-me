<script lang="ts" setup>
interface Item {
  imgUrl: string
}

interface Props {
  items: Item[]
}

const props = defineProps<Props>()

const emit = defineEmits(['clickItem'])

const heroContentRef = ref<HTMLElement | null>(null)
const { appContentWidth } = storeToRefs(useWindowStore())
const { bool: isShowLeftArrow, setBool: setLeftArrowStatus } = useBoolean(false)
const { bool: isShowRightArrow, setBool: setRightArrowStatus } = useBoolean(true)

const gridAutoColumns = computed(() => {
  if (appContentWidth.value < 600)
    return 'calc(95.24% - 0.6875rem)'

  else if (appContentWidth.value > 600 && appContentWidth.value < 1020)
    return 'calc(48.78% - 0.6875rem)'
  else
    return 'calc(33.33% - 0.6875rem)'
})

function handleScroll() {
  const target = heroContentRef.value as HTMLElement
  target.scrollLeft <= 0 ? setLeftArrowStatus(false) : setLeftArrowStatus(true)
  target.scrollLeft >= (target.scrollWidth - target.clientWidth - 1) ? setRightArrowStatus(false) : setRightArrowStatus(true)
}

function scrollLeft() {
  const target = heroContentRef.value as HTMLElement
  target.scrollLeft -= target.offsetWidth
}

function scrollRight() {
  const target = heroContentRef.value as HTMLElement
  target.scrollLeft += target.offsetWidth
}

function clickItem(item: Item) {
  emit('clickItem', item)
}

onMounted(() => {
  handleScroll()
})
</script>

<template>
  <div class="hero-wrapper">
    <div class="grid-heroes">
      <div
        ref="heroContentRef"
        class="scroll-x hero-content hide-scrollbar"
        :style="{
          'grid-auto-columns': gridAutoColumns,
        }"
        @scroll="handleScroll"
      >
        <div
          v-for="item, i in props.items"
          :key="i"
          class="hero"
          @click="clickItem(item)"
        >
          <!--  -->
          <div class="center wrapper">
            <BaseImage :url="item.imgUrl" is-network loading="eager" />
          </div>
          <div class="other">
            <slot />
          </div>
        </div>
      </div>
      <div
        v-if="isShowLeftArrow"
        class="arrow arrow-left"
        @click="scrollLeft"
      >
        <button class="grid-heroes-button" data-testid="heroes-scroll-left">
          <BaseIcon name="uni-arrow-left" />
        </button>
      </div>
      <div
        v-if="isShowRightArrow"
        class="arrow arrow-right"
        @click="scrollRight"
      >
        <button class="grid-heroes-button" data-testid="heroes-scroll-right">
          <BaseIcon name="uni-arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-wrapper {
  container-type: inline-size;
  container-name: grid-size;
  --sick-fade-stamp-of-ed-approval: linear-gradient( 90deg, transparent 0, var(--tg-primary-main) 4px, var(--tg-primary-main) calc(100% - 4px), transparent 100% );
  --standard-lockup-shadow-offset: 6px;
}
.grid-heroes {
  width: 100%;
  display: flex;
  position: relative;
  &:hover {
    .arrow {
      opacity: 1!important;
    }
  }
}
.hero-content {
  display: grid;
  grid-auto-flow: column;
  padding-top: 12px;
  padding-bottom: 2px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100%;
  position: relative;
  -moz-column-gap: 16px;
  column-gap: 16px;
}
.hero {
  scroll-snap-align: start;
  overflow: hidden;
  container-type: inline-size;
  container-name: card-size;
  display: flex;
  flex-direction: column;
  position: relative;
  color: var(--tg-text-white);
  background: var(--tg-secondary-grey);
  border-radius: var(--tg-radius-md);
  cursor: pointer;
  .other {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  // .wrapper {
  //   width: 100%;
  // }
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  top: 0;
  opacity: 0;
  transition: opacity .2s;
  font-size: var(--tg-font-size-xl);
  --tg-icon-color: var(--tg-text-white);
}

.arrow-right {
  left: calc(100% - 8px);
  .grid-heroes-button {
    padding: 12px 32px 0 16px;
    height: 100%;
  }
}

.arrow-left {
  right: calc(100% - 8px);
  .grid-heroes-button {
    padding: 12px 16px 0 32px;
    height: 100%;
  }
}

// .wrapper {
//   height: 12rem;
// }

@container grid-size (width < 50rem) {
    .grid-heroes:after {
      content: "";
      position: absolute;
      top: 0;
      right: calc(16px*-1);
      bottom: 0;
      width: 28px;
      background-image: var(--sick-fade-stamp-of-ed-approval);
      z-index: 10
    }

    .hero-content {
      -moz-column-gap: 8px;
      column-gap: 8px
    }

    .hero-content > .hero:last-of-type {
      margin-right: 4px
    }
}

// @container card-size (width > 21.5rem) {
//     .wrapper{
//         height: 14rem;
//     }
// }
</style>
