import AppRegisterDialog from '~/components/AppRegisterDialog.vue'

export function useRegisterDialog() {
  const { openDialog: openRegisterDialog, closeDialog: closeRegisterDialog } = useDialog({
    title: '',
    icon: '',
    default: () => h(AppRegisterDialog),
  })

  return {
    openRegisterDialog,
    closeRegisterDialog,
  }
}
