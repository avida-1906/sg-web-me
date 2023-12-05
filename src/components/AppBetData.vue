<script setup lang="ts">
type RewriteColumn = {
  xl?: boolean // 768-1200是否展示
  md?: boolean // <768是否展示
} & Column

interface Props {
  mode?: 'casino' | 'sports' | 'home'
  showTab?: boolean
  tabVal?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'home',
  showTab: true,
})

const { t } = useI18n()

const { isLessThanLg, isGreaterThanSm } = storeToRefs(useWindowStore())
// loading加载
const { bool: loading, setFalse: setLoadingFalse } = useBoolean(true)
// 是否开启隐身模式
const {
  bool: isHidden,
  setFalse: setIsHiddenFalse,
  setTrue: setIsHiddenTrue,
} = useBoolean(false)

// tab值
const activeTab: Ref<string> = ref(props.mode === 'casino' ? 'casino-fy' : 'ranking-list')
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
      { value: 'casino-mine', label: t('my_bets') },
      { value: 'casino-all', label: t('all_bets') },
      { value: 'casino-fy', label: t('billboard') },
      { value: 'ranking-list', label: t('competition_board'), bubble: true },
    ]
    case 'sports':return [
      { value: 'sports-all', label: t('all_bets') },
      { value: 'sports-fy', label: t('billboard') },
      { value: 'ranking-list', label: t('competition_board'), bubble: true },
    ]
    case 'home': return [
      { value: 'casino-all', label: t('casino_bets') },
      { value: 'sports-all', label: t('sports_betting') },
      { value: 'ranking-list', label: t('competition_board'), bubble: true },
    ]
  }
})
// 获取表格head
const getTableColumns: ComputedRef<RewriteColumn[]> = computed((): RewriteColumn[] => {
  switch (activeTab.value) {
    case 'casino-mine': return [
      {
        title: t('game'),
        // width: 100,
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: t('time'),
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: t('bet_amount'),
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
      },
      {
        title: t('multiple_count'),
        dataIndex: 'multiplier',
        align: 'right',
        xl: true,
      },
      {
        title: t('sports_payment_amount'),
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
        title: t('game'),
        // width: 100,
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: t('gamer'),
        dataIndex: 'player',
        slot: 'player',
        align: 'center',
        xl: true,
      },
      {
        title: t('time'),
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: t('bet_amount'),
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
      },
      {
        title: t('multiple_count'),
        dataIndex: 'multiplier',
        align: 'right',
        xl: true,
      },
      {
        title: t('sports_payment_amount'),
        dataIndex: 'payMoney',
        slot: 'payMoney',
        align: 'right',
        xl: true,
        md: true,
      },
    ]
    case 'ranking-list': return [
      {
        title: t('ranking'),
        // width: 100,
        dataIndex: '',
        slot: 'ranking',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: t('gamer'),
        dataIndex: 'player',
        slot: 'player',
        align: 'center',
        xl: true,
        md: true,
      },
      {
        title: t('wagered'),
        dataIndex: 'betMoney',
        slot: 'betMoney',
        align: 'right',
        xl: true,
        md: true,
      },
      {
        title: t('finance_other_tab_bonus'),
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
        title: t('sports_event'),
        // width: 100,
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
      },
      {
        title: t('gamer'),
        dataIndex: 'player',
        slot: 'player',
        align: 'center',
        xl: true,
      },
      {
        title: t('time'),
        dataIndex: 'time',
        align: 'center',
        xl: true,
      },
      {
        title: t('sports_odds_title'),
        dataIndex: 'multiplier',
        align: 'right',
        xl: true,
      },
      {
        title: t('bet_amount'),
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
const getScaleColumns: ComputedRef<RewriteColumn[]> = computed((): RewriteColumn[] => {
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

watch(() => props.tabVal, (newValue) => {
  if (newValue)
    activeTab.value = newValue
})

onMounted(() => {
  tableData.value = [
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '1234.11',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency[3],
      stealth: 1, // 隐身状态
    },
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '2.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency[2],
    },
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '1.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency[1],
    },
    {
      gameName: 'Cursed seas',
      player: 'Herryhung',
      time: '10:47',
      betMoney: '1.111111',
      multiplier: '2.97x',
      payMoney: '113.34399768',
      currencyType: EnumCurrency[0],
    },
  ]
  setLoadingFalse()
})
</script>

<template>
  <div class="app-bet-data">
    <div class="bet-data-head">
      <BaseTab v-show="showTab" v-model="activeTab" :list="getTabOptions" size="large" />
      <div v-if="isGreaterThanSm && mode !== 'home'" class="select-ranking center">
        <VTooltip placement="top">
          <div
            class="switch-hidden"
            :style="{ '--tg-icon-color': isHidden ? '#fff' : '' }"
            @click.stop="changeHidden"
          >
            <BaseIcon name="uni-hidden" />
          </div>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ `${t('hidden_mode')}${isHidden ? t('turn_on') : t('close')}` }}
            </div>
          </template>
        </VTooltip>
        <BaseSelect v-model="selectSize" :options="selectOptions" small />
      </div>
    </div>
    <div v-show="activeTab === 'ranking-list'" class="ranking-time">
      <div class="center cursor-pointer">
        <BaseIcon name="spt-competition" />
        <span>$100,000 {{ t('competition') }} – {{ t('time_hour', { delta: 24 }) }}</span>
      </div>
      <div class="center cursor-pointer">
        <BaseIcon name="uni-trend" />
        <span>{{ t('end_time') }}： {{ t('time_hour_after', { delta: 8 }) }}</span>
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
          <VTooltip placement="top">
            <div class="center stealth-box">
              <BaseIcon name="uni-hidden" />
              <span style="padding-left: 5px;">{{ t('hidden_user') }}</span>
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ t('user_turn_on_hidden') }}
              </div>
            </template>
          </VTooltip>
        </template>
        <div v-else class="player-box cursor-pointer">
          {{ record.player }}
        </div>
      </template>
      <template #betMoney="{ record }">
        <div style="display: inline-block;">
          <AppAmount
            :amount="record.betMoney"
            :currency-type="record.currencyType"
          />
        </div>
      </template>
      <template #payMoney="{ record }">
        <div style="display: inline-block;color: var(--tg-text-green);">
          <AppAmount
            :amount="record.betMoney"
            :currency-type="record.currencyType"
          />
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
    border-bottom: var(--tg-spacing-2) solid rgba(255,255,255,.05);
    span{
      padding-left: 8px;
      font-weight: var(--tg-font-weight-semibold);
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
    font-size: var(--tg-font-size-lg);
    display: flex;
  }
  .cursor-pointer{
    cursor: pointer;
    &:active{
      transform: scale(0.98);
    }
  }
}
</style>
