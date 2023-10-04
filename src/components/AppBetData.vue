<script setup lang="ts">
interface Column {
  title?: string // 列头显示文字
  width?: number | string // 列宽度
  dataIndex: string // 列数据字符索引
  slot?: string | undefined // 列插槽名称索引
  align?: 'left' | 'center' | 'right' // 列对其方式
  xl?: boolean // 768-1200是否展示
  md?: boolean // <768是否展示
}
interface Props {
  mode?: 'casino' | 'sports' | 'home'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'home',
})

const { isLessThanLg, isGreaterThanSm } = storeToRefs(useWindowStore())
// loading加载
const { bool: loading, setFalse: setLoadingFalse } = useBoolean(true)
// 是否开启隐身模式
const { bool: isHidden, setFalse: setIsHiddenFalse, setTrue: setIsHiddenTrue } = useBoolean(false)

// tab值
const activeTab: Ref<string> = ref('ranking-list')
// 需要获取多少条数据
const selectSize: Ref<number> = ref(10)
const tableData: any = ref([])
const selectOptions: ISelectOption[] = [
  { label: '0', value: 0 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '40', value: 40 },
]

// 获取tab配置
const getTabOptions = computed(() => {
  switch (props.mode) {
    case 'casino': return [
      { value: 'casino-mine', label: '我的投注' },
      { value: 'casino-all', label: '所有投注' },
      { value: 'casino-fy', label: '风云榜' },
      { value: 'ranking-list', label: '竞赛排行榜' },
    ]
    case 'sports':return [
      { value: 'sports-all', label: '所有投注' },
      { value: 'sports-fy', label: '风云榜' },
      { value: 'ranking-list', label: '竞赛排行榜' },
    ]
    case 'home': return [
      { value: 'casino-all', label: '娱乐城投注' },
      { value: 'sports-all', label: '体育投注' },
      { value: 'ranking-list', label: '竞赛排行榜' },
    ]
  }
})
// 获取表格head
const getTableColumns: ComputedRef<Column[]> = computed((): Column[] => {
  switch (activeTab.value) {
    case 'casino-mine': return [
      {
        title: '游戏',
        // width: 100,
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: '时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '投注额',
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
      },
      {
        title: '乘数',
        dataIndex: 'multiplier',
        align: 'right',
        xl: true,
      },
      {
        title: '支付额',
        dataIndex: 'payMoney',
        slot: 'payMoney',
        align: 'right',
        xl: true,
        md: true,
      },
    ]
    case 'casino-all':
    case 'casino-fy': return [
      {
        title: '游戏',
        // width: 100,
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: '玩家',
        dataIndex: 'player',
        slot: 'player',
        align: 'center',
        xl: true,
      },
      {
        title: '时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '投注额',
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
      },
      {
        title: '乘数',
        dataIndex: 'multiplier',
        align: 'right',
        xl: true,
      },
      {
        title: '支付额',
        dataIndex: 'payMoney',
        slot: 'payMoney',
        align: 'right',
        xl: true,
        md: true,
      },
    ]
    case 'ranking-list': return [
      {
        title: '排名',
        // width: 100,
        dataIndex: '',
        slot: 'ranking',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: '玩家',
        dataIndex: 'player',
        slot: 'player',
        align: 'center',
        xl: true,
        md: true,
      },
      {
        title: '总投注额',
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
        xl: true,
        md: true,
      },
      {
        title: '奖金',
        dataIndex: 'payMoney',
        slot: 'payMoney',
        align: 'right',
        xl: true,
        md: true,
      },
    ]
    case 'sports-all':
    case 'sports-fy':return [
      {
        title: '赛事',
        // width: 100,
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: '玩家',
        dataIndex: 'player',
        slot: 'player',
        align: 'center',
        xl: true,
      },
      {
        title: '时间',
        dataIndex: 'time',
        align: 'center',
        xl: true,
      },
      {
        title: '赔率',
        dataIndex: 'multiplier',
        align: 'right',
        xl: true,
      },
      {
        title: '投注额',
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
        xl: true,
        md: true,
      },
    ]
    default: return []
  }
})
const getScaleColumns: ComputedRef<Column[]> = computed((): Column[] => {
  if (!isLessThanLg.value)
    return getTableColumns.value
  else if (isGreaterThanSm.value)
    return getTableColumns.value.filter(item => item.xl)
  else
    return getTableColumns.value.filter(item => item.md)
})

