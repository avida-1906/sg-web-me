<script setup lang='ts'>
interface IVipProgressData {
  percent: number // vip进度百分比
  currentLevel: number // 当前vip等级
}
interface IColumns {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
interface IPaginationData {
  pageSize: number
  page: number
  total: number
}
interface Props {
  userName?: string
  vipProgressData?: IVipProgressData
}

const props = withDefaults(defineProps<Props>(), {
  vipProgressData: () => {
    return {
      percent: 0,
      currentLevel: 0,
    }
  },
})
// const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const router = useLocalRouter()

const {
  isLessThanSm,
} = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())

const { bool: loading, setFalse: setLoadingFalse } = useBoolean(true)

const tab = ref('3')
const tabList = [
  { label: t('statistical_data'), value: '1' },
  { label: t('trophy'), value: '2' },
  { label: t('competition'), value: '3' },
  { label: t('promo_lottery_activity'), value: '4' },
]

const betColumns = ref<IColumns[]>([
  {
    title: t('currency_type'),
    dataIndex: 'currency',
    slot: 'currency',
    align: 'center',
  },
  {
    title: t('bet_num'),
    dataIndex: 'betCount',
    align: 'center',
  },
  {
    title: t('effective_bet'),
    dataIndex: 'effectBet',
    align: 'center',
  },
  {
    title: t('win_lose'),
    dataIndex: 'winLose',
    slot: 'winLose',
    align: 'center',
  },
])

// 数据统计表 head
const statisticsColumns = ref<IColumns[]>([
  {
    title: t('menu_title_settings_bets'),
    width: 60,
    dataIndex: 'bet',
    slot: 'bet',
    align: 'left',
  },
  {
    title: t('win_label'),
    width: 100,
    dataIndex: 'win',
    slot: 'win',
    align: 'center',
  },
  {
    title: t('lose'),
    width: 100,
    dataIndex: 'lose',
    slot: 'lose',
    align: 'center',
  },
  {
    title: t('wagered'),
    width: 130,
    dataIndex: 'totalBet',
    slot: 'totalBet',
    align: 'right',
  },
])
const betData: any = ref([])
const statisticsTableData: any = ref([])
const trophyTableData: any = ref([])
const sweepstakesTableData: any = ref([])
const competitionTableData: any = ref([])
// 奖杯select
const selectValue = ref('2')
const selectOptions = [
  { value: '1', label: t('lucky_trophy') },
  { value: '2', label: t('big_win') },
]
const trophyCards = ref([
  { rankIcon: 'uni-cup1', gameName: 'Spellbinding Mystery', provider: 'Pragmatic' },
  { rankIcon: 'uni-cup1', gameName: 'Spellbinding Mystery', provider: 'Pragmatic' },
  { rankIcon: 'uni-cup1', gameName: 'Spellbinding Mystery', provider: 'Pragmatic' },
])
const trophyColumns = ref<IColumns[]>([
  {
    title: t('game'),
    width: 200,
    dataIndex: 'game',
    slot: 'game',
    align: 'left',
  },
  {
    title: t('casino_provider'),
    width: 100,
    dataIndex: 'provider',
    slot: 'provider',
    align: 'center',
  },
  {
    title: t('trophy'),
    width: 100,
    dataIndex: 'trophy',
    slot: 'trophy',
    align: 'right',
  },

])
// 竞赛
const competitionColumns = ref<IColumns[]>([
  {
    title: t('competition_name'),
    dataIndex: 'name',
    slot: 'name',
    align: 'left',
  },
  {
    title: t('date'),
    dataIndex: 'date',
    slot: 'date',
    align: 'center',
  },
  {
    title: t('ranking'),
    dataIndex: 'rank',
    slot: 'rank',
    align: 'center',
  },
  {
    title: t('finance_other_tab_bonus'),
    dataIndex: 'bonus',
    slot: 'bonus',
    align: 'right',
  },
])
// 抽奖活动 head
const SweepstakesColumns = ref<IColumns[]>([
  {
    title: t('menu_title_settings_bets'),
    width: 200,
    dataIndex: 'bet',
    slot: 'bet',
    align: 'left',
  },
  {
    title: t('date'),
    width: 120,
    dataIndex: 'date',
    slot: 'date',
    align: 'center',
  },
  {
    title: t('raffle_ticket'),
    width: 80,
    dataIndex: 'lottery',
    slot: 'lottery',
    align: 'right',
  },
])
const paginationData = ref<IPaginationData>(
  {
    pageSize: 10,
    page: 1,
    total: 4,
  },
)

