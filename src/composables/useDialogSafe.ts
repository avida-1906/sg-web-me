import AppSafeDialog from '~/components/AppSafeDialog.vue'

export function useSafeDialog() {
  const { t } = useI18n()
  const title = computed(() => t('safe'))
  const { openDialog: openSafeDialog, closeDialog: closeSafeDialog } = useDialog({
    title: title.value,
    icon: 'navbar-cart',
    default: () => h(AppSafeDialog),
  })

  return {
    openSafeDialog,
    closeSafeDialog,
  }
}
