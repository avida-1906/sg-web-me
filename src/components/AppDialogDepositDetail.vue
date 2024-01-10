<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  data: {
    [t: string]: any
  }
}
const props = withDefaults(defineProps<Props>(), {})
const closeDialog = inject('closeDialog', () => { })
const { openService } = useService()

const { t } = useI18n()

// const {
//   EnumCurrencyKey,
// } = useCurrencyData()

const isDeposit = computed(() => {
  return !!props.data.pay_method_name
})
const isCoin = computed(() => {
  return application.isVirtualCurrency(props.data.currency_name)
})

function getPrefix() {
  return currencyConfig[props.data.currency_name as EnumCurrencyKey].prefix
}
function formatWithdrawState(state: number) {
  // <!--1：成功，2：拒绝，3，审核中，4：删除，5：三方异常，6：出款中-- >
  switch (state) {
    case 1: return t('checklist_completed')
    case 2: return t('failure')
    case 3: return t('dealing')
    case 4: return t('failure')
    case 5: return t('failure')
    case 6: return t('dealing')
    default: return '--'
  }
}
function formatDepositState(state: number) {
  // <!--1：成功，2：失败，3，支付中，4：删除，5:待审核 6：取消-- >
  switch (state) {
    case 1: return t('confirmed')
    case 2: return t('failure')
    case 3: return t('status_pending')
    case 4: return t('failure')
    case 5: return t('status_pending')
    case 6: return t('cancel')
    default: return '--'
  }
}
function getStateIcon(state: number) {
  switch (state) {
    case 1: return 'uni-record-success'
    case 2: return 'uni-record-err'
    case 3: return 'uni-record-confirm'
    case 4: return 'uni-record-err'
    case 5: return isDeposit.value ? 'uni-record-confirm' : 'uni-record-err'
    case 6: return isDeposit.value ? 'uni-record-cancel' : 'uni-record-confirm'
    default: return '--'
  }
}
function onlineHelp() {
  closeDialog()
  openService()
}
</script>

<template>
  <div class="dialog-deposit-detail">
    <div class="title">
      <span
        v-show="!isCoin"
        class="prefix"
      >{{ getPrefix() }}</span>
      <AppAmount
        v-if="isCoin"
        :amount="data.finally_amount"
        :currency-type="getCurrencyConfigByCode(data.currency_id)?.name"
      />
      <span v-else>{{ data.finally_amount }}</span>
    </div>
    <div class="content">
      <template v-if="!isDeposit">
        <!-- 虚拟币 -->
        <template v-if="isCoin">
          <div class="item">
            <label>{{ t('saving_address') }}:</label>
            <span class="data">{{ data.wallet_address }}</span>
          </div>
          <div class="item">
            <label>{{ t('deal_contract') }}:</label>
            <span class="data">{{ data.contract_type }}</span>
          </div>
        </template>
        <!-- 法币 -->
        <template v-else>
          <div class="item">
            <label> {{ data.currency_name === 'BRL'
              ? t('account_type') : t('saving_bank') }} :</label>
            <span class="data">{{ data.bank_name }}</span>
          </div>
          <div class="item">
            <label>{{ t('saving_account') }}:</label>
            <span class="data">{{ data.bank_account }}</span>
          </div>
        </template>
      </template>
      <div v-if="isDeposit" class="item">
        <label>{{ $t('transaction_way') }}:</label>
        <span class="data">{{ data.pay_method_name }}</span>
      </div>
      <div class="item">
        <label>{{ $t('currency_type') }}:</label>
        <span class="data">
          <AppCurrencyIcon :show-name="true" :currency-type="data.currency_name" />
        </span>
      </div>
      <div class="item">
        <label>{{ $t('status') }}:</label>
        <div class="center" style="gap: var(--tg-spacing-4);">
          <BaseIcon :name="getStateIcon(data.state)" />
          <span class="data">{{ isDeposit
            ? formatDepositState(data.state) : formatWithdrawState(data.state) }}</span>
        </div>
      </div>
      <div class="item">
        <label>{{ $t('transaction_time') }}:</label>
        <span class="data">{{ timeToCustomizeFormat(data.created_at) }}</span>
      </div>
      <div class="item">
        <label>{{ t('order_num') }}:</label>
        <div class="data color-white">
          <span>{{ data.order_number }}</span>
          <AppTooltip
            :text="t('copy_addr_suc')"
            icon-name="uni-doc" :triggers="['click']"
          >
            <template #content>
              <BaseButton size="none" @click="application.copy(data.order_number)">
                <BaseIcon name="uni-doc" />
              </BaseButton>
            </template>
          </AppTooltip>
        </div>
      </div>
    </div>
    <BaseButton
      size="md"
      class="help-btn"
      @click="onlineHelp"
    >
      {{ $t('need_online_service') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
.dialog-deposit-detail {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
  .title {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: var(--tg-spacing-4);
    font-size: var(--tg-font-size-lg);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    text-align: center;
    margin-bottom: var(--tg-spacing-16);
    --tg-app-amount-font-size: var(--tg-font-size-lg);
    --tg-app-currency-icon-size: 20px;
    .prefix{
      font-size: var(--tg-font-size-default);
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    margin-bottom: var(--tg-spacing-16);

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      line-height: 1.4;

      .data {
        color: var(--tg-text-lightgrey);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--tg-spacing-4);
      }
      .color-white{
        color: var(--tg-text-white);
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
  .help-btn{
    max-width: 311px;
    width: 100%;
    display: block;
    margin: 0 auto;
  }
}
</style>
