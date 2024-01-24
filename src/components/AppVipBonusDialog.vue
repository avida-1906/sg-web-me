<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  /** 奖金金额 */
  vipBonus?: string
  /** 奖金id，存在则领取的是晋级奖金 */
  vipBonusId?: string
  /** 奖金类型 */
  bonusType?: string
  callBack?: () => void
}

const props = defineProps<Props>()
const closeDialog = inject('closeDialog', () => { })
const { t } = useI18n()
const { openNotify } = useNotify()
const { getRate, runGetExchangeRate } = useExchangeRate()
const { isLogin } = storeToRefs(useAppStore())
// const { bool: isReceive, setBool: setShowWalletBool } = useBoolean(true)
const amountMax = ref('0')
const {
  value: amount,
  setValue: setAmount,
  errorMessage: amountMsg,
  validate: valiAmount,
//   resetField: amountReset,
} = useField<string>('amount', (value) => {
  if (!value)
    return t('input_amount')
  else if (Number(value) === 0)
    return t('validate_deposit_amount_zero')
  else if (Number(value) < 0)
    return t('validate_deposit_amount_pos')
  else if (value && Number(value) > Number(amountMax.value))
    return t('validate_deposit_amount_max')
  return ''
})
const {
  value: targetAmount,
  setValue: setTargetAmount,
  errorMessage: targetAmountMsg,
  //   validate: valiAmount,
  //   resetField: amountReset,
} = useField<string>('targetAmount')
const amountRef = ref()
const activeCurrency = ref<CurrencyData | null>()
const getBit = computed(() => {
  return application.isVirtualCurrency(activeCurrency.value?.type ?? 'USDT') ? 8 : 2
})
const {
  runAsync: runAsyncVipBonusApply,
  loading: loadVipBonusApply,
  data: applyResult,
} = useRequest(ApiMemberVipBonusApply)
const rate = computed(() => {
  return activeCurrency.value?.type === 'USDT' ? '1.00' : getRate('USDT', activeCurrency.value?.type ?? 'USDT', 8)?.targetNum
})
const { run: runGetPromoBonus, data: promoBonus, loading: loadPromoBonus } = useRequest(ApiMemberVipBonusAvailable, {
  ready: isLogin,
  onSuccess(data) {
    const item = data[0]
    if (item.state === 2) {
      amountMax.value = toFixed(0, getBit.value)
      setAmount(toFixed(0, getBit.value), false)
      setTargetAmount(toFixed(0, getBit.value))
    }
    else {
      const amount = Number(sub(Number(item.amount), Number(item.receive_amount)))
      amountMax.value = toFixed(amount, getBit.value)
      setAmount(toFixed(amount, getBit.value))
      setTargetAmount(toFixed(Number(mul(Number(rate.value), amount)), getBit.value))
    }
  },
})
const { run: runVipBonusUpgradeApplyAll, data: applyAllResult, loading: loadApplyAll } = useRequest(ApiMemberVipBonusUpgradeApplyAll, {
  onSuccess(data) {
    openNotify({
      type: 'success',
      title: `${t('vip_promotion_bonus')}${t('receive')}`,
      icon: 'navbar-wallet-notify',
      message: t('success_received', { label: t('vip_promotion_bonus'), amount: data ?? 0, renderSvg: renderSvg() }),
    })
    closeDialog()
  },
})

const { selected: typeVal, list: options } = useSelect(
  [
  // { label: t('vip_promotion_bonus'), value: '818' },
    { label: t('vip_day_salary_bonus'), value: '819' },
    { label: t('vip_week_salary_bonus'), value: '820' },
    { label: t('vip_month_salary_bonus'), value: '821' },
  // { label: t('birthday_bonus'), value: '822' },
  // {
  //   label: t('finance_other_tab_all'),
  //   value: '',
  // },
  ])
const { runAsync: runAsyncGetPromoBonus, data: lvPromoBonus, loading: loadLvPromoBonus }
  = useRequest(ApiMemberVipBonusAvailable, {
    onSuccess(data) {
      options.value = data.filter(item => item.state !== 2).map((item) => {
        return {
          label: `VIP${item.vip}`,
          value: item.id,
          // ...item,
        }
      })
      options.value.push({ label: t('finance_other_tab_all'), value: '' })
      typeVal.value = props.vipBonusId ?? ''
    },
  })

