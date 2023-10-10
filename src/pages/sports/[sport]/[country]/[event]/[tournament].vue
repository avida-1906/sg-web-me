<script lang="ts" setup>
type Qualifier = 'home' | 'away'

const route = useRoute()
const { isMobile } = storeToRefs(useWindowStore())

const rangeNum = ref()
const curGroupTab = ref('')
const { bool: openLiveSwitch } = useBoolean(false)
const eventData = reactive({
  id: '54091c18-6724-461f-8ccd-ac254479d198',
  slug: '43893124-persija-jakarta-barito-putera',
  eventStatus: {
    __typename: 'SportFixtureEventStatusData',
    homeScore: 1,
    awayScore: 0,
    matchStatus: '上半场',
    clock: {
      matchTime: '45:00',
      remainingTime: null,
    },
    periodScores: [
      {
        homeScore: 1,
        awayScore: 0,
        matchStatus: '上半场',
      },
      {
        homeScore: 1,
        awayScore: 5,
        matchStatus: '第二盘',
      },
    ],
    currentTeamServing: null,
    homeGameScore: '0',
    awayGameScore: '0',
    statistic: {
      yellowCards: {
        away: 0,
        home: 0,
      },
      redCards: {
        away: 0,
        home: 0,
      },
      corners: {
        home: 1,
        away: 1,
      },
    },
  },
  data: {
    startTime: 'Sat, 07 Oct 2023 06:00:00 GMT',
    competitors: [
      {
        name: 'Bintang Ampenan FC',
        extId: 'sr:competitor:1063998',
        countryCode: 'ID',
        abbreviation: 'BIN',
        iconPath: null,
      },
      {
        name: 'PS Hamzanwadi',
        extId: 'sr:competitor:1063984',
        countryCode: 'ID',
        abbreviation: 'PS ',
        iconPath: null,
      },
    ],
    teams: [
      {
        name: 'Bintang Ampenan FC',
        qualifier: 'home',
      },
      {
        name: 'PS Hamzanwadi',
        qualifier: 'away',
      },
    ],
    tvChannels: null,
    __typename: 'SportFixtureDataMatch',
  },
  tournament: {
    id: '4149a2b5-2fc9-421e-a97c-88a4d6fe42ae',
    name: '印度尼西亚丙级联赛，东部',
    slug: 'liga-3',
    contentNotes: [],
    category: {
      id: 'fad34360-a769-4058-aafe-01e6a6ad5fff',
      name: '印尼',
      slug: 'indonesia',
      contentNotes: [],
      sport: {
        id: '5b4b60b9-ed95-41e7-97e3-f33aa172cf12',
        name: '足球',
        slug: 'soccer',
        contentNotes: [],
      },
    },
    frontRowSeatEvent: null,
  },
  groups: [
    {
      id: '737cd46e-9b5f-4b0b-998d-0593262c7dcf',
      name: 'main',
      translation: '主页',
      rank: 15,
    },
    {
      id: '91b6d92d-5c0c-4979-820f-2e1a464c393c',
      name: '1st2ndhalfmarkets',
      translation: '上半场/下半场',
      rank: 13,
    },
    {
      id: 'ad2dda6e-3cc4-4179-bf91-74ccc911cfac',
      name: 'AsianLines',
      translation: '亚洲盘',
      rank: 12,
    },
    {
      id: '57eeace2-9ebf-4f08-8535-620a0c817e90',
      name: 'Handicap',
      translation: '让分盘',
      rank: 0,
    },
    {
      id: '0d62ec0a-2ae0-47d5-bd22-e602dceec854',
      name: 'threeway',
      translation: '三项让分盘',
      rank: 0,
    },
    {
      id: '92faec38-91f3-47b7-8a0e-fbb7a8b8421c',
      name: 'Total',
      translation: '总分盘',
      rank: 0,
    },
    {
      id: 'a4df526b-a9f4-413a-ade2-f03e8a1942fb',
      name: 'winner',
      translation: '获胜盘',
      rank: 0,
    },
  ],
  group: [
    {
      name: 'main',
      translation: '主页',
      rank: 13,
      templates: [
        {
          id: '5c524611-7ef5-4a67-9c0b-0b012294c136',
          extId: '251',
          rank: 14,
          name: '获胜 (incl. extra innings)',
          markets: [
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
              ],
            },
          ],
        },
        {
          id: '9bce7c9c-b390-4667-94b7-93263ddcf847',
          extId: '258',
          rank: 13.5,
          name: '总数 (incl. extra innings)',
          markets: [
            {
              id: 'd6b59063-ecf8-4997-ad00-770b3b5e861a',
              name: '总数 (incl. extra innings)',
              status: 'active',
              extId: '258',
              specifiers: 'total=7.5',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: 'e9779db1-df1a-4c94-98d9-79a95f872be6',
                  odds: 1.75,
                  name: '高于7.5',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'f2ac7ac4-957d-4572-81ec-db28fb8a028e',
                  odds: 2.1,
                  name: '低于7.5',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
            {
              id: '7b5c5bba-3d48-4018-a5df-22227c3b764c',
              name: '总数 (incl. extra innings)',
              status: 'active',
              extId: '258',
              specifiers: 'total=8',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: '94e49bed-38d8-4a5d-9835-8e774671a20c',
                  odds: 1.9,
                  name: '高于8',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '211d8e64-ea0e-4351-a0d9-b0b26799f2d7',
                  odds: 1.95,
                  name: '低于8',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
            {
              id: '9f3be939-6fad-46ba-985e-1c239e1b0276',
              name: '总数 (incl. extra innings)',
              status: 'active',
              extId: '258',
              specifiers: 'total=8.5',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: '6f64c5f6-63ec-411d-bf0e-ffe4f879d876',
                  odds: 2,
                  name: '高于8.5',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'c324b9db-0978-482b-9c9a-e549dd2a0e22',
                  odds: 1.8,
                  name: '低于8.5',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
          ],
        },
        {
          id: '5912d081-381b-4148-9f6b-e23c62f01eed',
          extId: '256',
          rank: 13,
          name: '盘口 (incl. extra innings)',
          markets: [
            {
              id: 'ef50ec2d-9bb9-4483-b96e-887648ad0bc5',
              name: '盘口 (incl. extra innings)',
              status: 'active',
              extId: '256',
              specifiers: 'hcp=1.5',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: 'ba996aaf-f777-41f2-8cf9-cfa8560fa3df',
                  odds: 2.65,
                  name: '洛杉矶道奇队 (1.5)',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'd5dbae2d-3faf-46c7-b663-afd2e45cf9dd',
                  odds: 1.5,
                  name: '亚利桑那响尾蛇队 (-1.5)',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
            {
              id: 'c2ea540f-5961-4283-815f-e2e0ef18e962',
              name: '盘口 (incl. extra innings)',
              status: 'active',
              extId: '256',
              specifiers: 'hcp=2.5',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: '02110c97-4dbb-4370-9522-98346048cd6a',
                  odds: 1.85,
                  name: '洛杉矶道奇队 (2.5)',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '7835a91d-92f9-48f7-807a-593858fff811',
                  odds: 2,
                  name: '亚利桑那响尾蛇队 (-2.5)',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
            {
              id: '977ead7b-0996-47cf-8066-825be40eebc2',
              name: '盘口 (incl. extra innings)',
              status: 'active',
              extId: '256',
              specifiers: 'hcp=3.5',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: '2dae91d2-22c2-4174-940e-99c92d3d69ef',
                  odds: 1.3,
                  name: '洛杉矶道奇队 (3.5)',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '648c04c8-a25f-45d4-8882-4c1e0d130c4b',
                  odds: 3.4,
                  name: '亚利桑那响尾蛇队 (-3.5)',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  // 选手主题投注
})

const scoreBoard = computed(() => {
  const head = [
    { key: 'competitor', value: (q: Qualifier) => eventData.data.teams.filter(t => t.qualifier === q)[0]?.name, title: eventData.eventStatus.matchStatus },
    { key: 'corners', value: (q: Qualifier) => eventData.eventStatus.statistic.corners[q], icon: 'uni-ruler' },
    { key: 'yellowCards', value: (q: Qualifier) => eventData.eventStatus.statistic.yellowCards[q], icon: 'uni-warn-rect' },
    { key: 'redCards', value: (q: Qualifier) => eventData.eventStatus.statistic.redCards[q], icon: 'uni-error-rect' },
    {
      key: 'period',
      periodScores: eventData.eventStatus.periodScores.map(p => ({ ...p, value: (q: Qualifier) => p[`${q}Score`] })),
    },
    { key: 'gameScore', value: (q: Qualifier) => eventData.eventStatus[`${q}GameScore`] },
    { key: 'matchScore', value: (q: Qualifier) => eventData.eventStatus[`${q}Score`], icon: 'soccer' },
  ]
  const headTitle = mapHeadArea(head, 'title')
  const headHome = mapHeadArea(head, 'home')
  const headAway = mapHeadArea(head, 'away')
  return {
    head,
    headTitle,
    headHome,
    headAway,
  }
})
const sport = computed(() => route.params.sport)
const country = computed(() => route.params.country)
const event = computed(() => route.params.event)
const tournament = computed(() => route.params.tournament)
const breadcrumb = computed(() => {
  const { id: t_id, slug: t_slug } = eventData
  const competitors = eventData.data.competitors
  const { id, name, slug, category: { id: cid, name: cname, slug: cslug, sport: { id: sid, name: sname, slug: sslug } } } = eventData.tournament
  return [
    { path: `/sports/${sslug}`, title: sname, id: sid },
    { path: `/sports/${sslug}/${cslug}`, title: cname, id: cid },
    { path: `/sports/${sslug}/${cslug}/${slug}`, title: name, id },
    { path: `/sports/${sslug}/${cslug}/${slug}/${t_slug}`, title: competitors.map(i => i.abbreviation).join(' - '), id: t_id },
  ]
})
const gridAreas = computed(() => {
  return `
    "${scoreBoard.value.headTitle.map((i: any) => i.name).join(' ')}"
    "${scoreBoard.value.headHome.map((i: any) => i.name).join(' ')}"
    "${scoreBoard.value.headAway.map((i: any) => i.name).join(' ')}"
  `
})
const groupTabs = computed(() => eventData.groups.filter(g => g.rank > 0).map(g => ({ ...g, value: g.id, label: g.translation })))

function mapHeadArea(head: Array<{ key: string; periodScores?: Array<{ [prop: string]: any }> }>, label: string) {
  return head.reduce((accumulator: any, currentValue) => {
    if (currentValue.periodScores && currentValue.periodScores.length)
      accumulator.push(...currentValue.periodScores.map((p, idx) => ({ ...p, key: currentValue.key, name: `${currentValue.key}_${label}_${idx}`, qualifier: label })))
    else
      accumulator.push({ ...currentValue, name: `${currentValue.key}_${label}`, qualifier: label })

    return accumulator
  }, [])
}
function onOpenLiveSwitch() {}
</script>

<template>
  <div class="tg-sports-country-event-betdetail">
    <div class="sports-detail-wrapper">
      <div class="layout-spacing no-bottom-spacing variant-normal">
        <AppNavBreadCrumb :breadcrumb="breadcrumb" />
        <div class="content-wrapper">
          <div class="content">
            <div class="fixture-column">
              <div class="background match-statistics" :style="{ '--sport-image': `url(/img/match-statistics/${sport}.jpg)` }">
                <div class="box-shadow wrapper has-background">
                  <div class="content scroll-x" :style="{ 'grid-template-areas': gridAreas }">
                    <!-- competitor -->
                    <div class="chromatic-ignore heading" style="grid-area: competitor_title;">
                      <span class="match-status-label">
                        {{ '第四节' }}
                      </span>
                    </div>
                    <div class="competitor-item border" style="grid-area: competitor_home;">
                      <img src="https://img-cdn001.akamaized.net/ls/crest/medium/4389.png" width="20" height="20" style="width:20px;height: 20px;">
                      <span>旧金山49人美式足球队</span>
                    </div>
                    <div class="competitor-item" style="grid-area: competitor_away;">
                      <img src="https://img-cdn001.akamaized.net/ls/crest/medium/6118.png" width="20" height="20" style="width:20px;height: 20px;">
                      <span>卡尔达斯</span>
                    </div>

                    <!-- corners yellowCards redCards -->
                    <div class="heading center" style="grid-area: corners_title;">
                      <BaseIcon name="uni-ruler" />
                    </div>
                    <span class="fill-frame border" style="grid-area: corners_home;">
                      <span>6</span>
                    </span>
                    <span class="fill-frame" style="grid-area: corners_away;">
                      <span>5</span>
                    </span>

                    <div class="heading center" style="grid-area: yellowCards_title;">
                      <BaseIcon name="uni-warn-rect" />
                    </div>
                    <span class="fill-frame border" style="grid-area: yellowCards_home;">
                      <span>6</span>
                    </span>
                    <span class="fill-frame" style="grid-area: yellowCards_away;">
                      <span>5</span>
                    </span>

                    <div class="heading center" style="grid-area: redCards_title;">
                      <BaseIcon name="uni-error-rect" />
                    </div>
                    <span class="fill-frame border" style="grid-area: redCards_home;">
                      <span>6</span>
                    </span>
                    <span class="fill-frame" style="grid-area: redCards_away;">
                      <span>5</span>
                    </span>

                    <!-- period -->
                    <template v-for="p, idx in eventData.eventStatus.periodScores" :key="idx">
                      <div class="heading center" :style="`grid-area: period_title_${idx}`">
                        <span>{{ idx + 1 }}st</span>
                      </div>
                      <span class="fill-frame border" :style="`grid-area: period_home_${idx}`">
                        <span>{{ p.homeScore }}</span>
                      </span>
                      <span class="fill-frame" :style="`grid-area: period_away_${idx}`">
                        <span>{{ p.awayScore }}</span>
                      </span>
                    </template>

                    <!-- gameScore -->
                    <div class="heading center" style="grid-area: gameScore_title;" />
                    <span class="fill-frame border" style="grid-area: gameScore_home;">
                      <span>0</span>
                    </span>
                    <span class="fill-frame" style="grid-area: gameScore_away;">
                      <span>16</span>
                    </span>

                    <!-- matchScore -->
                    <div class="heading center" style="grid-area: matchScore_title;">
                      <BaseIcon name="spt-football" />
                    </div>
                    <div class="fill-frame completed match-score border" style="grid-area: matchScore_home;">
                      <span>2</span>
                    </div>
                    <div class="match-score fill-frame" style="grid-area: matchScore_away;">
                      <span>1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="live-stream-scoreboard-footer">
                <span>记分板</span>
                <label>
                  <BaseSwitch v-model="openLiveSwitch" @change="onOpenLiveSwitch" />
                </label>
                <span>直播</span>
              </div>
              <div class="fixture-notice">
                <span>如果您在赢家盘口的选择在第 9 局开始时领先但最终却输掉比赛，则可赢得奖金！</span>
                <a class="link">条款与条件适用。</a>
              </div>
              <div class="groups">
                <div>
                  <BaseTab v-model="curGroupTab" :list="groupTabs" size="large" :center="false" />
                </div>
                <div class="bet-builder-sticky-header" :class="{ 'is-pc': !isMobile }" />
                <div class="search-wrap">
                  <BaseInput>
                    <template #left-icon>
                      <BaseIcon name="uni-search" />
                    </template>
                  </BaseInput>
                </div>
                <section>
                  <BaseSecondaryAccordion title="ATP / ATP上海站，中国，男单">
                    <template #side="{ isOpen }">
                      <div v-show="!isOpen" class="badge-box">
                        <BaseBadge :count="9" />
                      </div>
                    </template>
                    <template #default>
                      <div>盘口</div>
                    </template>
                  </BaseSecondaryAccordion>
                </section>
                <div class="no-markets">
                  <BaseEmpty icon="uni-empty-handicap" description="暂无可用盘口" />
                </div>
              </div>
            </div>
            <div class="sticky-column">
              <div class="iframe-widget tracker desktop widget-container">
                <div class="expand-wrapper">
                  <BaseIcon name="uni-arrow-up-big" />
                </div>
              </div>
              <div class="spotlight is-open">
                <div class="no-active-scale header">
                  <span>近期游戏记录</span>
                  <BaseButton type="text">
                    <BaseIcon name="uni-close-white" />
                  </BaseButton>
                </div>
                <div class="content is-open">
                  <div class="wrapper">
                    <div class="card-list" style="grid-template-columns: repeat(3, 1fr); gap: 30px 15px;">
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
    <AppBallRange v-model="rangeNum" title="和卡里姆" />
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-country-event-betdetail {
  .sports-detail-wrapper {
    margin-top: var(--tg-spacing-32);
    .content-wrapper {
      position: relative;
      margin-top: var(--tg-spacing-24);
      > .content {
        width: 100%;
        display: flex;
        gap: var(--tg-spacing-16);
        .fixture-column {
          display: flex;
          flex-direction: column;
          flex: auto;
          min-width: 0;
          > *+* {
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
            .wrapper.has-background {
              min-width: 250px;
              max-width: calc(100% - var(--tg-spacing-32));
              border-radius: var(--tg-radius-default);
              width: auto;
            }
            .wrapper.box-shadow {
              box-shadow: var(--tg-header-shadow);
            }
            .wrapper {
              .content {
                text-align: left;
                color: var(--tg-secondary-light);
                line-height: 1.5;
                font-size: var(--tg-font-size-default);
                font-weight: var(--tg-font-weight-normal);
                --tg-icon-color: var(--tg-text-white);
                .app-svg-icon {
                  font-size: var(--tg-font-size-base);
                }
                display: grid;
                background: var(--tg-primary-main);
                justify-items: center;
                align-items: center;
                overflow: auto;
                width: 100%;
                border-radius: var(--tg-radius-default);
                > * {
                  padding: var(--tg-spacing-8);
                }
                .heading {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  text-align: center;
                  background: var(--tg-secondary-dark);
                }
                .heading.center {
                  justify-content: center;
                  align-items: center;
                }
                .competitor-item {
                  display: flex;
                  align-items: center;
                  justify-self: stretch;
                  color: var(--tg-text-white);
                  img {
                    width: var(--tg-spacing-20);
                    height: var(--tg-spacing-20);
                    fill: var(--tg-text-lightblue);
                    margin-right: var(--tg-spacing-8);
                  }
                }
                .border {
                  border-bottom: 1px solid var(--tg-secondary-main);
                }
                .fill-frame {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;
                }
                .match-score {
                  font-weight: 700;
                  background: var(--tg-secondary-main);
                  color: var(--tg-text-white);
                }
                .match-score.completed {
                  background: var(--tg-text-lightblue);
                }
              }
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
            > *+* {
              margin-left: var(--tg-spacing-12);
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
            > *+* {
              margin-top: var(--tg-spacing-16);
            }

            .bet-builder-sticky-header {
              width: 100%;
              bottom: var(--mobile-footer-height);
              left: 0;
              z-index: var(--z-index);
              position: fixed;
              box-shadow: var(--btn-shadow);
              &.is-pc {
                position:sticky;
                top: -2px;
                bottom: auto;
                width: 100%
              }
            }
          }
        }
        .sticky-column {
          position: sticky;
          top: 0;
          z-index: var(--tg-z-index-10);
          height: -moz-min-content;
          height: min-content;
          flex: 0 0 360px;
          max-width: 360px;
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
              height: 100%;
              justify-content: center;
              left: 0;
              margin: auto;
              position: absolute;
              right: 0;
              top: 0;
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
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
