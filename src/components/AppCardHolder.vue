<script setup lang="ts">
import type { BankCard, EnumCurrencyKey, VirtualCoin } from '~/apis/types'
import type { CurrencyCode } from '~/composables/useCurrencyData'

const props = defineProps<{ modelValue: EnumCurrencyKey }>()

const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()
const closeDialog = inject('closeDialog', () => { })
const { openDeleteConfirm } = useDeleteConfirmDialog()
const { currentGlobalCurrency } = storeToRefs(useAppStore())
const { renderCurrencyList } = useCurrencyData()

// const { push } = useLocalRouter()

const curType = ref(props.modelValue || currentGlobalCurrency.value)

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
    const list = isVirtualCurrency.value ? bankcardData.value.coin[curCode.value] : bankcardData.value.bankcard[curCode.value]
    return list ?? []
  }

  return []
})

function toAddBankcards() {
  let isFirst = true
  let openName = ''
  if (bankcardList.value.length > 0) {
    isFirst = false
    openName = bankcardList.value[0].open_name
  }
  const { openBindBankDialog } = useDialogBindBank({
    isFirst,
    openName,
    currencyId: curCode.value,
  })
  closeDialog()
  nextTick(() => openBindBankDialog())
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
    currencyId: curCode.value,
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
  const { openWalletDialog } = useWalletDialog({ activeTab: 'cardHolder', initCurrency: curType.value })

  closeDialog()
  nextTick(() => openVirAddressDialog({
    currencyId: curCode.value,
    currencyName: curType.value,
    title: `${t('label_bind')} ${curType.value}`,
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
  if (isVirtualCurrency.value)
    toAddVirAddress()

  else if (curCode.value === '702')
    toAddPix()

  else
    toAddBankcards()
}
function deleteCard(item: any) {
  if (isVirtualCurrency.value)
    toDeleteVirAddress(item, curType.value)
  else
    toDeleteBankcard(item)
}
function getCurrencyIdToIconName(currencyId: CurrencyCode) {
  console.error(currencyId)
  const isVirtualCurrency = application.isVirtualCurrency(getCurrencyConfigByCode(currencyId).name)
  if (isVirtualCurrency)
    return `coin-${getCurrencyConfigByCode(currencyId).name.toLocaleLowerCase()}`

  if (currencyId === '702')
    return 'fiat-pix'

  return 'fiat-bank'
}
function handleSelect(t: EnumCurrencyKey) {
  emit('update:modelValue', t)
}
function get_vietnamese_and_delete() {

}

onMounted(() => {
  nextTick(() => {
    get_vietnamese_and_delete()
  })
})
await application.allSettled([runAsyncWalletBankcardList()])
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <BaseSelect
        v-model="curType" :options="currencyOptions" popper popper-search
        :popper-search-placeholder="t('search')" popper-max-height="22em"
        @select="handleSelect"
      >
        <template #label="{ data }">
          <AppCurrencyIcon show-name :currency-type="data?.value" />
        </template>
        <template #option="{ data: { item } }">
          <AppCurrencyIcon show-name :currency-type="item.value" />
        </template>
      </BaseSelect>
    </div>
    <!-- 当前币种绑定为0 -->
    <div
      v-show="bankcardList.length === 0"
      class="bg-tg-secondary-dark border-tg-text-white mb-14 mt-17 flex border-collapse items-center justify-center border-2 rounded-[4px] border-dashed py-25"
    >
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
    <div class="mb-14 mt-17 flex flex-col gap-14">
      <!-- item -->
      <div
        v-for="item in bankcardList" :key="item.id" class="shadow-text-shadow relative flex overflow-hidden rounded-[4px]"
        :class="item.state === 2 ? 'cursor-not-allowed' : ''"
      >
        <div
          class="bg-tg-secondary-grey max-w-60 flex items-center justify-center p-23"
          :class="item.state === 2 ? 'opacity-[0.5]' : ''"
        >
          <BaseIcon
            class="text-[20px]"
            :name="getCurrencyIdToIconName(item.currency_id)"
          />
        </div>
        <div
          class="bg-tg-secondary flex grow items-center px-14"
        >
          <div class="text-tg-text-white flex flex-col gap-6" :class="item.state === 2 ? 'opacity-[0.5]' : ''">
            <span class="font-semibold">{{ item.bank_name || item.contract_name }}</span>
            <span class="font-bold">{{ item.bank_account || item.address }}</span>
          </div>
        </div>
        <div
          class="absolute right-14 top-[50%] translate-y-[-50%]"
          @click="deleteCard(item)"
        >
          <BaseButton :disabled="item.state === 2" size="none" type="text" style="--tg-base-button-disabled-opacity:1;">
            <BaseIcon class="text-[18px]" name="uni-bank-delete" />
          </BaseButton>
        </div>
      </div>
    </div>
    <div v-show="bankcardList.length < 3" class="flex flex-col">
      <BaseButton size="lg" bg-style="secondary" @click="bind">
        {{ `${t('label_bind')}${isVirtualCurrency ? t('withdraw_address') : t('withdraw_account')}` }}
      </BaseButton>
    </div>

    <!-- 当千币种绑定>0 -->
    <div v-show="bankcardList.length > 0" class="mt-14 font-medium leading-[1.5]">
      {{ t('bind_more_bank_tip') }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
