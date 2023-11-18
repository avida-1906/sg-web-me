import AppWalletSetDialog from '~/components/AppWalletSetDialog.vue'

export function useWalletSetDialog() {
  const { t } = useI18n()
  const {
    openDialog: openWalletSetDialog,
    closeDialog: closeWalletSetDialog,
  } = useDialog({
    title: t('title_wallet_set'),
    icon: 'wallet-set',
    default: data => h(AppWalletSetDialog, data),
  })

  return {
    openWalletSetDialog,
    closeWalletSetDialog,
  }
}
