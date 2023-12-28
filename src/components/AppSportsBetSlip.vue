<script setup lang='ts'>
import type { ICartInfoData } from '~/types'
import type {
  EnumsBetSlipBetSlipTabStatus as EnumsBetSlipBetSlipTabStatusType,
} from '~/utils/enums'
import BaseInput from '~/components/BaseInput.vue'

interface Props {
  index: number
  /**
   * 下注类型
   *
   * 单项：EnumsBetSlipBetSlipTabStatus.single
   *
   * 组合：EnumsBetSlipBetSlipTabStatus.multi
   */
  betSlipType: EnumsBetSlipBetSlipTabStatusType
  /** 错误 */
  error?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 是否是滚球 */
  live?: boolean
  /** 渲染的List数据 */
  cartInfoData: ICartInfoData
  modelValue?: string | number
  /** 购物车所有注单 */
  cartDataList: ICartInfoData[]
  /** 复式总赔率 */
  duplexOv: string
  /** 复式总投注额 */
  duplexInputValue?: number | string
  /** 复式预计支付额 */
  duplexTotalProfit?: number | string
  openKeyboard: (
    fn: (value: number) => void,
    deleteKey: () => void,
  ) => void
  closeKeyboard: () => void
  /**
   * h5 键盘是否显示，input失去焦点去是否验证
   */
  keyboardBool?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  index: 0,
  betSlipType: EnumsBetSlipBetSlipTabStatus.single,
})

const emit = defineEmits(
  ['update:modelValue'],
)

const { t } = useI18n()
const appStore = useAppStore()
const { currentGlobalCurrency, isLogin } = storeToRefs(appStore)
const sportStore = useSportsStore()
const { userInfo } = storeToRefs(useAppStore())
const { openBetSlipDialog } = useDialogBetSlip()
const { isMobile } = storeToRefs(useWindowStore())
const inputRef = ref()

const notLoginAmount = ref('')
const notLoginAmountPlaceholder = ref('')

const {
  value: amount,
  errorMessage: amountErrorMsg,
  validate: validateAmount,
} = useField<number>('amount', (value) => {
  if (value < props.cartInfoData.mia || value > props.cartInfoData.maa)
    return t('pls_input_min_max_amount', { min: props.cartInfoData.mia, max: props.cartInfoData.maa })

  return ''
})

useOutsideClick(inputRef, () => {
  props.closeKeyboard()
  if (props.keyboardBool)
    inputRef.value?.setTouchTrue()
  validateAmount()
})

const isBetSingle = computed(() =>
  props.betSlipType === EnumsBetSlipBetSlipTabStatus.single,
)
const isBetMulti = computed(
  () => props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi,
)
const isFirst = computed(() => props.index === 0)
const isError = computed(() => {
  if (props.error)
    return true

  if (props.cartInfoData.result === 'rejected')
    return true

  if (
    sportStore.cart.getExistSameEventIdList.includes(props.cartInfoData.ei)
    && props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi
  )
    return true

  if (
    sportStore.cart.getNotSupportWidList.includes(props.cartInfoData.wid)
    && props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi
  )
    return true

  if (
    sportStore.cart.getOddsLessThanOnePointOneWidList.includes(props.cartInfoData.wid)
    && props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi
  )
    return true

  if (
    sportStore.cart.getExistIcList.includes(props.cartInfoData.ic)
    && props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi
  )
    return true
})
const isDisabled = computed(() => {
  return props.disabled || props.cartInfoData.os === 0
})
const isLive = computed(() => {
  if (props.live)
    return true

  if (props.cartInfoData.m === 3)
    return true
})
const suffixLength = computed(() =>
  application.getCurrencySuffixLength(currentGlobalCurrency.value),
)
/** 是否已关闭 */
const isClosed = computed(() => {
  return props.cartInfoData.os === 0
})
// 详情路径
// const eventDetailPath = computed(() => {
//   const data = props.cartInfoData
//   return `/sports/${SPORTS_PLAT_ID}/${data.si}/${data.pgid}/${data.ci}/${data.ei}`
// })
const inputReadonlyBool = computed(() => {
  return isMobile.value
})

