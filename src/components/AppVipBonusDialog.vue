<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  /** 奖金金额 */
  vipBonus?: string
  /** 奖金id，存在则领取的是晋级奖金 */
  vipBonusId?: string
  /** 奖金类型 */
  bonusType?: string
}

const props = defineProps<Props>()
const closeDialog = inject('closeDialog', () => { })
const { t } = useI18n()
const { openNotify } = useNotify()
const { getRate } = useExchangeRate()
const { isLogin } = storeToRefs(useAppStore())
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
const { selected: typeVal, list: options } = useSelect([
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
const amountRef = ref()
const activeCurrency = ref<CurrencyData | null>()
const getBit = computed(() => {
  return application.isVirtualCurrency(activeCurrency.value?.type ?? 'USDT') ? 8 : 2
})
const {
  runAsync: runAsyncVipBonusApply,
  loading: loadVipBonusApply,
} = useRequest(ApiMemberVipBonusApply)
const rate = computed(() => {
  return activeCurrency.value?.type === 'USDT' ? '1.00' : getRate('USDT', activeCurrency.value?.type ?? 'USDT', -1)?.targetNum
})
const { run: runGetPromoBonus, data: promoBonus, loading: loadPromoBonus }
  = useRequest(ApiMemberVipBonusAvailable, {
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

// 币种切换
function changeCurrency(item: CurrencyData) {
  activeCurrency.value = item
  setTargetAmount(toFixed(Number(mul(Number(rate.value), Number(amount.value))), getBit.value))
}
// 奖金类型切换
function selectTypeChange(item: string) {
  typeVal.value = item
  runGetPromoBonus({ cash_type: typeVal.value })
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
    runAsyncVipBonusApply({
      id: props.vipBonusId ?? (promoBonus.value && promoBonus.value[0].id) ?? '',
      cur: activeCurrency.value?.cur ?? '',
      amount: amount.value,
    }).then(() => {
      const label = options.value.find(item => item.value === typeVal.value)?.label ?? t('vip_promotion_bonus')
      openNotify({
        type: 'success',
        title: `${label}${t('receive')}`,
        icon: 'navbar-wallet-notify',
        // message: `成功领取${label} ${targetAmount.value} ${renderSvg()}`,
        message: t('success_received', { label, amount: targetAmount.value, renderSvg: renderSvg() }),
      })
      closeDialog()
    })
  }
}
function amountBlur() {
  if (Number(amount.value) > Number(amountMax.value))
    setAmount(amountMax.value)

  setTargetAmount(toFixed(Number(mul(Number(rate.value), Number(amount.value))), getBit.value))
}

onMounted(() => {
  if (!props.vipBonusId) {
    runGetPromoBonus({ cash_type: typeVal.value })
  }
  else {
    typeVal.value = '818'
    setAmount(props.vipBonus ?? '', false)
    amountMax.value = props.vipBonus ?? '0'
  }
})
</script>

<template>
  <div class="app-receive-bonus">
    <BaseLabel :label="$t('activity_bonus')">
      <BaseInput ref="amountRef" v-model="amount" :msg="amountMsg" type="number" msg-after-touched @blur="amountBlur">
        <template v-if="!vipBonusId" #right-button>
          <BaseSelect
            :model-value="typeVal" popper plain-popper-label :options="options"
            @select="selectTypeChange"
          >
            <template #label="{ data }">
              <div class="center" style="gap: 4px;">
                <AppCurrencyIcon currency-type="USDT" />
                <span>{{ data.label }}</span>
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
        <template v-else #right-icon>
          <AppCurrencyIcon currency-type="USDT" />
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
            popper-clazz="app-wallet-cur" placeholder="search"
            @change="changeCurrency"
          />
        </template>
      </BaseInput>
    </div>
    <BaseButton
      bg-style="secondary" size="md"
      :loading="loadVipBonusApply || loadPromoBonus"
      @click="submitBonus"
    >
      {{ $t('receive') }}
    </BaseButton>
    <div class="tips">
      {{ $t('collection_instructions') }}
    </div>
  </div>
</template>

<style>
.app-wallet-cur {
    --tg-app-select-currency-poptop-width: 136px;
}
</style>

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
