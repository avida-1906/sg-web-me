<script setup lang='ts'>
import AppSportBetSuccessNotify from './AppSportBetSuccessNotify.vue'
import type { IBetArgs } from '~/apis/types'
import type { ISportListToCartData } from '~/types'
import {
  EnumOddsChange,
  EnumsBetSlipBetSlipTabStatus,
  EnumsBetSlipHeadStatus,
} from '~/utils/enums'

const emit = defineEmits(['changeHeadSelectValue', 'getBetList'])

const chatScrollContent = ref<HTMLElement | null>(null)
const { VITE_SPORT_MULTI_BET_MAX } = getEnv()

let timer: any = null
const {
  bool: betLoading,
  setTrue: setBetLoadingTrue,
  setFalse: setBetLoadingFalse,
} = useBoolean(false)

const { t } = useI18n()
const router = useLocalRouter()
const appStore = useAppStore()
const { userLanguage } = storeToRefs(useLanguageStore())
const { openNotify } = useNotify()
// 获取betInfo接口是否成功
const { bool: fetchBetInfoStatus, setBool: setFetchBetInfoStatus } = useBoolean(true)
const {
  currentGlobalCurrency,
  currentGlobalCurrencyBalanceNumber,
  isLogin,
} = storeToRefs(appStore)
const sportStore = useSportsStore()
const {
  value: duplexInputValue,
  errorMessage: amountErrorMsg,
} = useField<number>('amount', (value) => {
  if (value < sportStore.cart.multiMia || value > sportStore.cart.multiMaa)
    return t('pls_input_min_max_amount', { min: sportStore.cart.multiMia, max: sportStore.cart.multiMaa })
  return ''
})
const { closeRightSidebar } = useRightSidebar()
const { openRegisterDialog } = useRegisterDialog()
const { isMobile } = storeToRefs(useWindowStore())
const { bool: keyboardBool, setBool: setKeyBoardBool } = useBoolean(false)

const {
  runAsync: runGetSportPlaceBetInfo,
} = useRequest(ApiSportPlaceBetInfo, {
  onSuccess(placeBetInfo) {
    setFetchBetInfoStatus(true)

    // 用来调试赔率变化的错误信息的
    // if (placeBetInfo.wsi && placeBetInfo.wsi.length > 0)
    //   placeBetInfo.wsi[0].ov = '0.01'

    sportStore.cart.updateAllData(
      cloneDeep(placeBetInfo),
      (_data) => {
        sendSportsCartToListEvent(_data.osOvIsChangeList)
      },
    )
  },
  onError() {
    setFetchBetInfoStatus(false)
    closeSetInterval()
  },
})