/**
 * 跳转详情，先不要，等后端关盘的赛事查询详情再说
 */
function goEventDetailPage() {
  // if (isMobile.value)
  //   closeRightSidebar()

  // router.push(replaceSportsPlatId(eventDetailPath.value))
}

/** 弹窗详情 */
function showDetail() {
  let data = {}
  if (props.betSlipType === EnumsBetSlipBetSlipTabStatus.single) {
    const d = props.cartInfoData
    data = {
      a: d.amount,
      ov: d.ov,
      mwa: +d.amount * +d.ov,
      bt: new Date().getTime(),
      ono: '',
      os: 0,
      oc: 0,
      pa: 0,
      st: 0,
      bi: [{
        bt: d.bt,
        btn: d.btn,
        si: d.si,
        ei: d.ei,
        ov: d.ov,
        sn: d.sn,
        re: '',
        hdp: d.hdp,
        htn: d.homeTeamName,
        atn: d.awayTeamName,
        atpic: '',
        htpic: '',
        ed: d.ed,
        hp: d.hp,
        ap: d.ap,
        pgid: d.pgid,
        ci: d.ci,
        et: 1,
        reb: 1,
        wid: d.wid,
        mlid: d.mlid,
        mll: d.mll,
        ic: d.ic,
        m: d.m,
        pid: d.pid,
        sid: d.sid,
      }],
    }
  }
  else if (props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi) {
    data = {
      a: props.duplexInputValue,
      ov: props.duplexOv,
      mwa: props.duplexTotalProfit,
      bt: new Date().getTime(),
      ono: '',
      os: 0,
      oc: 0,
      pa: 0,
      st: 0,
      bi: props.cartDataList.map((d) => {
        return {
          bt: d.bt,
          btn: d.btn,
          si: d.si,
          ei: d.ei,
          ov: d.ov,
          sn: d.sn,
          re: '',
          hdp: d.hdp,
          htn: d.homeTeamName,
          atn: d.awayTeamName,
          atpic: '',
          htpic: '',
          ed: d.ed,
          hp: d.hp,
          ap: d.ap,
          pgid: d.pgid,
          ci: d.ci,
          et: 1,
          reb: 1,
          wid: d.wid,
          mlid: d.mlid,
          mll: d.mll,
          ic: d.ic,
          m: d.m,
          pid: d.pid,
          sid: d.sid,
        }
      }),
    }
  }
  openBetSlipDialog({ type: 'sports', data: { ...data, username: userInfo.value?.username } })
}

/**
 * 键盘点击事件，只在h5上有效
 */
function inputClickHandler() {
  if (isMobile.value) {
    props.openKeyboard(
      (v: number) => {
        emit('update:modelValue', `${amount.value}${v}`)
      },
      () => emit('update:modelValue', amount.value?.toString().slice(0, -1)),
    )
  }
}

function notLoginInputClickHandler() {
  if (isMobile.value) {
    props.openKeyboard(
      (v: number) => {
        notLoginAmount.value = `${notLoginAmount.value}${v}`
      },
      () => {
        notLoginAmount.value = notLoginAmount.value?.toString().slice(0, -1)
      },
    )
  }
}

onMounted(() => {
  if (!isLogin.value) {
    notLoginAmountPlaceholder.value = application.sliceOrPad(
      0,
      suffixLength.value,
    )
  }
})

watch(currentGlobalCurrency, (_currency) => {
  sportStore.cart.updateCurrency(_currency)
})

watchEffect(() => {
  amount.value = props.modelValue as any
})
</script>

