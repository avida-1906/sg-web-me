<script setup lang='ts'>
interface IVipProgressData {
  percent: number // vip进度百分比
  currentLevel: number // 当前vip等级
}
interface Props {
  vipProgressData?: IVipProgressData
}
const props = withDefaults(defineProps<Props>(), {
  vipProgressData: () => { // vip进度条
    return {
      percent: 40,
      currentLevel: 1,
    }
  },
})
// const emit = defineEmits(['update:modelValue'])

const tab = ref('3')
const tabList = [
  { label: '统计数据', value: '1' },
  { label: '奖杯', value: '2' },
  { label: '竞赛', value: '3' },
  { label: '抽奖活动', value: '4' },
]
// 数据统计表 head
interface IColumns {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
const statisticsColumns = ref<IColumns[]>([
  {
    title: '投注',
    width: 60,
    dataIndex: 'bet',
    slot: 'bet',
    align: 'left',
  },
  {
    title: '赢',
    width: 100,
    dataIndex: 'win',
    slot: 'win',
    align: 'center',
  },
  {
    title: '输',
    width: 100,
    dataIndex: 'lose',
    slot: 'lose',
    align: 'center',
  },
  {
    title: '总投注额',
    width: 130,
    dataIndex: 'totalBet',
    slot: 'totalBet',
    align: 'right',
  },
])
const { bool: loading, setFalse } = useBoolean(true)
const statisticsTableData: any = ref([])
const trophyTableData: any = ref([])
const sweepstakesTableData: any = ref([])
const competitionTableData: any = ref([])
onMounted(() => {
  setTimeout(() => {
    statisticsTableData.value = [
      {
        bet: '567',
        win: '38',
        lose: '38',
        totalBet: '23.00000000',
        currencyType: EnumCurrency.BTC,
      },
      {
        bet: '567',
        win: '38',
        lose: '38',
        totalBet: '23.00000000',
        currencyType: EnumCurrency.BTC,
      },
      {
        bet: '567',
        win: '38',
        lose: '38',
        totalBet: '23.00000000',
        currencyType: EnumCurrency.BTC,
      },
    ]
    setFalse()
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
    setFalse()
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
})
// 奖杯select
const selectValue = ref('2')
const selectOptions = [
  { value: '1', label: '最幸运奖杯' },
  { value: '2', label: '最大之赢' },
]
const trophyCards = ref([
  { rankIcon: 'uni-cup1', gameName: 'Spellbinding Mystery', provider: 'Pragmatic' },
  { rankIcon: 'uni-cup1', gameName: 'Spellbinding Mystery', provider: 'Pragmatic' },
  { rankIcon: 'uni-cup1', gameName: 'Spellbinding Mystery', provider: 'Pragmatic' },
])
const trophyColumns = ref<IColumns[]>([
  {
    title: '游戏',
    width: 200,
    dataIndex: 'game',
    slot: 'game',
    align: 'left',
  },
  {
    title: '游戏提供商',
    width: 100,
    dataIndex: 'provider',
    slot: 'provider',
    align: 'center',
  },
  {
    title: '奖杯',
    width: 100,
    dataIndex: 'trophy',
    slot: 'trophy',
    align: 'right',
  },

])
// 竞赛
const competitionColumns = ref<IColumns[]>([
  {
    title: '竞赛名称',
    // width: 210,
    dataIndex: 'name',
    slot: 'name',
    align: 'left',
  },
  {
    title: '日期',
    // width: 120,
    dataIndex: 'date',
    slot: 'date',
    align: 'center',
  },
  {
    title: '排名',
    // width: 100,
    dataIndex: 'rank',
    slot: 'rank',
    align: 'center',
  },
  {
    title: '奖金',
    // width: 100,
    dataIndex: 'bonus',
    slot: 'bonus',
    align: 'right',
  },
])
// 抽奖活动 head
const SweepstakesColumns = ref<IColumns[]>([
  {
    title: '投注',
    width: 200,
    dataIndex: 'bet',
    slot: 'bet',
    align: 'left',
  },
  {
    title: '日期',
    width: 120,
    dataIndex: 'date',
    slot: 'date',
    align: 'center',
  },
  {
    title: '抽奖卷',
    width: 80,
    dataIndex: 'lottery',
    slot: 'lottery',
    align: 'right',
  },
])
// 分页
interface IPaginationData {
  pageSize: number
  pageNumber: number
  total: number
}
const paginationData = ref<IPaginationData>(
  {
    pageSize: 10,
    pageNumber: 2,
    total: 21,
  },
)
const onPrevious = function () {
  console.log('上一页1')
  paginationData.value.pageNumber--
}
const onNext = function () {
  console.log('下一页2')
  paginationData.value.pageNumber++
}
</script>

<template>
  <div class="app-statistics-dialog">
    <div class="statistics-content">
      <p class="s-user-name">
        alanhayashi
      </p>
      <div class="s-join-date">
        <span>加入日期：</span>
        <span>2023年9月19日</span>
      </div>
      <AppVipProgress :vip-progress-data="props.vipProgressData" />
      <div class="s-tab">
        <BaseTab v-model="tab" :list="tabList" :full="true" />
        <!-- 数据统计 -->
        <div v-if="tab === '1'" class="statistics-wrap">
          <BaseTable :columns="statisticsColumns" :data-source="statisticsTableData" :loading="loading">
            <template #totalBet="{ record }">
              <div class="img-text-align-right">
                <AppAmount :amount="record.totalBet" :currency-type="record.currencyType" />
              </div>
            </template>
          </BaseTable>
        </div>
        <!-- 奖杯 -->
        <div v-else-if="tab === '2'" class="trophies-wrap">
          <div class="trophies-title">
            <p class="title-left">
              <BaseIcon name="chess-air-bonus" />
              <span>Luckiest 赢</span>
            </p>
            <p class="title-right">
              <BaseSelect v-model="selectValue" :options="selectOptions" :small="true" />
            </p>
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
        </div>
        <div v-else-if="tab === '3'" class="competition-wrap">
          <div class="c-title">
            <BaseIcon name="spt-competition" />
            最新竞赛
          </div>
          <div class="competition-cards">
            <div class="c-card">
              <div class="card-top">
                <div>4147th</div>
                <div>US$1.00<BaseIcon name="coin-usdc" /></div>
              </div>
              <div class="card-bottom">
                <div>$100,000 竞赛 – 24 小时</div>
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
          <AppStack :pagination-data="paginationData" @previous="onPrevious" @next="onNext" />
        </div>
        <div v-else-if="tab === '4'" class="sweepstakes-wrap">
          <div class="sweepstakes-table">
            <BaseTable :columns="SweepstakesColumns" :data-source="sweepstakesTableData" :loading="loading" />
          </div>
          <AppStack :pagination-data="paginationData" @previous="onPrevious" @next="onNext" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-statistics-dialog{
  .statistics-content{
    padding: var(--tg-spacing-2) var(--tg-spacing-16) var(--tg-spacing-16);
    .s-user-name {
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-md);
      line-height: 27px;
      padding-bottom: var(--tg-spacing-2);
      font-weight: var(--tg-font-weight-semibold);
    }
    .s-join-date{
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-xs);
      margin-bottom: var(--tg-spacing-20);
      span:nth-child(2){
        font-weight: var(--tg-font-weight-semibold);
      }
    }
    .s-tab{
      margin-top: var(--tg-spacing-32);
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
          .title-right{
            width: 120px;
          }
        }
        .trophies-cards{
          display: flex;
          gap: .5rem;
          .t-card{
            border-radius: var(--tg-radius-xs);
            background: var(--tg-secondary-grey);
            padding: var(--tg-spacing-16);
            gap: var(--spacing-0-5);
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
            > span {
              margin-left: var(--tg-spacing-8);
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
      }
    }
  }
}
</style>
