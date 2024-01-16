<script setup lang='ts'>
import type { IMemberBalanceLockerUpdate } from '~/apis/types'
import type { CurrencyData } from '~/composables/useCurrencyData'

const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const appStore = useAppStore()
const { openNotify } = useNotify()
// const { exchangeRateData } = storeToRefs(appStore)
const router = useLocalRouter()
const { push } = useLocalRouter()

const activeCurrency = ref<any>()
const activeTab = ref('deposit')
const tabOptions = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('menu_title_settings_withdrawals'), value: 'withdraw' },
]
const amountRef = ref()
const passwordRef = ref()

const { selected: pwdType, list: pwdOptions } = useSelect([
  { label: t('menu_title_settings_update_safepwd'), value: '2' },

])
// 获取安全验证配置
const {
  data: authConfig,
  runAsync: runAsyncMemberAuthConfig,
} = useRequest(ApiMemberAuthConfig, {
  onSuccess(data) {
    if (data.is_secret === '1')
      pwdOptions.value.push({ label: t('double_check_code'), value: '1' })
  },
})
const pwdLabel = computed(() => {
  return pwdOptions.value.find(t => t.value === pwdType.value)?.label
})
const {
  value: amount,
  errorMessage: errAmount,
  resetField: resetAmount,
  validate: validateAmount,
  setValue: setAmount,
} = useField<string>('amount', (value) => {
  if (!value)
    return t('min_amount_0')
  else if (Number(value) <= 0)
    return t('min_amount_0')
  else if (activeCurrency.value && Number(value) > Number(activeCurrency.value?.balance))
    maxNumber()
    // return t('validate_deposit_amount_max')
  return ''
})
const {
  value: password,
  resetField: resetPassword,
  validate: validatePassword,
  errorMessage: errPassword,
} = useField<string>('password', (value) => {
  if (!value)
    return t('min_len_6')
  else if (!payPasswordReg.test(value))
    return `${pwdLabel.value}${t('wrong_format')}` // t('safe_pwd_error')

  return ''
})

const isDeposit = computed(() => activeTab.value === 'deposit')
const updateType = computed(() => isDeposit.value ? 1 : 2)
const updateParams = computed<IMemberBalanceLockerUpdate | null>(() => {
  if (activeCurrency.value) {
    return {
      amount: amount.value,
      flag: updateType.value,
      currency_id: Number(activeCurrency.value.cur),
      device: 0,
    }
  }
  return null
})
// const getUsRate = computed(() => {
//   const str: CurrencyCode = activeCurrency.value?.cur
//   if (str === '706')
//     return Number(amount.value).toFixed(2)
//   return str
//     ? (Number(exchangeRateData.value?.rates[str]['706']) * Number(amount.value)).toFixed(2)
//     : 0.00
// })

function renderSvg(text: string) {
  return `<svg aria-hidden="true" style="width:14px;height:14px;margin: 0 5px;">
          <use xlink:href="#icon-coin-${text}"/>
        </svg>`
}
const {
  run: runLockerUpdate,
  loading: lockerUpdateLoading,
} = useRequest(ApiMemberBalanceLockerUpdate, {
  async onSuccess() {
    openNotify({
      title: isDeposit.value
        ? t('finance_other_tab_vault_deposit')
        : t('finance_funds_vault_draw'),
      icon: 'navbar-cart-notify',
      message: isDeposit.value
        ? t('success_deposit',
          {
            amount: updateParams.value?.amount,
            icon: renderSvg(activeCurrency.value.type.toLocaleLowerCase()),
          })
        : t('confirm_draw_vault', {
          amount: updateParams.value?.amount,
          icon: renderSvg(activeCurrency.value.type.toLocaleLowerCase()),
        }),
    })
    reset()
    resetPassword()
    appStore.getBalanceData()
    appStore.getLockerData()
    // appStore.updateUserInfo()
  },
})

async function handleUpdate() {
  // if (userInfo.value?.pay_password !== '1') {
  //   openNotify({
  //     title: t('notify_title_error'),
  //     icon: 'error',
  //     message: t('tip_set_safe'),
  //   })
  //   closeDialog()
  //   router.push('/settings/security-safe-pwd')
  //   return
  // }
  amountRef.value.setTouchTrue()
  if (passwordRef.value)
    passwordRef.value.setTouchTrue()
  await validateAmount()
  if (isDeposit.value) {
    if (!errAmount.value && updateParams.value)
      runLockerUpdate(updateParams.value)
  }
  else {
    await validatePassword()
    if (!errAmount.value && !errPassword.value && updateParams.value)
      runLockerUpdate({ ...updateParams.value, password: password.value, auth_type: pwdType.value })
  }
}
function changeCurrency(item: CurrencyData) {
  activeCurrency.value = item
  reset()
}
function maxNumber() {
  setAmount(activeCurrency.value.balance)
}
function reset() {
  resetAmount()
  setAmount(application.sliceOrPad(0, application.isVirtualCurrency(activeCurrency.value.type) ? 8 : 2), false)
}
function handleBlur() {
  setAmount(Number(amount.value).toFixed(application.isVirtualCurrency(activeCurrency.value.type) ? 8 : 2).toString(), true)
}
// 密码类型切换
function selectTypeChange(item: string) {
  pwdType.value = item
}

