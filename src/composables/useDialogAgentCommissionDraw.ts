import AppAgentCommissionDrawDialog from '~/components/AppAgentCommissionDrawDialog.vue'

export function useDialogAgentCommissionDraw() {
  const { t } = useI18n()
  const title = computed(() => t('commission_transfer_title'))
  const {
    openDialog: openAgentCommissionDrawDialog,
    closeDialog: closeAgentCommissionDrawDialog,
  } = useDialog({
    title: title.value,
    icon: 'chat-tip',
    default: () => h(AppAgentCommissionDrawDialog),
  })

  return {
    openAgentCommissionDrawDialog,
    closeAgentCommissionDrawDialog,
  }
}
