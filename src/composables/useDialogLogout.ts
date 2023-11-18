import AppLogoutDialog from '~/components/AppLogoutDialog.vue'

export function useLogoutDialog() {
  const { t } = useI18n()

  const { openDialog: openLogoutDialog, closeDialog: closeLogoutDialog } = useDialog({
    title: t('logout'),
    icon: 'uni-logout',
    default: () => h(AppLogoutDialog),
  })

  return {
    openLogoutDialog,
    closeLogoutDialog,
  }
}
