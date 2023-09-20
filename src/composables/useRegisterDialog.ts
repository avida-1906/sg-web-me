import AppRegisterDialog from '~/components/AppRegisterDialog.vue'

export function useRegisterDialog() {
  const { t } = useI18n()

  const { openDialog: openRegisterDialog, closeDialog: closeRegisterDialog } = useDialog({
    title: t('register'),
    icon: 'navbar-reg',
    default: () => h(AppRegisterDialog),
  })

  return {
    openRegisterDialog,
    closeRegisterDialog,
  }
}
