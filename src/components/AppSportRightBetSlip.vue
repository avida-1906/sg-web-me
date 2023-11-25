<script setup lang='ts'>
import AppSportBetSuccessNotify from './AppSportBetSuccessNotify.vue'
import type { IBetArgs } from '~/apis/types'
import type { ISportListToCartData } from '~/types'
import { EnumsBetSlipHeadStatus } from '~/utils/enums'

const emit = defineEmits<{
  changeHeadSelectValue: [value: EnumsBetSlipHeadStatus] // 具名元组语法
}>()

const chatScrollContent = ref<HTMLElement | null>(null)
const { VITE_SPORT_MULTI_BET_MAX } = getEnv()

let timer: any = null
const betLoading = ref(false)
// 复式投注项的最小投注额
const multiMia = ref(0)
// 复式投注项的最大投注额
const multiMaa = ref(0)

const {
  value: duplexInputValue,
  errorMessage: amountErrorMsg,
} = useField<number>('amount', (value) => {
  if (value < multiMia.value || value > multiMaa.value)
    return `请输入 ${multiMia.value} - ${multiMaa.value} 之间的金额`

  return ''
})
const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()
const { openNotify } = useNotify()
// 获取betInfo接口是否成功
const { bool: fetchBetInfoStatus, setBool: setFetchBetInfoStatus } = useBoolean(true)
/** 是否支持当前货币 */
const { bool: isSupportCurrency, setBool: setSupportCurrencyStatus } = useBoolean(true)
const {
  currentGlobalCurrency,
  currentGlobalCurrencyBalanceNumber,
  isLogin,
} = storeToRefs(appStore)
const sportStore = useSportsStore()
/** 赔率是否变化 */
const { bool: ovIsChange, setBool: setOvChangeState } = useBoolean(false)
/** 是否有更低的赔率变化 */
const { bool: ovIsLower, setBool: setOvIsLower } = useBoolean(false)
const { openRegisterDialog } = useRegisterDialog()

const {
  run: runGetSportPlaceBetInfo,
} = useRequest(ApiSportPlaceBetInfo, {
  onSuccess(placeBetInfo) {
    setFetchBetInfoStatus(true)
    if (placeBetInfo.wsi)
      placeBetInfo.wsi[0].ov = '100'

    sportStore.cart.updateAllData(
      cloneDeep(placeBetInfo),
      (_data) => {
        if (ovIsChange.value !== _data.ovIsChange)
          setOvChangeState(_data.ovIsChange)

        if (ovIsLower.value !== _data.ovIsLower)
          setOvIsLower(_data.ovIsLower)

        multiMia.value = _data.mia
        multiMaa.value = _data.maa

        setSupportCurrencyStatus(_data.isSupportCurrency)
        sendSportsCartToListEvent(_data.osOvIsChangeList)
      },
    )
  },
  onError() {
    setFetchBetInfoStatus(false)
    closeSetInterval()
  },
})

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

const { selected: betOrderFilterValue, list: betOrderFilterData } = useSelect([
  { label: t('sports_accept_any_odds'), value: EnumOddsChange.acceptAnyOddsChange },
  { label: t('sports_accept_higher_odds'), value: EnumOddsChange.acceptHigherOdds },
  { label: t('sports_accept_none_odds'), value: EnumOddsChange.notAcceptAnyOddsChange },
])

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

