<script setup lang="ts">
import type { IUserCurrencyList } from '~/stores/app'
import type { BankCard, VirtualCoin } from '~/apis'

type WalletCurrencyList = {
  coin?: VirtualCoin[] // 绑定的虚拟币
  bankcard?: BankCard[] // 绑定的银行卡
  addressNum?: string // 虚拟币已绑定地址的数量
} & IUserCurrencyList

const closeDialog = inject('closeDialog', () => { })
const cardList: WalletCurrencyList[] = []

const { userInfo } = useAppStore()
const { openNotify } = useNotify()
const {
  renderCurrencyList,
  isVirtualCurrency,
} = useCurrencyData()
// 会员卡包
const {
  data: walletBankcard,
  runAsync: runAsyncWalletBankcardList,
} = useRequest(ApiWalletBankcardList, {
  onSuccess() {
    for (const item of renderCurrencyList.value) {
      if (item.bank_tree) { // 银行卡
        cardList.push({
          ...item,
          bankcard: walletBankcard.value?.bankcard[item.cur],
        })
      }
      else { // 虚拟币
        const currentCoin = walletBankcard.value?.coin[item.cur] || []
        cardList.push({
          ...item,
          coin: currentCoin,
          addressNum: currentCoin.length.toString(),
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
  },
})

function verifyPayPsw() {
  if (userInfo?.pay_password === '0') {
    openNotify({
      type: 'error',
      title: '错误',
      message: '请先设置交易密码',
    })
    return true
  }
  else {
    return false
  }
}
const toAddBankcards = function (item: WalletCurrencyList) {
  if (verifyPayPsw())
    return
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
  if (verifyPayPsw())
    return
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
        :title="item.addressNum || item.bankcard?.length.toString() || '0'"
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
              <span class="type">{{ tmp.bank_name }}</span>
            </div>
            <BaseButton
              v-if="(!item.bankcard) || item.bankcard.length < 3"
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
