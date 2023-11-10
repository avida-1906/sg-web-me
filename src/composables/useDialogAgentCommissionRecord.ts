import
AppAgentCommissionRecordDialog
  from '~/components/AppAgentCommissionRecordDialog.vue'

export function useDialogAgentCommissionRecord() {
  const { t } = useI18n()
  const {
    openDialog: openAgentCommissionRecordDialog,
    closeDialog: closeAgentCommissionRecordDialog,
  } = useDialog({
    title: t('receive_record_label'),
    icon: 'chess-affiliate',
    default: () => h(AppAgentCommissionRecordDialog),
  })

  return {
    openAgentCommissionRecordDialog,
    closeAgentCommissionRecordDialog,
  }
}