// 币种切换
function changeCurrency(item: CurrencyData) {
  activeCurrency.value = item
  setTargetAmount(toFixed(Number(mul(Number(rate.value), Number(amount.value))), getBit.value))
}
// 奖金类型切换
function selectTypeChange(val: string) {
  typeVal.value = val
  if (props.vipBonusId) { // 晋级奖金
    let amount = 0
    if (val) {
      const item = lvPromoBonus.value?.find(t => t.id === val)
      amount = Number(sub(Number(item?.amount), Number(item?.receive_amount)))
    }
    else { // 全部领取
      amount = lvPromoBonus.value?.reduce((total, item) => Number(add(total, Number(sub(Number(item.amount), Number(item.receive_amount))))), 0) ?? 0
    }
    amountMax.value = toFixed(amount, getBit.value)
    setAmount(toFixed(amount, getBit.value))
    setTargetAmount(toFixed(Number(mul(Number(rate.value), amount)), getBit.value))
  }
  else { // 日周月奖金
    runGetPromoBonus({ cash_type: typeVal.value })
  }
}
function renderSvg() {
  return activeCurrency.value
    ? `<svg aria-hidden="true" style="width:14px;height:14px;margin: 0 5px;">
          <use xlink:href="#icon-coin-${activeCurrency.value.type.toLocaleLowerCase()}"/>
        </svg>`
    : ''
}
async function submitBonus() {
  if (amountRef.value)
    amountRef.value.setTouchTrue()
  await valiAmount()
  if (!amountMsg.value) {
    if (typeVal.value) {
      runAsyncVipBonusApply({
        id: props.vipBonusId ?? (promoBonus.value && promoBonus.value[0].id) ?? '',
        cur: activeCurrency.value?.cur ?? '',
        amount: amount.value,
      }).then((data) => {
        const label = options.value.find(item => item.value === typeVal.value)?.label ?? t('vip_promotion_bonus')
        openNotify({
          type: 'success',
          title: `${label}${t('receive')}`,
          icon: 'navbar-wallet-notify',
          message: t('success_received', { label, amount: data ?? 0, renderSvg: renderSvg() }),
        })
        closeDialog()
      })
    }
    else { // 晋级奖金全部领取
      runVipBonusUpgradeApplyAll({ cur: activeCurrency.value?.cur ?? '' })
    }
  }
}
function amountBlur() {
  if (Number(amount.value) > Number(amountMax.value))
    setAmount(amountMax.value)

  setTargetAmount(toFixed(Number(mul(Number(rate.value), Number(amount.value))), getBit.value))
}

onMounted(() => {
  if (props.vipBonusId) {
    setAmount(props.vipBonus ?? '', false)
    amountMax.value = props.vipBonus ?? '0'
  }
  else {
    runGetPromoBonus({ cash_type: typeVal.value })
  }
})

onUnmounted(() => {
  (applyResult.value || applyAllResult.value) && props.callBack && props.callBack()
})

runGetExchangeRate()

if (props.vipBonusId) {
  await application.allSettled(
    [runAsyncGetPromoBonus({ cash_type: '818' })],
  )
}
</script>

<template>
  <div class="app-receive-bonus">
    <BaseLabel :label="vipBonusId ? $t('vip_promotion_bonus') : $t('activity_bonus')">
      <BaseInput ref="amountRef" v-model="amount" :msg="amountMsg" type="number" :disabled="!typeVal" msg-after-touched @blur="amountBlur">
        <template #right-button>
          <BaseSelect
            :model-value="typeVal" popper plain-popper-label :options="options"
            @select="selectTypeChange"
          >
            <template #label="{ data }">
              <div class="center" style="gap: 4px;">
                <AppCurrencyIcon currency-type="USDT" />
                <span>{{ data?.label }}</span>
              </div>
            </template>
            <template #option="{ data: { item } }">
              <div class="center" style="gap: 4px;">
                <AppCurrencyIcon currency-type="USDT" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </BaseSelect>
        </template>
      </BaseInput>
    </BaseLabel>
    <div>
      <div class="top-label">
        <span>{{ $t('exchange') }}{{ activeCurrency?.type }}</span>
        <span>{{ $t('rate') }}{{ rate }}</span>
      </div>
      <BaseInput
        v-model="targetAmount" :msg="targetAmountMsg"
        type="number" msg-after-touched disabled
      >
        <template #right-button>
          <AppSelectCurrency
            :type="3" :show-balance="false"
            placeholder="search"
            @change="changeCurrency"
          />
        </template>
      </BaseInput>
    </div>
    <BaseButton
      bg-style="secondary" size="md"
      :loading="loadVipBonusApply || loadPromoBonus || loadLvPromoBonus || loadApplyAll"
      @click="submitBonus"
    >
      {{ $t('receive') }}
    </BaseButton>
    <div class="tips">
      {{ $t('collection_instructions') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-receive-bonus {
    display: flex;
    flex-direction: column;
    --tg-app-select-currency-bg: none;
    --tg-base-input-right-button-padding: 0 0;
    --tg-base-select-hover-bg-color: none;
    // --tg-app-select-currency-padding-x: 0;
    // --tg-app-select-currency-padding-y: 0;
    gap: var(--tg-spacing-14);
    padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
    font-size: var(--tg-font-size-default);
    color: var(--tg-secondary-light);

    .top-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
    }

    .tips {
        font-size: var(--tg-font-size-xs);
        font-weight: var(--tg-font-weight-semibold);
        text-align: left;
        line-height: 1.4;
    }
}
</style>