function changeHidden() {
  if (isHidden.value)
    setIsHiddenFalse()
  else
    setIsHiddenTrue()
}

onMounted(() => {
  tableData.value = [
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '1.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency.MATIC,
      stealth: 1, // 隐身状态
    },
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '2.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency.JPY,
    },
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '1.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency.CAD,
    },
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '1.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency.BTC,
    },
  ]
  setLoadingFalse()
})
</script>

<template>
  <div class="app-bet-data">
    <div class="bet-data-head">
      <BaseTab v-model="activeTab" :list="getTabOptions" />
      <div v-if="isGreaterThanSm" class="select-ranking center">
        <VMenu placement="top">
          <div class="switch-hidden" :style="{ '--tg-icon-color': isHidden ? '#fff' : '' }" @click.stop="changeHidden">
            <BaseIcon name="uni-hidden" />
          </div>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ `隐身模式${isHidden ? '开启' : '关闭'}` }}
            </div>
          </template>
        </VMenu>
        <BaseSelect v-model="selectSize" :options="selectOptions" small />
      </div>
    </div>
    <div v-show="activeTab === 'ranking-list'" class="ranking-time">
      <div class="center cursor-pointer">
        <BaseIcon name="spt-competition" />
        <span>$100,000 竞赛 – 24 小时</span>
      </div>
      <div class="center cursor-pointer">
        <BaseIcon name="uni-trend" />
        <span>结束时间： 8小时后</span>
      </div>
    </div>
    <BaseTable
      :columns="getScaleColumns"
      :data-source="tableData"
      :loading="loading"
    >
      <template #gameName="{ record }">
        <div class="game-box cursor-pointer">
          <BaseIcon name="chess-plinko" />
          <span>{{ record.gameName }}</span>
        </div>
      </template>
      <template #player="{ record }">
        <template v-if="record.stealth">
          <VMenu placement="top">
            <div class="center stealth-box">
              <BaseIcon name="uni-hidden" />
              <span style="padding-left: 5px;">隐身</span>
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                此玩家启用了私密功能
              </div>
            </template>
          </VMenu>
        </template>
        <div v-else class="player-box cursor-pointer">
          {{ record.player }}
        </div>
      </template>
      <template #betMoney="{ record }">
        <div style="display: inline-block;">
          <AppAmount :amount="record.betMoney" :currency-type="record.currencyType" />
        </div>
      </template>
      <template #payMoney="{ record }">
        <div style="display: inline-block;color: var(--tg-text-green);">
          <AppAmount :amount="record.betMoney" :currency-type="record.currencyType" />
        </div>
      </template>
      <template #ranking="{ index }">
        <div v-if="index < 3" class="ranking-box">
          <BaseIcon v-if="index === 0" name="uni-rank1" />
          <BaseIcon v-else-if="index === 1" name="uni-rank2" />
          <BaseIcon v-else-if="index === 2" name="uni-rank3" />
        </div>
        <span v-else>{{ `${index + 1}th` }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.app-bet-data{
  .bet-data-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select-ranking{
      column-gap: 10px;
    }
  }
  .ranking-time{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
    color:var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    padding: 16px 8px;
    border-bottom: var(--tg-font-size-default) solid rgba(255,255,255,.05);
    span{
      padding-left: 8px;
    }
    >div:hover{
      --tg-icon-color: var(--tg-text-white);
    }
  }
  .switch-hidden{
    cursor: pointer;
  }
  .game-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span{
      padding-left: 10px;
      color:var(--tg-text-white);
    }
  }
  .player-box{
    color:var(--tg-text-white);
  }
  .stealth-box{
    cursor: help;
  }
  .ranking-box{
    font-size: var(--tg-font-size-xl);
  }
  .cursor-pointer{
    cursor: pointer;
    &:active{
      transform: scale(0.96);
    }
  }
}
</style>
