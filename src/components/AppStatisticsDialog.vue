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

const tab = ref('4')
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
    width: 100,
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
    width: 100,
    dataIndex: 'totalBet',
    slot: 'totalBet',
    align: 'right',
  },
])
const { bool: loading, setFalse } = useBoolean(true)
const statisticsTableData: any = ref([])
const trophyTableData: any = ref([])
const SweepstakesTableData: any = ref([])
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
        gameSupplier: 'hub88',
        trophy: EnumCurrency.BTC,
        currencyType: EnumCurrency.BTC,
      },
      {
        game: 'Cursed seas',
        gameSupplier: 'hub88',
        trophy: EnumCurrency.BTC,
        currencyType: EnumCurrency.BTC,
      },
      {
        game: 'Cursed seas',
        gameSupplier: 'hub88',
        trophy: EnumCurrency.BTC,
        currencyType: EnumCurrency.BTC,
      },
    ]
    setFalse()
  }, 3000)
  setTimeout(() => {
    SweepstakesTableData.value = [
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
})
// 奖杯select
const selectValue = ref('1')
const selectOptions = [
  { value: '1', label: '最幸运奖杯' },
  { value: '2', label: '最大之赢' },
]
// 奖杯表 head
const trophyColumns = ref<IColumns[]>([
  {
    title: '游戏',
    width: 100,
    dataIndex: 'game',
    slot: 'game',
    align: 'left',
  },
  {
    title: '游戏提供商',
    width: 100,
    dataIndex: 'gameSupplier',
    slot: 'gameSupplier',
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
// 抽奖活动 head
const SweepstakesColumns = ref<IColumns[]>([
  {
    title: '投注',
    width: 100,
    dataIndex: 'bet',
    slot: 'bet',
    align: 'left',
  },
  {
    title: '日期',
    width: 100,
    dataIndex: 'date',
    slot: 'date',
    align: 'center',
  },
  {
    title: '抽奖卷',
    width: 100,
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
        <div v-if="tab === '1' || tab === '3'" class="statistics-wrap">
          <BaseTable :columns="statisticsColumns" :data-source="statisticsTableData" :loading="loading">
            <template #totalBet="{ record }">
              <AppAmount :amount="record.totalBet" :currency-type="record.currencyType" />
            </template>
          </BaseTable>
        </div>
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
          <div class="trophies-table">
            <BaseTable :columns="trophyColumns" :data-source="trophyTableData" :loading="loading">
              <!-- <template #trophy="{ record }"> -->
              <BaseIcon name="coin-bch" />
              <!-- </template> -->
            </BaseTable>
          </div>
        </div>
        <div v-else-if="tab === '4'" class="sweepstakes-wrap">
          <div class="sweepstakes-table">
            <BaseTable :columns="SweepstakesColumns" :data-source="SweepstakesTableData" :loading="loading" />
            <div class="pagination-wrap">
              <AppStack :pagination-data="paginationData" @previous="onPrevious" @next="onNext" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-statistics-dialog{
  .statistics-content{
    padding: var(--tg-spacing-2) var(--tg-spacing-16) var(--tg-spacing-10);
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
      .statistics-wrap{
        padding:  var(--tg-spacing-10) 0;
      }
      .trophies-wrap{
        padding:  var(--tg-spacing-10) 0;
        .trophies-title{
          display: flex;
          justify-content: space-between;
          margin-top: var(--tg-spacing-12);
          .title-left{
            display: flex;
            justify-content: left;
            align-items: center;
            padding: var(--tg-spacing-10) 0;
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
      }
      .sweepstakes-wrap{
        padding:  var(--tg-spacing-10) 0;
      }
    }
  }
}
</style>
