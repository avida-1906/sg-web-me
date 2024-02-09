import AppAddBankcards from '~/components/AppAddBankcards.vue'
import type { CurrencyData } from '~/composables/useCurrencyData'

export function useAddBankcardsDialog(params: {
  title: string
  icon: string
  openName: string
  isFirst: boolean
  activeCurrency: CurrencyData
  currentType: '1' | '2'
  callback?: (params?: any) => void
}) {
  const {
    openDialog: openAddBankcardsDialog,
    closeDialog: closeAddBankcardsDialog,
  } = useDialog({
    title: params.title,
    icon: params.icon,
    default: () => h(AppAddBankcards, {
      openName: params.openName,
      isFirst: params.isFirst,
      activeCurrency: params.activeCurrency,
      currentType: params.currentType,
      callback: params.callback,
    }),
  })

  return {
    openAddBankcardsDialog,
    closeAddBankcardsDialog,
  }
}
