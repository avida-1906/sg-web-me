import AppBindBankDialog from '~/components/AppBindBankDialog.vue'

export function useDialogBindBank() {
  const { t } = useI18n()
  const title = computed(() => t('wallet'))
  const {
    openDialog: openBindBankDialog,
    closeDialog: closeBindBankDialog,
  } = useDialog({
    title: title.value,
    icon: 'fiat-bank',
    default: () => h(AppBindBankDialog),
  })

  return {
    openBindBankDialog,
    closeBindBankDialog,
  }
}
