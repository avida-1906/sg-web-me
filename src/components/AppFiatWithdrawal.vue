<script setup lang='ts'>
import { getCurrentLanguage, getCurrentLanguageIdForBackend } from '~/modules/i18n'

const { isLessThanXs } = storeToRefs(useWindowStore())

const amount = ref('')
// '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡
const currentType = ref(getCurrentLanguage() === 'pt-BR' ? '2' : '1')
const selectBank = ref('')
const pagination = ref({
  page_size: '10',
  page: '1',
  bank_type: getCurrentLanguageIdForBackend(),
})
const bankTypeData = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
])
const pixTypeData = ref([
  { label: 'PIX', icon: 'fiat-bank', value: '2' },
])

// 银行卡列表
const { list: bankcardList, runAsync: runBankcardList } = useList(ApiMemberBankcardList, {
  loadingKeep: 5000,
})

const bindBanks = computed(() => {
  return bankcardList.value?.map((item) => {
    if (item.is_default === 1)
      selectBank.value = item.bank_account
    const temp = {
      label: item.bank_name,
      value: item.bank_account,
      icon: 'fiat-bank',
    }
    return temp
  })
})

await application.allSettled([runBankcardList(pagination.value)])
</script>

<template>
  <div class="app-fiat-withdrawal">
    <!-- 绑定银行卡/三方账户 -->
    <div v-if="!bankcardList?.length" class="bank-bind">
      <AppAddBankcards :is-first="true" :container="false" />
    </div>
    <!-- 出款信息 -->
    <div v-else class="withdrawal-wrap">
      <AppWithdrawalDepositType v-model="currentType" :deposit-type="currentType === '1' ? bankTypeData : pixTypeData" />
      <div class="withdrawal-info">
        <BaseLabel v-if="currentType === '1'" label="出款银行卡" must>
          <BaseSelect v-model="selectBank" :options="bindBanks" must banks theme popper>
            <template #option="{ data: { item, parentWidth } }">
              <div class="scroll-x bank-options" :style="{ width: `${parentWidth + 24}px` }">
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
