<script setup lang="ts">
import type { IUserCurrencyList } from '~/stores/app'
import type { BankCard, VirtualCoin } from '~/apis'

type WalletCurrencyList = {
  coin?: VirtualCoin[] // 绑定的虚拟币
  bankcard?: BankCard[] // 绑定的银行卡
  addressNum?: number // 虚拟币已绑定地址的数量
  showAdd?: boolean
} & IUserCurrencyList

const closeDialog = inject('closeDialog', () => { })
const cardList: Ref<WalletCurrencyList[]> = ref([])

const { bool: firstActivation, setFalse: setFirstActivationFalse } = useBoolean(true)
const { userCurrencyList } = useAppStore()
const { isVirtualCurrency } = useCurrencyData()
// 会员卡包
const {
  data: walletBankcard,
  runAsync: runAsyncWalletBankcardList,
} = useRequest(ApiWalletBankcardList, {
  onSuccess() {
    const temp: WalletCurrencyList[] = []
    for (const item of userCurrencyList) {
      const currentBankcard = walletBankcard.value?.bankcard[item.cur] || []
      if (item.bank_tree) { // 银行卡
        temp.push({
          ...item,
          bankcard: currentBankcard,
          addressNum: currentBankcard.length,
          showAdd: item.cur === '702'
            ? currentBankcard.length < 1
            : currentBankcard.length < 3,
        })
      }
      else { // 虚拟币
        const currentCoin = walletBankcard.value?.coin[item.cur] || []
        temp.push({
          ...item,
          coin: currentCoin,
          addressNum: currentCoin.length,
        })
        for (const tmp of item.contract_type || []) {
          if (!currentCoin.find(tp => tmp === tp.contract_type)) {
            currentCoin.push({
              address: '',
              contract_type: tmp,
              id: tmp,
              uid: '',
              state: -1,
              currency_name: '',
              created_at: 0,
              updated_at: 0,
              is_default: 0,
              username: '',
            })
          }
        }
      }
    }
    cardList.value = temp
    // 排序，绑定的在前
    cardList.value.sort((a, b) => {
      return ((b.bank_tree ? b.bankcard?.length : b.addressNum) || 0) - ((a.bank_tree ? a.bankcard?.length : a.addressNum) || 0)
    })
  },
})

const toAddBankcards = function (item: WalletCurrencyList) {
  let isFirst = true
  let openName = ''
  if (item.bankcard?.length) {
    isFirst = false
    openName = item.bankcard[0].open_name
  }
  const {
    openAddBankcardsDialog,
  } = useAddBankcardsDialog({
    title: '绑定银行卡',
    openName,
    isFirst,
    activeCurrency: item,
    /** 702 货币id */
    currentType: item.cur === '702' ? '2' : '1',
  })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}
const toAddVirAddress = function (
  item: WalletCurrencyList,
  contractType: string,
) {
  const {
    openVirAddressDialog,
  } = useVirAddressDialog({
    title: `绑定${item.type}`,
    icon: item.type,
  })
  closeDialog()
  nextTick(() => openVirAddressDialog({
    contractType,
    currencyId: item.cur,
    currencyName: item.type,
  }))
}

onActivated(() => {
  if (firstActivation.value) {
    setFirstActivationFalse()
    return
  }
  application.allSettled([
    runAsyncWalletBankcardList(),
  ])
})

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
        :title="item.addressNum?.toString() || '0'"
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
            <div
              v-for="tmp in item.coin"
              :key="tmp.id"
              class="address-row"
              :class="{ padding0: !tmp.address }"
            >
              <span v-if="tmp.address">{{ tmp.address }}</span>
              <BaseButton
                v-else
                size="sm"
                type="text"
                class="add-btn"
                @click="toAddVirAddress(item, tmp.contract_type)"
              >
                <BaseIcon style="transform: rotate(45deg);" name="uni-close" />
              </BaseButton>
              <span class="type vir-type center">{{ tmp.contract_type }}</span>
            </div>
          </div>
          <div v-else class="layout-spacing reset">
            <div
              v-for="tmp in item.bankcard"
              :key="tmp.id" class="address-row"
            >
              <BaseIcon name="fiat-bank" />
              <span class="bank-num">{{ tmp.bank_account }}</span>
              <span class="type">{{ tmp.open_name }}</span>
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
      <BaseEmpty v-if="!cardList.length" description="暂无数据" icon="uni-empty-betslip" />
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
      flex: 1;
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-lightgrey);
      background: var(--tg-secondary-dark);
    }
    .address-row{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--tg-secondary-dark);
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-white);
      padding: var(--tg-spacing-13) var(--tg-spacing-16);
      .type{
        font-weight: 500;
        color: var(--tg-text-warn);
      }
      .vir-type{
        height: 100%;
        position: absolute;
        right: var(--tg-spacing-16);
      }
      .bank-num{
        flex: 1;
        margin-left: var(--tg-spacing-8);
      }
    }
    .padding0{
      padding: 0 var(--tg-spacing-16);
    }
  }
}
</style>
