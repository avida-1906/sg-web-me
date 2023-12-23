import AppCommissionWalletDialog from '~/components/AppCommissionWalletDialog.vue'

export function useDialogCommissionWallet() {
  const { t } = useI18n()
  const {
    openDialog: openCommissionWalletDialog,
    closeDialog: closeCommissionWalletDialog,
  } = useDialog({
    title: '佣金钱包',
    icon: 'chess-affiliate',
    default: () => h(AppCommissionWalletDialog),
  })

  return {
    openCommissionWalletDialog,
    closeCommissionWalletDialog,
  }
}
