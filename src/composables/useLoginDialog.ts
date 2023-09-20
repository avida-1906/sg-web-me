import AppLoginDialog from '~/components/AppLoginDialog.vue'

export function useLoginDialog() {
  const { t } = useI18n()

  const { openDialog: openLoginDialog, closeDialog: closeLoginDialog } = useDialog({
    title: t('login'),
    icon: 'navbar-login',
    default: () => h(AppLoginDialog),
  })

  return {
    openLoginDialog,
    closeLoginDialog,
  }
}
