import AppAgentGradeDialog from '~/components/AppAgentGradeDialog.vue'

export function useDialogAgentGrade() {
  const { t } = useI18n()
  const {
    openDialog: openAgentGradeDialog,
    closeDialog: closeAgentGradeDialog,
  } = useDialog({
    title: t('agent_level_label'),
    icon: 'chess-affiliate',
    default: () => h(AppAgentGradeDialog),
  })

  return {
    openAgentGradeDialog,
    closeAgentGradeDialog,
  }
}
