<script setup lang='ts'>
const props = defineProps<{
  isTheatre: boolean
}>()
const emit = defineEmits(['changeTheatre'])
const { t } = useI18n()
const { isFullScreen } = storeToRefs(useWindowStore())

const gameUrl = ref('https://static-live.hacksawgaming.com/1263/1.11.3/index.html?language=zh&channel=desktop&gameid=1263&mode=1&token=ce6f762e-a59b-417e-83aa-9f72d335a35f&lobbyurl=https%3A%2F%2Fstake.com&currency=CAD&partner=stake&env=https://rgs-cu.hacksawgaming.com/api')
const gameImgUrl = ref('https://mediumrare.imgix.net/33cd5a34c3937da326652a3beb44fe9c3680118c363a060ca5670847595561a5?&dpr=2&format=auto&auto=format&q=70')

const currentCurrency = ref(0)
const currencyList = ref([
  { balance: '0.000000000', icon: 'coin-btc', text: 0 },
  { balance: '0.000000000', icon: 'coin-eth', text: 1 },
  { balance: '0.000000000', icon: 'coin-ltc', text: 2 },
  { balance: '0.000000000', icon: 'coin-usdt', text: 3 },
  { balance: '0.000000000', icon: 'coin-doge', text: 4 },
  { balance: '0.000000000', icon: 'coin-bch', text: 5 },
  { balance: '0.000000000', icon: 'coin-xrp', text: 6 },
  { balance: '0.000000000', icon: 'coin-eos', text: 7 },
  { balance: '0.000000000', icon: 'coin-trx', text: 8 },
  { balance: '0.000000000', icon: 'coin-bnb', text: 9 },
  { balance: '0.000000000', icon: 'coin-usdc', text: 10 },
  { balance: '0.000000000', icon: 'coin-ape', text: 11 },
  { balance: '0.000000000', icon: 'coin-busd', text: 12 },
  { balance: '0.000000000', icon: 'coin-cro', text: 13 },
  { balance: '0.000000000', icon: 'coin-dai', text: 14 },
  { balance: '0.000000000', icon: 'coin-link', text: 15 },
  { balance: '0.000000000', icon: 'coin-sand', text: 16 },
  { balance: '0.000000000', icon: 'coin-shib', text: 17 },
  { balance: '0.000000000', icon: 'coin-uni', text: 18 },
  { balance: '0.000000000', icon: 'coin-matic', text: 19 },
  { balance: '0.00', icon: 'coin-eur', text: 20 },
  { balance: 'JP¥0.00', icon: 'coin-jpy', text: 21 },
  { balance: 'R$0.00', icon: 'coin-brl', text: 22 },
  { balance: 'CA$0.00', icon: 'coin-cad', text: 23 },
  { balance: '0.0', icon: 'coin-inr', text: 24 },
])
function onChooseCurrency(v: number) {
  currentCurrency.value = v
}

// 选择模式遮罩层
const { bool: isShowFrameOverlay, setFalse: setShowFrameOverlayFalse } = useBoolean(true)
const { bool: isRealMoneyMode, setBool: setRealModeBool } = useBoolean(false)
function onSwitchRealMoneyMode(v: boolean) {
  setRealModeBool(v)
  setShowFrameOverlayFalse()

  // H5模式直接打开游戏
  if (isFullScreen.value)
    location.href = gameUrl.value
}

// 全屏
const gameFrameRef = ref()
function onClickFullScreen() {
  gameFrameRef.value.requestFullscreen()
}
// 剧院
function onClickTheatre() {
  emit('changeTheatre', !props.isTheatre)
}
// 实时统计
const { bool: isTrendOpen, toggle: toggleTrendOpen } = useBoolean(false)
function onClickTrend() {
  toggleTrendOpen()
}
// 收藏
const { bool: isFavorite, toggle: toggleFavorite } = useBoolean(false)
function onClickFavorite() {
  toggleFavorite()
}
</script>

