import AppPayPwdDialog from '~/components/AppPayPwdDialog.vue'

export function usePayPwdDialog() {
  const { t } = useI18n()
  const {
    openDialog: openPayPwdDialog,
    closeDialog: closePayPwdDialog,
  } = useDialog({
    title: t('title_input_paypwd'),
    icon: 'uni-lock',
    default: data => h(AppPayPwdDialog, data),
  })

  return {
    openPayPwdDialog,
    closePayPwdDialog,
  }
}
