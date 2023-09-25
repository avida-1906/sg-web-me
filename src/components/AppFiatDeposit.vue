<script setup lang='ts'>
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])
//  存款类型
const currentType = ref('1')
const depositType = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
  { label: '支付宝', icon: 'fiat-alipay', value: '2' },
  { label: '微信', icon: 'fiat-wechat', value: '3' },
])
const changeType = function (type: string) {
  currentType.value = type
}
</script>

<template>
  <div class="app-fiat-currency-deposit">
    <div class="deposit-wrap">
      <div class="scroll-x deposit-type-btns">
        <div
          v-for="item in depositType" :key="item.value" class="type-btn"
          :style="{ 'background-color': item.value === currentType ? `var(--tg-text-blue)` : '' }"
          @click="changeType(item.value)"
        >
          <BaseIcon :name="item.icon" />
          {{ item.label }}
        </div>
      </div>
      <div class="type-content">
        <BaseInput v-model="username" label="收款人姓名" :msg="usernameErrorMsg" />
        <BaseInput v-model="username" label="充值金额" :msg="usernameErrorMsg" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-fiat-currency-deposit{
  .deposit-wrap{
    .deposit-type-btns{
      display: flex;
      gap: .75rem;
      .type-btn{
        background: var(--tg-secondary-main);
        // flex: 1;
        min-width: 102px;
        padding: 0 var(--tg-spacing-12);
        text-align: center;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        box-shadow: var(--tg-box-shadow);
        border-radius: var(--tg-radius-default);
        color: var(--tg-text-white);
      }
    }
    .type-content{
      margin-top: var(--tg-spacing-12);
    }
  }
}
</style>
