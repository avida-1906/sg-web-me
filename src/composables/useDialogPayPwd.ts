import AppPayPwdDialog from '~/components/AppPayPwdDialog.vue'

export function usePayPwdDialog() {
  const { t } = useI18n()
  const title = computed(() => t('title_input_paypwd'))
  const {
    openDialog: openPayPwdDialog,
    closeDialog: closePayPwdDialog,
  } = useDialog({
    title: title.value,
    icon: 'uni-lock',
    default: data => h(AppPayPwdDialog, data),
  })

  return {
    openPayPwdDialog,
    closePayPwdDialog,
  }
}
