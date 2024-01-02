<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis/types'
import { currencyConfig } from '~/composables/useCurrencyData'

interface Props {
  isTheatre: boolean
  id: string
  pid: string
  gameId: string
}

const props = defineProps<Props>()
const emit = defineEmits(['changeTheatre'])

const { t } = useI18n()
const { push } = useLocalRouter()
const { isMobile, appContentWidth } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const { allPlatformList } = storeToRefs(useCasinoStore())
const { openRegisterDialog } = useRegisterDialog()
const {
  bool: isShowFrameOverlay,
  setTrue: overlayTrue,
  setFalse: overlayFalse,
} = useBoolean(false)
const { bool: isRealMoneyMode, setBool: setRealModeBool } = useBoolean(isLogin.value)
// const { bool: isTrendOpen, toggle: toggleTrendOpen } = useBoolean(false)
// 余额箭头
const {
  bool: isCurrencyOpen1, setTrue: setCurrencyOpen1,
  setFalse: setCurrencyClose1,
} = useBoolean(false)
const {
  bool: isCurrencyOpen2, setTrue: setCurrencyOpen2,
  setFalse: setCurrencyClose2,
} = useBoolean(false)
const {
  bool: isCurrencyOpen3, setTrue: setCurrencyOpen3,
  setFalse: setCurrencyClose3,
} = useBoolean(false)
const {
  bool: isShowIframe,
  setTrue: showIframe,
  setFalse: hideIframe,
} = useBoolean(false)
const { bool: showTestMode } = useBoolean(false)
const { floatingState, toggleFloating } = useFloatingVue()

const currentCurrency = ref<EnumCurrencyKey>()
const currencyList = ref<EnumCurrencyKey[]>([])
const gameFrameRef = ref()
const { bool: isFavorite } = useBoolean(false)
const { bool: realModeLoading } = useBoolean(false)
const { bool: testModeLoading } = useBoolean(false)

// 游戏数据接口
const {
  data: dataDetail,
  runAsync: runDetail,
} = useRequest(() => ApiMemberGameDetail(props.id, props.pid, props.gameId), {
  onSuccess(res) {
    if (+res.game_type === CasinoGameType.slot)
      showTestMode.value = true

    currencyList.value = res.currencys

    // 如果用户选择过货币，使用之前保存的货币
    const lastCurrency = Local.get<EnumCurrencyKey>(STORAGE_CASINO_GAME_CURRENCY)

    if (lastCurrency && currencyList.value.findIndex(a => a === lastCurrency.value) > -1)
      currentCurrency.value = lastCurrency.value

    else
      currentCurrency.value = currencyList.value[0]
      // Local.set<EnumCurrencyKey>(STORAGE_CASINO_GAME_CURRENCY, currencyList.value[0])

    isFavorite.value = +res.is_fav === 1
    overlayTrue()
  },
})
const id = computed(() => dataDetail.value ? dataDetail.value.id : '')
const pid = computed(() => dataDetail.value ? dataDetail.value.platform_id : '')
const code = computed(() => dataDetail.value ? dataDetail.value.game_id : '')
const currencyCode = computed(() => {
  return currentCurrency.value ? currencyConfig[currentCurrency.value].cur : '0'
})
const bigGameWrapper = computed(() => appContentWidth.value > 930)
const gameProviderName = computed(() => {
  return allPlatformList.value?.find(
    a => a.id === dataDetail.value?.platform_id,
  )?.name ?? '-'
})
// 启动游戏接口
const {
  run: runLunchGame,
  data: gameUrl,
  mutate: mutateGameUrl,
} = useRequest(() => ApiGameLunch(
  pid.value,
  code.value,
  currencyCode.value,
), {
  manual: true,
  onBefore() {
    if (isRealMoneyMode.value)
      realModeLoading.value = true

    else
      testModeLoading.value = true
  },
  onSuccess(res) {
    // 判断data开头是不是http
    if (res.toString().startsWith('http')) {
      showIframe()
      // H5模式直接打开游戏
      if (isMobile.value)
        return location.href = res
    }
    else {
      const newPage = window.open('', '_blank') as any
      newPage.document.open()
      newPage.document.write(res) // 运行 HTML 代码
      newPage.document.close()
    }
  },
  onAfter() {
    realModeLoading.value = false
    testModeLoading.value = false
  },
})
// pc自动启动游戏
function autoLunchOnPc() {
  !isMobile.value && isLogin.value && runLunchGame()
}
// 重新获取游戏地址是先清空
function clearUrl() {
  hideIframe()
  mutateGameUrl('')
}
// 切换路由时重新获取detail
function refreshDetail() {
  clearUrl()
  runDetail().then(() => autoLunchOnPc())
}
// 选择货币
function onChooseCurrency(v: EnumCurrencyKey) {
  clearUrl()
  currentCurrency.value = v
  Local.set<EnumCurrencyKey>(STORAGE_CASINO_GAME_CURRENCY, v)
  overlayTrue()
  autoLunchOnPc()
}
// 切换试玩真钱模式
function onSwitchRealMoneyMode(v: boolean) {
  setRealModeBool(v)
  overlayFalse()
  isMobile.value && runLunchGame()
}
// 全屏
function onClickFullScreen() {
  gameFrameRef.value.requestFullscreen()
}
// 剧院
function onClickTheatre() {
  emit('changeTheatre', !props.isTheatre)
}
// 实时统计
// function onClickTrend() {
//   toggleTrendOpen()
// }
// 添加收藏
const { run: runFavInsert } = useRequest(() => ApiMemberFavInsert(id.value), {
  onSuccess() {
    isFavorite.value = true
  },
})
// 删除收藏
const { run: runFavDelete } = useRequest(() => ApiMemberFavDelete(id.value), {
  onSuccess() {
    isFavorite.value = false
  },
})
function onClickFavorite() {
  if (isFavorite.value)
    return runFavDelete()
  runFavInsert()
}

