import AppAddBankcards from '~/components/AppAddBankcards.vue'
import type { CurrencyData } from '~/composables/useCurrencyData'

export function useAddBankcardsDialog(params: {
  title: string
  openName: string
  isFirst: boolean
  activeCurrency: CurrencyData
  currentType: '1' | '2'
}) {
  const {
    openDialog: openAddBankcardsDialog,
    closeDialog: closeAddBankcardsDialog,
  } = useDialog({
    title: params.title,
    icon: 'fiat-bank',
    default: () => h(AppAddBankcards, {
      openName: params.openName,
      isFirst: params.isFirst,
      activeCurrency: params.activeCurrency,
      currentType: params.currentType,
    }),
  })

  return {
    openAddBankcardsDialog,
    closeAddBankcardsDialog,
  }
}
