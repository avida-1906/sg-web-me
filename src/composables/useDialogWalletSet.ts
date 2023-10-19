import AppWalletSetDialog from '~/components/AppWalletSetDialog.vue'

export function useWalletSetDialog() {
  // const { t } = useI18n()
  const {
    openDialog: openWalletSetDialog,
    closeDialog: closeWalletSetDialog,
  } = useDialog({
    title: '钱包设置',
    icon: 'wallet-set',
    default: () => h(AppWalletSetDialog),
  })

  return {
    openWalletSetDialog,
    closeWalletSetDialog,
  }
}