defineExpose({ refreshDetail })
await application.allSettled([runDetail().then(() => autoLunchOnPc())])
</script>

<template>
  <!-- H5模式 -->
  <div v-if="isMobile" class="mobile-iframe">
    <div class="mobile-header">
      <div class="img-wrap">
        <div class="img">
          <BaseImage :url="dataDetail?.img" is-cloud />
        </div>
      </div>
      <div class="info-wrap">
        <div class="main-info">
          <span class="game-name">{{ dataDetail?.name }}</span>
          <BaseButton type="text" size="none">
            <span
              class="game-provider"
              @click="push(`/casino/group/provider?pid=${pid}&name=${gameProviderName}`)"
            >
              {{ gameProviderName }}
            </span>
          </BaseButton>
        </div>
        <div v-if="isLogin" class="info-controls">
          <!-- 收藏游戏 -->
          <VTooltip placement="top">
            <div
              class="icon-button"
              :class="{ 'is-isFavorite': isFavorite }"
              @click="onClickFavorite"
            >
              <BaseIcon
                :name="`${isFavorite ? 'uni-favorites' : 'chess-star'}`"
              />
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ isFavorite ? t('casino_game_remove_favorite')
                  : t('casino_game_add_favorite') }}
              </div>
            </template>
          </VTooltip>
          <!-- 实时统计 -->
          <!-- <VTooltip placement="top">
            <div
              class="icon-button"
              :class="{ 'trend-open': isTrendOpen }"
              @click="onClickTrend"
            >
              <BaseIcon name="uni-trend" />
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ isTrendOpen ? t('casino_game_close_trend')
                  : t('casino_game_open_trend') }}
              </div>
            </template>
          </VTooltip> -->
        </div>
      </div>
    </div>

    <p>{{ t('choose_your_balance') }}</p>
    <!-- 选择货币 -->
    <div class="currency">
      <span>{{ t('balance') }}</span>
      <VDropdown
        :distance="6"
        :triggers="[]"
        :shown="floatingState"
        :auto-hide="false"
        @show="setCurrencyOpen1"
        @hide="setCurrencyClose1"
      >
        <div
          v-if="currentCurrency"
          class="current-currency"
          @click.stop="toggleFloating"
        >
          <AppCurrencyIcon show-name :currency-type="currentCurrency" />
          <div class="arrow" :class="{ up: isCurrencyOpen1 }">
            <BaseIcon name="uni-arrow-down" />
          </div>
        </div>
        <template #popper>
          <div v-if="currencyList.length" class="scroll-y popper popper-mobile">
            <a
              v-for="c, i in currencyList" :key="i"
              class="currency-types popper-option"
              @click="toggleFloating();onChooseCurrency(c)"
            >
              <div>
                <AppCurrencyIcon show-name :currency-type="c" />
              </div>
            </a>
          </div>
        </template>
      </VDropdown>
    </div>

    <!-- 开始游戏 -->
    <div class="btns btns-mobile">
      <BaseButton
        v-if="isLogin"
        :loading="realModeLoading"
        class="real btn"
        size="sm"
        bg-style="secondary"
        @click="onSwitchRealMoneyMode(true)"
      >
        <div class="icon">
          <BaseIcon name="uni-play" />
        </div>
        <span>{{ t('start_game') }}</span>
      </BaseButton>
      <BaseButton
        v-else
        class="real btn"
        size="sm"
        bg-style="secondary"
        @click="openRegisterDialog"
      >
        <div class="icon">
          <BaseIcon name="uni-play" />
        </div>
        <span>{{ t('reg') }}</span>
      </BaseButton>
      <BaseButton
        :loading="testModeLoading"
        class="btn"
        size="sm"
        disabled
        @click="onSwitchRealMoneyMode(false)"
      >
        <div class="icon">
          <BaseIcon name="uni-play" />
        </div>
        <span>{{ t('casino_game_test_mode') }}</span>
      </BaseButton>
    </div>
  </div>

  <!-- PC模式 -->
  <div v-else class="app-iframe" :class="{ 't-app-iframe': isTheatre }">
    <div
      class="game-wrapper"
      :class="{ 'b-game-wrapper': bigGameWrapper, 't-game-wrapper': isTheatre }"
    >
      <div class="content-wrapper" :class="{ 't-content-wrapper': isTheatre }">
        <div class="content" :class="{ 't-content': isTheatre }">
          <div
            class="iframe-wrapper"
            :class="{ 't-iframe-wrapper': isTheatre }"
          >
            <div v-if="isShowFrameOverlay" class="iframe-menu-overlay">
              <div class="content">
                <div class="currency">
                  <span>{{ t('balance') }}</span>
                  <VDropdown
                    :distance="6" @show="setCurrencyOpen2"
                    @hide="setCurrencyClose2"
                  >
                    <div v-if="currentCurrency" class="current-currency">
                      <AppCurrencyIcon
                        show-name
                        :currency-type="currentCurrency"
                      />
                      <div class="arrow" :class="{ up: isCurrencyOpen2 }">
                        <BaseIcon name="uni-arrow-down" />
                      </div>
                    </div>
                    <template #popper="{ hide }">
                      <div v-if="currencyList.length" class="scroll-y popper">
                        <a
                          v-for="c, i in currencyList"
                          :key="i"
                          class="popper-option currency-types"
                          @click="hide();onChooseCurrency(c)"
                        >
                          <div>
                            <AppCurrencyIcon show-name :currency-type="c" />
                          </div>
                        </a>
                      </div>
                    </template>
                  </VDropdown>
                </div>
                <div class="btns">
                  <BaseButton
                    v-if="isLogin"
                    class="real"
                    size="sm"
                    bg-style="secondary"
                    @click="onSwitchRealMoneyMode(true)"
                  >
                    <div class="icon">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>{{ t('casino_game_real_money_mode') }}</span>
                  </BaseButton>
                  <BaseButton
                    v-else
                    class="real"
                    size="sm"
                    bg-style="secondary"
                    @click="openRegisterDialog"
                  >
                    <div class="icon">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>{{ t('reg') }}</span>
                  </BaseButton>
                  <BaseButton
                    v-show="showTestMode" size="sm" disabled
                    @click="onSwitchRealMoneyMode(false)"
                  >
                    <div class="icon">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>{{ t('casino_game_test_mode') }}</span>
                  </BaseButton>
                </div>
              </div>
            </div>
            <iframe
              v-if="isShowIframe"
              ref="gameFrameRef"
              :src="gameUrl"
              frameborder="0"
              allowfullscreen
            />
          </div>

          <div class="footer">
            <div class="left">
              <!-- 全屏 -->
              <div class="icon-button" @click="onClickFullScreen">
                <BaseIcon name="uni-full-screen" />
              </div>
              <!-- 影院模式 -->
              <VTooltip placement="top">
                <div
                  :style="isTheatre ? '--tg-icon-color:var(--tg-text-white)' : ''"
                  class="icon-button" @click="onClickTheatre"
                >
                  <BaseIcon name="uni-theatre-open" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ isTheatre ? t('casino_game_close_theatre')
                      : t('casino_game_open_theatre') }}
                  </div>
                </template>
              </VTooltip>

              <!-- 实时统计 -->
              <!-- <VTooltip placement="top">
                <div
                  class="icon-button"
                  :class="{ 'trend-open': isTrendOpen }"
                  @click="onClickTrend"
                >
                  <BaseIcon name="uni-trend" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ isTrendOpen ? t('casino_game_close_trend')
                      : t('casino_game_open_trend') }}
                  </div>
                </template>
              </VTooltip> -->

              <!-- 收藏游戏 -->
              <VTooltip v-if="isLogin" placement="top">
                <div
                  class="icon-button"
                  :class="{ 'is-isFavorite': isFavorite }"
                  @click="onClickFavorite"
                >
                  <BaseIcon
                    :name="`${isFavorite ? 'uni-favorites' : 'chess-star'}`"
                  />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ isFavorite
                      ? t('casino_game_remove_favorite')
                      : t('casino_game_add_favorite') }}
                  </div>
                </template>
              </VTooltip>
              <div class="line" />

              <!-- 切换货币 -->
              <VDropdown
                v-if="isLogin" :distance="6" @show="setCurrencyOpen3"
                @hide="setCurrencyClose3"
              >
                <div v-if="currentCurrency" class="current-currency">
                  <AppCurrencyIcon
                    show-name
                    :currency-type="currentCurrency"
                  />
                  <div class="arrow" :class="{ up: isCurrencyOpen3 }">
                    <BaseIcon name="uni-arrow-down" />
                  </div>
                </div>
                <template #popper="{ hide }">
                  <div v-if="currencyList.length" class="scroll-y popper">
                    <a
                      v-for="c, i in currencyList"
                      :key="i"
                      class="popper-option currency-types"
                      @click="hide();onChooseCurrency(c)"
                    >
                      <div>
                        <AppCurrencyIcon show-name :currency-type="c" />
                      </div>
                    </a>
                  </div>
                </template>
              </VDropdown>
            </div>
            <div class="logo">
              <BaseLogo />
            </div>
            <div class="right">
              <template v-if="showTestMode">
                <span
                  :class="{ active: !isRealMoneyMode }"
                >{{ t('casino_game_test_mode') }}
                </span>
                <BaseSwitch
                  v-model="isRealMoneyMode"
                  class="switch"
                  :disabled="!isLogin"
                  @change="onSwitchRealMoneyMode"
                />
                <span
                  :class="{ active: isRealMoneyMode }"
                >{{ t('casino_game_real_money_mode') }}
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
// H5模式
.mobile-iframe {
  width: 100%;
  margin-top: 3vw;
  border-radius: var(--tg-radius-md);
  background: var(--tg-secondary-dark);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: grid;
  padding: var(--tg-spacing-16);
  grid-gap: var(--tg-spacing-16);
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .mobile-header {
    display: grid;
    grid-gap: var(--tg-spacing-16);
    grid-template-columns: minmax(100px, 40%) auto;
    margin-bottom: var(--tg-spacing-4);

    .img-wrap {
      position: relative;

      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: var(--tg-radius-md);
        overflow: hidden;
      }

      &::before {
        content: "";
        display: block;
        width: 100%;
        padding-top: 133.8235294118%;
      }
    }

    .info-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: auto;
      align-self: end;
      min-height: 60%;

      .main-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 1.5;

        .game-name {
          font-size: var(--tg-font-size-md);
        }

        .game-provider {
          color: var(--tg-text-lightgrey);
        }
      }

      .info-controls {
        display: flex;
        align-items: center;
        width: 100%;
        padding-top: var(--spacing-0-5);
      }
    }
  }

  p {
    line-height: 1.5;
  }

  .currency {
    display: grid;
    align-items: center;
    gap: var(--tg-spacing-8);
    grid-auto-flow: column;
    justify-content: flex-start;

    span {
      color: var(--tg-text-lightgrey);
    }

    .current-currency {
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
      background-color: var(--tg-secondary-dark);
      border-radius: var(--tg-radius-default);
      padding: 3.5px 4px;
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      cursor: pointer;

      &:hover {
        background-color: var(--tg-secondary-deepdark);
        --tg-icon-color: var(--tg-text-white)
      }

      &:active {
        transform: scale(0.98);
      }

      .arrow {
        font-size: var(--tg-font-size-default);
        display: flex;
        align-items: center;
        // transition: var(--tg-transition);
        &.up{
                transform: rotate(180deg);
              }
      }
    }
  }

  .btns {
    width: 100%;
  }

}

