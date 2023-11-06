<script lang="ts" setup>
const route = useRoute()
const { isMobile, appContentWidth } = storeToRefs(useWindowStore())
const appStore = useAppStore()
const { isLogin } = storeToRefs(appStore)
const { bool: showRecent, setFalse: setSRFalse } = useBoolean(true)
const { bool: openLiveSwitch } = useBoolean(false)

const sport = route.params.sport
// const category = route.params.category
// const tournament = route.params.tournament
// const fixture = route.params.fixture
const rangeNum = ref()
const searchHandicap = ref('')
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
    tvChannels: [
      {
        language: 'zh',
        name: 'Huya',
        streamUrl: 'https://liveshare.huya.com/iframe/lpl?needStop=true',
      },
    ],
    __typename: 'SportFixtureDataMatch',
  },
  tournament: {
    id: '4149a2b5-2fc9-421e-a97c-88a4d6fe42ae',
    name: '印度尼西亚丙级联赛，东部',
    slug: 'liga-3',
    contentNotes: [
      {
        id: 'e88fbff3-192b-4350-818f-6890e73f83ea',
        createdAt: 'Sun, 10 Sep 2023 00:00:44 GMT',
        publishAt: 'Sat, 09 Sep 2023 23:58:00 GMT',
        expireAt: 'Sun, 18 Feb 2024 22:58:00 GMT',
        linkText: '条款与条件适用。',
        linkUrl: 'https://stake.com/promotions/promotion/nfl-3rd-quarter-payout',
        message: '如果您在赢家盘口的选择在第 9 局开始时领先但最终却输掉比赛，则可赢得奖金！',
        language: 'en',
        ref: {
          id: '470a411f-e95c-43e1-b18f-1ffefd0f0d1c',
          name: '美国橄榄球职业联盟',
          category: {
            name: '美国',
            sport: {
              name: '美式橄榄球',
            },
          },
        },
      },
    ],
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
        {
          id: '30c81d31-2bcd-4e39-8935-bbfd209c79c4',
          extId: '4',
          rank: 2062.5,
          name: '正确比赛得分',
          markets: [
            {
              id: '52fd4c15-9b4c-44ac-8aab-9b81eaa8db78',
              name: '正确比赛得分',
              status: 'active',
              extId: '4',
              specifiers: 'best_of=3|variant=best_of:3',
              customBetAvailable: false,
              provider: 'oddin',
              outcomes: [
                {
                  active: true,
                  id: 'b1e9ebe7-bc1b-44f1-a1b3-8d150a39f04f',
                  odds: 1.2,
                  name: '2:0',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '9813cfa8-6328-4b67-9617-fe4eb2fff4d0',
                  odds: 10,
                  name: '1:2',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '37d27fba-b2cf-4341-9f10-38fee1a1f9e0',
                  odds: 5,
                  name: '2:1',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
          ],
        },
        {
          add_local_is_select: true,
          id: 'bb02b075-f6e1-42b0-a81e-d09bb9b99477',
          extId: '201',
          rank: 4,
          name: '半全场赛果(1st set/match)',
          markets: [
            {
              id: '180d63f7-0d64-40ca-a3b6-7c97edf6fbc5',
              name: '半全场赛果(1st set/match)',
              status: 'active',
              extId: '201',
              specifiers: '',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: '8e86d19d-f896-4988-9eb0-1b8ee02ca48b',
                  odds: 2.7,
                  name: '刘，克莱尔/刘，克莱尔',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'bd907ebe-a4db-47de-aaf6-e5c8d3f74263',
                  odds: 7,
                  name: '露丝/刘，克莱尔',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '267357fa-9f8e-46bb-bb67-d135dbbcc7be',
                  odds: 11,
                  name: '刘，克莱尔/露丝',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'b8ac0a83-a71e-4eaa-8236-ab1d23edf700',
                  odds: 1.95,
                  name: '露丝/露丝',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
              ],
            },
          ],
        },
        {
          id: 'eba9af0f-68e5-4e5e-bffa-a3a9fefe34c1',
          extId: '214',
          rank: 11.625,
          name: '{!setnr} 盘 {gamenr} - 正确比分',
          markets: [
            {
              id: '611e1d55-8099-42e2-9228-055d2d6d90fd',
              name: '2nd 盘 2 - 正确比分',
              status: 'active',
              extId: '214',
              specifiers: 'setnr=2|gamenr=2',
              customBetAvailable: false,
              provider: 'betradar',
              outcomes: [
                {
                  active: true,
                  id: 'ebc19141-a6f2-4ce7-876a-88dcddf5b052',
                  odds: 3.6,
                  name: '贾里，尼古拉斯 到 0',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'c9e584a5-8c5f-43fc-a9d1-033dcedbfd21',
                  odds: 3.1,
                  name: '贾里，尼古拉斯 到 15',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'b5625197-0794-42ae-80c5-8cacfcc64a4e',
                  odds: 3.9,
                  name: '贾里，尼古拉斯 到 30',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '99173af0-04d0-474d-9e06-31154691c71a',
                  odds: 5.5,
                  name: '贾里，尼古拉斯 到 40',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '60e53b3a-b2e6-4e58-ad9f-b816d993138a',
                  odds: 80,
                  name: 'Schwartzman, Diego 到 0',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '17c740eb-699f-4ddb-aa29-852aa573b542',
                  odds: 29,
                  name: 'Schwartzman, Diego 到 15',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: 'cbdc6b90-f812-4164-bbc7-37b276d5c79f',
                  odds: 17.25,
                  name: 'Schwartzman, Diego 到 30',
                  customBetAvailable: false,
                  __typename: 'SportMarketOutcome',
                },
                {
                  active: true,
                  id: '6e2dcabe-1ccc-4085-bc8a-2134255ce3ec',
                  odds: 23,
                  name: 'Schwartzman, Diego 到 40',
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
  // 右侧微件url
  widgetUrl: 'https://disir.oddin.gg/lol/match?availableData=tournament&availableData=teams&availableData=players&awayTeamId=dGVhbS9vZDpjb21wZXRpdG9yOjExOTk%3D&brandToken=a91d9435-1130-42f5-88d3-00361e69b932&darkMode=true&homeTeamId=dGVhbS9vZDpjb21wZXRpdG9yOjEwMzU%3D&id=bWF0Y2gvb2Q6bWF0Y2g6NDg0NTMw&lang=zh&layout=default&t=4254007617&theme=dark&timeframe=THREE_MONTHS&tournamentId=dG91cm5hbWVudC9vZDp0b3VybmFtZW50OjQ1MzA%3D&type=teams',
})

const title = computed(() =>
  `${eventData.data.competitors.map(c => c.name).join(' VS ')} - Stake.com`)
const breadcrumb = computed(() => {
  const { id: t_id, slug: t_slug } = eventData
  const competitors = eventData.data.competitors
  const {
    id, name, slug, category: {
      id: cid, name: cname, slug: cslug, sport: {
        id: sid, name: sname, slug: sslug,
      },
    },
  } = eventData.tournament
  return [
    { path: `/sports/${sslug}`, title: sname, id: sid },
    { path: `/sports/${sslug}/${cslug}`, title: cname, id: cid },
    { path: `/sports/${sslug}/${cslug}/${slug}`, title: name, id },
    {
      path: `/sports/${sslug}/${cslug}/${slug}/${t_slug}`,
      title: competitors.map(i => i.abbreviation).join(' - '),
      id: t_id,
    },
  ]
})
const groupTabs = computed(() => eventData.groups.filter(g => g.rank > 0)
  .map(g => ({ ...g, value: g.name, label: g.translation })))
const curGroupTab = ref(groupTabs.value[0].value)
const curGroups = computed(() =>
  eventData.group.filter(g => g.name === curGroupTab.value))

function onOpenLiveSwitch() { }
function selectOutcome(v: string, tempid: string, marketid: string) {
  console.log(v, tempid, marketid)
}
function openMiniVideo() {
  useDragDialog({ type: 'live', url: '', dialogId: '123456' })
}

useTitle(title)
</script>

<template>
  <div class="tg-sports-tournament-fixture-betdetail">
    <div class="sports-detail-wrapper">
      <div class="layout-spacing no-bottom-spacing variant-normal">
        <AppNavBreadCrumb :breadcrumb="breadcrumb" />
        <div class="content-wrapper">
          <div class="content" :class="{ stacked: appContentWidth < 900 }">
            <div class="fixture-column">
              <div
                v-if="!openLiveSwitch"
                class="background match-statistics" :style="{
                  '--sport-image': `url(/img/match-statistics/${sport}.jpg)`,
                }"
              >
                <AppMatchStatistics v-if="appContentWidth >= 900" />
              </div>
              <div v-else class="livestream-wrap">
                <template v-if="isLogin">
                  <!-- <div class="wrapper">
                    <span class="tip">直播视频将在赛事进行之前开始。</span>
                  </div> -->
                  <!-- <video autoplay controls playsinline disablepictureinpicture="" controlslist="nodownload nofullscreen" class="" src="blob:https://liveshare.huya.com/72a92f58-c32f-4bd1-a287-d355b40c7b59"><track kind="captions"></video> -->
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
                  <span>请登录以观看直播。</span>
                  <div class="center">
                    <AppLoginRegisterBtns />
                  </div>
                </div>
              </div>
              <div class="live-stream-scoreboard-footer">
                <span v-show="openLiveSwitch" class="mini-video">
                  <BaseButton type="text" padding0 @click="openMiniVideo">
                    <span class="mini-video">
                      <BaseIcon name="uni-small-screen" />
                      <span>最小化</span>
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
                    :list="groupTabs"
                    size="large"
                    :center="false"
                  />
                </div>
                <div
                  class="bet-builder-sticky-header"
                  :class="{ 'is-pc': !isMobile }"
                >
                  <BaseSecondaryAccordion>
                    <template #header>
                      <div class="header-content">
                        <span class="odds h-gap">
                          <span>总赔率：</span>
                          <AppSportsOdds odds="17.00" arrow="right" />
                          <div class="error">组合不受支持。请尝试其他选择。</div>
                        </span>
                        <span class="h-gap">
                          <BaseButton bg-style="primary">加入投注单</BaseButton>
                          <BaseButton>全部清除</BaseButton>
                        </span>
                      </div>
                    </template>
                    <template #default>
                      <div class="scroll-y legs">
                        <div class="leg">
                          <span>handicap - Texas Rangers (-0.5)</span>
                          <BaseButton type="text">
                            <BaseIcon name="uni-close" />
                          </BaseButton>
                        </div>
                      </div>
                    </template>
                  </BaseSecondaryAccordion>
                </div>
                <div class="search-wrap">
                  <BaseSearch
                    v-model="searchHandicap"
                    shape="square"
                    place-holder="搜索"
                  />
                </div>
                <div v-if="!curGroups || !curGroups.length" class="no-markets">
                  <BaseEmpty icon="uni-empty-handicap" description="暂无可用盘口" />
                </div>
                <template v-for="group in curGroups" v-else :key="group.name">
                  <template v-for="temp in group.templates" :key="temp.id">
                    <BaseSecondaryAccordion :title="temp.name">
                      <template #side="{ isOpen }">
                        <div v-show="!isOpen" class="accordion-badge-wrap">
                          <BaseBadge :count="9" />
                        </div>
                      </template>
                      <template #default>
                        <div class="market" :class="{ 'in-mobile': isMobile }">
                          <template v-if="temp.add_local_is_select">
                            <template
                              v-for="market in temp.markets"
                              :key="market.id"
                            >
                              <BaseSelect
                                :options="market.outcomes.map(t =>
                                  ({ ...t, label: t.name, value: t.id }))"
                                @select="(v) =>
                                  selectOutcome(v, temp.id, market.id)"
                              />
                              <AppSportsBetButton layout="horizontal" />
                            </template>
                          </template>
                          <template v-else>
                            <template
                              v-for="market in temp.markets"
                              :key="market.id"
                            >
                              <AppSportsBetButton
                                v-for="outcome in market.outcomes"
                                :key="outcome.id"
                                layout="horizontal"
                              />
                            </template>
                          </template>
                        </div>
                      </template>
                    </BaseSecondaryAccordion>
                  </template>
                </template>

                <BaseSecondaryAccordion title="比赛地图数">
                  <template #default>
                    <div class="market" :class="{ 'in-mobile': isMobile }">
                      <div class="table" :style="{ '--itemCount': 1 }">
                        <div class="column heading">
                          <span>大</span>
                        </div>
                        <div class="column heading">
                          <span>小</span>
                        </div>
                        <div class="column">
                          <AppSportsBetButton layout="horizontal" />
                        </div>
                        <div class="column">
                          <AppSportsBetButton layout="horizontal" />
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
                <BaseSecondaryAccordion title="正确比赛得分" icon="spt-game-intl">
                  <template #side>
                    <div
                      class="odd-switch-buttons"
                    >
                      <BaseButton type="text" padding0 @click.stop="">
                        赔率滑块
                      </BaseButton>
                      <BaseButton type="text" padding0 @click.stop="">
                        全部
                      </BaseButton>
                    </div>
                  </template>
                  <template #default>
                    <div class="market" :class="{ 'in-mobile': isMobile }">
                      <div class="correct-score-wrapper">
                        <AppBallRange v-model="rangeNum" title="Team BDS" />
                        <AppBallRange title="Team Whales" />
                        <div style="display: flex;">
                          <AppSportsBetButton layout="horizontal" is-na />
                        </div>
                      </div>
                    </div>
                  </template>
                </BaseSecondaryAccordion>
                <BaseSecondaryAccordion title="至少在一张地图上获胜">
                  <template #default>
                    <div class="market" :class="{ 'in-mobile': isMobile }">
                      <div class="">
                        <div class="row">
                          <div class="column heading">
                            <span class="team-name">DetonatioN FM</span>
                          </div>
                          <div class="column">
                            <AppSportsBetButton layout="horizontal" />
                          </div>
                          <div class="column">
                            <AppSportsBetButton layout="horizontal" />
                          </div>
                        </div>
                        <div class="row">
                          <div class="column heading">
                            <span class="team-name">DetonatioN FM</span>
                          </div>
                          <div class="column">
                            <AppSportsBetButton layout="horizontal" />
                          </div>
                          <div class="column">
                            <AppSportsBetButton layout="horizontal" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </BaseSecondaryAccordion>
                <BaseSecondaryAccordion title="Match" level="1">
                  <template #default>
                    <div class="players">
                      <BaseSecondaryAccordion title="Winner" level="2">
                        <div class="players">
                          <div class="outcomes">
                            <AppSportsBetButton layout="horizontal" />
                            <AppSportsBetButton layout="horizontal" />
                          </div>
                        </div>
                      </BaseSecondaryAccordion>
                      <BaseSecondaryAccordion title="Handicap" level="2">
                        <div class="players">
                          <div class="table">
                            <div class="column">
                              <div class="heading">
                                <span>Los Angeles Chargers</span>
                              </div>
                              <div class="outcome-line">
                                <AppSportsBetButton layout="horizontal" />
                              </div>
                              <div class="outcome-line">
                                <AppSportsBetButton layout="horizontal" />
                              </div>
                            </div>
                            <div class="column">
                              <div class="heading">
                                <span>Los Angeles Chargers</span>
                              </div>
                              <div class="outcome-line">
                                <AppSportsBetButton layout="horizontal" />
                              </div>
                              <div class="outcome-line">
                                <AppSportsBetButton layout="horizontal" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </BaseSecondaryAccordion>
                      <BaseSecondaryAccordion title="Total" level="2">
                        <div class="players">
                          <div class="row">
                            <div class="prop">
                              <div class="lines-wrap">
                                <div class="lines">
                                  <BaseSwiper
                                    :data="[
                                      { value: '50.5', label: '50.5' },
                                      { value: '60.5', label: '60.5' },
                                    ]"
                                  />
                                </div>
                              </div>
                              <div class="outcomes">
                                <AppSportsBetButton layout="horizontal" />
                                <AppSportsBetButton layout="horizontal" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </BaseSecondaryAccordion>
                    </div>
                  </template>
                </BaseSecondaryAccordion>
              </div>
            </div>
            <div v-if="appContentWidth >= 900" class="sticky-column">
              <div class="iframe-widget tracker desktop widget-container">
                <div
                  class="iframe-box"
                >
                  <iframe
                    title="url"
                    src="https://disir.oddin.gg/lol/scoreboard?brandToken=a91d9435-1130-42f5-88d3-00361e69b932&darkMode=true&id=bWF0Y2gvb2Q6bWF0Y2g6NTAyNzY0&lang=zh&layout=&t=959746778&theme=dark"
                    scrolling="yes"
                    height="219"
                    class=""
                  />
                </div>
              </div>
              <div class="iframe-widget tracker desktop widget-container">
                <div
                  class="iframe-box"
                >
                  <iframe
                    title="url"
                    :src="eventData.widgetUrl"
                    scrolling="yes"
                    height="730"
                    class=""
                  />
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

.odd-switch-buttons {
  display: flex;
  gap: var(--tg-spacing-12);
  align-items: center;
  justify-content: stretch;
  padding-right: var(--tg-spacing-12);
  button {
    white-space: nowrap;
  }
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
.players {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 2px solid var(--tg-primary-main);
  background: var(--tg-secondaryAccordion-header-background);
  padding: var(--tg-spacing-8);
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-normal);
  line-height: 1.5;
  .table {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-auto-flow: row;
    justify-items: center;
    gap: var(--tg-spacing-12);
  }
  .column {
    width: 100%;
    text-align: center;
  }
  .heading, .outcome-line {
    margin-bottom: var(--tg-spacing-4);
  }
  .row:first-of-type {
    padding-top: 0;
  }

  .row:last-of-type {
    padding-bottom: 0;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    padding: var(--tg-spacing-8) 0 var(--tg-spacing-12);
  }
  .prop {
    display: flex;
    flex: 1;
  }
  .outcomes {
    display: flex;
    gap: 10px;
    flex: 1.8;
  }
  .lines-wrap {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
  }
  .lines {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    position: relative;
  }
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

  .correct-score-wrapper {
    display: grid;
    color: var(--tg-text-white);
    width: 100%;
    align-items: center;
    grid-gap: var(--tg-spacing-16);
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    padding: 0 var(--tg-spacing-8);
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

            .bet-builder-sticky-header {
              width: 100%;
              bottom: var(--tg-footerbar-height);
              left: 0;
              z-index: 5;
              position: fixed;
              box-shadow: var(--tg-box-shadow), var(--tg-shadow-inset);

              &.is-pc {
                position: sticky;
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
