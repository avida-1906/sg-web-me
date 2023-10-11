<script setup lang='ts'>
import type { IMemberBalanceLockerUpdate } from '~/apis'

const { t } = useI18n()

const { openNotify } = useNotify()

// tab值
const activeTab = ref('deposit')
const tabOptions = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('withdraw'), value: 'withdraw' },
]
const isDeposit = computed(() => activeTab.value === 'deposit')
// const isWithdraw = computed(() => activeTab.value === 'withdraw')

const activeCurrency = ref()
const isWithdraw = ref(true)

function changeCurrency(item: any) {
  activeCurrency.value = item
}
const {
  value: amount,
  resetField: resetAmount,
  validate: valiAmount,
  errorMessage: errAmount,
} = useField<string>('amount', (value) => {
  if (!value)
    return '不能为空'

  return ''
})
const {
  value: password,
  resetField: resetPassword,
  errorMessage: errPassword,
} = useField<string>('password', (value) => {
  if (!value)
    return '不能为空'
  else if (!payPasswordReg.test(value))
    return '支付密码格式错误'

  return ''
})

const updateType = computed(() => isDeposit.value ? 'add' : 'remove')
const updateParams = ref<IMemberBalanceLockerUpdate>({
  amount: amount.value, type: updateType.value, currency_name: 'CNY',
})
const { run: runLockerUpdate } = useRequest(ApiMemberBalanceLockerUpdate, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: '操作成功！',
    })
    resetAmount()
    resetPassword()
  },
})
const { runAsync: runAsyncBalanceLockerShow } = useRequest(ApiMemberBalanceLockerShow)
async function handleUpdate() {
  await valiAmount()
  if (!errAmount.value)
    runLockerUpdate({ ...updateParams.value, amount: amount.value })
}

application.allSettled([runAsyncBalanceLockerShow()])
</script>

<template>
  <div class="app-safe">
    <div class="safe-content">
      <BaseTab v-model="activeTab" :list="tabOptions" />
      <div class="center">
        <div class="flex-col-start">
          <span>{{ activeTab === 'deposit' ? '账户货币' : '保险库货币' }}</span>
          <AppSelectCurrency
            :show-balance="isWithdraw"
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
        >
          <template #right-icon>
            <BaseIcon :name="activeCurrency?.icon || ''" />
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
          />
        </div>
        <BaseButton
          class="safe-btn"
          bg-style="secondary"
          size="xl"
          @click="handleUpdate"
        >
          保险库取款
        </BaseButton>
      </template>
    </div>
    <div class="safe-bottom">
      <div>通过双重验证提高您的账户安全性</div>
      <BaseButton bg-style="primary" size="md">
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
    span{
      color: var(--tg-text-lightgrey);
      margin-bottom: 3px;
      font-weight: var(--tg-font-weight-semibold);
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
