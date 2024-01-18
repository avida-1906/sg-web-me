import AppAddBankcards from '~/components/AppAddBankcards.vue'

export function useAddBankcardsDialog(params: {
  title: string
  icon: string
  openName: string
  isFirst: boolean
  currencyId: string
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
      currencyId: params.currencyId,
      callback: params.callback,
    }),
  })

  return {
    openAddBankcardsDialog,
    closeAddBankcardsDialog,
  }
}
