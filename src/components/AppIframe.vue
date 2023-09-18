<script setup lang='ts'>
const gameUrl = ref('https://static-live.hacksawgaming.com/1263/1.11.3/index.html?language=zh&channel=desktop&gameid=1263&mode=1&token=ce6f762e-a59b-417e-83aa-9f72d335a35f&lobbyurl=https%3A%2F%2Fstake.com&currency=CAD&partner=stake&env=https://rgs-cu.hacksawgaming.com/api')

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

const isRealMoneyMode = ref(false)
function onSwitch(v: boolean) {
  console.log('切换真钱模式', v)
}
</script>

<template>
  <div class="app-iframe">
    <div class="game-wrapper">
      <div class="content-wrapper">
        <div class="content">
          <div class="iframe-wrapper">
            <div class="iframe-menu-overlay">
              <div class="content">
                <div class="currency">
                  <span>余额</span>
                  <VDropdown :distance="6">
                    <div class="current-currency">
                      <AppCurrencyIcon show-name :currency-type="currentCurrency" />
                      <div class="arrow">
                        <BaseIcon name="uni-arrow-down" />
                      </div>
                    </div>
                    <template #popper>
                      <div class="scroll-y popper">
                        <div v-for="c, i in currencyList" :key="i" v-close-popper class="popper-option currency-types" @click="onChooseCurrency(c.text)">
                          <div>
                            <AppCurrencyIcon show-name :currency-type="c.text" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </VDropdown>
                </div>
                <div class="btns">
                  <BaseButton size="sm" bg-style="secondary">
                    <div class="icon left">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>真钱模式</span>
                  </BaseButton>
                  <BaseButton size="sm">
                    <div class="icon">
                      <BaseIcon name="uni-play" />
                    </div>
                    <span>试玩模式</span>
                  </BaseButton>
                </div>
              </div>
            </div>
            <iframe :src="gameUrl" frameborder="0" allowfullscreen />
          </div>

          <div class="footer">
            <div class="left">
              <!-- 全屏 -->
              <div class="button">
                <BaseIcon name="uni-full-screen" />
              </div>
              <!-- 影院模式 -->
              <VMenu placement="top">
                <div class="button">
                  <BaseIcon name="uni-theatre" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    <!-- 禁用剧院模式 -->
                    启用剧院模式
                  </div>
                </template>
              </VMenu>

              <!-- 实时统计 -->
              <VMenu placement="top">
                <div class="button">
                  <BaseIcon name="uni-trend" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    <!-- 关闭实时统计 -->
                    打开实时统计
                  </div>
                </template>
              </VMenu>

              <!-- 收藏游戏 -->
              <VMenu placement="top">
                <div class="button">
                  <BaseIcon name="chess-star" />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    <!-- 取消收藏 -->
                    收藏游戏
                  </div>
                </template>
              </VMenu>
            </div>
            <div class="logo">
              <BaseIcon name="app-logo" />
            </div>
            <div class="right">
              <span>试玩模式</span>
              <BaseSwitch v-model="isRealMoneyMode" class="switch" @change="onSwitch" />
              <span>真钱模式</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-iframe {
  width: 100%;
  max-width: 1200px;
}

.game-wrapper {
  margin-top: var(--tg-spacing-40);
}

.content-wrapper {
  --header-height: 60px;
  overflow: hidden;
  background: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
}

.content {

  .iframe-wrapper {
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
      bottom: 0;
      right: 0;
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
      }
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
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

      .button {
        padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
        cursor: pointer;

        &:hover {
          --tg-icon-color: var(--tg-text-white);
        }

        &:active {
          transform: scale(0.95);
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

      &:active {
        transform: scale(0.95);
      }

      .switch {
        margin: 0 var(--tg-spacing-8);
      }
    }
  }
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
</style>
