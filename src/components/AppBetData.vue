<script setup lang="ts">
import type { CurrencyCode } from '~/composables/useCurrencyData'

type RewriteColumn = {
  xl?: boolean // 768-1200是否展示
  md?: boolean // <768是否展示
} & Column

interface Props {
  mode?: 'casino' | 'sports' | 'home'
  showTab?: boolean
  tabVal?: string
  isCasinoMine?: boolean // 是否显示我的投注
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'home',
  showTab: true,
  isCasinoMine: true,
})
const emit = defineEmits(['delMine'])
const { t } = useI18n()

const { isLogin } = storeToRefs(useAppStore())
const { isLessThanLg, isGreaterThanSm } = storeToRefs(useWindowStore())
const { bool: color, setBool: setColor } = useBoolean(false)
const timer: Ref<NodeJS.Timeout | null> = ref(null)
const { isMobile } = storeToRefs(useWindowStore())
// 需要获取多少条数据
const selectSize: Ref<string> = ref('10')
// 是否开启隐身模式
const {
  bool: isHidden,
  setFalse: setIsHiddenFalse,
  setTrue: setIsHiddenTrue,
} = useBoolean(false)
// const { openStatisticsDialog } = useStatisticsDialog()
// 投注详情
// const { openBetSlipDialog } = useDialogBetSlip()
// 我的投注
const {
  list,
  runAsync: runCasinoRecordList,
  loading,
  page_size: casinoRecordPageSize,
  // prev, next, hasMore, page,
} = useList(ApiMemberCasinoRecordList, {}, { page_size: 10 })
// 所有投注、风云榜
const {
  list: betList,
  runAsync: runMemberBetList,
  loading: loadBet,
  page_size: betPageSize,
  // prev, next, hasMore, page,
} = useList(ApiMemberBetList, {}, { page_size: 10 })
// 竞赛排行榜
const {
  list: rankList,
  runAsync: runMemberCompetitionList,
  loading: loadRank,
  page_size: rankPageSize,
  // prev, next, hasMore, page,
} = useList(ApiMemberCompetitionList, {}, { page_size: 10 })

