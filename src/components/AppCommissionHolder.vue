<script lang="ts" setup>
// const { openAgentGradeDialog } = useDialogAgentGrade()
// const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()
const { t } = useI18n()
const { openNotify } = useNotify()
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
  },
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
      <div v-for="item of renderCurrencyList" :key="item.cur" class="currency-item">
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
    <BaseButton
      class="btn-receive"
      :loading="loadTransferToMember"
      bg-style="secondary" custom-padding @click="runTransferToMember"
    >
      {{ $t('finance_funds_transfer_commission_withdraw') }}
    </BaseButton>
    <div class="holder-tip">
      转到钱包后需要1倍有效投注才可提款
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-commission-holder {
  padding: 0 16px 16px;
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
  .btn-receive{
    max-width: 400px;
    width: 100%;
    display: block;
    margin: 16px auto 0;
  }
  .holder-tip{
    font-size: var(--tg-font-size-xs);
    line-height: 1.4;
    text-align: center;
    margin-top: 16px;
    font-weight: var(--tg-font-weight-semibold);
  }
}
</style>
