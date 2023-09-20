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

const { bool: showDialog } = useBoolean(true)

const tab = ref('2')
const tabList = [
  { label: '统计数据', value: '1' },
  { label: '奖杯', value: '2' },
  { label: '竞赛', value: '3' },
  { label: '抽奖活动', value: '4' },
]
// 数据统计表 head
interface IStatisticsColumns {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
const statisticsColumns = ref<IStatisticsColumns[]>([
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
})
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
        <BaseTab v-model="tab" :list="tabList" />
        <div v-if="tab === '1'" class="statistics-wrap">
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
              <BaseSelect v-model="selectValue" :options="selectOptions" must />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-statistics-dialog{
  .statistics-content{
    padding: var(--tg-spacing-2) var(--tg-spacing-16);
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
      margin-top: var(--tg-spacing-36);
      .statistics-wrap{
        padding:  var(--tg-spacing-10) 0;
      }
      .trophies-wrap{
        .trophies-title{
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
        }
      }
    }
  }
}
</style>