// pc模式
.app-iframe {
  width: 100%;
  max-width: 1200px;
}

.t-app-iframe {
  max-width: 148vh;
}

.game-wrapper {
  margin-top: 3vw;
}

.b-game-wrapper {
  margin-top: var(--tg-spacing-40);
}

.t-game-wrapper {
  margin-top: 0;
  display: contents;
}

.content-wrapper {
  overflow: hidden;
  background: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
}

.t-content-wrapper {
  --header-height: 60px;
  height: calc(100vh - var(--header-height));
}

.content {

  .iframe-wrapper {
    height: 100%;
    max-height: unset;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 100%;
      padding-top: 56.25%;
    }

    .iframe-menu-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.9)};
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .content {
        display: flex;
        flex-direction: column;

        .currency {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--tg-text-lightgrey);
          font-size: var(--tg-font-size-default);
          margin-bottom: var(--tg-spacing-8);

          span {
            margin-right: var(--tg-spacing-8);
          }

          .current-currency {
            color: var(--tg-text-white);
            font-weight: var(--tg-font-weight-semibold);
            background-color: var(--tg-secondary-dark);
            border-radius: var(--tg-radius-default);
            padding: var(--tg-spacing-4);
            display: flex;
            align-items: center;
            gap: var(--tg-spacing-8);
            cursor: pointer;

            &:hover {
              background-color: var(--tg-secondary-deepdark);
              --tg-icon-color: var(--tg-text-white)
            }

            &:active {
              transform: scale(0.98);
            }

            .arrow {
              font-size: var(--tg-font-size-default);
              display: flex;
              align-items: center;
              // transition: var(--tg-transition);
              &.up{
                transform: rotate(180deg);
              }
            }
          }
        }

      }
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .t-iframe-wrapper {
    max-height: calc(100vh - var(--header-height) - 63px);
  }

  .footer {
    height: 63px;
    padding: var(--tg-spacing-8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--tg-secondary-dark);
    color: var(--tg-text-lightgrey);

    .left {
      font-size: var(--tg-font-size-default);
      display: flex;
      align-items: center;
      padding-right: var(--tg-spacing-8);

      .line{
        width: 1px;
        height: 40px;
        background-color:var(--tg-secondary-main) ;
        margin-right: var(--tg-spacing-16);
      }
      .current-currency {
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
      background-color: var(--tg-secondary-dark);
      border-radius: var(--tg-radius-default);
      padding:  var(--tg-spacing-4);
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      cursor: pointer;

      &:hover {
        background-color: var(--tg-secondary-deepdark);
        --tg-icon-color: var(--tg-text-white)
      }

      &:active {
        transform: scale(0.98);
      }

      .arrow {
        font-size: var(--tg-font-size-default);
        display: flex;
        align-items: center;
        transition: var(--tg-transition);
        &.up{
                transform: rotate(180deg);
              }
      }
    }
    }

    .logo {
      font-size: 68px;
    }

    .right {
      display: flex;
      align-items: center;
      font-size: var(--tg-font-size-default);
      padding-right: var(--tg-spacing-24);
      cursor: pointer;
      font-weight: var(--tg-font-weight-semibold);

      &:active {
        transform: scale(0.96);
      }

      .switch {
        margin: 0 var(--tg-spacing-8);
      }

      .active {
        color: var(--tg-text-white);
      }
    }
  }
}