const onPrevious = function () {
  paginationData.value.page--
}
const onNext = function () {
  paginationData.value.page++
}

function goVip() {
  router.push('/vip/promotion-bonus')
}

onMounted(() => {
  setTimeout(() => {
    statisticsTableData.value = [
      {
        bet: '567',
        win: '38',
        lose: '38',
        totalBet: '23.00000000',
        currencyType: '702',
      },
      {
        bet: '567',
        win: '38',
        lose: '38',
        totalBet: '23.00000000',
        currencyType: '702',
      },
      {
        bet: '567',
        win: '38',
        lose: '38',
        totalBet: '23.00000000',
        currencyType: '702',
      },
    ]
    setLoadingFalse()
  }, 3000)
  setTimeout(() => {
    trophyTableData.value = [
      {
        game: 'Cursed seas',
        provider: 'hub88',
        trophy: 'uni-cup1',
        gameIcon: 'uni-cup1',
      },
      {
        game: 'Cursed seas',
        provider: 'hub88',
        trophy: 'uni-cup1',
        gameIcon: 'uni-cup1',
      },
      {
        game: 'Cursed seas',
        provider: 'hub88',
        trophy: 'uni-cup1',
        gameIcon: 'uni-cup1',
      },
    ]
    setLoadingFalse()
  }, 3000)
  setTimeout(() => {
    sweepstakesTableData.value = [
      {
        bet: 'R$ 750,000 周年抽奖活动',
        date: '2023/07/28',
        lottery: '0',
      },
      {
        bet: 'R$ 750,000 周年抽奖活动',
        date: '2023/07/28',
        lottery: '0',
      },
      {
        bet: 'R$ 750,000 周年抽奖活动',
        date: '2023/07/28',
        lottery: '0',
      },
    ]
  }, 3000)
  setTimeout(() => {
    competitionTableData.value = [
      {
        name: '$100,000 竞赛 – 24 小时',
        date: '2023/7/14',
        rank: '1537th',
        bonus: 'US$3.00',
        bonusIcon: 'coin-usdc',
      },
      {
        name: '$100,000 竞赛 – 24 小时',
        date: '2023/7/14',
        rank: '1537th',
        bonus: 'US$3.00',
        bonusIcon: 'coin-usdc',
      },
    ]
  }, 3000)
  setTimeout(() => {
    betData.value = [
      {
        currency: 'BTC',
        date: '2023/7/14',
        betCount: 722,
        effectBet: 102,
        winLose: '18999.89',
      },
      {
        currency: 'BRL',
        date: '2023/7/14',
        betCount: 222,
        effectBet: 112,
        winLose: '28999.89',
      },
      {
        currency: 'CNY',
        date: '2023/7/14',
        betCount: 252,
        effectBet: 121,
        winLose: '38999.89',
      },
      {
        currency: 'USDT',
        date: '2023/7/14',
        betCount: 122,
        effectBet: 172,
        winLose: '58999.89',
      },
    ]
  }, 3000)
})
</script>

