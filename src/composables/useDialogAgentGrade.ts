import AppAgentGradeDialog from '~/components/AppAgentGradeDialog.vue'

export function useDialogAgentGrade() {
  const { t } = useI18n()
  const title = computed(() => t('agent_level_label'))
  const {
    openDialog: openAgentGradeDialog,
    closeDialog: closeAgentGradeDialog,
  } = useDialog({
    title: title.value,
    icon: 'chess-affiliate',
    default: () => h(AppAgentGradeDialog),
  })

  return {
    openAgentGradeDialog,
    closeAgentGradeDialog,
  }
}
