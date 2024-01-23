<script lang="ts" setup>
// const { openAgentGradeDialog } = useDialogAgentGrade()
// const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()
const { t } = useI18n()
const { openNotify } = useNotify()
const appStore = useAppStore()
const {
  renderCurrencyList,
} = useCurrencyData()
const {
  data: balanceAgency,
  runAsync: getBalanceAgency,
} = useRequest(ApiMemberBalanceAgency)
const {
  run: runTransferToMember,
  loading: loadTransferToMember,
} = useRequest(ApiAgencyTransferToMember, {
  onSuccess() {
    openNotify({
      title: t('finance_funds_transfer_commission_withdraw'),
      icon: 'navbar-wallet-notify',
      message: t('commission_draw_success'),
    })
    appStore.getBalanceData()
    getBalanceAgency()
  },
})

const currencyList = computed(() => {
  const arr1 = renderCurrencyList.value.filter(a => !application.isVirtualCurrency(a.type))
  const arr2 = renderCurrencyList.value.filter(a => application.isVirtualCurrency(a.type))

  return [...arr1, ...arr2]
})

await application.allSettled(
  [
    getBalanceAgency(),
  ],
)
</script>

<template>
  <div class="app-commission-holder">
    <div class="holder-currency">
      <div class="currency-item">
        <div>{{ $t('finance_funds_transfer_sort_available') }}</div>
        <div>{{ $t('finance_funds_transfer_sort_commission') }}</div>
      </div>
      <div v-for="item of currencyList" :key="item.cur" class="currency-item">
        <AppAmount
          :amount="item.balanceWithSymbol"
          :currency-type="item.type"
          style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
        />
        <AppAmount
          :amount="balanceAgency ? balanceAgency[item.type] : '0'"
          :currency-type="item.type"
          style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
        />
      </div>
    </div>
    <div class="sticky-box">
      <BaseButton
        class="btn-receive"
        :loading="loadTransferToMember"
        bg-style="secondary" size="md"
        @click="runTransferToMember"
      >
        {{ $t('transfer_to_wallet') }}
      </BaseButton>
      <div class="holder-tip">
        {{ t('after_transfer_withdraw_money') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-commission-holder {
  padding: 0 16px;
  color: var(--tg-secondary-light);
  .holder-currency{
    .currency-item{
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      padding: 17px 16px;
      border-radius: var(--tg-radius-default);
      line-height: 1.3575;
      &:first-child{
        font-weight: var(--tg-font-weight-semibold);
      }
      &:nth-child(even){
        background: var(--tg-secondary-grey);
      }
    }
    &>:first-child{
      padding-top: 0;
    }
  }
  .sticky-box{
    position: sticky;
    bottom: 0;
    text-align: center;
    padding: 16px 0 16px;
    background-color: #1a2c37;
  }
  .btn-receive{
    max-width: 400px;
    width: 100%;
  }
  .holder-tip{
    font-size: var(--tg-font-size-xs);
    margin-top: 16px;
    font-weight: var(--tg-font-weight-semibold);
  }
}
</style>
