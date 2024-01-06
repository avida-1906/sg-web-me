import AppCommissionHolder from '~/components/AppCommissionHolder.vue'

export function useDialogCommissionWallet() {
  const { t } = useI18n()
  const title = computed(() => t('commission_wallet'))
  const {
    openDialog: openCommissionWalletDialog,
    closeDialog: closeCommissionWalletDialog,
  } = useDialog({
    title: title.value,
    icon: 'chat-tip',
    default: () => h(AppCommissionHolder),
  })

  return {
    openCommissionWalletDialog,
    closeCommissionWalletDialog,
  }
}
