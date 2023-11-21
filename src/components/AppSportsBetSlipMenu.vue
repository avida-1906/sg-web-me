<script setup lang='ts'>
import AppSportBetSuccessNotify from './AppSportBetSuccessNotify.vue'
import type { IBetArgs } from '~/apis/types'

const chatScrollContent = ref<HTMLElement | null>(null)

let timer: any = null
const duplexInputValue = ref('')
// 复式总赔率
const duplexOv = ref('')
const betLoading = ref(false)

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()
const { closeRightSidebar } = useRightSidebar()
const { openNotify } = useNotify()
const {
  currentGlobalCurrency,
  currentGlobalCurrencyBalanceNumber,
} = storeToRefs(appStore)
const sportStore = useSportsStore()
const { bool: ovIsChange, setBool: setOvChangeStateBool } = useBoolean(false)

const {
  run: runGetSportPlaceBetInfo,
} = useRequest(ApiSportPlaceBetInfo, {
  onSuccess(placeBetInfo) {
    sportStore.cart.updateAllData(placeBetInfo, (_ovIsChange, _duplexOv) => {
      if (ovIsChange.value !== _ovIsChange)
        setOvChangeStateBool(_ovIsChange)

      duplexOv.value = _duplexOv
    })
  },
})

const { selected: headSelectValue, list: headSelectData } = useSelect([
  {
    label: t('bet_slip'),
    value: EnumsBetSlipHeadStatus.betSlip,
    icon: 'spt-user-bet',
  },
  {
    label: t('my_bets'),
    value: EnumsBetSlipHeadStatus.myBets,
    icon: 'navbar-user-bet',
  },
])

const { selected: betOrderSelectValue, list: betOrderData } = useSelect([
  {
    label: t('sports_single_bet'),
    value: EnumsBetSlipBetSlipTabStatus.single,
    icon: 'navbar-bet',
  },
  {
    label: t('sports_multi_bet'),
    value: EnumsBetSlipBetSlipTabStatus.multi,
    icon: 'navbar-bet-mult',
  },
])

const { selected: myBetSelectValue, list: myBetData } = useSelect([
  {
    label: t('sports_active'),
    value: EnumsBetSlipMyBetsTabStatus.active,
    icon: 'navbar-active',
  },
  {
    label: t('sports_settled'),
    value: EnumsBetSlipMyBetsTabStatus.settled,
    icon: 'navbar-settled',
  },
])

const { selected: betOrderFilterValue, list: betOrderFilterData } = useSelect([
  { label: t('sports_accept_any_odds'), value: EnumOddsChange.acceptAnyOddsChange },
  { label: t('sports_accept_higher_odds'), value: EnumOddsChange.acceptHigherOdds },
  { label: t('sports_accept_none_odds'), value: EnumOddsChange.notAcceptAnyOddsChange },
])

const isBetSlip = computed(() => headSelectValue.value === EnumsBetSlipHeadStatus.betSlip)
const isMyBets = computed(() => headSelectValue.value === EnumsBetSlipHeadStatus.myBets)
const isBetSingle = computed(
  () => betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single,
)
const isBetMulti = computed(
  () => betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.multi,
)
const betBtnText = computed(() =>
  betOrderData.value.find(b => b.value === betOrderSelectValue.value)?.label ?? '-',
)
const cartDataList = computed(() => sportStore.cart.dataList)
const betCount = computed(() => {
  return sportStore.cart.count
})
/** 复式tab下的预计支付额 */
const duplexTotalProfit = computed(() => {
  const _duplexOv = Number(duplexOv.value)
  const val = Number(duplexInputValue.value)
  return mul(_duplexOv, val)
})
/** 您的投注额不能超过余额 */
const isBetAmountOverBalance = computed(() => {
  if (betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single)
    return currentGlobalCurrencyBalanceNumber.value < +sportStore.cart.totalProfit

  else return currentGlobalCurrencyBalanceNumber.value < +duplexTotalProfit.value
})
/** 投注按钮是否禁用 */
const isBetBtnDisabled = computed(() => {
  if (sportStore.cart.count === 0)
    return true

  if (isBetAmountOverBalance.value)
    return true

  if (betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single) {
    /**
     * 单式投注
     *判断 sportStore.cart.dataList 中的每一项的amount是否为0
     */
    const isAmountZero = sportStore.cart.dataList.some(item => item.amount <= 0)
    if (isAmountZero)
      return true
  }
  else {
    /**
     * 复式投注
     * 判断 duplexInputValue.value 是否小于等于0
     */
    if (Number(duplexInputValue.value) <= 0)
      return true
  }
})

