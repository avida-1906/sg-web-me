<script setup lang="ts">
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { BankCard, VirtualCoin } from '~/apis/types'

type WalletCurrencyList = {
  coin?: VirtualCoin[] // 绑定的虚拟币
  bankcard?: BankCard[] // 绑定的银行卡
  addressNum: number // 虚拟币已绑定地址的数量
  showAdd: boolean // 是否可添加
} & CurrencyData

const { t } = useI18n()

const closeDialog = inject('closeDialog', () => { })
const cardList: Ref<WalletCurrencyList[] | null> = ref(null)

const {
  isVirtualCurrency,
  renderCurrencyList,
  getVirContractName,
} = useCurrencyData()
// 会员卡包
const {
  data: walletBankcard,
  runAsync: runAsyncWalletBankcardList,
} = useRequest(ApiWalletBankcardList, {
  onSuccess() {
    const temp: WalletCurrencyList[] = []
    for (const item of renderCurrencyList.value) {
      const currentBankcard = walletBankcard.value?.bankcard[item.cur] || []
      if (isVirtualCurrency(item.type)) { // 虚拟币
        const currentCoin = walletBankcard.value?.coin[item.cur] || []
        temp.push({
          ...item,
          coin: currentCoin,
          addressNum: currentCoin.length,
          showAdd: currentCoin.length < 3,
        })
      }
      else { // 银行卡
        temp.push({
          ...item,
          bankcard: currentBankcard,
          addressNum: currentBankcard.length,
          showAdd: item.cur === '702'
            ? currentBankcard.length < 1
            : currentBankcard.length < 3,
        })
      }
    }
    // 排序，绑定的在前
    temp.sort((a, b) => {
      return b.addressNum - a.addressNum
    })
    cardList.value = temp
  },
})

const { openWalletDialog } = useWalletDialog({ activeTab: 'cardHolder' })
const toAddBankcards = function (item: WalletCurrencyList) {
  const isFirst = false
  let openName = ''
  if (item.bankcard?.length) {
    // isFirst = false
    openName = item.bankcard[0].open_name
  }
  const currentType = item.cur === '702'
  const {
    openAddBankcardsDialog,
  } = useAddBankcardsDialog({
    title: currentType ? t('bind_pix_account') : t('bind_bank_card'),
    icon: currentType ? 'fiat-pix-title' : 'fiat-bank',
    openName,
    isFirst,
    activeCurrency: item,
    /** 702 货币id */
    currentType: currentType ? '2' : '1',
    callback: openWalletDialog,
  })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}
const toAddVirAddress = function (
  item: WalletCurrencyList,
) {
  const {
    openVirAddressDialog,
  } = useVirAddressDialog({
    title: `${t('label_bind')}${item.type}`,
    icon: item.type,
  })
  closeDialog()
  nextTick(() => openVirAddressDialog({
    currencyId: item.cur,
    currencyName: item.type,
    callback: openWalletDialog,
  }))
}
function toDeleteVirAddress(item: VirtualCoin, vCurrencyTitle: string) {
  const { openDeleteConfirm } = useDeleteConfirmDialog(item, runAsyncWalletBankcardList, vCurrencyTitle)
  openDeleteConfirm()
}
function toDeleteBankcard(item: BankCard) {
  const { openDeleteConfirm } = useDeleteConfirmDialog(item, runAsyncWalletBankcardList)
  openDeleteConfirm()
}

// if (!cardList.value)
await application.allSettled([runAsyncWalletBankcardList()])
</script>

<template>
  <div class="app-card-holder">
    <div class="layout-spacing reset wallet-address">
      <BaseCollapse
        v-for="item in cardList"
        :key="item.type"
        :title="item.addressNum?.toString() || '0'"
      >
        <template #top-right>
          <AppCurrencyIcon
            show-name
            :currency-type="item.type"
            style="
            --tg-app-currency-icon-style-margin: 0 var(--tg-spacing-8) 0 0;
            --tg-app-currency-icon-style-color: var(--tg-text-white);"
          />
        </template>
        <template #content>
          <div v-if="isVirtualCurrency(item.type)" class="layout-spacing reset">
            <div
              v-for="tmp in item.coin"
              :key="tmp.id"
              class="address-row"
            >
              <span class="type">{{
                getVirContractName(tmp.contract_type.toString())
              }}</span>
              <span class="bank-num">{{ tmp.address }}</span>
              <BaseButton type="text" @click.stop="toDeleteVirAddress(tmp, item.type)">
                <BaseIcon name="uni-delete" />
              </BaseButton>
            </div>
            <BaseButton
              v-if="item.showAdd"
              size="sm"
              type="text"
              class="add-btn"
              @click="toAddVirAddress(item)"
            >
              <BaseIcon style="transform: rotate(45deg);" name="uni-close" />
            </BaseButton>
          </div>
          <div v-else class="layout-spacing reset">
            <div
              v-for="tmp in item.bankcard"
              :key="tmp.id"
              class="address-row"
              :class="{ 'bankcard-disable-card-holder': tmp.state === 2 }"
            >
              <BaseIcon name="fiat-bank" />
              <div class="bank-num">
                <span style="padding-right: 1ch;">{{ tmp.bank_name }}</span>
                <span>{{ tmp.bank_account }}</span>
              </div>
              <span class="type">{{ tmp.open_name }}</span>
              <BaseButton
                type="text"
                style="z-index: 10;"
                @click.stop="toDeleteBankcard(tmp)"
              >
                <BaseIcon name="uni-delete" />
              </BaseButton>
              <!-- <div v-if="tmp.state === 2" class="bankcard-disable-text">
                <BaseIcon name="uni-disable" />
                暂不可用
              </div> -->
            </div>
            <BaseButton
              v-if="item.showAdd"
              type="text"
              size="sm"
              class="add-btn"
              @click="toAddBankcards(item)"
            >
              <BaseIcon style="transform: rotate(45deg);" name="uni-close" />
            </BaseButton>
          </div>
        </template>
      </BaseCollapse>
      <BaseEmpty
        v-if="!cardList?.length"
        :description="t('data_empty')"
        icon="uni-empty-betslip"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-card-holder {
  padding-bottom: var(--tg-spacing-16);
  .wallet-address{
    gap:  var(--tg-spacing-6) 0;
    .layout-spacing{
      gap:  var(--tg-spacing-6) 0;
      background: var(--tg-primary-main);
    }
    .add-btn{
      flex: 1;
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-lightgrey);
      background: var(--tg-secondary-dark);
    }
    .address-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--tg-secondary-dark);
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-white);
      padding: 0 var(--tg-spacing-4) 0 var(--tg-spacing-16);
      line-height: 38px;;
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
