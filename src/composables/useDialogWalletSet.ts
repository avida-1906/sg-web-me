import AppWalletSetDialog from '~/components/AppWalletSetDialog.vue'

export function useWalletSetDialog() {
  const { t } = useI18n()
  const title = computed(() => t('title_wallet_set'))
  const {
    openDialog: openWalletSetDialog,
    closeDialog: closeWalletSetDialog,
  } = useDialog({
    title: title.value,
    icon: 'wallet-set',
    default: data => h(AppWalletSetDialog, data),
  })

  return {
    openWalletSetDialog,
    closeWalletSetDialog,
  }
}
