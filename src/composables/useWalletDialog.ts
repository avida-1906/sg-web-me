import AppWalletDialog from '~/components/AppWalletDialog.vue'

export function useWalletDialog() {
  const { t } = useI18n()

  const { openDialog: openWalletDialog, closeDialog: closeWalletDialog } = useDialog({
    title: t('wallet'),
    icon: 'navbar-wallet',
    default: () => h(AppWalletDialog),
  })

  return {
    openWalletDialog,
    closeWalletDialog,
  }
}
