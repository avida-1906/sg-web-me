<script lang="ts" setup>
const route = useRoute()

const sport = route.params.sport
const international = route.params.international

const data = {
  id: 'acadd537-9fdd-41ac-9901-ad9dac94bb5f',
  name: 'International',
  slug: 'international-3',
  sport: {
    id: '0159ee25-ef86-49f4-a01c-1b5040a98e05',
    name: 'CS:GO/CS2',
    templates: [
      {
        id: 'd409ddd5-594a-41ba-995c-0496b4a041fa',
        name: '比赛让分',
        extId: '2',
      },
      {
        id: 'e157c083-f626-489f-af1a-8b9ccfa32914',
        name: '比赛地图数',
        extId: '3',
      },
      {
        id: '582210ce-1635-445a-a305-50fdab8b27c7',
        name: '地图{map}获胜者 - {way} 路线',
        extId: '6',
      },
      {
        id: '30c81d31-2bcd-4e39-8935-bbfd209c79c4',
        name: '正确比赛得分',
        extId: '4',
      },
      {
        id: 'c210585e-73ac-465d-beaf-af72a7007e78',
        name: '比赛获胜者 - {way} 路线',
        extId: '1',
      },
      {
        id: '28eafced-2ac8-4ea1-89c2-3c2867069676',
        name: '至少在一张地图上获胜',
        extId: '37',
      },
    ],
  },
  firstTournament: [
    {
      id: '84934328-fee9-4851-a0f4-8487f393cc29',
      name: '2023 年悉尼英特尔极限大师赛',
      fixtureCount: 7,
      fixtureList: [
        {
          id: '5c005c46-c42d-4420-9efd-80298d4ec8c9',
          betradarStream: {
            exists: false,
          },
          imgArenaStream: null,
          abiosStream: {
            exists: false,
            stream: {
              startTime: null,
              id: 512125,
            },
          },
          geniussportsStream: {
            exists: false,
          },
          status: 'live',
          slug: '34280-fnatic-cloud9',
          name: 'Fnatic - Cloud9',
          provider: 'oddin',
          marketCount: 5,
          extId: 'od:match:512125',
          liveWidgetUrl: null,
          widgetUrl: 'https://disir.oddin.gg/csgo/match?availableData=tournament&availableData=teams&availableData=players&awayTeamId=dGVhbS9vZDpjb21wZXRpdG9yOjEyMQ%3D%3D&brandToken=a91d9435-1130-42f5-88d3-00361e69b932&darkMode=true&homeTeamId=dGVhbS9vZDpjb21wZXRpdG9yOjM4&id=bWF0Y2gvb2Q6bWF0Y2g6NTEyMTI1&lang=zh&layout=default&t=618602839&theme=dark&timeframe=THREE_MONTHS&tournamentId=dG91cm5hbWVudC9vZDp0b3VybmFtZW50OjQ2NDA%3D&type=teams',
          data: {
            __typename: 'SportFixtureDataMatch',
            startTime: 'Mon, 16 Oct 2023 04:23:00 GMT',
            competitors: [
              {
                name: 'Fnatic',
                extId: 'od:competitor:38',
                countryCode: null,
                abbreviation: 'Fnatic',
                iconPath: 'https://cdn.oddin.gg/assets/teams/icons/fnatic.png',
              },
              {
                name: 'Cloud9',
                extId: 'od:competitor:121',
                countryCode: null,
                abbreviation: 'C9',
                iconPath: 'https://cdn.oddin.gg/assets/teams/icons/cloud9.png',
              },
            ],
            teams: [
              {
                name: 'Fnatic',
                qualifier: 'home',
              },
              {
                name: 'Cloud9',
                qualifier: 'away',
              },
            ],
            tvChannels: [
              {
                language: 'en',
                name: 'Twitch',
                streamUrl: 'https://www.twitch.tv/ESLCS',
              },
              {
                language: 'fr',
                name: 'Twitch',
                streamUrl: 'https://www.twitch.tv/1pvcs',
              },
              {
                language: 'es',
                name: 'Twitch',
                streamUrl: 'https://www.twitch.tv/esl_csgo_es',
              },
            ],
          },
          tournament: {
            id: '84934328-fee9-4851-a0f4-8487f393cc29',
            name: '2023 年悉尼英特尔极限大师赛',
            slug: 'intel-extreme-masters-sydney-2023',
            category: {
              id: 'acadd537-9fdd-41ac-9901-ad9dac94bb5f',
              name: 'International',
              slug: 'international-3',
              sport: {
                id: '0159ee25-ef86-49f4-a01c-1b5040a98e05',
                name: 'CS:GO/CS2',
                slug: 'counter-strike',
              },
            },
          },
          eventStatus: {
            matchStatus: '一号地图',
            homeScore: 0,
            awayScore: 0,
            scoreboard: {
              homeGold: null,
              awayGold: null,
              homeGoals: null,
              awayGoals: null,
              homeKills: null,
              awayKills: null,
              gameTime: null,
              homeDestroyedTowers: null,
              awayDestroyedTurrets: null,
              currentRound: 19,
              currentCtTeam: 1,
              currentDefTeam: null,
              time: null,
              awayWonRounds: 9,
              homeWonRounds: 9,
              remainingGameTime: null,
            },
            periodScores: [
              {
                type: 'map',
                number: 1,
                awayGoals: null,
                awayKills: null,
                awayScore: 0,
                homeGoals: null,
                homeKills: null,
                homeScore: 0,
                awayWonRounds: null,
                homeWonRounds: null,
                matchStatus: '一号地图',
              },
            ],
            __typename: 'EsportFixtureEventStatus',
          },
          groups: [
            {
              name: 'main',
              translation: '主页',
              rank: 1124,
              templates: [
                {
                  extId: '1',
                  rank: 500,
                  name: '比赛获胜者 - {way} 路线',
                  markets: [
                    {
                      id: '9a55c5dd-dc9a-4258-88f0-f366d7826db4',
                      name: '比赛获胜者 - Two 路线',
                      status: 'active',
                      extId: '1',
                      specifiers: 'variant=way:two|way=two',
                      customBetAvailable: false,
                      provider: 'oddin',
                      outcomes: [
                        {
                          active: true,
                          id: '6031cdf6-545c-4344-a57d-ea4b07901cec',
                          odds: 1.85,
                          name: 'Fnatic',
                          customBetAvailable: false,
                          __typename: 'SportMarketOutcome',
                        },
                        {
                          active: true,
                          id: '994e7fcb-8669-4634-9d9c-eae3a7b32705',
                          odds: 1.85,
                          name: 'Cloud9',
                          customBetAvailable: false,
                          __typename: 'SportMarketOutcome',
                        },
                      ],
                    },
                  ],
                },
                {
                  extId: '2',
                  rank: 495,
                  name: '比赛让分',
                  markets: [],
                },
                {
                  extId: '3',
                  rank: 490,
                  name: '比赛地图数',
                  markets: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  tournamentList: [
    {
      id: '84934328-fee9-4851-a0f4-8487f393cc29',
      name: '2023 年悉尼英特尔极限大师赛',
      slug: 'intel-extreme-masters-sydney-2023',
      fixtureCount: 7,
    },
    {
      id: '044e1433-826e-406e-bea4-3ea044e730aa',
      name: '欧洲职业联赛第 11 赛季 - 分区 2',
      slug: 'european-pro-league-season-6-division-2',
      fixtureCount: 1,
    },
    {
      id: '728ca767-214e-49ce-9895-76218af437e1',
      name: 'ESL 挑战者联赛第 46 赛季：欧洲',
      slug: 'esl-challenger-league-season-46-europe',
      fixtureCount: 2,
    },
    {
      id: '29eef5fa-a439-4d74-b7bd-4f6ed4800308',
      name: 'ESL 挑战者联赛第 46 赛季：北美赛区',
      slug: 'esl-challenger-league-season-46-north-america',
      fixtureCount: 1,
    },
    {
      id: '6c79361b-623c-4bcf-805b-709613de226c',
      name: 'CS2: Compass Fall 2023',
      slug: 'cs2-compass-fall-2023',
      fixtureCount: 2,
    },
    {
      id: '142488fd-f5d3-4a9e-b054-e0450c7e94f2',
      name: 'CCT 东欧系列 3',
      slug: 'cct-east-europe-series-3',
      fixtureCount: 1,
    },
    {
      id: '008682fe-10ae-4fef-b9c7-73b30669e3a3',
      name: 'ESL Impact League Season 4: South American Division',
      slug: 'esl-impact-league-season-4-south-american-division',
      fixtureCount: 1,
    },
    {
      id: '5ceb4904-d03c-4f41-b8f1-f157e43db46f',
      name: 'ESL Impact League Season 4: North American Division',
      slug: 'esl-impact-league-season-4-north-american-division',
      fixtureCount: 2,
    },
    {
      id: 'ef1d24d7-45aa-444e-9f21-61d7c3d30e8a',
      name: 'ESL 冲击联赛第 4 赛季：欧洲区',
      slug: 'esl-impact-league-season-4-european-division',
      fixtureCount: 2,
    },
  ],
}

const isStandard = ref(true)
const baseType = ref('winner')

const breadcrumb = computed(() => [
  { path: `/sports/${sport}`, title: data.sport.name, id: data.sport.id },
  { path: `/sports/${sport}/${international}`, title: data.name, id: data.id },
])
const tabs = computed(() => [
  { value: 'live-upcoming', label: '滚球与即将开赛的盘口' },
  { value: 'outrights', label: '冠军投注' },
  { value: 'all', label: `全部 ${sport}` },
])

const curTab = ref(tabs.value[0].value)

function onBaseTypeChange(v: string) {
  baseType.value = v
}
</script>

<template>
  <div class="tg-sports-international-index">
    <div class="layout-spacing variant-normal no-bottom-spacing">
      <AppNavBreadCrumb :breadcrumb="breadcrumb" />
      <div class="sports-page-title">
        <div class="left">
          <BaseTab v-model="curTab" :list="tabs" size="large" :center="false" />
        </div>
        <AppSportsMarketTypeSelect
          v-model="isStandard" :base-type="baseType"
          @base-type-change="onBaseTypeChange"
        />
      </div>
      <div class="layout-spacing no-bottom-spacing sort-tournament" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sort-tournament >*+* {
  margin-top: var(--tg-spacing-12);
}
.tg-sports-international-index {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
