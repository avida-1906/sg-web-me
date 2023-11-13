<script setup lang='ts'>
import type { BankCard, VirtualCoin } from '~/apis/types'

interface Props {
  item: VirtualCoin | BankCard
  /** 刷新卡包列表 */
  updateWalletList: () => void
  /** 虚拟币标题  */
  vCurrencyTitle?: string
}
const props = withDefaults(defineProps<Props>(), {
})
const closeDialog = inject('closeDialog', () => { })

const { openNotify } = useNotify()

const isBankcard = computed(() => 'bank_name' in props.item)
const bankcardItem = computed(() => props.item as BankCard)
const virtualCoinItem = computed(() => props.item as VirtualCoin)
const api = computed(() =>
  isBankcard.value ? ApiMemberBankcardDelete : ApiMemberWalletDelete,
)

const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: validatePassword,
} = useField<string>('password', (value) => {
  if (!value)
    return '请输入资金密码'
  else if (!payPasswordReg.test(value))
    return '请输入6位数字组成的资金密码'
  return ''
})

function cancel() {
  closeDialog()
}

const { run: runDelete } = useRequest(api.value, {
  async onSuccess() {
    closeDialog()
    openNotify({
      type: 'success',
      message: '删除成功',
    })
    await props.updateWalletList()
  },
})
async function deleteConfirm() {
  await validatePassword()
  if (!pwdErrorMsg.value)
    runDelete({ id: props.item.id, pay_password: password.value })
}
</script>

<template>
  <div class="app-delete-confirm">
    <div class="title">
      请您确认删除以下提款方式吗？
    </div>
    <div class="currency-type">
      <div>
        {{ isBankcard ? bankcardItem.bank_name : vCurrencyTitle }}
      </div>
      <div class="type-right">
        {{ isBankcard ? bankcardItem.open_name : virtualCoinItem.contract_type }}
      </div>
    </div>
    <div class="currency-number">
      {{ isBankcard ? bankcardItem.bank_account : virtualCoinItem.address }}
    </div>
    <div class="pay-password">
      <BaseInput
        v-model="password"
        label="资金密码"
        :msg="pwdErrorMsg"
        type="password"
        max="6"
        must
      />
    </div>
    <div class="btns">
      <BaseButton
        type="line"
        style="border-color: var(--tg-text-blue);
        color: var(--tg-text-blue);"
        @click="cancel"
      >
        取消
      </BaseButton>
      <BaseButton bg-style="primary" @click="deleteConfirm">
        确认删除
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-delete-confirm{
  .title{
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    padding: var(--tg-spacing-12) var(--tg-spacing-16);
    text-align: center;
  }
  .currency-type{
    display: flex;
    justify-content: space-between;
    font-weight: var(--tg-font-weight-semibold);
    line-height: 20px;
    padding: 0 var(--tg-spacing-16);
    .type-right{
      color: var(--tg-text-warn);
    }
  }
  .currency-number{
    padding: var(--tg-spacing-13) var(--tg-spacing-16);
    font-size: var(--tg-font-size-xs);
    background-color: var(--tg-secondary-dark);
    line-height: 18px;
  }
  .pay-password{
    padding: 0 var(--tg-spacing-12);
    margin-top: var(--tg-spacing-12);
  }
  .btns{
    display: flex;
    gap: 0.75rem;
    padding: var(--tg-spacing-12) var(--tg-spacing-12) var(--tg-spacing-16);
    > button{
      width: 100%;
    }
  }
}
</style>
