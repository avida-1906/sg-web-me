<script lang="ts" setup>
const route = useRoute()
const { currentProvider } = storeToRefs(useSportsStore())

const sport = route.params.sport
const category = route.params.category
const tournament = route.params.tournament

const data = {
  id: '470a411f-e95c-43e1-b18f-1ffefd0f0d1c',
  name: '美国橄榄球职业联盟',
  slug: 'nfl',
  activeFixtureCount: 29,
  liveFixtureCount: 0,
  popularFixtureCount: 13,
  category: {
    id: 'aee987f9-43e5-4929-bbcd-6a4cf2c03ec9',
    name: '美国',
    sport: {
      id: '124e677c-9ded-4ef9-97d7-d8899f9824cb',
      name: '美式橄榄球',
      templates: [
        {
          id: 'ef6ae46c-e02d-48fe-ab8e-b55d42ec6f60',
          name: '{$competitor2}总数 (包含加时)',
          extId: '228',
        },
        {
          id: '016a1bab-6fd4-4d15-88db-bcd7fdb435b0',
          name: '{$competitor1} 总数 (包含加时)',
          extId: '227',
        },
        {
          id: 'ada38053-ff54-4340-88c5-bc8bc9e45fa0',
          name: '获胜者 (包含加时)',
          extId: '219',
        },
        {
          id: 'f217317d-d32a-40f6-ab8d-b892646ee551',
          name: '半场/全场',
          extId: '47',
        },
        {
          id: '806b496b-4f5a-4b7b-9e27-219af08597b0',
          name: '总得分 (包含加时)',
          extId: '225',
        },
        {
          id: 'e448c3a7-ecce-4621-80a0-96dbf840df68',
          name: '盘口 (包含加时)',
          extId: '223',
        },
        {
          id: '1022266a-3c0b-44bb-bbb2-4e6d60871800',
          name: '胜平负',
          extId: '1',
        },
      ],
      allGroups: [
        {
          name: 'main',
          translation: '主页',
          rank: 8,
          id: 'ca7306b9-4899-4091-9bad-d5682559e7db',
        },
        {
          name: 'half',
          translation: '半场',
          rank: 7,
          id: 'ddf28b96-77aa-42d0-b7d0-23711765e7a5',
        },
        {
          name: 'quarters',
          translation: '赛节',
          rank: 6,
          id: 'c5cd54c7-4162-480d-9ffd-fffaf05d0214',
        },
        {
          name: 'Outright',
          translation: 'sport_group.outright',
          rank: 2,
          id: 'ea0c163d-076d-44f8-a639-b2b3107db47e',
        },
        {
          name: 'specials',
          translation: '特殊投注',
          rank: 1,
          id: '56546769-9135-435f-a81f-72a3830e703d',
        },
        {
          name: 'Total',
          translation: '总分盘',
          rank: 0,
          id: 'ec198d09-9290-4345-9649-3976963dd356',
        },
        {
          name: 'Handicap',
          translation: '让分盘',
          rank: 0,
          id: '1ca4b8e4-4c16-4e3d-ac9f-740e0f4fd90f',
        },
        {
          name: 'threeway',
          translation: '三项让分盘',
          rank: 0,
          id: '19955848-44cf-4c5a-aaec-886568d63a03',
        },
        {
          name: 'winner',
          translation: '获胜盘',
          rank: 0,
          id: '8190ba8b-2518-426d-a29d-d6d7f1f8c3f2',
        },
      ],
    },
  },
  fixtureList: [
    {
      id: 'af9cb60a-519e-463c-aae2-b041d9646b73',
      betradarStream: {
        exists: false,
      },
      imgArenaStream: null,
      abiosStream: null,
      geniussportsStream: {
        exists: true,
      },
      status: 'active',
      slug: '43743872-new-orleans-saints-jacksonville-jaguars',
      name: '新奥尔良圣徒 - 杰克逊维尔美洲虎美式足球队',
      provider: 'betradar',
      marketCount: 45,
      extId: 'sr:match:41209343',
      liveWidgetUrl: null,
      widgetUrl: null,
      data: {
        __typename: 'SportFixtureDataMatch',
        startTime: 'Fri, 20 Oct 2023 00:15:00 GMT',
        competitors: [
          {
            name: '新奥尔良圣徒',
            extId: 'sr:competitor:4425',
            countryCode: 'US',
            abbreviation: 'NO',
            iconPath: null,
          },
          {
            name: '杰克逊维尔美洲虎美式足球队',
            extId: 'sr:competitor:4386',
            countryCode: 'US',
            abbreviation: 'JAX',
            iconPath: null,
          },
        ],
        teams: [
          {
            name: '新奥尔良圣徒',
            qualifier: 'home',
          },
          {
            name: '杰克逊维尔美洲虎美式足球队',
            qualifier: 'away',
          },
        ],
        tvChannels: null,
      },
      tournament: {
        id: '470a411f-e95c-43e1-b18f-1ffefd0f0d1c',
        name: '美国橄榄球职业联盟',
        slug: 'nfl',
        category: {
          id: 'aee987f9-43e5-4929-bbcd-6a4cf2c03ec9',
          name: '美国',
          slug: 'usa',
          sport: {
            id: '124e677c-9ded-4ef9-97d7-d8899f9824cb',
            name: '美式橄榄球',
            slug: 'american-football',
          },
        },
        frontRowSeatEvent: null,
      },
      eventStatus: {
        __typename: 'SportFixtureEventStatusData',
        homeScore: null,
        awayScore: null,
        matchStatus: '未开始',
        clock: {
          matchTime: null,
          remainingTime: null,
        },
        periodScores: null,
        currentTeamServing: null,
        homeGameScore: '0',
        awayGameScore: '0',
        statistic: {
          yellowCards: {
            away: null,
            home: null,
          },
          redCards: {
            away: null,
            home: null,
          },
          corners: {
            home: null,
            away: null,
          },
        },
      },
      frontRowSeatFight: null,
      groups: [
        {
          name: 'main',
          translation: '主页',
          rank: 8,
          templates: [
            {
              extId: '219',
              rank: 16,
              name: '获胜者 (包含加时)',
              markets: [
                {
                  id: '1e5812b9-9966-48ec-8175-15d903b78443',
                  name: '获胜者 (包含加时)',
                  status: 'active',
                  extId: '219',
                  specifiers: '',
                  customBetAvailable: false,
                  provider: 'betradar',
                  outcomes: [
                    {
                      active: true,
                      id: '74429a6f-1c47-4b50-bc86-085c6ef85c35',
                      odds: 1.83,
                      name: '新奥尔良圣徒',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                    {
                      active: true,
                      id: '6968555a-cf96-47d7-8a50-b81ac6a2b20a',
                      odds: 1.98,
                      name: '杰克逊维尔美洲虎美式足球队',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                  ],
                },
              ],
            },
            {
              extId: '223',
              rank: 15.875,
              name: '盘口 (包含加时)',
              markets: [
                {
                  id: 'eb225973-f5e2-43a4-98e8-19e795164f60',
                  name: '盘口 (包含加时)',
                  status: 'active',
                  extId: '223',
                  specifiers: 'hcp=0',
                  customBetAvailable: false,
                  provider: 'betradar',
                  outcomes: [
                    {
                      active: true,
                      id: '1d19c8fb-748e-4f7b-aae4-b5407a52ef2b',
                      odds: 1.82,
                      name: '新奥尔良圣徒 (0)',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                    {
                      active: true,
                      id: 'b37c5268-e20c-45a9-8f86-673dc7d3d399',
                      odds: 1.96,
                      name: '杰克逊维尔美洲虎美式足球队 (0)',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                  ],
                },
              ],
            },
            {
              extId: '225',
              rank: 15.765625,
              name: '总得分 (包含加时)',
              markets: [
                {
                  id: 'ce95ae88-13bf-4670-b2d8-abc48096779b',
                  name: '总得分 (包含加时)',
                  status: 'active',
                  extId: '225',
                  specifiers: 'total=35.5',
                  customBetAvailable: false,
                  provider: 'betradar',
                  outcomes: [
                    {
                      active: true,
                      id: '7eb2725b-bf2e-42e2-bbd1-526027a73c80',
                      odds: 1.58,
                      name: '高于35.5',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                    {
                      active: true,
                      id: '4a9cb188-f4c2-4f0c-a109-1ac3f4f7da21',
                      odds: 2.47,
                      name: '低于35.5',
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
    },
    {
      id: '4099ec67-a8b9-4e66-bf3a-a0f970c87b56',
      betradarStream: {
        exists: false,
      },
      imgArenaStream: null,
      abiosStream: null,
      geniussportsStream: {
        exists: false,
      },
      status: 'active',
      slug: '43749747-baltimore-ravens-detroit-lions',
      name: '巴尔的摩乌鸦 - 底特律雄狮',
      provider: 'betradar',
      marketCount: 44,
      extId: 'sr:match:41209345',
      liveWidgetUrl: null,
      widgetUrl: null,
      data: {
        __typename: 'SportFixtureDataMatch',
        startTime: 'Sun, 22 Oct 2023 17:00:00 GMT',
        competitors: [
          {
            name: '巴尔的摩乌鸦',
            extId: 'sr:competitor:4413',
            countryCode: 'US',
            abbreviation: 'BAL',
            iconPath: null,
          },
          {
            name: '底特律雄狮',
            extId: 'sr:competitor:4419',
            countryCode: 'US',
            abbreviation: 'DET',
            iconPath: null,
          },
        ],
        teams: [
          {
            name: '巴尔的摩乌鸦',
            qualifier: 'home',
          },
          {
            name: '底特律雄狮',
            qualifier: 'away',
          },
        ],
        tvChannels: null,
      },
      tournament: {
        id: '470a411f-e95c-43e1-b18f-1ffefd0f0d1c',
        name: '美国橄榄球职业联盟',
        slug: 'nfl',
        category: {
          id: 'aee987f9-43e5-4929-bbcd-6a4cf2c03ec9',
          name: '美国',
          slug: 'usa',
          sport: {
            id: '124e677c-9ded-4ef9-97d7-d8899f9824cb',
            name: '美式橄榄球',
            slug: 'american-football',
          },
        },
        frontRowSeatEvent: null,
      },
      eventStatus: {
        __typename: 'SportFixtureEventStatusData',
        homeScore: null,
        awayScore: null,
        matchStatus: '未开始',
        clock: {
          matchTime: null,
          remainingTime: null,
        },
        periodScores: null,
        currentTeamServing: null,
        homeGameScore: '0',
        awayGameScore: '0',
        statistic: {
          yellowCards: {
            away: null,
            home: null,
          },
          redCards: {
            away: null,
            home: null,
          },
          corners: {
            home: null,
            away: null,
          },
        },
      },
      frontRowSeatFight: null,
      groups: [
        {
          name: 'main',
          translation: '主页',
          rank: 8,
          templates: [
            {
              extId: '219',
              rank: 16,
              name: '获胜者 (包含加时)',
              markets: [
                {
                  id: 'a1bea742-e235-40d8-ba9c-ba779e782227',
                  name: '获胜者 (包含加时)',
                  status: 'active',
                  extId: '219',
                  specifiers: '',
                  customBetAvailable: false,
                  provider: 'betradar',
                  outcomes: [
                    {
                      active: true,
                      id: '9b267ece-b776-4c2b-a55b-dd06b898310b',
                      odds: 1.62,
                      name: '巴尔的摩乌鸦',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                    {
                      active: true,
                      id: 'b598ab65-69b5-4ae1-b04c-a81a723c117a',
                      odds: 2.34,
                      name: '底特律雄狮',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                  ],
                },
              ],
            },
            {
              extId: '223',
              rank: 15.875,
              name: '盘口 (包含加时)',
              markets: [
                {
                  id: '8fbd1b07-c118-41d5-9dba-6253c047ef43',
                  name: '盘口 (包含加时)',
                  status: 'active',
                  extId: '223',
                  specifiers: 'hcp=-0.5',
                  customBetAvailable: false,
                  provider: 'betradar',
                  outcomes: [
                    {
                      active: true,
                      id: '0c855c87-0cfa-4712-8ab0-37d0b8fba345',
                      odds: 1.62,
                      name: '巴尔的摩乌鸦 (-0.5)',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                    {
                      active: true,
                      id: 'd213c95e-e7b7-4e35-88ce-bbab4fb67040',
                      odds: 2.34,
                      name: '底特律雄狮 (0.5)',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                  ],
                },
              ],
            },
            {
              extId: '225',
              rank: 15.765625,
              name: '总得分 (包含加时)',
              markets: [
                {
                  id: 'f418544c-9e4b-43a1-9694-8e79467a8fe8',
                  name: '总得分 (包含加时)',
                  status: 'active',
                  extId: '225',
                  specifiers: 'total=38.5',
                  customBetAvailable: false,
                  provider: 'betradar',
                  outcomes: [
                    {
                      active: true,
                      id: '0a719c71-a94a-4bae-ac66-949e405c7a80',
                      odds: 1.62,
                      name: '高于38.5',
                      customBetAvailable: false,
                      __typename: 'SportMarketOutcome',
                    },
                    {
                      active: true,
                      id: 'cacc5453-a096-4b2a-91d2-0455e42af063',
                      odds: 2.37,
                      name: '低于38.5',
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
    },
  ],
}
const { bool: isStandard } = useBoolean(true)
const baseType = ref('winner')

const breadcrumb = computed(() => [
  {
    path: `/sports/${currentProvider}/${sport}`,
    title: data.category.sport.name,
    id: data.category.sport.id,
  },
  {
    path: `/sports/${currentProvider}/${sport}/${category}`,
    title: data.category.name,
    id: data.category.id,
  },
  // eslint-disable-next-line max-len
  { path: `/sports/${currentProvider}/${sport}/${category}/${tournament}`, title: data.name, id: data.id },
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
  <div class="tg-sports-tournament-index">
    <div class="layout-spacing variant-normal">
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
      <div class="layout-spacing no-bottom-spacing sort-tournament">
        <template v-for="item, idx in data.fixtureList" :key="item.id">
          <AppSportsMarket :tournament="item" :auto-show="idx === 0" />
        </template>
      </div>
    </div>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.sort-tournament >*+* {
  margin-top: var(--tg-spacing-12);
}
.tg-sports-tournament-index {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