async function fetchBet(list: IBetArgs[]) {
  betLoading.value = true
  const promiseList = list.map(item => ApiSportPlaceBet(item))
  const result = await Promise.allSettled(promiseList)
  betLoading.value = false

  const successList = result.filter(item => item.status === 'fulfilled')

  const successWidList = list.filter((item, index) => result[index].status === 'fulfilled').map(item => item.bl[0].bi[0].wid)
  const failWidList = list.filter((item, index) => result[index].status === 'rejected').map(item => item.bl[0].bi[0].wid)

  console.log('successWidList', successWidList)
  console.log('failWidList', failWidList)

  // 单式
  if (betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single) {
    list.forEach((item, index) => {
      const wid = item.bl[0].bi[0].wid
      const _result = result[index].status
      sportStore.cart.updateListResult(wid, _result)
    })
  }

  // 复式
  if (betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.multi) {
    const _result = result[0].status
    list[0].bl[0].bi.forEach((item) => {
      const wid = item.wid
      sportStore.cart.updateListResult(wid, _result)
    })
  }

  if (successList.length)
    betSuccess()
}

function betSuccess() {
  const message = betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single
    ? '单项投注'
    : '复式投注'
  const amount = betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single
    ? sportStore.cart.totalProfit
    : duplexTotalProfit.value
  const num = betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single
    ? sportStore.cart.count
    : 1
  openNotify({
    type: 'success',
    message: () => h(
      AppSportBetSuccessNotify,
      {
        amount,
        currencyType: currentGlobalCurrency.value,
        betSlipTabValue: message,
        num,
      },
    ),
  })
}

function runGetSportPlaceBetInfoHandle() {
  runGetSportPlaceBetInfo({
    ic: betOrderSelectValue.value,
    bi: sportStore.cart.dataList,
    cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
  })
}

function startSetInterval() {
  console.log('开始购物车轮训')
  timer = setInterval(() => {
    runGetSportPlaceBetInfoHandle()
  }, 1000 * 10)
}

function closeSetInterval() {
  console.log('结束购物车轮训')
  clearInterval(timer)
  timer = null
}

function bet() {
  if (betOrderSelectValue.value === 1) {
    const betList = [
      {
        ao: betOrderFilterValue.value,
        bl: [
          {
            pt: betOrderSelectValue.value,
            a: Number(toFixed(Number(duplexTotalProfit.value), 2)),
            bi: sportStore.cart.dataList,
          },
        ],
        cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
      },
    ]
    // 复式投注
    fetchBet(betList)
  }
  else {
    // 单式投注
    const betList = sportStore.cart.dataList.map<IBetArgs>(item => ({
      ao: betOrderFilterValue.value,
      bl: [
        {
          pt: betOrderSelectValue.value,
          a: Number(item.amount),
          bi: [item],
        },
      ],
      cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
    }))

    fetchBet(betList)
  }
}

watch(() => sportStore.cart.count, (val) => {
  if (val) {
    nextTick(() => {
      if (chatScrollContent.value)
        chatScrollContent.value.scrollTop = chatScrollContent.value?.scrollHeight ?? 0
    })

    if (!timer) {
      runGetSportPlaceBetInfoHandle()
      startSetInterval()
    }
  }
  else {
    closeSetInterval()
    setOvChangeStateBool(false)
  }
}, {
  immediate: true,
})

onUnmounted(() => {
  closeSetInterval()
})
</script>

