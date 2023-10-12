import AppAddBankcards from '~/components/AppAddBankcards.vue'
import type { IUserCurrencyList } from '~/stores/app'

export function useAddBankcardsDialog(params: {
  title: string
  openName: string
  isFirst: boolean
  activeCurrency: IUserCurrencyList
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