.t-content {
  height: 100%;
}

// 共用
// 图标按钮
.icon-button {
  padding:
  var(--tg-spacing-button-padding-vertical-sm)
  var(--tg-spacing-button-padding-horizontal-sm);
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    --tg-icon-color: var(--tg-text-white);
  }

  &:active {
    transform: scale(0.96);
  }
}

.trend-open,
.is-isFavorite {
  --tg-icon-color: var(--tg-text-white);
}

.popper {
  display: flex;
  flex-direction: column;
  // max-height: 482px;

  &::-webkit-scrollbar-thumb {
    background: var(--tg-secondary-light);
  }

  .currency-types {
    width: 100%;
    height: 100%;
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);

    &:active {
      div {
        transform: scale(0.98);
      }
    }

    &:hover {
      background-color: var(--tg-text-lightgrey);
    }
  }
}

.popper-mobile {
  // max-height: 295.578px;
}

.btns {
  display: flex;
  align-items: center;
  padding: var(--tg-spacing-12);
  gap: var(--tg-spacing-8);

  .icon {
    margin-right: var(--tg-spacing-10);
    display: flex;
    align-items: center;
  }

  .real {
    --tg-icon-color: var(--tg-text-black);

    &:hover {
      --tg-icon-color: #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.5)};
    }
  }

}

.btns-mobile {
  justify-content: space-between;
  padding: 0;

  .btn {
    width: 49%;
  }
}
</style>
