<script setup lang="ts">
interface Props {
  setHideZeroBalance?: (bool: boolean) => void
}

const props = withDefaults(defineProps<Props>(), {
  setHideZeroBalance: () => { },
})

const { hideZeroBalance } = useCurrencyData()

function onSwitch() {
  props.setHideZeroBalance(hideZeroBalance.value)
  Local.set(STORAGE_HIDE_ZERO_BALANCE_KEY, hideZeroBalance.value)
}
</script>

<template>
  <div class="layout-spacing reset app-vir-address">
    <div class="flex-row">
      <div>
        <BaseSwitch v-model="hideZeroBalance" @change="onSwitch" />
      </div>
      <div class="row-right">
        <div class="row-title">
          隐藏零数余额
        </div>
        <div class="row-text">
          您为零数的余额不会显示在钱包中
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-vir-address {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
  gap: var(--tg-spacing-12);
  .flex-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    .row-right{
      margin-left: 10px;
    }
    .row-title{
      margin-bottom: 8px;
    }
    .row-text{
      color: var(--tg-text-lightgrey);
    }
  }
}
</style>
