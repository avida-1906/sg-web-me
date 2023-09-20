import AppSafeDialog from '~/components/AppSafeDialog.vue'

export function useSafeDialog() {
  const { t } = useI18n()

  const { openDialog: openSafeDialog, closeDialog: closeSafeDialog } = useDialog({
    title: t('保险库'),
    icon: 'navbar-cart',
    default: () => h(AppSafeDialog),
  })

  return {
    openSafeDialog,
    closeSafeDialog,
  }
}
