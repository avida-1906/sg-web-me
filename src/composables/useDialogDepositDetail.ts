import AppDialogDepositDetail from '~/components/AppDialogDepositDetail.vue'

export function useDialogDepositDetail() {
  const { t } = useI18n()

  const {
    openDialog: openDepositDetailDialog,
    closeDialog: closeDepositDetailDialog,
  } = useDialog({
    title: t('deposit_detail'),
    icon: 'navbar-notice',
    default: () => h(AppDialogDepositDetail),
  })

  return {
    openDepositDetailDialog,
    closeDepositDetailDialog,
  }
}