watch(() => activeTab.value, () => {
  amountRef.value.setTouchFalse()
  resetPassword()
})

await application.allSettled([runAsyncMemberAuthConfig()])
</script>

<template>
  <div class="app-safe">
    <div class="safe-content">
      <BaseTab v-model="activeTab" :list="tabOptions" />
      <div class="center">
        <div class="flex-col-start">
          <span>{{ t('currency') }}</span>
          <AppSelectCurrency
            :type="isDeposit ? 1 : 2"
            popper-clazz="app-safe-cur"
            @change="changeCurrency"
          />
        </div>
      </div>
      <div class="amount">
        <div class="top">
          <span class="label">{{ t('amount') }}</span>
          <!-- <span class="us">US${{ getUsRate }}</span> -->
        </div>
        <BaseInput
          ref="amountRef" v-model="amount"
          type="number"
          :msg="errAmount"
          msg-after-touched
          @blur="handleBlur"
          @on-right-button="maxNumber"
        >
          <template #right-icon>
            <AppCurrencyIcon v-if="activeCurrency" :currency-type="activeCurrency.type" />
          </template>
          <template #right-button>
            <span>{{ t('max') }}</span>
          </template>
        </BaseInput>
      </div>
      <BaseButton
        v-if="isDeposit"
        bg-style="secondary"
        size="xl"
        :loading="lockerUpdateLoading"
        style="font-size: var(--tg-font-size-base);"
        @click="handleUpdate"
      >
        {{ t('save_to_vault') }}
      </BaseButton>
      <template v-else>
        <div class="password-box">
          <BaseInput
            ref="passwordRef" v-model="password"
            :label="pwdLabel"
            :msg="errPassword"
            placeholder=""
            type="password"
            max="6"
            msg-after-touched must
          >
            <template v-if="authConfig?.is_secret === '1'" #right-button>
              <BaseSelect
                :model-value="pwdType" popper plain-popper-label :options="pwdOptions"
                @select="selectTypeChange"
              >
                <!-- <template #label="{ data }">
                <div class="center" style="gap: 4px;">
                  <AppCurrencyIcon currency-type="USDT" />
                  <span>{{ data.label }}</span>
                </div>
              </template> -->
                <template #option="{ data: { item } }">
                  <div class="center">
                    {{ item.label }}
                  </div>
                </template>
              </BaseSelect>
            </template>
          </BaseInput>
        </div>
        <BaseButton
          style="font-size: var(--tg-font-size-base);"
          bg-style="secondary"
          size="xl"
          :loading="lockerUpdateLoading"
          @click="handleUpdate"
        >
          {{ t('draw_vault') }}
        </BaseButton>
      </template>
    </div>
    <div class="safe-bottom">
      <!-- <div v-if="userInfo && userInfo.google_verify !== 2"> -->
      <template v-if="authConfig?.is_secret !== '1'">
        <div>
          {{ t('improve_safe_level') }}
        </div>
        <BaseButton
          bg-style="primary"
          size="md"
          @click="router.push('/settings/security-safe-check');closeDialog()"
        >
          {{ t('turn_on_double_check') }}
        </BaseButton>
      </template>
      <BaseButton
        size="none" type="text"
        style="margin-top: var(--tg-spacing-4);"
        @click="push('/blog/vault-description');closeDialog()"
      >
        {{ t('vault_info') }}
      </BaseButton>
    </div>
  </div>
</template>

<style>
.app-safe-cur {
  --tg-app-select-currency-poptop-width: 218px;
}
</style>

<style lang='scss' scoped>
.app-safe{
  .safe-content{
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .flex-col-start{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 21px;
  }
  .safe-bottom{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
    padding: 20px 16px;
    gap: var(--tg-spacing-14);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
  }
  .amount {
    display: flex;
    flex-direction: column;
    --tg-base-input-style-pad-x: var(--tg-spacing-7);
    .top {
      display: flex;
      justify-content: space-between;
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-semibold);
      margin-bottom: var(--tg-spacing-4);
      .us {
        font-size: var(--tg-font-size-xs);
      }
    }
  }
  .password-box{
    --tg-app-select-currency-bg: none;
    --tg-base-input-right-button-padding: 0 0;
    --tg-base-select-hover-bg-color: none;
    --tg-base-select-popper-style-padding-y:11px;
  }
}
</style>
