import AppWalletDialog from '~/components/AppWalletDialog.vue'

export function useWalletDialog(params?: { activeTab?: string }) {
  const { t } = useI18n()
  const title = computed(() => t('wallet'))
  const { openDialog: openWalletDialog, closeDialog: closeWalletDialog } = useDialog({
    title: title.value,
    icon: 'navbar-wallet',
    default: () => h(AppWalletDialog, { activeTab: params?.activeTab }),
  })

  return {
    openWalletDialog,
    closeWalletDialog,
  }
}
