import AppCommissionWalletDialog from '~/components/AppCommissionWalletDialog.vue'

export function useDialogCommissionWallet() {
  const { t } = useI18n()
  const {
    openDialog: openCommissionWalletDialog,
    closeDialog: closeCommissionWalletDialog,
  } = useDialog({
    title: t('commission_wallet'),
    icon: 'chess-affiliate',
    default: () => h(AppCommissionWalletDialog),
  })

  return {
    openCommissionWalletDialog,
    closeCommissionWalletDialog,
  }
}
