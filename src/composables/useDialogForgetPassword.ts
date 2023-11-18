import AppForgetPasswordDialog from '~/components/AppForgetPasswordDialog.vue'

export function useForgetPasswordDialog() {
  const { t } = useI18n()

  const {
    openDialog: openForgetPasswordDialog,
    closeDialog: closeForgetPasswordDialog,
  } = useDialog({
    title: t('forgot_password'),
    icon: 'uni-set',
    default: () => h(AppForgetPasswordDialog),
  })

  return {
    openForgetPasswordDialog,
    closeForgetPasswordDialog,
  }
}
