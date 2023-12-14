import AppDialogDepositDetail from '~/components/AppDialogDepositDetail.vue'

export function useDialogDepositDetail(title: string) {
  const {
    openDialog: openDepositDetailDialog,
    closeDialog: closeDepositDetailDialog,
  } = useDialog({
    title,
    icon: 'tabbar-bet',
    default: data => h(AppDialogDepositDetail, { data }),
  })

  return {
    openDepositDetailDialog,
    closeDepositDetailDialog,
  }
}
