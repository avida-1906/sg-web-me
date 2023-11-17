<script setup lang='ts'>
interface Props {
  data: {
    [t: string]: any
  }
}
defineProps<Props>()
const closeDialog = inject('closeDialog', () => {})

function service() {
  closeDialog()
}
</script>

<template>
  <div class="dialog-deposit-detail">
    <div class="title">
      R$ 1,000.00
    </div>
    <div class="content">
      <div class="item">
        <label>{{ $t('transaction_way') }}:</label>
        <span class="data">{{ $t('credit_card') }}</span>
      </div>
      <div class="item">
        <label>{{ $t('currency_type') }}:</label>
        <span class="data">
          <AppCurrencyIcon :show-name="true" currency-type="BRL" />
        </span>
      </div>
      <div class="item">
        <label>{{ $t('status') }}:</label>
        <span class="data">
          <AppCurrencyIcon currency-type="BRL" />
          {{ $t('status_pending') }}
        </span>
      </div>
      <div class="item">
        <label>{{ $t('transaction_time') }}:</label>
        <span class="data">17:30 2023/07/06</span>
      </div>
      <div class="item">
        <label>{{ $t('transaction_way') }}:</label>
        <span class="data">
          167069483525334
          <AppCurrencyIcon currency-type="BRL" />
        </span>
      </div>
    </div>
    <BaseButton style="display: block; margin: 0 auto;" @click="service">
      {{ $t('need_online_service') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
.dialog-deposit-detail {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);

  .title {
    font-size: var(--tg-font-size-lg);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    text-align: center;
    margin-bottom: var(--tg-spacing-16);
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
      line-height: 1.5;

      .data {
        color: var(--tg-text-white);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--tg-spacing-4);
      }
    }
  }
}
</style>
