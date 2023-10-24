<script setup lang='ts'>
import type { IMemberBalanceLockerUpdate } from '~/apis'
import type { CurrencyData } from '~/composables/useCurrencyData'

const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const appStore = useAppStore()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(appStore)
const router = useRouter()

const activeCurrency = ref<any>()
const activeTab = ref('deposit')
const tabOptions = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('withdraw'), value: 'withdraw' },
]

const {
  value: amount,
  resetField: resetAmount,
  validate: validateAmount,
  errorMessage: errAmount,
} = useField<string>('amount', (value) => {
  if (!value)
    return '不能为空'
  else if (Number(value) === 0)
    return '存入金额不能为0'
  else if (Number(value) < 0)
    return '存入金额不能为负数'
  else if (activeCurrency.value && Number(value) > Number(activeCurrency.value?.balance))
    return '金额不能超过最大值'

  return ''
})
const {
  value: password,
  resetField: resetPassword,
  validate: validatePassword,
  errorMessage: errPassword,
} = useField<string>('password', (value) => {
  if (!value)
    return '不能为空'
  else if (!payPasswordReg.test(value))
    return '支付密码格式错误'

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

const {
  run: runLockerUpdate,
  loading: lockerUpdateLoading,
} = useRequest(ApiMemberBalanceLockerUpdate, {
  async onSuccess() {
    openNotify({
      type: 'success',
      message: '操作成功！',
    })
    resetAmount()
    resetPassword()
    appStore.updateUserInfo()
  },
})

async function handleUpdate() {
  await validateAmount()
  if (isDeposit.value) {
    if (!errAmount.value && updateParams.value)
      runLockerUpdate(updateParams.value)
  }
  else {
    await validatePassword()
    if (!errAmount.value && !errPassword.value && updateParams.value)
      runLockerUpdate({ ...updateParams.value, password: password.value })
  }
}
function changeCurrency(item: CurrencyData) {
  activeCurrency.value = item
}
function maxNumber() {
  if (activeCurrency.value)
    amount.value = activeCurrency.value.balance
}

watch(() => activeTab.value, () => {
  resetAmount()
  resetPassword()
})
</script>

<template>
  <div class="app-safe">
    <div class="safe-content">
      <BaseTab v-model="activeTab" :list="tabOptions" />
      <div class="center">
        <div class="flex-col-start">
          <span>{{ isDeposit ? '账户货币' : '保险库货币' }}</span>
          <AppSelectCurrency
            :type="isDeposit ? 1 : 2"
            @change="changeCurrency"
          />
        </div>
      </div>
      <div class="amount">
        <div class="top">
          <span class="label">金额</span>
          <span class="us">US$0.00</span>
        </div>
        <BaseInput
          v-model="amount"
          type="number"
          placeholder="0.00000000"
          :msg="errAmount"
          @on-right-button="maxNumber"
        >
          <template #right-icon>
            <AppCurrencyIcon v-if="activeCurrency" :currency-type="activeCurrency.type" />
          </template>
          <template #right-button>
            <span>最大值</span>
          </template>
        </BaseInput>
      </div>
      <BaseButton
        v-if="isDeposit"
        class="safe-btn"
        bg-style="secondary"
        size="xl"
        :loading="lockerUpdateLoading"
        @click="handleUpdate"
      >
        存入保险库
      </BaseButton>
      <template v-else>
        <div>
          <BaseInput
            v-model="password"
            label="密码"
            :msg="errPassword"
            placeholder=""
            type="password"
            must
            max="6"
          />
        </div>
        <BaseButton
          class="safe-btn"
          bg-style="secondary"
          size="xl"
          :loading="lockerUpdateLoading"
          @click="handleUpdate"
        >
          保险库取款
        </BaseButton>
      </template>
    </div>
    <div class="safe-bottom">
      <div v-if="userInfo && userInfo.google_verify !== 2">
        通过双重验证提高您的账户安全性
      </div>
      <BaseButton
        v-if="userInfo && userInfo.google_verify !== 2"
        bg-style="primary"
        size="md"
        @click="router.push('/settings/security');closeDialog()"
      >
        开启双重验证
      </BaseButton>
      <BaseButton class="more-btn" type="text">
        了解更多有关保险库的信息
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-safe{
  .safe-content{
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .safe-btn{
      font-size: var(--tg-font-size-base);
    }
  }
  .flex-col-start{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    span{
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-semibold);
      position: absolute;
      top: 50%;
      transform: translate(-118%, -50%);
    }
  }
  .safe-bottom{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
    padding:1rem;
    gap: 1rem;
    color: var(--tg-text-lightgrey);
    .more-btn{
      padding:
      var(--tg-spacing-button-padding-vertical-none)
      var(--tg-spacing-button-padding-horizontal-none) !important;
      font-size: var(--tg-font-size-default);
    }
  }
  .amount {
    display: flex;
    flex-direction: column;
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
}
</style>
