import AppDialogNotice from '~/components/AppDialogNotice.vue'

export function useDialogNotice() {
  const { t } = useI18n()
  const title = computed(() => t('notice'))
  const { openDialog: openNoticeDialog, closeDialog: closeNoticeDialog } = useDialog({
    title: title.value,
    icon: 'navbar-notice',
    default: data => h(AppDialogNotice, { data }),
  })

  return {
    openNoticeDialog,
    closeNoticeDialog,
  }
}
