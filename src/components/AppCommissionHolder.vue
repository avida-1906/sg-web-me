<script lang="ts" setup>
// const appStore = useAppStore()
// const { userInfo } = storeToRefs(appStore)
// const { isMobile } = storeToRefs(useWindowStore())
// const { openAgentGradeDialog } = useDialogAgentGrade()
// const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()
</script>

<template>
  <div class="app-commission-holder">
    <!-- <div class="holder-top">
      <div class="center">
        <span>{{ $t('total_approx') }}：</span>
        <AppAmount amount="99999900" currency-type="BNB" />
      </div>
      <BaseButton
        bg-style="primary"
        custom-padding @click="openAgentCommissionDrawDialog"
      >
        {{ $t('commission_currency_conversion') }}
      </BaseButton>
    </div>
    <div class="holder-title">
      {{ $t('currency_list') }}
    </div> -->
    <div class="holder-currency">
      <div class="currency-item">
        <div>{{ $t('finance_funds_transfer_sort_available') }}</div>
        <div>{{ $t('finance_funds_transfer_sort_commission') }}</div>
      </div>
      <div v-for="i in 6" :key="i" class="currency-item">
        <AppAmount
          amount="0.00"
          currency-type="BTC"
          style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
        />
        <AppAmount
          amount="0.00"
          currency-type="BTC"
          style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
        />
      </div>
    </div>
    <BaseButton class="btn-receive" bg-style="secondary" custom-padding>
      {{ $t('finance_funds_transfer_commission_withdraw') }}
    </BaseButton>
    <div class="holder-tip">
      <div>
        {{ $t('finance_funds_transfer_commission_txt') }}
      </div>
      <div>
        {{ $t('note') }}{{ $t('colon') }}{{ $t('after_transfer_withdraw_money') }}
      </div>
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
        font-weight: 600;
      }
      &:nth-child(even){
        background: var(--tg-secondary-grey);
      }
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
    &>:last-child{
      transform: scale(0.67);
    }
  }
}
</style>
