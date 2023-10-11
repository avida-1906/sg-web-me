import AppEmailCodeDialog from '~/components/AppEmailCodeDialog.vue'

export function useEmailCodeDialog() {
  // const { t } = useI18n()

  const {
    openDialog:
    openEmailCodeDialog,
    closeDialog: closeEmailCodeDialog,
  } = useDialog({
    title: '邮箱验证',
    icon: 'settings-email',
    default: data => h(AppEmailCodeDialog, data),
  })

  return {
    openEmailCodeDialog,
    closeEmailCodeDialog,
  }
}
