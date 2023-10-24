import AppPayPwdDialog from '~/components/AppPayPwdDialog.vue'

export function usePayPwdDialog() {
  // const { t } = useI18n()
  const {
    openDialog: openPayPwdDialog,
    closeDialog: closePayPwdDialog,
  } = useDialog({
    title: '输入资金密码',
    icon: 'uni-lock',
    default: data => h(AppPayPwdDialog, data),
  })

  return {
    openPayPwdDialog,
    closePayPwdDialog,
  }
}
