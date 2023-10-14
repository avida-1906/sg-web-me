<script setup lang="ts">
import type { IUserCurrencyList } from '~/stores/app'

type WalletCurrencyList = {
  coin?: any[]
  bankcard?: any[]
} & IUserCurrencyList

const closeDialog = inject('closeDialog', () => { })
const cardList: WalletCurrencyList[] = []

const {
  renderCurrencyList,
  isVirtualCurrency,
} = useCurrencyData()
const {
  bankcardList,
  // runAsyncBankcardList,
  // bindBanks,
  openName,
} = useApiMemberBankCardList()
// 会员卡包
const {
  data: walletBankcard,
  runAsync: runAsyncWalletBankcardList,
  // loading: walletBankcardListLoading,
} = useRequest(ApiWalletBankcardList, {
  onSuccess() {
    // console.log(walletBankcard.value)
    // console.log(renderCurrencyList.value)
    for (const item of renderCurrencyList.value) {
      if (item.bank_tree) { // 银行卡
        cardList.push({
          ...item,
          bankcard: walletBankcard.value?.bankcard[item.cur],
        })
        // (item as WalletCurrencyList).bindBanks = walletBankcard.value?.bankcard[item.cur]
      }
      else { // 虚拟币
        cardList.push({
          ...item,
          coin: walletBankcard.value?.coin[item.cur],
        })
        // (item as WalletCurrencyList).address = walletBankcard.value?.coin[item.cur]
      }
    }
  },
})
// 虚拟币钱包地址
// const { list: walletList, run: runWalletList } = useList(ApiMemberWalletList)

const activeCurrency = ref()

const toAddBankcards = function (item: WalletCurrencyList) {
  const {
    openAddBankcardsDialog,
  } = useAddBankcardsDialog({
    title: '绑定银行卡',
    openName: openName.value,
    isFirst: !bankcardList.value?.length,
    activeCurrency: activeCurrency.value,
    currentType: activeCurrency.value?.cur === '702' ? '2' : '1',
  })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}
const toAddVirAddress = function (item: WalletCurrencyList) {
  const {
    openVirAddressDialog,
  } = useVirAddressDialog({
    title: `绑定${item.type}`,
    icon: item.type,
  })
  closeDialog()
  nextTick(() => openVirAddressDialog({
    contractType: 'TRC20',
    currencyId: item.cur,
    currencyName: item.type,
  }))
}
// const showCollapse = function (item: IUserCurrencyList) {
//   activeCurrency.value = item
//   if (isVirtualCurrency(item.type))
//     runWalletList({ contract_type: '', currency_id: item.cur })
//   else
//     runAsyncBankcardList({ currency_id: item.cur ?? '' })
// }

await application.allSettled([
  runAsyncWalletBankcardList(),
])
</script>

<template>
  <div class="app-card-holder">
    <div class="layout-spacing reset wallet-address">
      <BaseCollapse
        v-for="item in cardList"
        :key="item.type"
        :title="(item.coin?.length || item.bankcard?.length)?.toString() || '0'"
      >
        <template #top-right>
          <AppCurrencyIcon
            class="currency-icon"
            show-name
            :currency-type="item.type"
          />
        </template>
        <template #content>
          <div v-if="isVirtualCurrency(item.type)" class="layout-spacing reset">
            <div v-for="tmp in item.coin" :key="tmp.id" class="address-row">
              <span>{{ tmp.address }}</span>
              <span class="type">{{ tmp.contract_type }}</span>
            </div>
            <BaseButton
              type="text"
              class="add-btn"
              @click="toAddVirAddress(item)"
            >
              +
            </BaseButton>
          </div>
          <div v-else class="layout-spacing reset">
            <div
              v-for="tmp in item.bankcard"
              :key="tmp.id" class="address-row"
            >
              <BaseIcon name="fiat-bank" />
              <span class="bank-num">{{ tmp.bank_account }}</span>
              <span class="type">{{ tmp.bank_name }}</span>
            </div>
            <BaseButton type="text" class="add-btn" @click="toAddBankcards(item)">
              +
            </BaseButton>
          </div>
        </template>
      </BaseCollapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-card-holder {
  padding-bottom: var(--tg-spacing-16);
  .wallet-address{
    gap:  var(--tg-spacing-6) 0;
    .currency-icon{
      margin-right:  var(--tg-spacing-8);
      color: var(--tg-text-white);
    }
    .layout-spacing{
      gap:  var(--tg-spacing-6) 0;
      background: var(--tg-primary-main);
    }
    .add-btn{
      font-size: var(--tg-font-size-md);
      color: var(--tg-text-lightgrey);
      background: var(--tg-secondary-dark);
    }
    .address-row{
      display: flex;
      justify-content: space-between;
      background: var(--tg-secondary-dark);
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-white);
      padding: var(--tg-spacing-14) var(--tg-spacing-16);
      .type{
        font-weight: 500;
        color: var(--tg-text-warn);
      }
      .bank-num{
        flex: 1;
        margin-left: var(--tg-spacing-8);
      }
    }
  }
}
</style>
