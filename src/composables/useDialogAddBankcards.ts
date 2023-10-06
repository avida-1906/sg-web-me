import AppAddBankcards from '~/components/AppAddBankcards.vue'

export function useAddBankcardsDialog(params: { title: string; openName: string }) {
  const { openDialog: openAddBankcardsDialog, closeDialog: closeAddBankcardsDialog } = useDialog({
    title: params.title,
    icon: 'fiat-bank',
    default: () => h(AppAddBankcards, { openName: params.openName }),
  })

  return {
    openAddBankcardsDialog,
    closeAddBankcardsDialog,
  }
}
