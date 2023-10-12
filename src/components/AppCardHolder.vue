<script setup lang="ts">
import { getCurrentLanguageIdForBackend } from '~/modules/i18n'
import type { IUserCurrencyList } from '~/stores/app'

const closeDialog = inject('closeDialog', () => {})

const {
  bankcardList,
  runAsyncBankcardList,
  bindBanks,
  openName,
} = useApiMemberBankCardList()
// 虚拟币钱包地址
const { list: WalletList, run: runWalletList } = useList(ApiMemberWalletList)
const {
  renderCurrencyList,
  isVirtualCurrency,
} = useCurrencyData()

const toAddBankcards = function () {
  const {
    openAddBankcardsDialog,
  } = useAddBankcardsDialog({
    title: '绑定银行卡',
    openName: openName.value,
    isFirst: !bankcardList.value?.length,
  })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}
const toAddVirAddress = function (item: IUserCurrencyList) {
  const {
    openVirAddressDialog,
  } = useVirAddressDialog({
    title: `绑定${item.type}`,
    icon: 'btc',
  })
  closeDialog()
  nextTick(() => openVirAddressDialog({
    contractType: 'TRC20',
    currencyName: item.type,
  }))
}
const showCollapse = function (item: IUserCurrencyList) {
  if (isVirtualCurrency(item.type))
    runWalletList({ contract_type: '', currency_id: item.cur || '' })
  else
    runAsyncBankcardList({ currency_id: getCurrentLanguageIdForBackend() })
}
</script>

<template>
  <div class="app-card-holder">
    <div class="layout-spacing reset wallet-address">
      <BaseCollapse
        v-for="item in renderCurrencyList"
        :key="item.type"
        title="0"
        @click-head="showCollapse(item)"
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
            <div v-for="tmp in WalletList" :key="tmp.id" class="address-row">
              <span>{{ tmp.wallet_address }}</span>
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
              v-for="tmp, index in bindBanks"
              :key="index" class="address-row"
            >
              <BaseIcon :name="tmp.icon" />
              <span class="bank-num">{{ tmp.value }}</span>
              <span class="type">{{ tmp.name }}</span>
            </div>
            <BaseButton type="text" class="add-btn" @click="toAddBankcards">
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
