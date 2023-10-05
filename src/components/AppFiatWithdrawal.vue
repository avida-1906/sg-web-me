<script setup lang='ts'>
import { getCurrentLanguage, getCurrentLanguageIdForBackend } from '~/modules/i18n'

interface ISelectOption {
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

const { isLessThanXs } = storeToRefs(useWindowStore())

const bankType = getCurrentLanguageIdForBackend()
// const openName = ref('')
// const bankName = ref('')
// const bankAccount = ref('')
const bankAreaCpf = ref('')
const isDefault = ref(false)
const amount = ref('')
// 1 表示银行卡， 2 表示pix 除了巴西其他国家都是银行卡
const currentType = ref('1')
const depositTypeData = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
  { label: '支付宝', icon: 'fiat-alipay', value: '2' },
  { label: '微信', icon: 'fiat-wechat', value: '3' },
])
const bankSelectOptions = ref<ISelectOption[]>([])
const selectBank = ref('')
const pagination = ref({
  page_size: '10',
  page: '1',
  bank_type: '601',
})
const languageBankMap: IObject = {
  'zh-CN': '002',
  'vi-VN': '003',
}

const { value: openName, errorMessage: usernameError, validate: usernameValidate } = useField<string>('username', (value) => {
  if (!value)
    return '请输入用户名'
  return ''
})
const { value: bankName, errorMessage: banknameError, validate: banknameValidate } = useField<string>('bankname', (value) => {
  if (!value)
    return '请选择银行'
  return ''
})
const { value: bankAccount, errorMessage: bankaccountError, validate: bankaccountValidate } = useField<string>('bankaccount', (value) => {
  if (!value)
    return '请输入银行账户'
  return ''
})

// 银行卡列表
const { list: bankcardList, run: runBankcardList, loading: bankcardListLoading } = useList(ApiMemberBankcardList, {
  loadingKeep: 1000,
})
// 银行列表
useApiMemberTreeList(languageBankMap[getCurrentLanguage()], {
  onSuccess(data) {
    bankSelectOptions.value = data.map((item: IBank) => {
      const temp: ISelectOption = {
        label: item.name,
        icon: 'fiat-bank',
        value: item.name,
      }
      return temp
    })
  },
})
// 绑定银行卡
const { run: runBankcardInsert } = useRequest(ApiMemberBankcardInsert, {
  onSuccess(data) {
    console.log(data)
  },
})
const onBindBank = async function () {
  await usernameValidate()
  await banknameValidate()
  await bankaccountValidate()
  if (!usernameError.value && !usernameError.value && !bankaccountError.value) {
    runBankcardInsert({
      bank_type: bankType,
      bank_name: bankName.value,
      open_name: openName.value,
      bank_area_cpf: bankAreaCpf.value,
      bank_account: bankAccount.value,
      is_default: isDefault ? 1 : 2,

    })
  }
}

const bindBanks = computed(() => {
  return bankcardList.value.map((item) => {
    if (item.is_default === 1)
      selectBank.value = item.bank_account
    const temp: ISelectOption = {
      label: item.bank_name,
      value: item.bank_account,
      icon: 'fiat-bank',
    }
    return temp
  })
})

runBankcardList(pagination.value)
</script>

<template>
  <div v-if="bankcardListLoading" class="loading-wrap">
    <BaseLoading />
  </div>
  <div v-else class="app-fiat-withdrawal">
    <!-- 绑定银行卡/三方账户 -->
    <div v-if="!!bankcardList.length" class="bind-identity">
      <div class="bind-tips">
        <BaseIcon name="uni-warning" />
        请先绑定提款方式，再进行提款！
      </div>
      <BaseLabel label="用户名" must label-content="绑定后不可更改">
        <BaseInput v-model="openName" :msg="usernameError" />
      </BaseLabel>
      <!-- <BaseLabel label="提款方式">
        <AppWithdrawalDepositType v-model="currentType" :deposit-type="depositTypeData" />
      </BaseLabel> -->
      <BaseLabel v-if="currentType === '1'" label="请选择银行" must>
        <BaseSelect v-model="bankName" :msg="banknameError" :options="bankSelectOptions" class="base-select" />
      </BaseLabel>
      <BaseInput v-model="bankAreaCpf" label="开户行地址" />
      <BaseLabel :label="currentType === '1' ? '银行账户' : '请输入第三方账户 '" must>
        <BaseInput v-model="bankAccount" :msg="bankaccountError" />
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
.loading-wrap{
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