/** 您的投注额不能超过余额 */
const isBetAmountOverBalance = computed(() => {
  if (betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single)
    return currentGlobalCurrencyBalanceNumber.value < +sportStore.cart.totalPay

  else return currentGlobalCurrencyBalanceNumber.value < Number(duplexInputValue.value)
})
/** 错误信息 */
const errorInfo = computed<{
  /** 是否显示错误提示 */
  bool: boolean
  /** 错误提示信息 */
  errorMess: string
}>(() => {
  if (isSupportCurrency.value === false) {
    return {
      bool: true,
      errorMess: '该场馆暂不支持您所选择的币种',
    }
  }

  if (sportStore.cart.isExistCloseCaps) {
    return {
      bool: true,
      errorMess: '您的投注单里不能含有已关闭的盘口投注项',
    }
  }

  // 如果是复式投注，判断是否存在同一赛事的多重投注项
  if (betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.multi) {
    if (sportStore.cart.getExistSameEventIdList.length) {
      return {
        bool: true,
        errorMess: '同一场赛事的多个投注项不能组合为复式投注',
      }
    }

    if (
      sportStore.cart.getNotSupportWidList.length
      || sportStore.cart.getExistIcList.length
    ) {
      return {
        bool: true,
        errorMess: '您有不支持复式投注的投注项',
      }
    }
  }

  if (sportStore.cart.count > VITE_SPORT_MULTI_BET_MAX) {
    return {
      bool: true,
      errorMess: `复式投注项组合不能超过 ${VITE_SPORT_MULTI_BET_MAX} 个。`,
    }
  }

  // 不接受任何赔率变化
  if (betOrderFilterValue.value === EnumOddsChange.notAcceptAnyOddsChange) {
    // 赔率变化
    if (ovIsChange.value) {
      return {
        bool: true,
        errorMess: '赔率已变更，您需先接受赔率更改方可进行投注',
      }
    }
  }

  if (betOrderFilterValue.value === EnumOddsChange.acceptHigherOdds) {
    // 赔率变化
    if (ovIsChange.value) {
      // 有更低的赔率变化
      if (ovIsLower.value) {
        return {
          bool: true,
          errorMess: '赔率已变更，您需先接受赔率更改方可进行投注',
        }
      }
    }
  }

  // 余额不足
  if (isBetAmountOverBalance.value) {
    return {
      bool: true,
      errorMess: '您的投注额不能大于余额。',
    }
  }

  if (fetchBetInfoStatus.value === false) {
    return {
      bool: true,
      errorMess: '获取投注信息失败',
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
    ? t('sports_single_bet')
    : t('sports_multi_bet')
  const amount = betOrderSelectValue.value === EnumsBetSlipBetSlipTabStatus.single
    ? sportStore.cart.totalPay
    : Number(duplexInputValue.value)
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
  if (isLogin.value === false)
    return

  if (sportStore.cart.count === 0)
    return

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

async function bet() {
  const checkBetListErrorStatusResult = await checkBetListErrorStatus()
  if (!checkBetListErrorStatusResult)
    return

  if (betOrderSelectValue.value === 1) {
    // 复式投注
    const betList = [
      {
        ao: betOrderFilterValue.value,
        bl: [
          {
            pt: sportStore.cart.dataList[0].pt,
            a: Number(toFixed(Number(duplexInputValue.value), 2)),
            bi: sportStore.cart.dataList,
          },
        ],
        cur: getCurrencyConfig(currentGlobalCurrency.value).cur,
      },
    ]
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

function inputBlur() {
  duplexInputValue.value = application.sliceOrPad(
    duplexInputValue.value, suffixLength.value,
  ) as any
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
  sportStore.cart.updateOvOs(_data, (data) => {
    if (ovIsChange.value !== data.ovIsChange)
      setOvChangeState(data.ovIsChange)

    if (ovIsLower.value !== data.ovIsLower)
      setOvIsLower(data.ovIsLower)
  })
}
/** 监听列表发送的事件 */
function addListToCartEvent() {
  sportsListToCartBus.on(eventHandler)
}

/** 移除列表发送的事件 */
function removeListToCartEvent() {
  sportsListToCartBus.off(eventHandler)
}

watch(() => sportStore.cart.count, (val, oVal) => {
  if (val) {
    nextTick(() => {
      if (chatScrollContent.value)
        chatScrollContent.value.scrollTop = chatScrollContent.value?.scrollHeight ?? 0
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
    setOvChangeState(false)
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
})

onUnmounted(() => {
  closeSetInterval()
  removeListToCartEvent()
})
</script>

<template>
  <div class="app-sports-bet-slip-container">
    <div class="header">
      <div class="tabs">
        <BaseTab
          v-model="betOrderSelectValue"
          :list="betOrderData"
          @change="runGetSportPlaceBetInfoHandle"
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
            :title="
              JSON.stringify(item).replaceAll(',', ',\n').replaceAll('{', '{\n').replaceAll('}', '\n}')
            "
            :index="index"
          />
          <!-- 用来执行添加到购物车动画的 -->
          <div
            :id="EnumSportEndDomID.PC_CART_END_DOM"
            :key="EnumSportEndDomID.PC_CART_END_DOM"
          />
        </TransitionGroup>
        <!-- 无数据缺省 -->
        <div v-if="cartDataList.length === 0" class="empty">
          <BaseEmpty>
            <template #icon>
              <BaseIcon
                style="
                  font-size: var(--tg-empty-icon-size);
                  margin-bottom: var(--tg-spacing-24);
                "
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
                {{ t('sports_betting_now') }}
              </BaseButton>
            </template>
          </BaseEmpty>
        </div>
      </div>
    </div>

    <div class="footer">
      <template v-if="sportStore.cart.isShowReuse">
        <BaseButton
          size="md"
          bg-style="primary"
          @click="emit('changeHeadSelectValue', EnumsBetSlipHeadStatus.myBets)"
        >
          查看我的投注
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
          :placeholder="`${multiMia} - ${multiMaa}`"
          @blur="inputBlur"
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
            注册进行投注
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton
            v-if="ovIsChange"
            size="md"
            bg-style="primary"
            @click="setOvChangeState(false)"
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
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
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
  --tg-base-select-hover-bg-color: var(--tg-secondary-dark);
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
  --tg-base-select-popper-label-color: var(--tg-text-lightgrey);
}
</style>
