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

const { t } = useI18n()
const { openNotify } = useNotify()

const passwordRef = ref()
const password = ref('')

const isBankcard = computed(() => 'bank_name' in props.item)
const bankcardItem = computed(() => props.item as BankCard)
const virtualCoinItem = computed(() => props.item as VirtualCoin)
const api = computed(() =>
  isBankcard.value ? ApiMemberBankcardDelete : ApiMemberWalletDelete,
)

function cancel() {
  closeDialog()
}

const { run: runDelete } = useRequest(api.value, {
  async onSuccess() {
    closeDialog()
    openNotify({
      type: 'success',
      message: t('success_delete'),
    })
    await props.updateWalletList()
  },
})
async function deleteConfirm() {
  passwordRef.value.setTouchTrue()
  await passwordRef.value.validatePassword()
  if (!passwordRef.value.errPassword) {
    runDelete({
      id: props.item.id,
      pay_password: password.value,
      auth_type: Number(passwordRef.value.authType),
    })
  }
}
</script>

<template>
  <div class="app-delete-confirm">
    <div class="title">
      {{ t('user_confirm_delete_draw_way') }}
    </div>
    <div class="currency-type">
      <div>
        {{ isBankcard ? bankcardItem.bank_name : vCurrencyTitle }}
      </div>
      <div class="type-right">
        {{ isBankcard ? bankcardItem.open_name
          : virtualCoinItem.contract_name }}
      </div>
    </div>
    <div class="currency-number">
      {{ isBankcard ? bankcardItem.bank_account : virtualCoinItem.address }}
    </div>
    <div class="pay-password">
      <AppPasswordInput ref="passwordRef" v-model="password" />
    </div>
    <div class="btns">
      <BaseButton
        type="line"
        style="border-color: var(--tg-text-blue);
        color: var(--tg-text-blue);"
        @click="cancel"
      >
        {{ t('cancel') }}
      </BaseButton>
      <BaseButton bg-style="primary" @click="deleteConfirm">
        {{ t('confirm_delete') }}
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
