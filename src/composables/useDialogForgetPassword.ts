import AppForgetPasswordDialog from '~/components/AppForgetPasswordDialog.vue'

export function useForgetPasswordDialog() {
  const { t } = useI18n()
  const title = computed(() => t('pop_up_forgot_password'))
  const {
    openDialog: openForgetPasswordDialog,
    closeDialog: closeForgetPasswordDialog,
  } = useDialog({
    title: title.value,
    icon: 'uni-set',
    default: () => h(AppForgetPasswordDialog),
  })

  return {
    openForgetPasswordDialog,
    closeForgetPasswordDialog,
  }
}
