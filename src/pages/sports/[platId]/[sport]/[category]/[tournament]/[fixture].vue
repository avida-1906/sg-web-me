<script lang="ts" setup>
const route = useRoute()
const { isMobile, appContentWidth } = storeToRefs(useWindowStore())
const appStore = useAppStore()
const { isLogin } = storeToRefs(appStore)
const { bool: showRecent, setFalse: setSRFalse } = useBoolean(true)
const { bool: openLiveSwitch } = useBoolean(false)
const {
  breadcrumbData,
  handicapListData,
  dataList,
  basePanelData,
} = useApiSportDetails(1, '54095899')

const sport = route.params.sport
// const category = route.params.category
// const tournament = route.params.tournament
// const fixture = route.params.fixture
const searchHandicap = ref('')

const curGroupTab = ref<number>(-1)

const title = computed(() =>
  'Stake.com',
)

function onOpenLiveSwitch() { }
function openMiniVideo() {
  useDragDialog({ type: 'live', url: '', dialogId: '123456' })
}

watchEffect(() => {
  if (handicapListData.value.length)
    curGroupTab.value = handicapListData.value[0].value
})

useTitle(title)
</script>

<template>
  <div class="tg-sports-tournament-fixture-betdetail">
    <div class="sports-detail-wrapper">
      <div class="layout-spacing no-bottom-spacing variant-normal">
        <AppNavBreadCrumb :breadcrumb="breadcrumbData" />
        <div class="content-wrapper">
          <div class="content" :class="{ stacked: appContentWidth < 900 }">
            <div class="fixture-column">
              <div
                v-if="!openLiveSwitch"
                class="background match-statistics" :style="{
                  '--sport-image': `url(/img/match-statistics/${sport}.jpg)`,
                }"
              >
                <AppMatchStatistics v-if="appContentWidth >= 900" :data="basePanelData" />
              </div>
              <div v-else class="livestream-wrap">
                <template v-if="isLogin">
                  <div class="wrapper">
                    <span class="tip">直播视频将在赛事进行之前开始。</span>
                  </div>
                  <video
                    autoplay
                    controls
                    playsinline
                    disablepictureinpicture=""
                    controlslist="nodownload nofullscreen"
                    class=""
                    src=""
                  >
                    <track kind="captions">
                  </video>
                  <!-- <div class="content">
                    <div class="player-view">
                      <div class="ratio-wrap">
                        <iframe
                          class="iframe" scrolling="no" allowfullscreen
                          src="https://liveshare.huya.com/iframe/lpl?needStop=true"
                        />
                      </div>
                    </div>
                  </div> -->
                  <div class="loader-wrapper">
                    <div class="loader">
                      <div class="wobble">
                        <BaseIcon name="spt-league-of-legends" />
                      </div>
                    </div>
                  </div>
                </template>
                <div v-else class="wrapper-grid-center">
                  <span>{{ $t('sports_live_unlogin_tip') }}。</span>
                  <div class="center">
                    <AppLoginRegisterBtns />
                  </div>
                </div>
              </div>
              <div class="live-stream-scoreboard-footer">
                <span v-show="openLiveSwitch" class="mini-video">
                  <BaseButton type="text" size="none" @click="openMiniVideo">
                    <span class="mini-video">
                      <BaseIcon name="uni-small-screen" />
                      <span>{{ $t('window_minimize') }}</span>
                    </span>
                  </BaseButton>
                </span>
                <span>记分板</span>
                <label>
                  <BaseSwitch
                    v-model="openLiveSwitch" @change="onOpenLiveSwitch"
                  />
                </label>
                <span>直播</span>
                <span class="blinking-dash">
                  <span class="red-circle" />
                </span>
              </div>
              <div class="fixture-notice">
                <span>如果您在赢家盘口的选择在第 9 局开始时领先但最终却输掉比赛，则可赢得奖金！</span>
                <a class="link">条款与条件适用。</a>
              </div>
              <div class="groups">
                <div>
                  <BaseTab
                    v-model="curGroupTab"
                    :list="handicapListData"
                    size="large"
                    :center="false"
                  />
                </div>
                <div class="search-wrap">
                  <BaseSearch
                    v-model="searchHandicap"
                    shape="square"
                    place-holder="搜索"
                  />
                </div>
                <div v-if="!dataList.length" class="no-markets">
                  <BaseEmpty icon="uni-empty-handicap" description="暂无可用盘口" />
                </div>

                <template v-for="item in dataList" :key="item.title">
                  <!-- 样式1 -->
                  <BaseSecondaryAccordion v-if="item.patType === 1" :title="item.title">
                    <template #default>
                      <div class="market" :class="{ 'in-mobile': isMobile }">
                        <AppSportsBetButton
                          v-for="outcome in item.betList"
                          :key="outcome.name"
                          :title="outcome.name"
                          :odds="outcome.odds"
                          layout="horizontal"
                        />
                      </div>
                    </template>
                  </BaseSecondaryAccordion>
                  <!-- 样式2 -->
                  <BaseSecondaryAccordion v-if="item.patType === 2" :title="item.title">
                    <template #default>
                      <div class="market" :class="{ 'in-mobile': isMobile }">
                        <template
                          v-for="market in [
                            {
                              id: '49b58ff9-cecc-466e-9502-3f5ce21afdfb',
                              name: '获胜 (incl. extra innings)',
                              status: 'active',
                              extId: '251',
                              specifiers: '',
                              customBetAvailable: false,
                              provider: 'betradar',
                              outcomes: [
                                {
                                  active: true,
                                  id: '2c6f85d5-8322-4ba4-9b10-a89e0a95834f',
                                  odds: 4.55,
                                  name: '洛杉矶道奇队',
                                  customBetAvailable: false,
                                  __typename: 'SportMarketOutcome',
                                },
                                {
                                  active: true,
                                  id: 'b40d0802-92c6-432c-895a-3818c70cec0b',
                                  odds: 1.22,
                                  name: '亚利桑那响尾蛇队',
                                  customBetAvailable: false,
                                  __typename: 'SportMarketOutcome',
                                },
                                {
                                  active: true,
                                  id: '2c6f85d5-8322-4ba4-9b10-a89e0a95834f',
                                  odds: 4.55,
                                  name: '洛杉矶道奇队',
                                  customBetAvailable: false,
                                  __typename: 'SportMarketOutcome',
                                },
                              ],
                            },
                          ]"
                          :key="market.id"
                        >
                          <AppSportsBetButton
                            v-for="outcome in market.outcomes"
                            :key="outcome.id"
                            :title="outcome.name"
                            :odds="`${outcome.odds}`"
                            layout="horizontal"
                          />
                        </template>
                      </div>
                    </template>
                  </BaseSecondaryAccordion>
                  <!-- 样式3 -->
                  <BaseSecondaryAccordion v-if="item.patType === 3" :title="item.title">
                    <template #default>
                      <div class="market" :class="{ 'in-mobile': isMobile }">
                        <div class="table" :style="{ '--itemCount': 1 }">
                          <div class="heading column">
                            <span>大</span>
                          </div>
                          <div class="column heading">
                            <span>小</span>
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="load-more-container">
                        <BaseButton type="text" size="md">
                          Load More
                        </BaseButton>
                      </div>
                    </template>
                  </BaseSecondaryAccordion>
                  <!-- 样式4 -->
                  <BaseSecondaryAccordion v-if="item.patType === 4" :title="item.title">
                    <template #default>
                      <div class="market" :class="{ 'in-mobile': isMobile }">
                        <div class="table-row-3" :style="{ '--itemCount': 1 }">
                          <div class="heading column">
                            <span>大</span>
                          </div>
                          <div class="column heading">
                            <span>小</span>
                          </div>
                          <div class="column heading">
                            <span>小</span>
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                          <div class="column">
                            <AppSportsBetButton
                              layout="horizontal"
                              title="outcome.name"
                              odds="0"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="load-more-container">
                        <BaseButton type="text" size="md">
                          Load More
                        </BaseButton>
                      </div>
                    </template>
                  </BaseSecondaryAccordion>
                </template>
              </div>
            </div>
            <div v-if="appContentWidth >= 900" class="sticky-column">
              <div class="iframe-widget tracker desktop widget-container">
                <div
                  class="iframe-box"
                >
                  <!-- <iframe
                    title="url"
                    src="https://disir.oddin.gg/lol/scoreboard?brandToken=a91d9435-1130-42f5-88d3-00361e69b932&darkMode=true&id=bWF0Y2gvb2Q6bWF0Y2g6NTAyNzY0&lang=zh&layout=&t=959746778&theme=dark"
                    scrolling="yes"
                    height="219"
                    class=""
                  /> -->
                </div>
              </div>
              <div class="iframe-widget tracker desktop widget-container">
                <div
                  class="iframe-box"
                >
                  <!-- <iframe
                    title="url"
                    :src="eventData.widgetUrl"
                    scrolling="yes"
                    height="730"
                    class=""
                  /> -->
                </div>
                <!-- <div class="expand-wrapper">
                  <BaseIcon name="uni-arrow-up-big" />
                </div> -->
              </div>
              <div class="loader-wrapper">
                <div class="loader">
                  <div class="wobble">
                    <BaseIcon name="spt-league-of-legends" />
                  </div>
                </div>
              </div>
              <div v-if="showRecent" class="spotlight is-open variant-dark">
                <div class="no-active-scale header">
                  <span>近期游戏记录</span>
                  <BaseButton type="text" @click="setSRFalse()">
                    <BaseIcon name="uni-close-white" />
                  </BaseButton>
                </div>
                <div class="content is-open">
                  <div class="wrapper">
                    <div
                      class="card-list"
                      style="grid-template-columns: repeat(3, 1fr); gap: 30px 15px;"
                    >
                      <div class="item" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppBetData mode="sports" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-grid-center {
  display: grid;
  grid-auto-flow: row;
  gap: var(--tg-spacing-8);
  place-items: center;
  height: 100%;
  color: var(--tg-secondary-light);
  padding: var(--tg-spacing-16);
  position: relative;
  z-index: 2;
  flex: 1;
  place-content: center;
  text-align: center;
  background: var(--tg-text-grey-deep);
}
.wobble {
  animation-name: wobble;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.87,-.41,.19,1.44);
}
.loader-wrapper {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
.iframe-box {
  display: grid;
  position: relative;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-8);
  padding: 0;
}
.load-more-container {
  text-align: center;
  margin-top: -10px;
}