<template>
  <div
    class="app-sports-bet-slip" :class="{
      mt12: !isFirst && isBetSingle,
      mt8: !isFirst && isBetMulti,
      before: !isFirst && isBetMulti,
      error: isError,
      disabled: isDisabled,
    }"
  >
    <div class="header" :class="{ 'round-header': isFirst || isBetSingle }">
      <div class="fixture-name">
        <div v-if="isLive && cartInfoData.result === void 0" class="status live">
          {{ t('sports_status_live') }}
        </div>
        <BaseIcon
          v-if="cartInfoData.result"
          :name="cartInfoData.result === 'fulfilled' ? 'sport-success' : 'sport-error'"
        />
        <div class="text" @click="goEventDetailPage">
          {{ cartInfoData.homeTeamName }} - {{ cartInfoData.awayTeamName }}
        </div>
      </div>
      <BaseButton v-if="cartInfoData.result" type="text" size="none" @click="showDetail">
        <BaseIcon name="uni-share-slip" />
      </BaseButton>
      <BaseButton
        v-else
        type="text" size="none"
        @click="sportStore.cart.remove(cartInfoData.wid)"
      >
        <BaseIcon
          name="uni-close"
        />
      </BaseButton>
    </div>
    <div class="content">
      <!-- 盘口类型 -->
      <div class="market-name">
        {{ cartInfoData.btn }}
      </div>
      <!-- 最大下注金额 -->
      <div class="max-bet" />
      <!-- 下注盘口 -->
      <div class="outcome-name">
        <span>{{ cartInfoData.sn }}</span>
      </div>
      <!-- 状态或赔率 -->
      <div v-if="isClosed" class="closed">
        {{ t('closed') }}
      </div>
      <AppSportsOdds
        v-else
        :odds="cartInfoData.ov"
        arrow="left"
        keep
        :show-arrow="cartInfoData.result === void 0"
      />
      <!-- 单式金额输入框 -->
      <div v-show="isBetSingle && cartInfoData.result === void 0" class="footer">
        <div class="bet-amount">
          <BaseInput
            v-if="isLogin"
            ref="inputRef"
            :key="currentGlobalCurrency"
            :model-value="modelValue"
            type="number"
            mb0
            :placeholder="`${cartInfoData.mia} - ${cartInfoData.maa}`"
            :msg="amountErrorMsg"
            :disabled="isDisabled"
            :readonly="inputReadonlyBool"
            :msg-after-touched="true"
            @click.stop="inputClickHandler"
            @update:model-value="emit('update:modelValue', $event)"
          >
            <template #right-icon>
              <AppCurrencyIcon :currency-type="currentGlobalCurrency" />
            </template>
          </BaseInput>
          <BaseInput
            v-else
            v-model="notLoginAmount"
            type="number"
            :readonly="inputReadonlyBool"
            mb0
            :placeholder="notLoginAmountPlaceholder"
            @click.stop="notLoginInputClickHandler"
          >
            <template #right-icon>
              <AppCurrencyIcon :currency-type="currentGlobalCurrency" />
            </template>
          </BaseInput>
        </div>
        <div class="estimated-label">
          <span>{{ t('sports_estimated_payment_amount') }}</span>
        </div>
        <div
          class="estimated-amount"
          :style="{
            '--tg-app-amount-font-weight': '400',
          }"
        >
          <AppAmount
            :amount="
              application.sliceOrPad(
                +mul(amount ?? 0, Number(cartInfoData.ov)),
                suffixLength,
              )
            "
            :currency-type="currentGlobalCurrency"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-slip {
  position: relative;
  color: var(--tg-text-lightgrey);
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--tg-primary-main);
  border-radius: var(--tg-radius-default);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .header {
    position: relative;
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--tg-secondary-main);
    padding: var(--tg-spacing-8) var(--tg-spacing-12);

    .fixture-name {
      width: 100%;
      max-width: calc(100% - var(--tg-spacing-48));
      display: inline-flex;
      align-items: center;
      gap: var(--tg-spacing-8);

      .status {
        font-size: var(--tg-font-size-xs);
        display: inline-flex;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        color: var(--tg-text-lightgrey);
        border-radius: 3px;
        padding: 0 var(--tg-spacing-4);
        font-feature-settings: "tnum";
        white-space: nowrap;
        line-height: 1.5;

        &.live {
          background: var(--tg-button-secondary-main);
          color: var(--tg-text-white);
        }
      }

      .text {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        transition: var(--tg-transition);

        &:active:not(:disabled) {
          color: var(--tg-text-white);
          transform: scale(0.96);
        }

        &:hover:not(:disabled) {
          color: var(--tg-text-white);
        }
      }
    }
  }

  .round-header {
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
  }

  .content {
    width: 100%;
    flex-shrink: 0;
    display: grid;
    align-items: flex-end;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    position: relative;
    padding: var(--tg-spacing-8) var(--tg-spacing-12) var(--tg-spacing-12);
    box-shadow: var(--tg-header-shadow);
    background: var(--tg-secondary-grey);
    --tg-sports-odds-text-align: end;
    grid-template-areas:
      "market market market market maxBet maxBet"
      "outcome outcome outcome outcome outcome odds"
      "footer footer footer footer footer footer"
      "footer footer footer footer footer footer";

    .market-name {
      grid-area: market;
      line-height: 1.5;
      font-weight: var(--tg-font-weight-normal);
    }

    .max-bet {
      grid-area: maxBet;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      font-weight: var(--tg-font-weight-normal);
    }

    .outcome-name {
      font-weight: 600;
      color: var(--tg-text-white);
      display: inline-flex;
      grid-area: outcome;
      text-transform: capitalize;
      align-items: baseline;
      line-height: 1.5;

      span {
        text-align: left;
        display: inline-flex;
        align-items: center;
        word-break: break-all;
      }
    }

    .closed {
      justify-self: flex-end;
      color: var(--tg-text-error);
      white-space: nowrap;
    }

    .footer {
      display: grid;
      grid-area: footer;
      grid-template-columns: repeat(6, 1fr);
      margin-top: var(--tg-spacing-4);
      grid-template-areas:
        "amount amount amount return return return"
        "amount amount amount estimatedAmount estimatedAmount estimatedAmount";

      .bet-amount {
        display: flex;
        grid-area: amount;
      }

      .estimated-label {
        grid-area: return;
        justify-self: flex-end;
        align-self: flex-start;
        font-size: var(--tg-font-size-xs);
        line-height: 1.5;
        font-weight: var(--tg-font-weight-normal);
      }

      .estimated-amount {
        font-weight: var(--tg-font-weight-normal);
        grid-area: estimatedAmount;
        justify-self: flex-end;
        align-self: flex-end;
        line-height: 1.5;
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    bottom: -4px;
    background:
    radial-gradient(circle, transparent, transparent 50%,
    var(--tg-secondary-grey) 50%,
    var(--tg-secondary-grey) 100%) 0px 1px/0.7rem 0.7rem repeat-x;
  }
}

.duplicate-bet {
  padding: var(--tg-spacing-13) var(--tg-spacing-16);
  color: var(--tg-text-lightgrey);
  font-weight: var(--tg-font-weight-semibold);
  cursor: not-allowed;
  opacity: 0.5;
}

.mt12 {
  margin-top: var(--tg-spacing-12);
}

.mt8 {
  margin-top: var(--tg-spacing-8);
}

.error {
  .header {
    background: var(--tg-bet-slip-error);
  }
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.before {
  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    top: -4px;
    background:
    radial-gradient(circle, transparent, transparent 50%,
    var(--tg-secondary-main) 50%,
    var(--tg-secondary-main) 100%) 0px -6px/0.7rem 0.7rem repeat-x;
  }
}
</style>
