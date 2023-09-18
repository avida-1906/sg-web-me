<script setup lang="ts">
const { bool: loading, setFalse } = useBoolean(true)
const { bool: isHidden, setFalse: setIsHiddenFalse, setTrue: setIsHiddenTrue } = useBoolean(false)
const columns: any = ref([
  {
    title: '游戏',
    // width: 100,
    dataIndex: 'gameName',
    slot: 'gameName',
    align: 'left',
  },
  {
    title: '玩家',
    dataIndex: 'player',
    slot: 'player',
    align: 'center',
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
    dataIndex: 'rate',
    align: 'center',
  },
  {
    title: '支付额',
    dataIndex: 'payMoney',
    slot: 'payMoney',
    align: 'right',
  },
])
const tableData: any = ref([])
onMounted(() => {
  setTimeout(() => {
    tableData.value = [
      {
        gameName: 'Cursed seas',
        player: 'Herryhung',
        time: '10:47',
        betMoney: '1.111111',
        rate: '2.97x',
        payMoney: '113.34399768',
        currencyType: 19,
        stealth: 1,
      },
      {
        gameName: 'Cursed seas',
        player: 'Herryhung',
        time: '10:47',
        betMoney: '1.111111',
        rate: '2.97x',
        payMoney: '113.34399768',
        currencyType: 21,
      },
      {
        gameName: 'Cursed seas',
        player: 'Herryhung',
        time: '10:47',
        betMoney: '1.111111',
        rate: '2.97x',
        payMoney: '113.34399768',
        currencyType: 23,
      },
    ]
    setFalse()
  }, 3000)
})
const tab = ref('1')
const selectValue = ref(0)
// 是否开启隐身模式
// const isHidden = ref(false)
const tabList = [
  { value: '1', label: '我的投注' },
  { value: '2', label: '所有投注' },
  { value: '3', label: '风云榜' },
  { value: '4', label: '竞赛排行榜' },
]
const selectOptions: ISelectOption[] = [
  { label: '0', value: 0 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '40', value: 40 },
]
function changeHidden() {
  if (isHidden.value)
    setIsHiddenFalse()

  else
    setIsHiddenTrue()
}
</script>

<template>
  <div class="app-bet-data">
    <div class="bet-data-head">
      <div style="max-width: 420px;">
        <BaseTab v-model="tab" :list="tabList" />
      </div>
      <div class="select-ranking center">
        <VTooltip>
          <div class="switch-hidden" :style="{ '--tg-icon-color': isHidden ? '#fff' : '' }" @click="changeHidden">
            <BaseIcon name="uni-hidden" />
          </div>
          <template #popper>
            <div>
              <span>{{ `隐身模式${isHidden ? '开启' : '关闭'}` }}</span>
            </div>
          </template>
        </VTooltip>
        <BaseSelect v-model="selectValue" :options="selectOptions" small />
      </div>
    </div>
    <div class="ranking-time">
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
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
    >
      <template #gameName="record">
        <div class="game-box cursor-pointer">
          <BaseIcon name="chess-plinko" />
          <span>{{ record.gameName }}</span>
        </div>
      </template>
      <template #player="record">
        <div v-if="record.stealth" class="center stealth-box">
          <BaseIcon name="uni-hidden" />
          <span style="padding-left: 5px;">隐身</span>
        </div>
        <div v-else class="player-box cursor-pointer">
          {{ record.player }}
        </div>
      </template>
      <template #betMoney="record">
        <div style="display: inline-block;">
          <AppAmount :amount="record.betMoney" :currency-type="record.currencyType" />
        </div>
      </template>
      <template #payMoney="record">
        <div style="display: inline-block;color: var(--tg-text-green);">
          <AppAmount :amount="record.betMoney" :currency-type="record.currencyType" />
        </div>
      </template>
      <!-- <template #job="{ job }">
        hi {{ job }}
      </template> -->
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
    color: #fff;
    font-size: 14px;
    padding: 16px 8px;
    border-bottom: 2px solid rgba(255,255,255,.05);
    span{
      padding-left: 8px;
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
    }
  }
  .player-box{
    color:var(--tg-text-white);
  }
  .stealth-box{
    cursor: help;
  }
  .cursor-pointer{
    cursor: pointer;
    &:active{
      transform: scale(0.95);
    }
  }
}
</style>