.team-name {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-normal);
  line-height: 1.5;
  text-align: left;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex: 1;
}
.outcomes {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--tg-spacing-12);
}
.market {
  display: grid;
  color: var(--tg-text-white);
  grid-gap: var(--tg-spacing-8);
  width: 100%;
  padding: var(--tg-spacing-12) var(--tg-spacing-16);
  grid-template-columns:
    repeat(auto-fit, minmax(calc(33% - var(--tg-spacing-8)/2), 1fr));
  &.in-mobile {
    grid-template-columns: 1fr;
  }
  .table {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(var(--itemCount), auto);
    gap: var(--tg-spacing-4);
  }

  .table-row-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(var(--itemCount), auto);
    gap: var(--tg-spacing-4);
  }

  .row {
    display: grid;
    grid-template-columns: auto 30% 30%;
    gap: var(--tg-spacing-4);
    margin-bottom: var(--tg-spacing-12);
    padding-top: var(--tg-spacing-12);
    border-top: 2px solid var(--content-border);
  }
  .row:first-child {
    border: none;
    padding-top: 0;
  }
  .row:last-child {
    margin-bottom: 0;
  }

  .column.heading {
    margin-bottom: var(--tg-spacing-4);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}

iframe,
.iframe {
  border: none;
  width: 100%;
}

