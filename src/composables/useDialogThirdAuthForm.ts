import AppAuthThirdFormDialog from '~/components/AppAuthThirdFormDialog.vue'

export function useDialogThirdAuthForm() {
  const {
    openDialog: openThirdAuthFormDialog,
    closeDialog: closeThirdAuthFormDialog,
  } = useDialog({
    title: '注册 OAuth',
    default: ({ data, ty }) => h(AppAuthThirdFormDialog, { data, ty }),
  })

  return {
    openThirdAuthFormDialog,
    closeThirdAuthFormDialog,
  }
}