<template>
  <div class="app-statistics-dialog">
    <div class="statistics-content">
      <template v-if="isLogin">
        <div class="vip-wrapper">
          <AppVipProgress :vip-progress-data="props.vipProgressData">
            <template #title>
              <p class="s-user-name">
                {{ userName }}
              </p>
              <div class="s-join-date">
                <span>{{ t('in_date') }}：</span>
                <span>2023年9月19日</span>
              </div>
            </template>
            <div class="go-vip" @click="goVip">
              <span>{{ t('user_vip_pro') }}</span><BaseIcon name="uni-arrowright-line" />
            </div>
          </AppVipProgress>
        </div>
        <div class="s-tab">
          <div class="scroll-x bet-data-table">
            <BaseTable
              :columns="betColumns"
              :data-source="betData"
              :loading="loading"
            >
              <template #currency="{ record }">
                <div class="t-bonus">
                  <BaseIcon :name="`coin-${record.currency.toLowerCase()}`" />
                </div>
              </template>
              <template #winLose="{ record }">
                <div class="flex-center">
                  <AppAmount :amount="record.winLose" :currency-type="record.currency" />
                </div>
              </template>
            </BaseTable>
          </div>
          <AppStack
            :pagination-data="paginationData"
            @previous="onPrevious" @next="onNext"
          />
          <!-- <BaseTab v-model="tab" :list="tabList" :full="true" /> -->
          <!-- 数据统计 -->
          <!-- <div v-if="tab === '1'" class="statistics-wrap">
            <BaseTable
              :columns="statisticsColumns"
              :data-source="statisticsTableData"
              :loading="loading"
            >
              <template #totalBet="{ record }">
                <div
                  class="img-text-align-right"
                >
                  <AppAmount
                    :amount="record.totalBet"
                    :currency-type="getCurrencyConfigByCode(record.currencyType)?.name"
                  />
                </div>
              </template>
            </BaseTable>
          </div> -->
          <!-- 奖杯 -->
          <!-- <div
            v-else-if="tab === '2'"
            class="trophies-wrap"
            :class="{ 'is-mobile': isLessThanSm }"
          >
            <div class="trophies-title">
              <p class="title-left">
                <BaseIcon name="chess-air-bonus" />
                <span>Luckiest {{ t('win_label') }}</span>
              </p>
              <BaseSelect v-model="selectValue" :options="selectOptions" :small="true" />
            </div>
            <div class="trophies-cards">
              <div v-for="item, index in trophyCards" :key="index" class="t-card">
                <div class="card-icon">
                  <BaseIcon :name="item.rankIcon" />
                </div>
                <div class="card-content">
                  <span class="game"><span>{{ item.gameName }}</span></span>
                  <span class="tag">{{ item.provider }}</span>
                </div>
              </div>
            </div>
            <div v-show="selectValue === '2'" class="trophies-table">
              <BaseTable
                :columns="trophyColumns"
                :data-source="trophyTableData"
                :loading="loading"
              >
                <template #game="{ record }">
                  <div class="t-game">
                    <BaseIcon :name="record.gameIcon " />
                    <span>Valletta Megaways</span>
                  </div>
                </template>
                <template #trophy="{ record }">
                  <BaseIcon :name="record.trophy " />
                </template>
              </BaseTable>
            </div>
          </div> -->
          <!-- 竞赛 -->
          <!-- <div v-else-if="tab === '3'" class="competition-wrap">
            <div class="c-title">
              <BaseIcon name="spt-competition" />
              {{ t('fresh_competition') }}
            </div>
            <div class="competition-cards">
              <div class="c-card">
                <div class="card-top">
                  <div>4147th</div>
                  <div>US$1.00<BaseIcon name="coin-usdc" /></div>
                </div>
                <div class="card-bottom">
                  <div>
                    <span>$100,000 {{ $t('competition') }}</span> –
                    <span>{{ t('time_hour', { delta: 24 }) }}</span>
                  </div>
                  <div>2023/7/17</div>
                </div>
              </div>
            </div>
            <div class="scroll-x competition-table">
              <BaseTable
                :columns="competitionColumns"
                :data-source="competitionTableData"
                :loading="loading"
              >
                <template #bonus="{ record }">
                  <div class="t-bonus">
                    {{ record.bonus }} <BaseIcon :name="record.bonusIcon" />
                  </div>
                </template>
              </BaseTable>
            </div>
            <AppStack
              :pagination-data="paginationData"
              @previous="onPrevious" @next="onNext"
            />
          </div> -->
          <!-- 抽奖 -->
          <!-- <div v-else-if="tab === '4'" class="sweepstakes-wrap">
            <div class="sweepstakes-table">
              <BaseTable
                :columns="SweepstakesColumns"
                :data-source="sweepstakesTableData"
                :loading="loading"
              />
            </div>
            <AppStack
              :pagination-data="paginationData"
              @previous="onPrevious" @next="onNext"
            />
          </div> -->
        </div>
      </template>
      <div v-else class="pad-box">
        <AppLoginRegTipBox />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.pad-box {
  padding: 0 16px;
}
.go-vip {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  transition: all .25s;
  cursor: pointer;
  &:hover{
    transform: translateX(8px);
  }
}
.bet-data-table {
  --tg-table-th-background: var(--tg-secondary-grey);
  --tg-table-odd-background: var(--tg-secondary-grey);
  --tg-table-even-background: var(--tg-primary-main);
}
.vip-wrapper {
  padding: 0 16px;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.app-statistics-dialog{
  .statistics-content{
    padding: var(--tg-spacing-2) 0 var(--tg-spacing-16);
    .s-user-name {
      color: var(--tg-secondary-light);
      font-size: 14px;
      line-height: 20px;
      padding-bottom: 4px;
      font-weight: 400;
      text-align: center;
    }
    .s-join-date{
      color: var(--tg-secondary-light);
      font-size: 14px;
      line-height: 20px;
      padding-bottom: 12px;
      font-weight: 400;
      text-align: center;
    }
    .s-tab{
      margin-top: var(--tg-spacing-12);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .statistics-wrap{
        padding:  var(--tg-spacing-10) 0;
      }
      .trophies-wrap{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .trophies-title{
          display: flex;
          justify-content: space-between;
          .title-left{
            display: flex;
            justify-content: left;
            align-items: center;
            > span{
              font-size: var(--tg-font-size-base);
              font-weight: var(--tg-font-weight-bold);
              color: var(--tg-text-white);
              margin-left: var(--tg-spacing-8);
            }
          }
        }
        .trophies-cards{
          display: flex;
          gap: .5rem;
          .t-card{
            border-radius: var(--tg-radius-xs);
            background: var(--tg-secondary-grey);
            padding: var(--tg-spacing-16);
            display: flex;
            flex-direction: column;
            gap: .5rem;
            flex: 1;
            .card-content{
              white-space: normal;
              .game{
                max-width: 9ch;
                font-weight: var(--tg-font-weight-semibold);
                font-size: var(--tg-font-size-base);
                cursor: pointer;
                display: inline-flex;
                > span{
                  max-width: 9ch;
                  display: inline-block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin-right: var(--tg-spacing-4);
                  line-height: var(--tg-spacing-24);
                }
              }
              .tag{
                font-size: var(--tg-font-size-xs);
                max-width: 9ch;
                color: var(--tg-text-lightgrey);
                font-weight: var(--tg-font-weight-semibold);
                line-height: var(--tg-spacing-18);
              }
            }
          }
        }
        .trophies-table{
          .t-game{
            color: var(--tg-text-white);
            font-size: var(--tg-font-size-base);
            font-weight: var(--tg-font-weight-semibold);
            display: flex;
            align-items: center;
            padding: var(--tg-spacing-8) 0;
            > span {
              margin-left: var(--tg-spacing-8);
            }
          }
        }
        &.is-mobile{
          .trophies-cards{
            flex-direction: column;
            .t-card{
              align-items: center;
              flex-direction: row-reverse;
              justify-content: space-between;
            }
          }
        }
      }
      .competition-wrap{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .c-title{
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-base);
          font-weight: var(--tg-font-weight-bold);
          display: flex;
          align-items: center;
          gap: .5rem;
        }
        .competition-cards{
          .c-card{
            padding: var(--tg-spacing-16);
            background-color: var(--tg-secondary-grey);
            border-radius: var(--tg-radius-md);
            display: flex;
            flex-direction: column;
            gap: .5rem;
            line-height: 1.2;
            .card-top{
              color: vat(--tg-text-white);
              font-weight: var(--tg-font-weight-bold);
              font-size: var(--tg-font-size-md);
              display: flex;
              justify-content: space-between;
              align-items: center;
              >div:nth-child(2){
                display: flex;
                align-items: center;
                gap: .25rem;
              }
            }
            .card-bottom{
              font-size: var(--tg-font-size-base);
              font-weight: var(--tg-font-weight-semibold);
              color: var(--tg-text-lightgrey);
              display: flex;
              justify-content: space-between;
              align-items: center;
              >div:nth-child(2){
                font-size: var(--tg-font-size-xs);
              }
            }
          }
        }
        .competition-table{
          .t-bonus{
            display: flex;
            align-items: center;
            gap: .25rem;
            padding: var(--tg-spacing-5) 0;
          }
        }
      }
      .sweepstakes-wrap{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .img-text-align-right{
        display: flex;
        justify-content: right;
        align-items: center;
        line-height: 1.5;
        padding: var(--tg-spacing-4) 0;
      }
    }
  }
}
</style>