video {
  width: 100%;
  height: 100%;
}

.header-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: var(--tg-spacing-16);
  margin-right: var(--tg-spacing-16);
  font-weight: 600;
  color: var(--tg-text-white);

  >.odds {
    white-space: nowrap;
    margin: var(--tg-spacing-8) 0;
  }

  >.h-gap {
    display: flex;
    align-items: center;

    &>*+* {
      margin-left: var(--tg-spacing-12);
    }

    .error {
      color: var(--tg-button-secondary-main);
    }
  }
}

.legs {
  max-height: 240px;

  .leg {
    font-weight: 600;
    color: var(--tg-text-white);
    padding: var(--tg-spacing-6) var(--tg-spacing-16);
    padding-right: var(--tg-spacing-6);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.livestream-wrap {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-normal);
  line-height: 1.5;

  .tip {
    display: inline-flex;
    align-items: center;
    text-align: left;
    justify-content: flex-start;
  }

  .wrapper {
    display: grid;
    grid-auto-flow: row;
    gap: var(--tg-spacing-8);
    place-items: center;
    height: 100%;
    color: var(--tg-secondary-light);
    padding: var(--tg-spacing-16);
    position: relative;
    z-index: 2;
    flex: 1;
    place-content: center;
    text-align: center;
    background: var(--tg-text-grey-deep);
    position: absolute;
    inset: 0;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    .player-view {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    .player-view>* {
      height: 100%;
    }

    .ratio-wrap {
      width: 100%;
    }

    .iframe {
      border: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }

  &>* {
    position: absolute !important;
    inset: 0;
  }
}

.tg-sports-tournament-fixture-betdetail {
  --tg-base-switch-style-bg: var(--tg-text-green);
  padding-bottom: var(--tg-spacing-16);

  .sports-detail-wrapper {
    margin-top: var(--tg-spacing-32);
    margin-bottom: var(--tg-spacing-32);

    .content-wrapper {
      position: relative;
      margin-top: var(--tg-spacing-24);

      >.content {
        width: 100%;
        display: flex;
        gap: var(--tg-spacing-16);

        .fixture-column {
          display: flex;
          flex-direction: column;
          flex: auto;
          min-width: 0;

          >*+* {
            margin-top: var(--tg-spacing-16);
          }

          .match-statistics {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            position: relative;
            z-index: 2;
            grid-area: statistics;
            max-height: 200px;
            color: var(--tg-text-white);

            &.background {
              padding: var(--tg-spacing-32);
            }

            &.background::after {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              background: var(--tg-secondary-main);
              background-image: var(--sport-image);
              background-size: cover;
              background-position: center;
              opacity: .3;
              z-index: -1;
              background-repeat: no-repeat;
            }
          }

          .live-stream-scoreboard-footer {
            background: var(--tg-secondary-dark);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: var(--tg-spacing-8) var(--tg-spacing-16);
            margin-top: 0;
            color: var(--tg-secondary-light);
            line-height: 1.5;
            font-size: var(--tg-font-size-default);
            font-weight: var(--tg-font-weight-semibold);

            >*+* {
              margin-left: var(--tg-spacing-12);
            }

            .mini-video {
              cursor: pointer;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              font-size: var(--tg-font-size-default);
              color: var(--tg-text-white);
              gap: var(--tg-spacing-12);
            }
          }

          .fixture-notice {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: var(--tg-secondary-light);
            text-align: left;
            font-size: var(--tg-font-size-default);
            font-weight: var(--tg-font-weight-normal);
            line-height: 1.5;

            a {
              font-weight: var(--tg-font-weight-semibold);
            }
          }

          .groups {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
            --tg-base-select-style-padding-y: var(--tg-spacing-5);

            >*+* {
              margin-top: var(--tg-spacing-16);
            }
          }
        }

        .sticky-column {
          position: sticky;
          top: 0;
          // z-index: var(--tg-z-index-10);
          z-index: 5;
          height: -moz-min-content;
          height: min-content;
          flex: 0 0 360px;
          max-width: 360px;
          &>*+* {
            margin-top: var(--tg-spacing-16);
          }

          .widget-container {
            position: relative;
            background: var(--tg-secondary-dark);

            .expand-wrapper {
              --tg-icon-color: var(--tg-text-white);
              font-size: var(--tg-font-size-xs);
              height: var(--tg-spacing-20);
              -webkit-box-pack: center;
              bottom: 0;
              cursor: pointer;
              display: flex;
              justify-content: center;
              left: 0;
              margin: auto;
              position: absolute;
              right: 0;
              bottom: 0;
              transform: rotate(180deg);
              width: 100%;
            }
          }

          .spotlight {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
            z-index: 0;
            border-radius: var(--tg-radius-default);
            background: var(--header-background);
            color: var(--tg-secondary-light);
            font-size: var(--tg-font-size-default);
            font-weight: var(--tg-font-weight-semibold);

            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: var(--tg-spacing-8) 0 0 var(--tg-spacing-16);
            }

            .content {
              background: var(--content-background);
              display: flex;
              flex-direction: column;
              width: 100%;
              border-radius: 0 0 var(--tg-spacing-4) var(--tg-spacing-4);

              .wrapper {
                border-radius: var(--tg-spacing-4);
                padding: var(--tg-spacing-12) var(--tg-spacing-16);

                .card-list {
                  display: grid;
                }
              }
            }
          }

          .spotlight.variant-dark {
            --header-background: var(--tg-secondary-dark);
            --title-color: var(--tg-text-grey-light);
            --content-background: var(--tg-secondary-dark);
          }
        }

        &.stacked {
          .fixture-column {
            .live-stream-scoreboard-footer {
              margin-top: var(--tg-spacing-4);
            }
          }

          .sticky-column {
            display: none;
          }
        }
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
