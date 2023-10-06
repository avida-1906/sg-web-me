import AppAddBankcards from '~/components/AppAddBankcards.vue'

export function useAddBankcardsDialog(params: { title: string; openName: string; isFirst: boolean }) {
  console.log(params)
  const { openDialog: openAddBankcardsDialog, closeDialog: closeAddBankcardsDialog } = useDialog({
    title: params.title,
    icon: 'fiat-bank',
    default: () => h(AppAddBankcards, { openName: params.openName, isFirst: params.isFirst }),
  })

  return {
    openAddBankcardsDialog,
    closeAddBankcardsDialog,
  }
}
