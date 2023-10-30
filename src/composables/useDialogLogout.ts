import AppLogoutDialog from '~/components/AppLogoutDialog.vue'

export function useLogoutDialog() {
  const { openDialog: openLogoutDialog, closeDialog: closeLogoutDialog } = useDialog({
    title: '登出',
    icon: 'uni-logout',
    default: () => h(AppLogoutDialog),
  })

  return {
    openLogoutDialog,
    closeLogoutDialog,
  }
}
