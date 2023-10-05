<script setup lang='ts'>
import { getCurrentLanguage, getCurrentLanguageIdForBackend } from '~/modules/i18n'

interface IBankOption {
  label: string
  icon: string
  value: string
}
interface IBank {
  id: string
  name: string
  pid: string
  sortlevel: string
}

const { bool: isBind } = useBoolean(false)
const { isLessThanXs } = storeToRefs(useWindowStore())

const amount = ref('')
const username = ref('')
const accountNumber = ref('')
const currentType = ref('1')
const bankName = ref('')
const isDefault = ref(false)
const bankAddr = ref('')
const depositTypeData = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
  { label: '支付宝', icon: 'fiat-alipay', value: '2' },
  { label: '微信', icon: 'fiat-wechat', value: '3' },
])
const bankSelectOptions = ref<IBankOption[]>(
  [
    { label: '中国工商', icon: 'fiat-bank', value: '1' },
  ],
)
const selectBank = ref('')
const params = ref({
  page_size: '10',
  page: '1',
  bank_type: '601',
})
const languageBankMap: IObject = {
  'zh-CN': '002',
  'vi-VN': '003',
}
// 银行卡列表
const { list: bankcardList, run } = useList(ApiMemberBankcardList, {
  onSuccess(data) {
    console.log('银行卡列表', data)
  },
})
// 银行列表
useApiMemberTreeList(languageBankMap[getCurrentLanguage()], {
  onSuccess(data) {
    bankSelectOptions.value = data.map((item: IBank) => {
      const temp: IBankOption = {
        label: item.name,
        icon: 'fiat-bank',
        value: item.id,
      }
      return temp
    })
  },
})
// 绑定个银行卡
const onBindBank = function () {
  useRequest(() => ApiMemberBankcardInsert(
    {
      bank_type: getCurrentLanguageIdForBackend(),
      open_name: username.value,
      bank_name: bankName.value,
      bank_account: accountNumber.value,
      bank_area_cpf: bankAddr.value,
      is_default: isDefault ? 1 : 2,
    },
  ), {
    onSuccess(data) {
      console.log(data)
    },
  })
}

const bindBanks = computed(() => {
  return [
    { label: '中国农商银行', icon: 'fiat-bank', value: '8888 8888 8888 8888' },
    { label: '中国工商银行', icon: 'fiat-bank', value: '8888 8888 8888 8887' },
  ].map((item) => {
    return item
  })
})

run(params.value)
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
      <!-- <BaseLabel label="提款方式">
        <AppWithdrawalDepositType v-model="currentType" :deposit-type="depositTypeData" />
      </BaseLabel> -->
      <BaseLabel v-if="currentType === '1'" label="请选择银行" must>
        <BaseSelect v-model="bankName" :options="bankSelectOptions" class="base-select" />
      </BaseLabel>
      <BaseInput v-model="bankAddr" label="开户行地址" />
      <BaseLabel :label="currentType === '1' ? '银行账户' : '请输入第三方账户 '" must>
        <BaseInput v-model="accountNumber" />
      </BaseLabel>
      <div class="checkbox-wrap">
        <span>是否设为默认卡号</span>
        <BaseCheckBox v-model="isDefault" />
      </div>
      <BaseButton bg-style="primary" size="md" @click="onBindBank">
        提交
      </BaseButton>
    </div>
    <!-- 出款信息 -->
    <div v-else class="withdrawal-wrap">
      <AppWithdrawalDepositType v-model="currentType" :deposit-type="depositTypeData" />
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
