<script lang="ts" setup>
const route = useRoute()

// slugSport slugCategory slugTournament (两层 一层 一层)
const data = {
  id: '8c7aea57-e9b1-414f-a095-206740716b4f',
  name: '网球',
  firstTournament: [
    {
      id: 'e84762ad-9781-4fde-b2b7-1243b17eb07c',
      name: 'ATP上海站，中国，男单',
      fixtureCount: 3,
      fixtureList: [
        {
          id: 'd001b39d-345a-4baa-a3a9-53a6f3fc21a4',
          status: 'active',
          slug: '43882414-qf1-qf2',
          name: '迪米托夫 - 贾里，尼古拉斯',
          marketCount: 18,
          extId: 'sr:match:44100366',
          liveWidgetUrl: '',
          widgetUrl: '',
          // data: {
          //   __typename: 'SportFixtureDataMatch',
          //   startTime: 'Fri, 13 Oct 2023 08:30:00 GMT',
          //   competitors: [
          //     {
          //       name: '迪米托夫',
          //       extId: 'sr:competitor:23581',
          //       countryCode: 'BG',
          //       abbreviation: '迪米托',
          //       iconPath: null,
          //     },
          //     {
          //       name: '贾里，尼古拉斯',
          //       extId: 'sr:competitor:89632',
          //       countryCode: 'CL',
          //       abbreviation: '贾里，',
          //       iconPath: null,
          //     },
          //   ],
          //   teams: [
          //     {
          //       name: '迪米托夫',
          //       qualifier: 'home',
          //     },
          //     {
          //       name: '贾里，尼古拉斯',
          //       qualifier: 'away',
          //     },
          //   ],
          //   tvChannels: null,
          // },
          tournament: {
            id: 'e84762ad-9781-4fde-b2b7-1243b17eb07c',
            name: 'ATP上海站，中国，男单',
            slug: 'atp-shanghai-china-men-singles',
            category: {
              id: '5102f1bc-58c5-435e-aff4-d9c71c0ad30c',
              name: 'ATP',
              slug: 'atp',
              sport: {
                id: '8c7aea57-e9b1-414f-a095-206740716b4f',
                name: '网球',
                slug: 'tennis',
              },
            },
          },
          // eventStatus: {
          //   __typename: 'SportFixtureEventStatusData',
          //   homeScore: null,
          //   awayScore: null,
          //   matchStatus: '未开始',
          //   clock: {
          //     matchTime: null,
          //     remainingTime: null,
          //   },
          //   periodScores: null,
          //   currentTeamServing: null,
          //   homeGameScore: '0',
          //   awayGameScore: '0',
          //   statistic: {
          //     yellowCards: {
          //       away: null,
          //       home: null,
          //     },
          //     redCards: {
          //       away: null,
          //       home: null,
          //     },
          //     corners: {
          //       home: null,
          //       away: null,
          //     },
          //   },
          // },
          // groups: [
          //   {
          //     name: 'winner',
          //     translation: '获胜盘',
          //     rank: 0,
          //     templates: [
          //       {
          //         extId: '186',
          //         rank: 2,
          //         name: '获胜',
          //         markets: [
          //           {
          //             id: 'efb9bd8b-136f-4222-9d56-1a355350b890',
          //             name: '获胜',
          //             status: 'active',
          //             extId: '186',
          //             specifiers: '',
          //             customBetAvailable: false,
          //             provider: 'betradar',
          //             outcomes: [
          //               {
          //                 active: true,
          //                 id: 'faf52eba-08b9-4456-a35b-cd221d6f9622',
          //                 odds: 1.49,
          //                 name: '迪米托夫',
          //                 customBetAvailable: false,
          //                 __typename: 'SportMarketOutcome',
          //               },
          //               {
          //                 active: true,
          //                 id: 'a720a098-431b-4a6a-99e7-bdf23f9beb13',
          //                 odds: 2.7,
          //                 name: '贾里，尼古拉斯',
          //                 customBetAvailable: false,
          //                 __typename: 'SportMarketOutcome',
          //               },
          //             ],
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
  ],
  tournamentList: [
    {
      id: 'e84762ad-9781-4fde-b2b7-1243b17eb07c',
      name: 'ATP上海站，中国，男单',
      slug: 'atp-shanghai-china-men-singles',
      fixtureCount: 3,
      category: {
        id: '5102f1bc-58c5-435e-aff4-d9c71c0ad30c',
        slug: 'atp',
        name: 'ATP',
        countryCode: '',
      },
    },
    {
      id: 'd2020de1-3fb3-491f-bf4a-765ef2e3371d',
      name: 'WTA首尔，韩国，单打',
      slug: 'wta-seoul-korea-republic-women-singles',
      fixtureCount: 3,
      category: {
        id: '71a98070-c267-4885-93a2-7c912702f1d1',
        slug: 'wta',
        name: 'WTA',
        countryCode: '',
      },
    },
    {
      id: '4870977f-a813-41a6-ae9e-6a877faa7a14',
      name: 'WAT中国香港，单打',
      slug: 'wta-hong-kong-hong-kong-women-singles',
      fixtureCount: 4,
      category: {
        id: '71a98070-c267-4885-93a2-7c912702f1d1',
        slug: 'wta',
        name: 'WTA',
        countryCode: '',
      },
    },
    {
      id: '746fcb56-a26b-4f9d-98d5-5889c4496ded',
      name: 'WTA郑州，中国，单打',
      slug: 'wta-zhengzhou-china-women-singles',
      fixtureCount: 3,
      category: {
        id: '71a98070-c267-4885-93a2-7c912702f1d1',
        slug: 'wta',
        name: 'WTA',
        countryCode: '',
      },
    },
    {
      id: '3970926b-4e52-448d-b70e-2f078397176c',
      name: 'WTA郑州，中国，双打',
      slug: 'wta-zhengzhou-china-women-doubles',
      fixtureCount: 2,
      category: {
        id: '71a98070-c267-4885-93a2-7c912702f1d1',
        slug: 'wta',
        name: 'WTA',
        countryCode: '',
      },
    },
  ],
  categoryList: [
    {
      id: '5102f1bc-58c5-435e-aff4-d9c71c0ad30c',
      slug: 'atp',
      name: 'ATP',
      countryCode: null,
      fixtureCount: 5,
      tournamentList: [
        {
          id: 'e84762ad-9781-4fde-b2b7-1243b17eb07c',
          slug: 'atp-shanghai-china-men-singles',
          name: 'ATP上海站，中国，男单',
          fixtureCount: 3,
        },
        {
          id: 'cc5d82da-fc18-4600-adea-e5ae37278613',
          slug: 'atp-shanghai-china-men-doubles',
          name: 'ATP上海站，中国，男双',
          fixtureCount: 2,
        },
      ],
    },
    {
      id: '71a98070-c267-4885-93a2-7c912702f1d1',
      slug: 'wta',
      name: 'WTA',
      countryCode: null,
      fixtureCount: 16,
      tournamentList: [
        {
          id: 'd2020de1-3fb3-491f-bf4a-765ef2e3371d',
          slug: 'wta-seoul-korea-republic-women-singles',
          name: 'WTA首尔，韩国，单打',
          fixtureCount: 3,
        },
        {
          id: '746fcb56-a26b-4f9d-98d5-5889c4496ded',
          slug: 'wta-zhengzhou-china-women-singles',
          name: 'WTA郑州，中国，单打',
          fixtureCount: 3,
        },
        {
          id: '4870977f-a813-41a6-ae9e-6a877faa7a14',
          slug: 'wta-hong-kong-hong-kong-women-singles',
          name: 'WAT中国香港，单打',
          fixtureCount: 4,
        },
        {
          id: '3970926b-4e52-448d-b70e-2f078397176c',
          slug: 'wta-zhengzhou-china-women-doubles',
          name: 'WTA郑州，中国，双打',
          fixtureCount: 2,
        },
        {
          id: '86f3735f-0626-4db4-bf62-6442ea1738e0',
          slug: 'wta-hong-kong-hong-kong-women-doubles',
          name: 'WAT中国香港，双打',
          fixtureCount: 4,
        },
      ],
    },
    {
      id: 'bf9bedea-647d-49ec-b135-1969dcf1d3ba',
      slug: 'challenger',
      name: '挑战赛',
      countryCode: null,
      fixtureCount: 16,
      tournamentList: [
        {
          id: '02d4c287-e098-45ca-9606-597ee21d2f08',
          slug: 'atp-challenger-fairfield-usa-men-singles',
          name: 'ATP挑战赛菲尔费尔德，美国，单打',
          fixtureCount: 4,
        },
        {
          id: '086b3309-691c-45ba-9860-7dc09ba48e1d',
          slug: 'atp-challenger-malaga-spain-men-singles',
          name: 'ATP Challenger Malaga, Spain Men Singles',
          fixtureCount: 4,
        },
        {
          id: '11d240db-8baf-465b-8171-95d6789cb05a',
          slug: 'atp-challenger-buenos-aires-ii-arg-men-singles',
          name: 'ATP Challenger Buenos Aires 2, Argentina Men Singles',
          fixtureCount: 4,
        },
        {
          id: '259dee41-8821-4e54-bc63-d8823b60498a',
          slug: 'atp-challenger-bratislava-2-slovakia-men-singles',
          name: 'ATP Challenger Bratislava 2, Slovakia Men Singles',
          fixtureCount: 4,
        },
      ],
    },
    {
      id: '88edf3ab-d124-43bb-8f5a-6bca34064201',
      slug: 'wta-125k',
      name: '女子挑战赛',
      countryCode: null,
      fixtureCount: 5,
      tournamentList: [
        {
          id: '40f92c5c-f1fa-434b-acd2-1e418d1fb89b',
          slug: 'wta-125k-rouen-france-women-doubles',
          name: 'WTA 125K Rouen, France Women Doubles',
          fixtureCount: 1,
        },
        {
          id: '9c9f18ed-0474-4cdf-b0c3-f280f53a9b51',
          slug: 'wta-125k-rouen-france-women-singles',
          name: 'WTA 125K Rouen, France Women Singles',
          fixtureCount: 4,
        },
      ],
    },
    {
      id: 'db898675-dc27-44be-838e-f2e679485d9f',
      slug: 'itf-men',
      name: 'ITF男子',
      countryCode: null,
      fixtureCount: 14,
      tournamentList: [
        {
          id: 'dae2398e-ee92-4fad-8d96-401eea8bc991',
          slug: 'itf-australia-f11-men-doubles',
          name: 'ITF Australia F11, Men Doubles',
          fixtureCount: 1,
        },
        {
          id: 'eda13237-2a14-4258-8b02-d453cbf56f36',
          slug: 'itf-france-f22-men-singles',
          name: 'ITF France F22, Men Singles',
          fixtureCount: 2,
        },
        {
          id: 'b996e490-fce6-4d08-add6-7e5fb25e530d',
          slug: 'itf-georgia-f3-men-singles',
          name: 'ITF Georgia F3, Men Singles',
          fixtureCount: 2,
        },
        {
          id: 'd8d15545-01b1-4a8e-9ea9-b1bcd7d47e39',
          slug: 'itf-italy-f28-men-singles',
          name: 'ITF Italy F28, Men Singles',
          fixtureCount: 2,
        },
        {
          id: '845ac99d-9d77-4ac4-9e39-b072e386c419',
          slug: 'itf-portugal-f17-men-singles',
          name: 'ITF Portugal F17, Men Singles',
          fixtureCount: 3,
        },
        {
          id: '2bc99720-bd59-4e3d-a2cb-a3f78a3a0290',
          slug: 'itf-spain-f40-men-singles',
          name: 'ITF Spain F40, Men Singles',
          fixtureCount: 4,
        },
      ],
    },
    {
      id: '9417df33-adac-441f-93af-49f79822d28d',
      slug: 'itf-women',
      name: 'ITF女子',
      countryCode: null,
      fixtureCount: 20,
      tournamentList: [
        {
          id: 'a5031066-08b7-43ed-8fb8-4f013a1ae6c3',
          slug: 'itf-australia-13a-women-singles',
          name: 'ITF Australia 13A, Women Singles',
          fixtureCount: 1,
        },
        {
          id: 'cd4506ea-7214-4f5c-8352-a5ae2f11d833',
          slug: 'itf-china-11a-women-doubles',
          name: 'ITF China 11A, Women Doubles',
          fixtureCount: 2,
        },
        {
          id: '0d465518-e21d-4fc2-89be-32b5924a87f0',
          slug: 'itf-australia-13a-women-doubles',
          name: 'ITF Australia 13A, Women Doubles',
          fixtureCount: 1,
        },
        {
          id: 'e82122f3-d769-4a7c-b7b5-c3051266b5bb',
          slug: 'itf-japan-23a-women-doubles',
          name: 'ITF Japan 23A, Women Doubles',
          fixtureCount: 1,
        },
        {
          id: 'db0d5a32-14da-43b9-bd7c-bab484d2ae30',
          slug: 'itf-thailand-12a-women-doubles',
          name: 'ITF Thailand 12A, Women Doubles',
          fixtureCount: 1,
        },
        {
          id: '899d5e7d-e495-4b57-b46a-89b438365d33',
          slug: 'itf-italy-23a-women-singles',
          name: 'ITF Italy 23A, Women Singles',
          fixtureCount: 4,
        },
        {
          id: '2341db4b-c6fd-4c5a-94d8-bca6dfb68d2f',
          slug: 'itf-portugal-16a-women-singles',
          name: 'ITF Portugal 16A, Women Singles',
          fixtureCount: 4,
        },
        {
          id: '1c0d98cc-feeb-4183-9901-923740b9aa1d',
          slug: 'itf-spain-33a-women-singles',
          name: 'ITF Spain 33A, Women Singles',
          fixtureCount: 2,
        },
        {
          id: '6d9171fb-4901-4cf9-abe8-0efe5c898423',
          slug: 'itf-usa-46a-women-singles',
          name: 'ITF USA 46A, Women Singles',
          fixtureCount: 4,
        },
      ],
    },
    {
      id: 'd274916b-d7f9-455e-8f02-b4727d50d0e8',
      slug: 'simulated-reality',
      name: 'Simulated Reality',
      countryCode: null,
      fixtureCount: 2,
      tournamentList: [
        {
          id: '1606b245-27f0-4786-93e1-56b0415a4e4a',
          slug: 'srl-summer-invitational-baltimore-md-usa',
          name: 'SRL Summer Invitational Baltimore (MD), USA',
          fixtureCount: 2,
        },
      ],
    },
    {
      id: 'da195090-d884-4b6e-9c35-90718fd3fa95',
      slug: 'simulated-reality-women',
      name: 'Simulated Reality Women',
      countryCode: null,
      fixtureCount: 2,
      tournamentList: [
        {
          id: '94662638-d6d1-4eba-9339-c97ec988b095',
          slug: 'srl-summer-invitational-baltimore-md-usa-women',
          name: 'SRL Summer Invitational Baltimore (MD), USA, Women',
          fixtureCount: 2,
        },
      ],
    },
  ],
}

const sport = route.params.sport
const breadcrumb = computed(() => [{ path: '', title: data.name, id: data.id }])
const tabs = computed(() => [
  { value: 'live-upcoming', label: '滚球与即将开赛的盘口' },
  { value: 'outrights', label: '冠军投注' },
  { value: 'all', label: `全部 ${sport}` },
])
const sortedCategoryList = computed(() =>
  sortBy(data.categoryList, (o: SportTournament) => o.name))
const topUpcomingCategoryList = computed(() => {
  return data.tournamentList.reduce((accumulator: any, currentValue) => {
    if (accumulator.findIndex((item: any) => currentValue.category.id === item.id) === -1)
      accumulator.push(currentValue.category)
    return accumulator
  }, [])
})

const curTab = ref(tabs.value[0].value)
const isStandard = ref(true)
const baseType = ref('winner')
function onBaseTypeChange(v: string) {
  baseType.value = v
}
</script>

<template>
  <div class="tg-sports-index tg-sports-hotlive">
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
      <div class="layout-spacing no-bottom-spacing sort-tournament">
        <template
          v-for="up, udx in topUpcomingCategoryList"
          :key="up.id"
        >
          <BaseSecondaryAccordion
            :title="up.name"
            icon="spt-game-intl"
            level="1"
            :init="udx > 0 ? false : true"
          >
            <template #side="{ isOpen }">
              <div v-show="!isOpen" class="accordion-badge-wrap">
                <BaseBadge :count="up.fixtureCount" />
              </div>
            </template>
            <div class="acc-box">
              <template v-for="tour, rdx in data.tournamentList" :key="tour.id">
                <AppSportsMarket
                  v-if="curTab === 'live-upcoming'"
                  :auto-show="rdx === 0"
                  :tournament="rdx === 0 ? data.firstTournament[0] : tour"
                  :is-standard="isStandard"
                />
                <div v-else-if="curTab === 'outrights'" class="">
                  <AppOutrightPreview
                    :tournament="rdx === 0 ? data.firstTournament[0] : tour"
                    :auto-show="rdx === 0"
                  />
                </div>
              </template>
            </div>
          </BaseSecondaryAccordion>
        </template>
      </div>
      <!-- 按字母顺序排序 -->
      <div class="layout-spacing sort-tournament">
        <h3 class="sub-title">
          <BaseIcon name="spt-sort-az" />
          <span>按字母顺序排列</span>
        </h3>
        <template
          v-for="tnt in sortedCategoryList"
          :key="tnt.id"
        >
          <BaseSecondaryAccordion
            :title="tnt.name"
            icon="spt-game-intl"
            level="1"
            :init="false"
          >
            <template #side="{ isOpen }">
              <div v-show="!isOpen" class="accordion-badge-wrap">
                <BaseBadge :count="tnt.fixtureCount" />
              </div>
            </template>
            <div class="acc-box">
              <template
                v-for="tnt_tnt, ttdx in tnt.tournamentList"
                :key="tnt_tnt.id"
              >
                <AppSportsMarket
                  v-if="curTab === 'live-upcoming'"
                  :auto-show="ttdx === 0"
                  :tournament="tnt_tnt"
                  :is-standard="isStandard"
                />
                <div v-else-if="curTab === 'outrights'" class="">
                  <AppOutrightPreview :tournament="tnt_tnt" :auto-show="ttdx === 0" />
                </div>
              </template>
            </div>
          </BaseSecondaryAccordion>
        </template>
      </div>

      <!-- 全部 -->
      <BaseSecondaryAccordion icon="coin-uni" title="马国" level="3">
        <template #side="{ isOpen }">
          <div v-show="!isOpen" class="accordion-badge-wrap">
            <BaseBadge :count="39" />
          </div>
        </template>
        <div class="grid-column-200">
          <div class="game-like square">
            <!-- <BaseCheckBox :model-value="false">
              展示弹窗提示信息
            </BaseCheckBox> -->
            <div class="wrapper">
              <a class="link">
                <span>美国冰球职业联盟(16)</span>
              </a>
            </div>
          </div>
        </div>
      </BaseSecondaryAccordion>
    </div>
    <AppErrorPage />
  </div>
</template>

<style lang="scss" scoped>
.grid-column-200 {
  display: grid;
  grid-gap: var(--tg-spacing-8);
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  padding: var(--tg-spacing-16);
}
.game-like {
  display: flex;
  align-items: center;
  color: var(--tg-text-white);
  background: var(--tg-secondary-main);
  box-shadow: var(--tg-box-shadow);
  border-radius: var(--tg-radius-default);
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  overflow: hidden;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  line-height: var(--tg-spacing-26);
}
.sort-tournament >*+* {
  margin-top: var(--tg-spacing-12);
}
.sub-title {
  color: var(--tg-text-white);
  text-align: left;
  justify-content: flex-start;
  font-weight: var(--tg-font-weight-semibold);
  display: inline-flex;
  align-items: center;
  font-size: var(--tg-font-size-md);
  line-height: 1.5;
  .app-svg-icon {
    margin-right: var(--tg-spacing-8);
  }
}
.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
  padding: var(--tg-spacing-8);
}
.tg-sports-index {
  margin-top: var(--tg-spacing-32);
}
.tg-sports-hotlive {

}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
