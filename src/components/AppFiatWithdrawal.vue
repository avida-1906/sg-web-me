<script setup lang='ts'>
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])
const { bool: isBind } = useBoolean(true)
const username = ref('')
const accountNumber = ref('')
const currentType = ref('1')
const depositTypeData = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
  { label: '支付宝', icon: 'fiat-alipay', value: '2' },
  { label: '微信', icon: 'fiat-wechat', value: '3' },
])
// 银行选择
const currentBank = ref('')
const bankSelectOptions = [
  { label: '中国工商', icon: 'fiat-bank', value: '1' },
  { label: '中国建设', icon: 'fiat-bank', value: '2' },
  { label: '中国银行', icon: 'fiat-bank', value: '3' },
  { label: '光大银行', icon: 'fiat-bank', value: '4' },
]
// 出款银行
const selectBank = ref('')
const bindBanks = computed(() => {
  return [
    { label: '中国农商银行', icon: 'fiat-bank', value: '8888 8888 8888 8888' },
    { label: '中国工商银行', icon: 'fiat-bank', value: '8888 8888 8888 8887' },
  ].map((item) => {
    // item.label = `${item.label} ${item.value}`
    return item
  })
})
const amount = ref('')
function onClickPopperItem(v: any, hide: () => void) {
  if (v === selectBank.value)
    return
  selectBank.value = v.value
  hide()
}
// < 638
const { isXs } = storeToRefs(useWindowStore())
</script>

<template>
  <div class="app-fiat-withdrawal">
    <!-- 绑定银行卡/三方账户 -->
    <div v-if="!isBind" class="bind-identity">
      <div class="bind-tips">
        <BaseIcon name="uni-warning" />
        请先绑定提款方式，再进行提款！
      </div>
      <BaseLabel label="用户名" must label-content="绑定后不可更改">
        <BaseInput v-model="username" />
      </BaseLabel>
      <BaseLabel label="提款方式">
        <AppWithdrawalDepositType v-model="currentType" :deposit-type="depositTypeData" />
      </BaseLabel>
      <BaseLabel v-if="currentType === '1'" label="请选择银行" must>
        <BaseSelect v-model="currentBank" :options="bankSelectOptions" />
      </BaseLabel>
      <BaseLabel :label="currentType === '1' ? '银行账户' : '请输入第三方账户 '" must>
        <BaseInput v-model="accountNumber" />
      </BaseLabel>
      <BaseButton bg-style="primary" size="md" @click="isBind = true">
        提交
      </BaseButton>
    </div>
    <!-- 出款信息 -->
    <div v-else class="withdrawal-wrap">
      <AppWithdrawalDepositType v-model="currentType" :deposit-type="depositTypeData" />
      <div class="withdrawal-info">
        <BaseLabel v-if="currentType === '1'" label="出款银行卡" must>
          <BaseSelect v-model="selectBank" :options="bindBanks" must banks theme popper>
            <template #default="{ data: { options, hide, parentWidth } }">
              <div class="bank-options scroll-x" :style="{ width: `${parentWidth + 40}px` }">
                <div v-for="item, index in options" :key="index" class="option-row" @click="onClickPopperItem(item, hide)">
                  <BaseIcon name="fiat-bank" />
                  <div class="bank-info" :class="{ 'is-mobile': isXs }">
                    <p>{{ item.label }}</p>
                    <p>{{ item.value }}</p>
                  </div>
                </div>
              </div>
            </template>
          </BaseSelect>
        </BaseLabel>
        <BaseLabel v-else label="PIX账号" must>
          <BaseInput v-model="selectBank" />
        </BaseLabel>
        <BaseLabel label="金额" must right-text="R$ 0.00">
          <BaseInput v-model="amount">
            <template #right-button>
              <span>最大值</span>
            </template>
          </BaseInput>
        </BaseLabel>
        <BaseLabel label="双重验证" must>
          <BaseInput v-model="amount" />
        </BaseLabel>
        <BaseButton bg-style="primary" size="md">
          提款
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-fiat-withdrawal{
  .bind-identity{
    display: flex;
    flex-direction: column;
    gap:.75rem;
    .bind-tips{
      text-align: center;
      color: var(--tg-text-warn);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .25rem;
      margin-bottom: var(--tg-spacing-5);
    }
  }
  .withdrawal-wrap{
    display: flex;
    flex-direction: column;
    gap: .75rem;
    .withdrawal-info{
      display: flex;
      flex-direction: column;
      gap: .75rem;
    }
  }
}
.bank-options{
  padding: var(--tg-spacing-12) 0;
  .option-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    color: var(--tg-text-white);
    padding: var(--tg-spacing-8) var(--tg-spacing-24);
    cursor: pointer;
    > svg{
      width: 40px;
      height: 40px;
    }
    .bank-info{
      display: flex;
      align-items: center;
      :nth-child(1){
        margin-right: var(--tg-spacing-5);
      }
      p{
        margin: var(--tg-spacing-2) 0;
      }
      &.is-mobile{
        flex-direction: column;
        align-items: self-start;
      }
    }
    &:hover{
      background-color: var(--tg-sub-blue);
    }
  }
}
</style>
