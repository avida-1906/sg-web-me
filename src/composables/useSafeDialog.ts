import AppSafeDialog from '~/components/AppSafeDialog.vue'

export function useSafeDialog() {
  const { t } = useI18n()

  const { openDialog: openSafeDialog, closeDialog: closeSafeDialog } = useDialog({
    title: t('safe'),
    icon: 'navbar-cart',
    default: () => h(AppSafeDialog),
  })

  return {
    openSafeDialog,
    closeSafeDialog,
  }
}