// tab值
const activeTab: Ref<string> = ref(props.mode === 'casino' ? 'casino-fy' : 'sports-fy')
const selectOptions: ISelectOption[] = [
  { label: '0', value: '0' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
]

// 获取tab配置
const getTabOptions = computed(() => {
  switch (props.mode) {
    case 'casino': {
      const arr = [
        { value: 'casino-all', label: t('all_bets'), disabled: false },
        { value: 'casino-fy', label: t('billboard') },
        { value: 'ranking-list', label: t('competition_board'), bubble: true },
      ]
      if (props.isCasinoMine)
        arr.unshift({ value: 'casino-mine', label: t('my_bets'), disabled: !isLogin.value })
      return arr
    }
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
        dataIndex: 'game_name',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
        isRound: 'left',
      },
      {
        title: t('time'),
        dataIndex: 'bet_time',
        align: 'center',
        slot: 'bet_time',
        skeWidth: '34px',
      },
      {
        title: t('bet_amount'),
        dataIndex: 'bet_amount',
        slot: 'betMoney',
        align: 'right',
        isRound: 'right',
        skeWidth: '77px',
      },
      {
        title: t('multiple_count'),
        dataIndex: 'factor',
        slot: 'factor',
        align: 'right',
        xl: true,
        skeWidth: '42px',
      },
      {
        title: t('sports_payment_amount'),
        dataIndex: 'net_amount',
        slot: 'payMoney',
        align: 'right',
        xl: true,
        md: true,
        isRound: 'right',
        skeWidth: '77px',
      },
    ]
    case 'casino-all':
    case 'casino-fy': return [
      {
        title: t('game'),
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
        isRound: 'left',
      },
      {
        title: t('gamer'),
        dataIndex: 'username',
        slot: 'player',
        align: 'center',
        xl: true,
      },
      {
        title: t('time'),
        dataIndex: 'created_at',
        align: 'center',
        slot: 'bet_time',
        skeWidth: '34px',
      },
      {
        title: t('bet_amount'),
        dataIndex: 'bet_amount',
        slot: 'betMoney',
        align: 'right',
        isRound: 'right',
        skeWidth: '77px',
      },
      {
        title: t('multiple_count'),
        dataIndex: 'factor',
        slot: 'factor',
        align: 'right',
        xl: true,
        skeWidth: '42px',
      },
      {
        title: t('sports_payment_amount'),
        dataIndex: 'net_amount',
        slot: 'payMoney',
        align: 'right',
        xl: true,
        md: true,
        isRound: 'right',
        skeWidth: '77px',
      },
    ]
    case 'ranking-list': return [
      {
        title: t('ranking'),
        dataIndex: '',
        slot: 'ranking',
        align: 'left',
        xl: true,
        md: true,
        skeWidth: '21px',
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
        dataIndex: 'bet_amount',
        // slot: 'betMoney',
        isAmount: true,
        align: 'right',
        xl: true,
        md: true,
        isTips: true,
        isRound: 'right',
        skeWidth: '77px',
      },
      {
        title: t('finance_other_tab_bonus'),
        dataIndex: 'net_amount',
        slot: isMobile.value ? 'bonusAmount' : '',
        isAmount: true,
        align: 'right',
        xl: true,
        md: true,
        isRound: 'right',
        skeWidth: '77px',
      },
    ]
    case 'sports-all':
    case 'sports-fy':return [
      {
        title: t('sports_event'),
        dataIndex: 'gameName',
        slot: 'gameName',
        align: 'left',
        xl: true,
        md: true,
        isRound: 'left',
      },
      {
        title: t('gamer'),
        dataIndex: 'username',
        slot: 'player',
        align: 'center',
        xl: true,
      },
      {
        title: t('time'),
        dataIndex: 'created_at',
        align: 'center',
        slot: 'bet_time',
        xl: true,
        skeWidth: '34px',
      },
      {
        title: t('sports_odds_title'),
        dataIndex: 'factor',
        slot: 'factor',
        align: 'right',
        xl: true,
        skeWidth: '42px',
      },
      {
        title: t('bet_amount'),
        dataIndex: 'bet_amount',
        slot: 'betMoney',
        align: 'right',
        xl: true,
        md: true,
        isRound: 'right',
        skeWidth: '77px',
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
const getList = computed(() => {
  switch (activeTab.value) {
    case 'casino-mine': return list.value
    case 'casino-all':
    case 'sports-all':
    case 'casino-fy':
    case 'sports-fy':
      return betList.value
    case 'ranking-list':
      return rankList.value
    default: return []
  }
})
const getBgColor = computed(() => {
  return {
    '--tg-table-even-background': color.value
      ? 'initial'
      : 'var(--tg-secondary-grey)',
    '--tg-table-odd-background': color.value
      ? 'var(--tg-secondary-grey)'
      : 'initial',
  }
})

function changeHidden() {
  if (isHidden.value)
    setIsHiddenFalse()
  else
    setIsHiddenTrue()
}
function getPrefixAmount(currency_id: CurrencyCode, amount: string) {
  const name = getCurrencyConfigByCode(currency_id)?.name
  application.isVirtualCurrency(name)
  return (application.isVirtualCurrency(name) ? '' : currencyConfig[name].prefix) + amount
}
function getMemberBetList() {
  const type = ['casino-all', 'sports-all'].includes(activeTab.value) ? '0' : (['casino-fy', 'sports-fy'].includes(activeTab.value) ? '1' : '')
  !loadBet.value && runMemberBetList({ type })
}

watch(() => props.tabVal, (newValue) => {
  if (newValue)
    activeTab.value = newValue
})
watch(() => activeTab.value, (newValue) => {
  if (selectSize.value !== '0') {
    const size = Number(selectSize.value)
    if (newValue === 'casino-mine') {
      /** 判断分页大小书是否变化 */
      const isChange = casinoRecordPageSize.value !== size
      if (isChange)
        casinoRecordPageSize.value = size
      else
        runCasinoRecordList({})
    }
    else if (['casino-all', 'sports-all'].includes(activeTab.value)) {
      const isChange = betPageSize.value !== size
      if (isChange)
        betPageSize.value = size
      else
        runMemberBetList({ type: '0', game_class: props.mode === 'sports' ? '4' : '' })
    }
    else if (['casino-fy', 'sports-fy'].includes(activeTab.value)) {
      const isChange = betPageSize.value !== size
      if (isChange)
        betPageSize.value = size
      else
        runMemberBetList({ type: '1', game_class: props.mode === 'sports' ? '4' : '' })
    }
    else if (['ranking-list'].includes(activeTab.value)) {
      const isChange = rankPageSize.value !== size
      if (isChange)
        rankPageSize.value = size
      else
        runMemberCompetitionList()
    }
  }
  if (['casino-all', 'casino-fy'].includes(activeTab.value)) {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
    timer.value = setInterval(() => {
      // getMemberBetList()
      setColor(!color.value)
    }, 2000)
  }
  else {
    timer.value && clearInterval(timer.value)
    timer.value = null
    setColor(true)
  }
}, { immediate: true })
watch(() => isLogin.value, (newValue) => {
  if (newValue) {
    runCasinoRecordList({}).then(() => {
      if (!list.value.length)
        emit('delMine')
    })
  }
}, { immediate: true })
watch(() => selectSize.value, (newValue) => {
  if (activeTab.value === 'casino-mine')
    casinoRecordPageSize.value = Number(newValue)
  else if (activeTab.value === 'ranking-list')
    rankPageSize.value = Number(newValue)
  else
    betPageSize.value = Number(newValue)
})

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<template>
  <div class="app-bet-data" :class="[isMobile ? 'h5-mobile' : '']">
    <div class="bet-data-head">
      <BaseTab v-show="showTab" v-model="activeTab" :list="getTabOptions" size="large" />
      <div v-if="isGreaterThanSm && mode !== 'home'" class="select-ranking center">
        <VTooltip placement="top">
          <div
            class="switch-hidden"
            :style="{ '--tg-icon-color': isHidden ? 'var(--tg-text-white)' : '' }"
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
    <template v-if="selectSize !== '0'">
      <div v-show="activeTab === 'ranking-list'" class="ranking-time">
        <div class="center cursor-pointer">
          <BaseIcon name="spt-competition" />
          <span>{{ t('competition', { money: `$${application.numberToLocaleString(99999, getCurrentLanguageForFrontend())}` })
          }} – {{
            t('time_hour', { delta: 24 }) }}</span>
        </div>
        <div class="center cursor-pointer">
          <BaseIcon name="uni-trend" />
          <span>
            {{ t('end_time_table', { time: 8 }) }}
          </span>
        </div>
      </div>
      <BaseTable
        :columns="getScaleColumns"
        :data-source="getList"
        :style="getBgColor"
        :loading="loading || loadBet || loadRank"
        :last-first-padding="isMobile"
        :show-empty="false"
        is-amount-popper
      >
        <template #gameName="{ record }">
          <div class="game-box">
            <BaseImage :url="`${record.icon}`" width="14px" is-network />
            <div class="game-name">
              {{ record.game_name }}
            </div>
          </div>
        </template>
        <template #bet_time="{ record }">
          {{ timeToCustomizeFormat(record.bet_time ?? record.created_at, 'HH:mm') }}
        </template>
        <template #player="{ record }">
          <template v-if="record.state === '2'">
            <VTooltip placement="top" :triggers="['click', 'hover']">
              <div class="center stealth-box">
                <BaseIcon name="uni-hidden" />
                <span style="padding-left: 5px;" class="semibold">
                  {{ t('hidden_user') }}
                </span>
              </div>
              <template #popper>
                <div class="tiny-menu-item-title">
                  {{ t('user_turn_on_hidden') }}
                </div>
              </template>
            </VTooltip>
          </template>
          <div v-else class="semibold player-box">
            <!-- @click="openStatisticsDialog" -->
            {{ record.username }}
          </div>
        </template>
        <template #betMoney="{ record }">
          <div style="display: inline-block;">
            <!-- <VTooltip placement="top" :triggers="['click', 'hover']"> -->
            <AppAmount
              :amount="getPrefixAmount(record.currency_id, record.bet_amount)"
              :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
              style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
            />
            <!-- <template #popper>
                <div class="tiny-menu-item-title">
                  <AppAmount
                    :amount="getPrefixAmount(record.currency_id, record.bet_amount)"
                    :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
                    style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
                  />
                </div>
              </template>
            </VTooltip> -->
          </div>
        </template>
        <template #payMoney="{ record }">
          <div
            :style="{
              display: 'inline-block',
              color: (record.net_amount ?? record.pay_amount) > 0
                ? 'var(--tg-text-green)' : '',
            }"
          >
            <AppAmount
              :amount="getPrefixAmount(record.currency_id, record.net_amount
                ?? record.pay_amount)"
              :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
              style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
            />
          </div>
        </template>
        <template #bonusAmount="{ record }">
          <div style="display:inline-block">
            <!-- <div v-if="isMobile"> -->
            {{ `${record.percent}%` }}
            <!-- </div> -->
            <!-- <AppAmount
              v-else
              :amount="getPrefixAmount(record.currency_id, record.net_amount)"
              :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
              style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
            /> -->
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
        <template #factor="{ record: { factor } }">
          {{ factor ? application.numberToLocaleString(factor) + (mode === 'casino' ? 'x' : '') : '-' }}
        </template>
      </BaseTable>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.app-bet-data{
  --tg-app-amount-font-weight: 400;
  .bet-data-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--tg-spacing-4);
    .select-ranking{
      column-gap: var(--tg-spacing-10);
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
      padding-left: var(--tg-spacing-8);
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
    font-weight: var(--tg-font-weight-semibold);
    .game-name{
      max-width: 12ch;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
.h5-mobile{
  --tg-table-th-padding-x: var(--tg-spacing-8);
  --tg-table-td-padding-x: var(--tg-spacing-8);
  --tg-table-tr-last-first-padding: var(--tg-spacing-16);
  // th:last-child {
  //   padding-right: var(--tg-spacing-16) !important;
  // }
  // th:first-child {
  //   padding-left: var(--tg-spacing-16) !important;
  // }
}
</style>
