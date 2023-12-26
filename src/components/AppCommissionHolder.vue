<script lang="ts" setup>
// const appStore = useAppStore()
// const { userInfo } = storeToRefs(appStore)
// const { isMobile } = storeToRefs(useWindowStore())
// const { openAgentGradeDialog } = useDialogAgentGrade()
const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()
</script>

<template>
  <div class="app-commission-holder">
    <div class="holder-top">
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
    </div>
    <div class="holder-currency">
      <div v-for="i in 9" :key="i" class="currency-item">
        <AppCurrencyIcon
          show-name
          currency-type="BTC"
        />
        <div>0.1</div>
      </div>
    </div>
    <div class="holder-btns">
      <BaseButton size="md" bg-style="primary">
        {{ $t('commission_transfer') }}
      </BaseButton>
      <BaseButton
        size="sm" type="line"
        style="--tg-base-button-line-border-color: var(--tg-text-blue)"
      >
        {{ $t('menu_title_settings_withdrawals') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-commission-holder {
  padding: 0 16px 16px;
  .holder-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    --tg-base-button-padding-y: 8px;
    --tg-base-button-padding-x: 8px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
  }
  .holder-title{
    padding: 19px 16px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
  .holder-currency{
    .currency-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 16px;
      &:nth-child(odd){
        background: #213743;
      }
    }
  }
  .holder-btns{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 12px;
    margin-top: 16px;
  }
}
</style>
