<script setup lang="ts">
import { getCurrentLanguageIdForBackend } from '~/modules/i18n'

const closeDialog = inject('closeDialog', () => {})

const { bankcardList, runBankcardList, bindBanks, openName } = useApiMemberBankCardList()
// 虚拟币钱包地址
const { list: WalletList, run: runWalletList } = useList(ApiMemberWalletList)

const initCurrency = computed(() => {
  const arr: any = []
  for (const key in EnumCurrency) {
    if (isNumber(EnumCurrency[key]))
      break
    arr.push({
      balance: 0,
      icon: `coin-${EnumCurrency[key].toLocaleLowerCase()}`,
      name: EnumCurrency[key],
      id: Number(key),
    })
  }
  arr[1].legalTender = true
  return arr
})

const toAddBankcards = function () {
  const { openAddBankcardsDialog } = useAddBankcardsDialog({ title: '绑定银行卡', openName: openName.value, isFirst: !bankcardList.value?.length })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}
const toAddVirAddress = function () {
  const { openVirAddressDialog } = useVirAddressDialog({ title: '绑定BTC', icon: 'btc' })
  closeDialog()
  nextTick(() => openVirAddressDialog({
    contractType: 'TRC20',
    currencyName: 'BTC',
  }))
}
const showCollapse = function (item: any) {
  if (item.legalTender)
    runBankcardList({ bank_type: getCurrentLanguageIdForBackend() })

  else
    runWalletList({ contract_type: '', currency_name: item.name })
}
</script>

<template>
  <div class="app-card-holder">
    <div class="layout-spacing reset wallet-address">
      <BaseCollapse v-for="item in initCurrency" :key="item.id" title="0" @click-head="showCollapse(item)">
        <template #top-right>
          <AppCurrencyIcon class="currency-icon" show-name :currency-type="item.id" />
        </template>
        <template #content>
          <div v-if="!item.legalTender" class="layout-spacing reset">
            <div v-for="tmp in WalletList" :key="tmp.id" class="address-row">
              <span>{{ tmp.wallet_address }}</span>
              <span class="type">{{ tmp.contract_type }}</span>
            </div>
            <BaseButton type="text" class="add-btn" @click="toAddVirAddress">
              +
            </BaseButton>
          </div>
          <div v-else class="layout-spacing reset">
            <div v-for="tmp, index in bindBanks" :key="index" class="address-row">
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