const selectTabsOne = computed(() => [
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

const selectTabsTwo = computed(() => [
  { label: t('sports_accept_any_odds'), value: EnumOddsChange.acceptAnyOddsChange },
  { label: t('sports_accept_higher_odds'), value: EnumOddsChange.acceptHigherOdds },
  { label: t('sports_accept_none_odds'), value: EnumOddsChange.notAcceptAnyOddsChange },
])

const {
  selected: betOrderSelectValue,
  list: betOrderData,
} = useSelect(selectTabsOne.value)
initBetOrderTab()

const {
  selected: betOrderFilterValue,
  list: betOrderFilterData,
} = useSelect(selectTabsTwo.value)

let setAmount = (_value: number) => {}
let deleteAmount = () => {}

/** 单式投注 */
const isBetSingle = computed(
  () => betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single,
)
/** 复式投注 */
const isBetMulti = computed(
  () => betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.multi,
)
const betBtnText = computed(() => {
  if (sportStore.cart.count === 1)
    return betOrderData.value.find(b => b.value === EnumsBetSlipBetSlipTabStatus.single)?.label ?? '-'

  return betOrderData.value.find(b => b.value === betOrderSelectValue.value)?.label ?? '-'
})
const cartDataList = computed(() => {
  if (isMobile.value)
    return sportStore.cart.dataList.slice().reverse()

  return sportStore.cart.dataList
})

/** 您的投注额不能超过余额 */
const isBetAmountOverBalance = computed(() => {
  if (isBetSingle.value)
    return currentGlobalCurrencyBalanceNumber.value < +sportStore.cart.totalPay

  else return currentGlobalCurrencyBalanceNumber.value < Number(duplexInputValue.value)
})
/** 错误信息 */
const errorInfo = computed<{
  /** 是否显示错误提示 */
  bool: boolean
  /** 错误提示信息 */
  errorMess: string
  /** 针对赔率专门返回一个值，用来是否显示接受赔率变化按钮 */
  isShowAcceptOddsBtn?: boolean
}>(() => {
  if (sportStore.cart.count === 0) {
    return {
      bool: false,
      errorMess: '',
    }
  }

  if (sportStore.cart.isSupportCurrency === false) {
    return {
      bool: true,
      errorMess: t('plat_not_sup_currency'),
    }
  }

  if (sportStore.cart.isExistCloseCaps) {
    return {
      bool: true,
      errorMess: t('has_stop_bet'),
    }
  }

  // 如果是复式投注，判断是否存在同一赛事的多重投注项
  if (isBetMulti.value) {
    if (sportStore.cart.getExistSameEventIdList.length) {
      return {
        bool: true,
        errorMess: t('cant_form_multiple'),
      }
    }

    if (
      sportStore.cart.getNotSupportWidList.length
      || sportStore.cart.getExistIcList.length
    ) {
      return {
        bool: true,
        errorMess: t('no_sup_multiple'),
      }
    }

    if (sportStore.cart.getOddsLessThanOnePointOneWidList.length) {
      return {
        bool: true,
        errorMess: t('min_odd_bet'),
      }
    }
  }

  if (sportStore.cart.count > VITE_SPORT_MULTI_BET_MAX) {
    return {
      bool: true,
      errorMess: t('bet_one_max', { max: VITE_SPORT_MULTI_BET_MAX }),
    }
  }

  // 不接受任何赔率变化
  if (betOrderFilterValue.value === EnumOddsChange.notAcceptAnyOddsChange) {
    // 赔率变化
    if (sportStore.cart.ovIsChange) {
      return {
        bool: true,
        errorMess: t('bet_odd_change'),
        isShowAcceptOddsBtn: true,
      }
    }
  }

  if (betOrderFilterValue.value === EnumOddsChange.acceptHigherOdds) {
    // 赔率变化
    if (sportStore.cart.ovIsChange) {
      // 有更低的赔率变化
      if (sportStore.cart.ovIsLower) {
        return {
          bool: true,
          errorMess: t('bet_odd_change'),
          isShowAcceptOddsBtn: true,
        }
      }
    }
  }

  // 余额不足
  if (isBetAmountOverBalance.value) {
    return {
      bool: true,
      errorMess: t('bet_more_than_balance'),
    }
  }

  // 投注金额最多只能输入两位小数
  if (sportStore.cart.isOnlyTwoDecimal && sportStore.cart.isExistMoreThanTwoDecimal) {
    return {
      bool: true,
      errorMess: t('bet_fixed_x', { fixed: 2 }),
    }
  }

  // 金额是不是10的倍数
  if (sportStore.cart.isTenMultiple && sportStore.cart.isTenMultipleBool) {
    return {
      bool: true,
      errorMess: t('bet_sup_10x'),
    }
  }

  // 金额是否存在小数点后五位的情况
  if (sportStore.cart.isFiveDecimal && sportStore.cart.isExistFiveDecimal) {
    return {
      bool: true,
      errorMess: t('bet_fixed_x', { fixed: 5 }),
    }
  }

  // 获取投注信息失败
  if (fetchBetInfoStatus.value === false) {
    return {
      bool: true,
      errorMess: t('failed_get_betinfo'),
    }
  }

  if (isBetMulti.value) {
    if (+sportStore.cart.multiMia === 0 && +sportStore.cart.multiMaa === 0) {
      return {
        bool: true,
        errorMess: t('max_odd'),
      }
    }
  }

  return {
    bool: false,
    errorMess: '',
  }
})

/** 投注按钮是否禁用 */
const isBetBtnDisabled = computed(() => {
  if (sportStore.cart.count === 0)
    return true

  if (isBetAmountOverBalance.value)
    return true

  if (isBetSingle.value) {
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

  if (errorInfo.value.bool)
    return true
})

const suffixLength = computed(() =>
  application.getCurrencySuffixLength(currentGlobalCurrency.value),
)

/** 复式总赔率 */
const duplexOv = computed(() => {
  if (sportStore.cart.count === 0)
    return '0.00'

  const v = sportStore.cart.dataList.reduce((prev, cur) => {
    return +mul(prev, +cur.ov)
  }, 1)

  return toFixed(v, 2)
})

/** 复式tab下的预计支付额 */
const duplexTotalProfit = computed(() => {
  const _duplexOv = Number(duplexOv.value)
  const val = Number(duplexInputValue.value)
  return mul(_duplexOv, val)
})

const isShowH5Keyboard = computed(() => {
  if (isMobile.value && keyboardBool.value)
    return true

  return false
})

/**
 * 投注请求
 * @param list 投注列表
 */
async function fetchBet(list: IBetArgs[]) {
  setBetLoadingTrue()
  const promiseList = list.map(item => ApiSportPlaceBet(item))
  const result = await Promise.allSettled(promiseList)
  setBetLoadingFalse()

  const successList = result.filter(item => item.status === 'fulfilled')

  const successWidList = list.filter((item, index) => result[index].status === 'fulfilled').map(item => item.bl[0].bi[0].wid)
  const failWidList = list.filter((item, index) => result[index].status === 'rejected').map(item => item.bl[0].bi[0].wid)

  console.log('successWidList', successWidList)
  console.log('failWidList', failWidList)

  // 单式
  if (isBetSingle.value) {
    list.forEach((item, index) => {
      const wid = item.bl[0].bi[0].wid
      const _result = result[index].status
      sportStore.cart.updateListResult(wid, _result)
    })
  }

  // 复式
  if (isBetMulti.value) {
    const _result = result[0].status
    list[0].bl[0].bi.forEach((item) => {
      const wid = item.wid
      sportStore.cart.updateListResult(wid, _result)
    })
  }

  if (successList.length) {
    betSuccessTip(successWidList)
    emit('getBetList')
  }
}

/**
 * 投注成功提示
 * @param successLength 成功的api数量
 */
function betSuccessTip(widSuccessList: string[]) {
  const message = isBetSingle.value
    ? t('sports_single_bet')
    : (sportStore.cart.count === 1
        ? t('sports_single_bet')
        : t('sports_multi_bet'))
  const amount = isBetSingle.value
    ? sportStore.cart.getAmountByWidList(widSuccessList)
    : Number(duplexInputValue.value)

  const num = isBetSingle.value
    ? widSuccessList.length
    : 1
  openNotify({
    type: 'wallet',
    title: message,
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

async function runGetSportPlaceBetInfoHandle() {
  if (isLogin.value === false)
    return

  if (sportStore.cart.count === 0)
    return

  if (
    isBetMulti.value
    && (
      sportStore.cart.getExistSameEventIdList.length
      || sportStore.cart.getExistIcList.length
    )
  )
    return

  if (sportStore.cart.count > VITE_SPORT_MULTI_BET_MAX)
    return

  const ic: EnumsBetSlipBetSlipTabStatus = sportStore.cart.count === 1
    ? EnumsBetSlipBetSlipTabStatus.single
    : betOrderSelectValue.value

  await runGetSportPlaceBetInfo({
    ic,
    bi: sportStore.cart.dataList,
    cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
  })
}

function slipTabChange() {
  sportStore.cart.setDefaultBetSlipBetSlipTabStatus(betOrderSelectValue.value)
  if (sportStore.cart.isShowReuse) {
    sportStore.cart.removeAll()
    return
  }
  runGetSportPlaceBetInfoHandle()
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

/**
 * 检查投注列表是否存在错误
 *
 * 具体指的是输入框输入错误
 */
async function checkBetListErrorStatus() {
  await new Promise(resolve => setTimeout(resolve, 30))
  return new Promise((resolve, reject) => {
    const checkDomError = document.querySelector('.app-sports-bet-slip-container .check-dom-error')

    if (checkDomError) {
      if (EnumsBetSlipBetSlipTabStatus.single === betOrderSelectValue.value) {
        const parentDom = checkDomError.closest('.app-sports-bet-slip')
        if (parentDom) {
          parentDom.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
          reject(new Error('Bet List Error'))
        }
      }
    }
    else {
      resolve(true)
    }
  })
}

/**
 * 投注方法
 *
 * 组装参数
 */
async function bet() {
  const checkBetListErrorStatusResult = await checkBetListErrorStatus()
  if (!checkBetListErrorStatusResult)
    return

  await runGetSportPlaceBetInfoHandle()
  await nextTick()

  if (errorInfo.value.bool)
    return

  if (
    betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.multi
    && sportStore.cart.count > 1
  ) {
    // 复式投注
    const betList = [
      {
        ao: betOrderFilterValue.value,
        bl: [
          {
            pt: sportStore.cart.dataList[0].pt,
            a: Number(duplexInputValue.value),
            bi: sportStore.cart.dataList,
          },
        ],
        cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
      },
    ]
    fetchBet(betList)
  }
  else if (
    betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.multi
    && sportStore.cart.count === 1
  ) {
    // 选中复试tab，但是只有一条数据，那么就是单式投注
    const betList = sportStore.cart.dataList.map<IBetArgs>(item => ({
      ao: betOrderFilterValue.value,
      bl: [
        {
          pt: item.pt,
          a: Number(duplexInputValue.value),
          bi: [item],
        },
      ],
      cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
    }))

    fetchBet(betList)
  }
  else {
    // 单式投注
    const betList = sportStore.cart.dataList.map<IBetArgs>(item => ({
      ao: betOrderFilterValue.value,
      bl: [
        {
          pt: item.pt,
          a: Number(item.amount),
          bi: [item],
        },
      ],
      cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
    }))

    fetchBet(betList)
  }
}

/** betinfo接口发送改变通知列表更新数据 */
function sendSportsCartToListEvent(_data: ISportListToCartData[]) {
  if (_data.length === 0)
    return

  console.error('购物车 ov， os发生了变化', _data)

  for (const item of _data)
    sportsCartToListBus.emit(item)
}

/** 处理列表通知发送的数据 */
function eventHandler(_data: ISportListToCartData) {
  console.log('收到列表发送的数据', _data)
  sportStore.cart.updateOvOs(_data)
}
/** 监听列表发送的事件 */
function addListToCartEvent() {
  sportsListToCartBus.on(eventHandler)
}

/** 移除列表发送的事件 */
function removeListToCartEvent() {
  sportsListToCartBus.off(eventHandler)
}

function firstInputFocus() {
  if (isMobile.value)
    return

  if (chatScrollContent.value && chatScrollContent.value?.querySelector('input'))
    chatScrollContent.value?.querySelector('input')?.focus()
}

function initBetOrderFilterValue() {
  const v = Local.get<EnumOddsChange>(STORAGE_SPORTS_BET_ORDER)?.value
  if (v)
    betOrderFilterValue.value = v

  else
    betOrderFilterValue.value = EnumOddsChange.notAcceptAnyOddsChange
}

function setBetOrderFilterValue(v: EnumOddsChange) {
  betOrderFilterValue.value = v
  Local.set(STORAGE_SPORTS_BET_ORDER, v)
}

function initBetOrderTab() {
  betOrderSelectValue.value = sportStore.cart.defaultBetSlipBetSlipTabStatus
}

function noDataGoToBet() {
  if (isMobile.value)
    closeRightSidebar()

  router.push(`/sports/${getSportsPlatId()}`)
  setTimeout(() => {
    sportsLobbyBus.emit(true)
  }, 50)
}

function handleKeyNum(v: number) {
  setAmount(v)
}

function handleKeyOk() {
  closeKeyboard()
}

function handleDelete() {
  deleteAmount()
}

function openKeyboard(
  _setAmount: (value: number) => void,
  _deleteAmount: () => void,
) {
  setKeyBoardBool(true)
  setAmount = _setAmount
  deleteAmount = _deleteAmount
}

function closeKeyboard() {
  setKeyBoardBool(false)
}

watch(() => sportStore.cart.count, (val, oVal) => {
  if (val) {
    nextTick(() => {
      if (chatScrollContent.value) {
        if (isMobile.value)
          chatScrollContent.value.scrollTop = 0
        else
          chatScrollContent.value.scrollTop = chatScrollContent.value?.scrollHeight ?? 0
      }
    })

    if (val > VITE_SPORT_MULTI_BET_MAX)
      return

    const _oVal = oVal ?? 0
    if (val > _oVal)
      emit('changeHeadSelectValue', EnumsBetSlipHeadStatus.betSlip)

    if (!timer) {
      runGetSportPlaceBetInfoHandle()
      startSetInterval()
    }
    else if (val !== oVal && val !== 0) {
      closeSetInterval()
      runGetSportPlaceBetInfoHandle()
      startSetInterval()
    }
  }
  else {
    closeSetInterval()
    sportStore.cart.setOvIsChangeBool(false)
  }
}, {
  immediate: true,
})

watch(currentGlobalCurrency, () => {
  runGetSportPlaceBetInfoHandle()
  duplexInputValue.value = '' as any
})

watch(isLogin, (val) => {
  if (val)
    runGetSportPlaceBetInfoHandle()
})

onMounted(() => {
  addListToCartEvent()
  firstInputFocus()
  initBetOrderFilterValue()
})

onUnmounted(() => {
  closeSetInterval()
  removeListToCartEvent()
  setAmount = null as any
  deleteAmount = null as any
})
</script>

<template>
  <div class="app-sports-bet-slip-container">
    <div class="header">
      <div class="tabs">
        <BaseTab
          v-model="betOrderSelectValue"
          :list="betOrderData"
          @change="slipTabChange"
        />
      </div>
      <div class="actions">
        <BaseButton
          v-if="sportStore.cart.isShowReuse"
          type="text"
          size="none"
          style="--tg-base-button-text-default-color: var(--tg-text-white);"
          @click="sportStore.cart.reuse()"
        >
          {{ t('reuse_bet') }}
        </BaseButton>
        <div v-else class="bet-order-filter">
          <BaseSelect
            v-model="betOrderFilterValue"
            class="bet-order-filter"
            :options="betOrderFilterData"
            no-hover popper
            @select="setBetOrderFilterValue"
          />
        </div>

        <BaseButton
          type="text"
          class="clear-all"
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
            v-model="item.amount"
            :bet-slip-type="betOrderSelectValue"
            :cart-info-data="item"
            :title="formatTitleData(item)"
            :index="index"
            :cart-data-list="cartDataList"
            :duplex-ov="duplexOv"
            :duplex-input-value="duplexInputValue"
            :duplex-total-profit="+duplexTotalProfit"
            :open-keyboard="openKeyboard"
            :close-keyboard="closeKeyboard"
            :keyboard-bool="keyboardBool"
          />
          <!-- 用来执行添加到购物车动画的 -->
          <div
            :id="EnumSportEndDomID.PC_CART_END_DOM"
            :key="EnumSportEndDomID.PC_CART_END_DOM"
          />
        </TransitionGroup>
        <!-- 无数据缺省 -->
        <div v-if="cartDataList.length === 0" class="empty">
          <BaseEmpty style="--tg-empty-text-padding: 0">
            <template #icon>
              <BaseIcon
                style="
                  font-size: var(--tg-empty-icon-size);
                  margin-bottom: var(--tg-spacing-30);
                "
                name="uni-empty-betslip"
              />
            </template>
            <template #description>
              <span class="mid-text">{{ t('sports_bet_slip_empty') }}</span>
            </template>
            <template #default>
              <div style="margin-top: 4px">
                <BaseButton
                  type="text"
                  size="none"
                  style=" --tg-base-button-text-default-color:var(--tg-text-white)"
                  @click="noDataGoToBet"
                >
                  {{ t('sports_betting_now') }}
                </BaseButton>
              </div>
            </template>
          </BaseEmpty>
        </div>
      </div>
    </div>

    <div v-if="!isShowH5Keyboard" class="footer">
      <template v-if="sportStore.cart.isShowReuse">
        <BaseButton
          size="md"
          bg-style="primary"
          @click="emit('changeHeadSelectValue', EnumsBetSlipHeadStatus.myBets)"
        >
          {{ t('view_my_bets') }}
        </BaseButton>
      </template>
      <template v-else>
        <!-- 投注单 -->
        <!-- 复式投注额输入框 -->
        <BaseInput
          v-show="isBetMulti"
          v-model="duplexInputValue"
          type="number"
          :msg="amountErrorMsg"
          :msg-after-touched="true"
          :placeholder="`${sportStore.cart.multiMia} - ${sportStore.cart.multiMaa}`"
        >
          <template #right-icon>
            <AppCurrencyIcon :currency-type="currentGlobalCurrency" />
          </template>
        </BaseInput>
        <div class="betslip-calculation-summary">
          <div v-show="isBetMulti" class="calculation-item">
            <span>{{ t('sports_total_odds') }}</span>
            <AppSportsOdds
              :odds="duplexOv"
              arrow="left"
            />
          </div>
          <!-- 单式 -->
          <div v-show="isBetSingle" class="calculation-item">
            <span>{{ t('sports_total_bet_amount') }}</span>
            <AppAmount
              :amount="application.sliceOrPad(sportStore.cart.totalAmount, suffixLength)"
              :currency-type="currentGlobalCurrency"
            />
          </div>

          <div class="calculation-item">
            <span>{{ t('sports_estimated_payment_amount') }}</span>
            <AppAmount
              v-if="betOrderSelectValue === EnumsBetSlipBetSlipTabStatus.single"
              :amount="application.sliceOrPad(sportStore.cart.totalProfit, suffixLength)"
              :currency-type="currentGlobalCurrency"
            />
            <AppAmount
              v-if="betOrderSelectValue === EnumsBetSlipBetSlipTabStatus.multi"
              :amount="application.sliceOrPad(+duplexTotalProfit, suffixLength)"
              :currency-type="currentGlobalCurrency"
            />
          </div>
        </div>
        <div
          v-if="errorInfo.bool" class="message"
        >
          <div class="icon">
            <BaseIcon class="error-icon" name="uni-warning" />
          </div>
          <span>{{ errorInfo.errorMess }}</span>
        </div>

        <template v-if="!isLogin">
          <BaseButton
            size="md"
            bg-style="primary"
            @click="openRegisterDialog"
          >
            {{ t('reg_bet') }}
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton
            v-if="errorInfo.isShowAcceptOddsBtn"
            size="md"
            bg-style="primary"
            @click="sportStore.cart.setOvIsChangeBool(false)"
          >
            {{ t('accept_odd') }}
          </BaseButton>
          <BaseButton
            v-else
            size="md"
            bg-style="primary"
            :disabled="isBetBtnDisabled"
            :loading="betLoading"
            style="--tg-base-button-loading-opacity:1;"
            sports-loading
            @click="bet"
          >
            {{ t('sports_bet') }}{{ userLanguage === 'zh-CN'
              ? betBtnText : ` ${betBtnText}` }}
          </BaseButton>
        </template>
      </template>
    </div>
    <div v-if="isShowH5Keyboard" class="keyboard" style="height: 180px">
      <BaseNumericKeypad
        @key-num="handleKeyNum"
        @key-ok="handleKeyOk"
        @key-delete="handleDelete"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.mid-text {
  display:  block;
  line-height: 21px;
  margin-top: 4px;
}
.app-sports-bet-slip-container {
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
    line-height: 14px;
    height: 32px;
    --tg-base-select-popcontent-lineheight: 14px;
  }
}

.bet-list {
  width: 100%;
  flex-grow: 1;
  height: 0;
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
      margin-top: var(--tg-spacing-1);
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
  display: flex;
  flex: 1;
  overflow: hidden;
  width: 0;
  --tg-base-select-hover-bg-color: var(--tg-secondary-dark);
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
  --tg-base-select-popper-label-color: var(--tg-text-lightgrey);
}

.clear-all {
  margin-left: var(--tg-spacing-16);
}
</style>
