import AppLogoutDialog from '~/components/AppLogoutDialog.vue'

export function useLogoutDialog() {
  const { t } = useI18n()
  const title = computed(() => t('logout'))
  const { openDialog: openLogoutDialog, closeDialog: closeLogoutDialog } = useDialog({
    title: title.value,
    icon: 'uni-logout',
    default: () => h(AppLogoutDialog),
  })

  return {
    openLogoutDialog,
    closeLogoutDialog,
  }
}
