import AppVipDialog from '~/components/AppVipDialog.vue'

export function useVipDialog() {
  const { openDialog: openVipDialog, closeDialog: closeVipDialog } = useDialog({
    title: 'VIP',
    icon: 'uni-checklist',
    default: () => h(AppVipDialog),
  })

  return {
    openVipDialog,
    closeVipDialog,
  }
}
