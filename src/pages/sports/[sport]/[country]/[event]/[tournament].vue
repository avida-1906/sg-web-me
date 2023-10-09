<script lang="ts" setup>
type Qualifier = 'home' | 'away'

const route = useRoute()

const rangeNum = ref()
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

function mapHeadArea(head: Array<{ key: string; periodScores?: Array<{ [prop: string]: any }> }>, label: string) {
  return head.reduce((accumulator: any, currentValue) => {
    if (currentValue.periodScores && currentValue.periodScores.length)
      accumulator.push(...currentValue.periodScores.map((p, idx) => ({ ...p, key: currentValue.key, name: `${currentValue.key}_${label}_${idx}`, qualifier: label })))
    else
      accumulator.push({ ...currentValue, name: `${currentValue.key}_${label}`, qualifier: label })

    return accumulator
  }, [])
}
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
                    <div class="heading center" style="grid-area: period_title_0;">
                      <span>1st</span>
                    </div>
                    <span class="fill-frame border" style="grid-area: period_home_0;">
                      <span>0</span>
                    </span>
                    <span class="fill-frame" style="grid-area: period_away_0;">
                      <span>1</span>
                    </span>

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

                    <!-- <div v-for="s in scoreBoard.headTitle" :key="s.key" :style="{ 'grid-area': s.name }" class="heading">
                      {{ s.title || s.icon }}
                    </div>
                    <div v-for="s in scoreBoard.headHome" :key="s.key" :style="{ 'grid-area': s.name }">
                      {{ s.value() }}
                    </div>
                    <div v-for="s in scoreBoard.headAway" :key="s.key" :style="{ 'grid-area': s.name }">
                      {{ s.value() }}
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="live-stream-scoreboard-footer" />
              <div class="groups" />
            </div>
            <div class="sticky-column">
              2
            </div>
          </div>
        </div>
      </div>
    </div>
    当前国家某种赛事的其中具体的一场对局赛事盘口详情 {{ rangeNum }}
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
        }
        .sticky-column {
          position: sticky;
          top: 0;
          z-index: var(--tg-z-index-10);
          height: -moz-min-content;
          height: min-content;
          flex: 0 0 360px;
          max-width: 360px;
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
