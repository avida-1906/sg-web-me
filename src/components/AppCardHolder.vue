<script setup lang="ts">
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { BankCard, VirtualCoin } from '~/apis/types'

type WalletCurrencyList = {
  coin?: VirtualCoin[] // 绑定的虚拟币
  bankcard?: BankCard[] // 绑定的银行卡
  addressNum: number // 虚拟币已绑定地址的数量
  showAdd: boolean // 是否可添加
  shown: boolean // 控制展开关闭
} & CurrencyData

const { t } = useI18n()
const closeDialog = inject('closeDialog', () => { })
const { openDeleteConfirm } = useDeleteConfirmDialog()
const { currentGlobalCurrency, userInfo } = storeToRefs(useAppStore())
const { renderCurrencyList, getVirContractName } = useCurrencyData()
const { openWalletDialog } = useWalletDialog({ activeTab: 'cardHolder' })
const { push } = useLocalRouter()

const curType = ref(currentGlobalCurrency.value)

const curCode = computed(() => {
  return renderCurrencyList.value.find(a => a.type === curType.value)?.cur ?? '701'
})
const currencyOptions = computed(() => {
  return renderCurrencyList.value.map((a) => {
    return {
      label: a.type,
      value: a.type,
      currencyType: a.type,
    }
  })
})
const isVirtualCurrency = computed(() => application.isVirtualCurrency(curType.value))

// 会员卡包
const { data: bankcardData, runAsync: runAsyncWalletBankcardList } = useRequest(ApiWalletBankcardList)
const bankcardList = computed(() => {
  if (bankcardData.value) {
    const list = isVirtualCurrency.value ? bankcardData.value.coin[curType.value] : bankcardData.value.bankcard[curType.value]
    return list ?? []
  }

  return []
})

function toAddBankcards(item: WalletCurrencyList) {
  let isFirst = true
  let openName = ''
  if (item.bankcard?.length) {
    isFirst = false
    openName = item.bankcard[0].open_name
  }
  const {
    openAddBankcardsDialog,
  } = useAddBankcardsDialog({
    title: t('bind_bank_card'),
    icon: 'fiat-bank',
    openName,
    isFirst,
    activeCurrency: item,
    /** 702 货币id */
    currentType: '1',
    callback: openWalletDialog,
  })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}
function toAddPix() {
  let isFirst = true
  let openName = ''
  if (bankcardList.value.length > 0) {
    isFirst = false
    openName = bankcardList.value[0].open_name
  }
  const {
    openAddPixDialog,
  } = useDialogAddPix({
    title: t('bind_pix_account'),
    icon: 'fiat-pix-title',
    openName,
    isFirst,
  })
  closeDialog()
  nextTick(() => openAddPixDialog())
}

function toAddVirAddress() {
  const {
    openVirAddressDialog,
  } = useVirAddressDialog({
    icon: curType.value,
  })
  closeDialog()
  nextTick(() => openVirAddressDialog({
    currencyId: curCode.value,
    currencyName: curType.value,
    title: `${t('label_bind')}${curType.value}`,
    callback: openWalletDialog,
  }))
}
function toDeleteVirAddress(item: VirtualCoin, vCurrencyTitle: string) {
  openDeleteConfirm({
    item,
    updateWalletList: runAsyncWalletBankcardList,
    vCurrencyTitle,
  })
}
function toDeleteBankcard(item: BankCard) {
  openDeleteConfirm({
    item,
    updateWalletList: runAsyncWalletBankcardList,
  })
}
function bind() {
  if (userInfo.value?.pay_password !== '1') {
    closeDialog()
    push('/settings/security-safe-pwd')
    return
  }

  if (isVirtualCurrency.value)
    toAddVirAddress()

  else if (curCode.value === '702')
    toAddPix()
}

await application.allSettled([runAsyncWalletBankcardList()])
</script>

<template>
  <div class="px-16 pb-43">
    <div class="flex flex-col items-center">
      <BaseSelect v-model="curType" :options="currencyOptions" popper>
        <template #label="{ data }">
          <AppCurrencyIcon show-name :currency-type="data?.value" />
        </template>
        <template #option="{ data: { item } }">
          <AppCurrencyIcon show-name :currency-type="item.value" />
        </template>
      </BaseSelect>
    </div>
    <!-- 当前币种绑定为0 -->
    <div v-show="bankcardList.length === 0" class="bg-tg-secondary-dark border-tg-text-white mb-14 mt-17 flex border-collapse items-center justify-center border-2 rounded-[4px] border-dashed py-25">
      <ul class="relative font-medium leading-[1.5]">
        <div class="absolute left-[-22px] text-[16px]">
          <BaseIcon name="uni-warning-color" />
        </div>
        <li>{{ t('add_withdraw_info') }}</li>
        <li>1.{{ t('three_withdraw_info_only') }}</li>
        <li>2.{{ t('want_more_del_first') }}</li>
      </ul>
    </div>

    <!-- 列表 -->
    <div class="mb-14 flex flex-col gap-14">
      <!-- item -->
      <div class="flex overflow-hidden rounded-[4px]">
        <div class="bg-tg-secondary-grey max-w-60 flex items-center justify-center p-23">
          <BaseIcon name="coin-usdt" />
        </div>
        <div class="bg-tg-secondary relative flex grow items-center px-14">
          <div class="text-tg-text-white flex flex-col gap-6">
            <span class="font-semibold">开户行</span>
            <span class="font-bold">000000000000</span>
          </div>
          <div class="absolute right-14">
            <BaseButton size="none" type="text">
              <BaseIcon class="text-[18px]" name="uni-bank-delete" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <BaseButton size="lg" bg-style="secondary" @click="bind">
        {{ `${t('label_bind')}${isVirtualCurrency ? t('withdraw_address') : t('withdraw_account')}` }}
      </BaseButton>
    </div>

    <!-- 当千币种绑定>0 -->
    <div v-show="bankcardList.length > 0" class="mt-14 font-medium leading-[1.5]">
      {{ t('three_withdraw_info_only') }}{{ t('want_more_del_first') }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
