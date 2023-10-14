<script setup lang='ts'>
import type { IUserCurrencyList } from '~/stores/app'

interface Props {
  /** 货币对象 */
  activeCurrency: IUserCurrencyList
}
const props = withDefaults(defineProps<Props>(), {
})

const { isLessThanXs } = storeToRefs(useWindowStore())

const amount = ref('')

/** '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡 */
const currentType = computed<'1' | '2'>(() =>
  props.activeCurrency.cur === '702' ? '2' : '1',
)

const {
  bankcardList,
  runAsyncBankcardList,
  bindBanks,
  selectBank,
} = useApiMemberBankCardList()

watch(() => props.activeCurrency, () => {
  runAsyncBankcardList({ currency_id: props.activeCurrency.cur })
})

await application.allSettled(
  [runAsyncBankcardList({ currency_id: props.activeCurrency.cur })],
)
</script>

<template>
  <div class="app-fiat-withdrawal">
    <!-- 绑定银行卡/三方账户 -->
    <div v-if="!bankcardList?.length" class="bank-bind">
      <AppAddBankcards
        :is-first="true"
        :container="false"
        :active-currency="activeCurrency"
        :current-type="currentType"
      />
    </div>
    <!-- 出款信息 -->
    <div v-else class="withdrawal-wrap">
      <AppWithdrawalDepositType v-model="currentType" />
      <div class="withdrawal-info">
        <BaseLabel :label="currentType === '1' ? '出款银行卡' : 'PIX账号'" must>
          <BaseSelect
            v-model="selectBank"
            :options="bindBanks"
            must
            banks
            theme
            popper
          >
            <template #option="{ data: { item, parentWidth } }">
              <div
                class="scroll-x bank-options"
                :style="{ width: `${parentWidth + 24}px` }"
              >
                <div class="option-row">
                  <BaseIcon name="fiat-bank" />
                  <div class="bank-info" :class="{ 'is-mobile': isLessThanXs }">
                    <p>{{ item.label }}</p>
                    <p>{{ item.value }}</p>
                  </div>
                </div>
              </div>
            </template>
          </BaseSelect>
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
    .base-select{
      --tg-base-select-style-padding-y: var(--tg-spacing-8);
    }
    .checkbox-wrap{
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
      }
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
  .option-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    color: var(--tg-text-white);
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
      // background-color: var(--tg-sub-blue);
    }
  }
}
</style>
