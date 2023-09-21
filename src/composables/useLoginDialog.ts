import AppLoginDialog from '~/components/AppLoginDialog.vue'

export function useLoginDialog() {
  const { openDialog: openLoginDialog, closeDialog: closeLoginDialog } = useDialog({
    title: '',
    icon: '',
    default: () => h(AppLoginDialog),
  })

  return {
    openLoginDialog,
    closeLoginDialog,
  }
}
