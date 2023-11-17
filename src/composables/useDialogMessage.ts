import AppDialogMessage from '~/components/AppDialogMessage.vue'

export function useDialogMessage() {
  // const { t } = useI18n()

  const { openDialog: openMessageDialog, closeDialog: closeMessageDialog } = useDialog({
    // title: t('site_message'),
    title: '跑马灯',
    icon: 'navbar-notice',
    default: data => h(AppDialogMessage, { data }),
  })

  return {
    openMessageDialog,
    closeMessageDialog,
  }
}
