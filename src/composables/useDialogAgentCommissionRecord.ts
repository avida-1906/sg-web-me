import
AppAgentCommissionRecordDialog
  from '~/components/AppAgentCommissionRecordDialog.vue'

export function useDialogAgentCommissionRecord() {
  const { t } = useI18n()
  const title = computed(() => t('commission_record'))
  const {
    openDialog: openAgentCommissionRecordDialog,
    closeDialog: closeAgentCommissionRecordDialog,
  } = useDialog({
    title: title.value,
    icon: 'tabbar-bet',
    default: () => h(AppAgentCommissionRecordDialog),
  })

  return {
    openAgentCommissionRecordDialog,
    closeAgentCommissionRecordDialog,
  }
}
