<script setup lang="ts">
const paypwd = 'ICBC 6228 4804 4583 9939 573'
</script>

<template>
  <div class="app-card-holder">
    <div class="layout-spacing reset wallet-address">
      <BaseCollapse v-for="i in 3" :key="i" :title="i.toString()">
        <template #top-right>
          <AppCurrencyIcon class="currency-icon" show-name :currency-type="1" />
        </template>
        <template #content>
          <div class="text">
            bc1qcttjkayjg28gkw6v4petiqk56p098xxnuo0ze
          </div>
        </template>
      </BaseCollapse>
    </div>
    <div class="bank-card">
      <BaseLabel v-for="i in 3" :key="i" label="持卡人姓名" label-content="小明明">
        <BaseInput v-model="paypwd" disabled>
          <template #left-icon>
            <BaseIcon name="fiat-bank" />
          </template>
        </BaseInput>
      </BaseLabel>
      <BaseButton class="add-btn">
        +
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-card-holder {
  .wallet-address{
    gap:  var(--tg-spacing-2) 0;
    .currency-icon{
      margin-right:  var(--tg-spacing-8);
      color: var(--tg-text-white);
    }
    .text{
      background: var(--tg-secondary-dark);
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-white);
      line-height: 20px;
      padding: var(--tg-spacing-12) var(--tg-spacing-16);
    }
  }
  .bank-card{
    padding: var(--tg-spacing-16);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
    .add-btn{
      font-size: var(--tg-font-size-md);
      color: var(--tg-text-lightgrey);
    }
  }
}
</style>
