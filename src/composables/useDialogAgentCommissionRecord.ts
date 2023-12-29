import
AppAgentCommissionRecordDialog
  from '~/components/AppAgentCommissionRecordDialog.vue'

export function useDialogAgentCommissionRecord() {
  const { t } = useI18n()
  const title = computed(() => t('receive_record_label'))
  const {
    openDialog: openAgentCommissionRecordDialog,
    closeDialog: closeAgentCommissionRecordDialog,
  } = useDialog({
    title: title.value,
    icon: 'chess-affiliate',
    default: () => h(AppAgentCommissionRecordDialog),
  })

  return {
    openAgentCommissionRecordDialog,
    closeAgentCommissionRecordDialog,
  }
}
