import AppDialogNotice from '~/components/AppDialogNotice.vue'

export function useDialogNotice() {
  const { t } = useI18n()

  const { openDialog: openNoticeDialog, closeDialog: closeNoticeDialog } = useDialog({
    title: t('notice'),
    icon: 'navbar-notice',
    default: data => h(AppDialogNotice, { data }),
  })

  return {
    openNoticeDialog,
    closeNoticeDialog,
  }
}
