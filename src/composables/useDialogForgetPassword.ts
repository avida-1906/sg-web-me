import AppForgetPasswordDialog from '~/components/AppForgetPasswordDialog.vue'

export function useForgetPasswordDialog() {
  const {
    openDialog: openForgetPasswordDialog,
    closeDialog: closeForgetPasswordDialog,
  } = useDialog({
    title: '忘记密码',
    icon: 'uni-set',
    default: () => h(AppForgetPasswordDialog),
  })

  return {
    openForgetPasswordDialog,
    closeForgetPasswordDialog,
  }
}
