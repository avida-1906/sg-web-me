import AppDialogMessage from '~/components/AppDialogMessage.vue'

export function useDialogMessage(title: string) {
  const { openDialog: openMessageDialog, closeDialog: closeMessageDialog } = useDialog({
    title,
    icon: 'navbar-notice',
    default: data => h(AppDialogMessage, { data }),
  })

  return {
    openMessageDialog,
    closeMessageDialog,
  }
}
