<script setup lang='ts'>
import type { ICartInfo, ISportListToCartData } from '~/types'

interface Props {
  layout?: 'horizontal' | 'vertical'
  disabled?: boolean
  isNa?: boolean
  title: string
  odds: string
  cartInfo: ICartInfo
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})

const betButton = ref<HTMLElement | null>(null)

const windowStore = useWindowStore()
const sportStore = useSportsStore()
const { t } = useI18n()
const { openRightSidebar, rightIsExpand, currentRightSidebarContent } = useRightSidebar()
const { isMobile } = storeToRefs(windowStore)

const listToCartData = ref<ISportListToCartData>({
  wid: props.cartInfo.wid,
  ov: props.odds,
  os: props.disabled ? 0 : 1,
  ei: props.cartInfo.ei,
})
const _disabled = ref(props.disabled)

function clickHandler() {
  if (!rightIsExpand.value && !isMobile.value)
    openRightSidebar(EnumRightSidebarContent.BETTING)

  else if (currentRightSidebarContent.value !== EnumRightSidebarContent.BETTING && !isMobile.value)
    openRightSidebar(EnumRightSidebarContent.BETTING)

  if (sportStore.cart.checkWid(props.cartInfo.wid)) {
    sportStore.cart.remove(props.cartInfo.wid)
  }
  else {
    sportStore.cart.add(props.cartInfo)
    if (isMobile.value)
      mobileDomTransition()

    else
      pcDomTransition()
  }
}

function pcDomTransition() {
  if (document.querySelector('.app-sports-bet-slip')) {
    setTimeout(() => {
      startDomTransition()
    }, 30)
  }
}

function mobileDomTransition() {
  startDomTransition()
}

function startDomTransition() {
  const startDom = betButton.value
  const endDom = isMobile.value ? document.getElementById(EnumSportEndDomID.H5_CART_END_DOM) : document.getElementById(EnumSportEndDomID.PC_CART_END_DOM)
  const sportsBetSlipDom = document.querySelector('.app-sports-bet-slip') as HTMLElement
  let topOffset = '0px'

  if (sportsBetSlipDom)
    topOffset = getStyle(sportsBetSlipDom, 'height')

  if (!startDom || !endDom)
    return

  domTransition(startDom, endDom, {
    topOffset: Number.parseFloat(topOffset),
  })
}

/** 数据改变，向购物车发送数据 */
function listToCartEventEmit() {
  sportsListToCartBus.emit(listToCartData.value)
}
/** 处理列表通知发送的数据 */
function eventHandler(_data: ISportListToCartData) {
  if (_data.ei === props.cartInfo.ei) {
    listToCartData.value.os = _data.os
    _disabled.value = _data.os !== 1
    if (_data.wid === listToCartData.value.wid)
      listToCartData.value.ov = _data.ov
  }
}
/** 监听列表发送的事件 */
function addListToCartEvent() {
  sportsCartToListBus.on(eventHandler)
}
/** 移除列表发送的事件 */
function removeListToCartEvent() {
  sportsCartToListBus.off(eventHandler)
}

watch(() => props.disabled, (val) => {
  _disabled.value = val
  listToCartData.value.os = val ? 0 : 1
  listToCartEventEmit()
})
watch(() => props.odds, (val) => {
  listToCartData.value.ov = val
  listToCartEventEmit()
})

onMounted(() => {
  addListToCartEvent()
})
onBeforeUnmount(() => {
  removeListToCartEvent()
})
</script>

<template>
  <div
    ref="betButton"
    class="app-sports-bet-button"
    :class="{
      'active': sportStore.cart.checkWid(props.cartInfo.wid),
      'disabled': _disabled,
      'is-na': isNa,
    }"
    :title="
      isTestEnv()
        ? JSON.stringify(cartInfo).replaceAll(',', ',\n').replaceAll('{', '{\n').replaceAll('}', '\n}')
        : ''
    "
    @click="clickHandler"
  >
    <template v-if="isNa">
      <span class="status">N/A</span>
    </template>
    <AppSportsOutcomeLocked v-else-if="+listToCartData.ov === 0" />
    <div v-else class="content" :class="[layout]">
      <div class="name">
        {{ title || '-' }}
      </div>
      <span v-if="_disabled" class="status">{{ t('sports_status_timeout') }}</span>
      <AppSportsOdds
        v-else
        :style="
          `--tg-sports-odds-color: ${sportStore.cart.checkWid(props.cartInfo.wid)
            ? 'var(--tg-text-white)' : ''}`
        "
        :arrow="layout === 'horizontal' ? 'left' : 'right'"
        :odds="listToCartData.ov || '0.00'"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-button {
  background: var(--tg-secondary-deepdark);
  border-radius: var(--tg-radius-default);
  transition: all .1s;
  width: 100%;
  height: 100%;
  position: relative;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  min-width: 0;
  padding: 0.5em 0.75em;
  line-height: 1.5;
  cursor: pointer;

  .content {
    display: flex;
    width: 100%;
    height: 100%;

    .name {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.horizontal {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &.vertical {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }

  &:hover {
    background: var(--tg-bet-button-deepblue);
  }

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  &.active {
    background: var(--tg-text-blue);
    box-shadow: var(--tg-box-shadow-lg);

    .name {
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-black);
    }
  }

  &.disabled {
    pointer-events: none;

    .name {
      opacity: 0.2;
    }

    .status {
      opacity: 0.4;
    }
  }

  &.is-na {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;

    .status {
      opacity: 0.2;
    }
  }
}
</style>