<template>
  <!-- H5模式 -->
  <div v-if="isFullScreen" class="mobile-iframe">
    <div class="mobile-header">
      <div class="img-wrap">
        <div class="img">
          <BaseImage :url="gameImgUrl" />
        </div>
      </div>
      <div class="info-wrap">
        <div class="main-info">
          <span class="game-name">Dork Unit</span>
          <span class="game-provider">Hacksaw Gaming</span>
        </div>
        <div class="info-controls">
          <!-- 收藏游戏 -->
          <VMenu placement="top">
            <div class="icon-button" :class="{ 'is-isFavorite': isFavorite }" @click="onClickFavorite">
              <BaseIcon :name="`${isFavorite ? 'uni-favorites' : 'chess-star'}`" />
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ isFavorite ? t('casino_game_remove_favorite') : t('casino_game_add_favorite') }}
              </div>
            </template>
          </VMenu>
          <!-- 实时统计 -->
          <VMenu placement="top">
            <div class="icon-button" :class="{ 'trend-open': isTrendOpen }" @click="onClickTrend">
              <BaseIcon name="uni-trend" />
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ isTrendOpen ? t('casino_game_close_trend') : t('casino_game_open_trend') }}
              </div>
            </template>
          </VMenu>
        </div>
      </div>
    </div>

    <p>{{ t('choose_your_balance') }}</p>
    <!-- 选择货币 -->
    <div class="currency">
      <span>{{ t('balance') }}</span>
      <VDropdown :distance="6">
        <div class="current-currency">
          <AppCurrencyIcon show-name :currency-type="currentCurrency" />
          <div class="arrow">
            <BaseIcon name="uni-arrow-down" />
          </div>
        </div>
        <template #popper>
          <div class="scroll-y popper popper-mobile">
            <div
              v-for="c, i in currencyList" :key="i" v-close-popper class="currency-types popper-option"
              @click="onChooseCurrency(c.text)"
            >
              <div>
                <AppCurrencyIcon show-name :currency-type="c.text" />
              </div>
            </div>
          </div>
        </template>
      </VDropdown>
    </div>

    <!-- 开始游戏 -->
    <div class="btns btns-mobile">
      <BaseButton class="btn" size="sm" bg-style="secondary" @click="onSwitchRealMoneyMode(true)">
        <div class="icon left">
          <BaseIcon name="uni-play" />
        </div>
        <span>{{ t('casino_game_real_money_mode') }}</span>
      </BaseButton>
      <BaseButton class="btn" size="sm" @click="onSwitchRealMoneyMode(false)">
        <div class="icon">
          <BaseIcon name="uni-play" />
        </div>
        <span>{{ t('casino_game_test_mode') }}</span>
      </BaseButton>
    </div>
  </div>

  <!-- PC模式 -->
  <div v-else class="app-iframe" :class="{ 't-app-iframe': isTheatre }">
    <div class="game-wrapper" :class="{ 't-game-wrapper': isTheatre }">
      <div class="content-wrapper" :class="{ 't-content-wrapper': isTheatre }">
        <div class="content" :class="{ 't-content': isTheatre }">
          <div class="iframe-wrapper" :class="{ 't-iframe-wrapper': isTheatre }">
            <div v-if="isShowFrameOverlay" class="iframe-menu-overlay">
              <div class="content">
                <div class="currency">
                  <span>{{ t('balance') }}</span>
                  <VDropdown :distance="6">
                    <div class="current-currency">
                      <AppCurrencyIcon show-name :currency-type="currentCurrency" />
                      <div class="arrow">
                        <BaseIcon name="uni-arrow-down" />
                      </div>
                    </div>
                    <template #popper>
                      <div class="scroll-y popper">
                        <div
                          v-for="c, i in currencyList" :key="i" v-close-popper class="popper-option currency-types"
                          @click="onChooseCurrency(c.text)"
                        >
                          <div>
                            <AppCurrencyIcon show-name :currency-type="c.text" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </VDropdown>
                </div>
                <div class="btns">
                  <BaseButton size="sm" bg-style="secondary" @click="onSwitchRealMoneyMode(true)">
                    <div class="icon left">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>{{ t('casino_game_real_money_mode') }}</span>
                  </BaseButton>
                  <BaseButton size="sm" @click="onSwitchRealMoneyMode(false)">
                    <div class="icon">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>{{ t('casino_game_test_mode') }}</span>
                  </BaseButton>
                </div>
              </div>
            </div>
            <iframe ref="gameFrameRef" :src="gameUrl" frameborder="0" allowfullscreen />
          </div>

          <div class="footer">
            <div class="left">
              <!-- 全屏 -->
              <div class="icon-button" @click="onClickFullScreen">
                <BaseIcon name="uni-full-screen" />
              </div>
              <!-- 影院模式 -->
              <VMenu placement="top">
                <div class="icon-button" @click="onClickTheatre">
                  <BaseIcon :name="`uni-theatre${isTheatre ? '-open' : ''}`" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ isTheatre ? t('casino_game_close_theatre') : t('casino_game_open_theatre') }}
                  </div>
                </template>
              </VMenu>

              <!-- 实时统计 -->
              <VMenu placement="top">
                <div class="icon-button" :class="{ 'trend-open': isTrendOpen }" @click="onClickTrend">
                  <BaseIcon name="uni-trend" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ isTrendOpen ? t('casino_game_close_trend') : t('casino_game_open_trend') }}
                  </div>
                </template>
              </VMenu>

              <!-- 收藏游戏 -->
              <VMenu placement="top">
                <div class="icon-button" :class="{ 'is-isFavorite': isFavorite }" @click="onClickFavorite">
                  <BaseIcon :name="`${isFavorite ? 'uni-favorites' : 'chess-star'}`" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ isFavorite ? t('casino_game_remove_favorite') : t('casino_game_add_favorite') }}
                  </div>
                </template>
              </VMenu>
            </div>
            <div class="logo">
              <BaseIcon name="app-logo" />
            </div>
            <div class="right">
              <span>{{ t('casino_game_test_mode') }}</span>
              <BaseSwitch v-model="isRealMoneyMode" class="switch" @change="onSwitchRealMoneyMode" />
              <span>{{ t('casino_game_real_money_mode') }}</span>
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
      padding: var(--tg-spacing-4);
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      cursor: pointer;

      &:active {
        transform: scale(0.98);
      }

      .arrow {
        font-size: 10px;
        display: flex;
        align-items: center;
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

            &:active {
              transform: scale(0.98);
            }

            .arrow {
              font-size: 10px;
              display: flex;
              align-items: center;
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
    max-height: 696px;
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
      padding-right: var(--tg-spacing-8);
      border-right: 1px solid var(--tg-secondary-main);
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

      &:active {
        transform: scale(0.96);
      }

      .switch {
        margin: 0 var(--tg-spacing-8);
      }
    }
  }
}

.t-content {
  height: 100%;
}

// 共用
// 图标按钮
.icon-button{
  padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
  cursor: pointer;

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
  max-height: 482px;

  &::-webkit-scrollbar-thumb {
    background: var(--tg-secondary-light);
  }

  .currency-types {
    width: 100%;
    height: 100%;
    color: var(--tg-text-dark);
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
  max-height: 295.578px;
}

.btns {
  display: flex;
  align-items: center;
  padding: var(--tg-spacing-12);
  gap: var(--tg-spacing-8);

  .icon {
    margin-right: var(--tg-spacing-10);
  }

  .left {
    --tg-icon-color: var(--tg-text-black);
  }

  &:hover {
    .left {
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
