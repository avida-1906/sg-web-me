import AppAuthThirdFormDialog from '~/components/AppAuthThirdFormDialog.vue'

export function useDialogThirdAuthForm() {
  const { t } = useI18n()
  const {
    openDialog: openThirdAuthFormDialog,
    closeDialog: closeThirdAuthFormDialog,
  } = useDialog({
    title: `${t('reg')} OAuth`,
    default: ({ data, ty }) => h(AppAuthThirdFormDialog, { data, ty }),
  })

  return {
    openThirdAuthFormDialog,
    closeThirdAuthFormDialog,
  }
}
