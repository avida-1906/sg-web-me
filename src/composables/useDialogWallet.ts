import AppWalletDialog from '~/components/AppWalletDialog.vue'

export function useWalletDialog(params?: { activeTab?: string }) {
  const { t } = useI18n()

  const { openDialog: openWalletDialog, closeDialog: closeWalletDialog } = useDialog({
    title: t('wallet'),
    icon: 'navbar-wallet',
    default: () => h(AppWalletDialog, { activeTab: params?.activeTab }),
  })

  return {
    openWalletDialog,
    closeWalletDialog,
  }
}