<template>
  <div class="app-sports-bet-slip-menu">
    <div class="header">
      <div class="navigation-header">
        <BaseSelect
          v-model="headSelectValue"
          style="--tg-base-select-hover-bg-color:var(--tg-secondary-dark);
          --tg-base-select-popper-style-padding-x:0;"
          :options="headSelectData" no-hover popper
        >
          <template #label="{ data }">
            <div class="type-select">
              <BaseIcon :name="data?.icon" />
              <span>{{ data?.label }}</span>
              <BaseBadge v-if="betCount" :count="betCount" mode="active" />
            </div>
          </template>
          <template #option="{ data: { item } }">
            <div class="type-option">
              <BaseIcon :name="item.icon" />
              <span>{{ item.label }}</span>
              <BaseBadge v-if="item?.num" :count="item?.num" mode="active" />
            </div>
          </template>
        </BaseSelect>

        <VTooltip placement="bottom">
          <div class="item hoverable">
            <BaseButton type="text" @click="closeRightSidebar">
              <BaseIcon name="uni-close" />
            </BaseButton>
          </div>
          <template #popper>
            <div class="tiny-menu-item-title">
              折叠侧边栏
            </div>
          </template>
        </VTooltip>
      </div>
      <div class="tabs">
        <BaseTab
          v-show="isBetSlip"
          v-model="betOrderSelectValue"
          :list="betOrderData"
          @change="runGetSportPlaceBetInfoHandle"
        />
        <BaseTab v-show="isMyBets" v-model="myBetSelectValue" :list="myBetData" />
      </div>
      <div v-show="isBetSlip" class="actions">
        <BaseButton
          v-if="sportStore.cart.isShowReuse"
          type="text"
          size="none"
          style="--tg-base-button-text-default-color: var(--tg-text-white);"
          @click="sportStore.cart.reuse()"
        >
          重新使用投注单
        </BaseButton>
        <BaseSelect
          v-else
          v-model="betOrderFilterValue"
          class="bet-order-filter"
          :options="betOrderFilterData"
          no-hover
          popper
        />
        <BaseButton
          type="text"
          size="none"
          style="--tg-base-button-text-default-color: var(--tg-text-white);"
          @click="sportStore.cart.removeAll()"
        >
          {{ t('clear_all') }}
        </BaseButton>
      </div>
    </div>

    <div class="bet-list">
      <div ref="chatScrollContent" class="scroll-y betlist-scroll">
        <TransitionGroup name="list" tag="div">
          <AppSportsBetSlip
            v-for="item, index in cartDataList"
            :key="item.wid"
            :bet-slip-type="betOrderSelectValue"
            :cart-info-data="item"
            :index="index"
          />
          <!-- 用来执行添加到购物车动画的 -->
          <div
            :id="EnumSportEndDomID.PC_CART_END_DOM"
            :key="EnumSportEndDomID.PC_CART_END_DOM"
          />
        </TransitionGroup>
        <!-- 无数据缺省，不要删！ -->
        <!-- <div class="empty">
          <BaseEmpty>
            <template #icon>
              <BaseIcon
                style="
              font-size: var(--tg-empty-icon-size);
              margin-bottom: var(--tg-spacing-24);"
                name="uni-empty-betslip"
              />
            </template>
            <template #description>
              <span>{{ t('sports_bet_slip_empty') }}</span>
            </template>
            <template #default>
              <BaseButton
                type="text"
                size="none"
                style=" --tg-base-button-text-default-color:var(--tg-text-white)"
                @click="router.push(`/sports/${getSportsPlatId()}`)"
              >
                {{t('sports_betting_now')}}
              </BaseButton>
            </template>
          </BaseEmpty>
        </div> -->
      </div>
    </div>

    <div class="footer">
      <!-- 投注单 -->
      <template v-if="isBetSlip">
        <!-- 复式投注额输入框 -->
        <BaseInput
          v-show="isBetMulti"
          v-model="duplexInputValue"
          type="number"
          placeholder="0.00000000"
        >
          <template #right-icon>
            <AppCurrencyIcon :currency-type="currentGlobalCurrency" />
          </template>
        </BaseInput>
        <div class="betslip-calculation-summary">
          <div v-show="isBetMulti" class="calculation-item">
            <span>{{ t('sports_total_odds') }}</span>
            <AppSportsOdds :odds="duplexOv" arrow="left" />
          </div>
          <!-- 单式 -->
          <div v-show="isBetSingle" class="calculation-item">
            <span>{{ t('sports_total_bet_amount') }}</span>
            <AppAmount
              :amount="sportStore.cart.totalAmount"
              :currency-type="currentGlobalCurrency"
            />
          </div>

          <div class="calculation-item">
            <span>{{ t('sports_estimated_payment_amount') }}</span>
            <AppAmount
              v-if="betOrderSelectValue === EnumsBetSlipBetSlipTabStatus.single"
              :amount="sportStore.cart.totalProfit"
              :currency-type="currentGlobalCurrency"
            />
            <AppAmount
              v-if="betOrderSelectValue === EnumsBetSlipBetSlipTabStatus.multi"
              :amount="duplexTotalProfit"
              :currency-type="currentGlobalCurrency"
            />
          </div>
        </div>

        <div v-if="ovIsChange || isBetAmountOverBalance" class="message">
          <div class="icon">
            <BaseIcon class="error-icon" name="uni-warning" />
          </div>
          <span v-if="ovIsChange">{{ t('sports_odds_has_changed') }}</span>
          <span v-else-if="isBetAmountOverBalance">您的投注额不能大于余额。</span>
        </div>

        <BaseButton
          v-if="ovIsChange"
          size="md"
          bg-style="primary"
          @click="setOvChangeStateBool(false)"
        >
          接受新赔率
        </BaseButton>
        <BaseButton
          v-else
          size="md"
          bg-style="primary"
          :disabled="isBetBtnDisabled"
          :loading="betLoading"
          @click="bet"
        >
          {{ t('sports_bet') }}{{ betBtnText }}
        </BaseButton>
      </template>
      <!-- 我的投注 -->
      <BaseButton
        v-else size="md"
        @click="router.push(`/sports/${getSportsPlatId()}/my-bets?type=sports`)"
      >
        {{ t('view_all') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.type-option {
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-8);
}

.app-sports-bet-slip-menu {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: grid;
  grid-auto-flow: row;
  place-content: stretch;

  .navigation-header {
    background: var(--tg-secondary-dark);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--tg-header-height);
    z-index: 2;
    position: relative;
    box-shadow: var(--tg-box-shadow-lg);
    touch-action: none;
    padding-right: var(--tg-scrollbar-size);
    padding-left: var(--tg-spacing-16);

    .type-select {
      display: flex;
      align-items: center;
      gap:var(--tg-spacing-8);
    }

    .hoverable {
      padding: var(--tg-spacing-1) var(--tg-spacing-4);
      border-radius: 50%;
      transition: all ease .25s;
      background-color: transparent;
      &:hover {
        background-color: var(--tg-secondary-deepdark);
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }

  .tabs {
    display: grid;
    grid-auto-flow: column;
    place-items: flex-start;
    border-bottom: 2px solid var(--tg-secondary-grey);
    padding: var(--tg-spacing-8);
    gap: var(--tg-spacing-8);
    --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
    --tg-tab-style-inner-padding-y: var(--tg-spacing-13);
    --tg-tab-style-inner-padding-x: var(--tg-spacing-16);
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--tg-spacing-8) var(--tg-spacing-16);
  }
}

.bet-list {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  .betlist-scroll {
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
    padding: var(--tg-spacing-8) var(--tg-spacing-16) var(--tg-spacing-16);
    overscroll-behavior: contain;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    min-height: 150px;
  }
}

.footer {
  display: grid;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-12);
  background: var(--tg-secondary-grey);
  grid-template-rows: auto;
  grid-auto-flow: row;

  .betslip-calculation-summary {
    display: flex;
    flex-direction: column;

    .calculation-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1.5;

      span {
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-normal);
      }
    }
  }

  .message {
    display: flex;
    align-items: flex-start;
    background-color: var(--tg-secondary-dark);
    padding: var(--tg-spacing-12);
    gap: var(--tg-spacing-12);
    border: 2px dashed;
    border-radius: var(--tg-radius-md);
    border-color: var(--tg-text-error);
    line-height: 1.5;

    .icon {
      margin-top: var(--tg-spacing-3);
      margin-bottom: var(--tg-spacing-3);
      margin-left: var(--tg-spacing-4);
      display: flex;
      align-items: center;
      font-size: var(--tg-font-size-md);
    }

    span {
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-error);
    }
  }
}

.list-enter-active{
  transition: all 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8);
}

.list-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.bet-order-filter {
  --tg-base-select-hover-bg-color: var(--tg-secondary-dark);
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
  --tg-base-select-popper-label-color: var(--tg-text-lightgrey);
}
</style>
