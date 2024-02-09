import AppDeleteConfirmDialog from '~/components/AppDeleteConfirmDialog.vue'

export function useDeleteConfirmDialog() {
  const { t } = useI18n()
  const title = computed(() => t('delete_confirm'))
  const { openDialog: openDeleteConfirm, closeDialog: closeDeleteConfirm } = useDialog({
    title: title.value,
    icon: 'uni-delete2',
    default: data => h(AppDeleteConfirmDialog, data),
  })

  return {
    openDeleteConfirm,
    closeDeleteConfirm,
  }
}
