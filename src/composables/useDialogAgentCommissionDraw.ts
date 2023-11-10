import AppAgentCommissionDraw from '~/components/AppAgentCommissionDraw.vue'

export function useDialogAgentCommissionDraw() {
  const { t } = useI18n()
  const {
    openDialog: openAgentCommissionDrawDialog,
    closeDialog: closeAgentCommissionDrawDialog,
  } = useDialog({
    title: t('receive_agent_commission_label'),
    icon: 'chat-tip',
    default: () => h(AppAgentCommissionDraw),
  })

  return {
    openAgentCommissionDrawDialog,
    closeAgentCommissionDrawDialog,
  }
}
