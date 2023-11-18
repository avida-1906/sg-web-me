import AppDeleteConfirmDialog from '~/components/AppDeleteConfirmDialog.vue'

export function useDeleteConfirmDialog() {
  const { t } = useI18n()

  const { openDialog: openDeleteConfirm, closeDialog: closeDeleteConfirm } = useDialog({
    title: t('delete_confirm'),
    icon: 'uni-delete2',
    default: data => h(AppDeleteConfirmDialog, data),
  })

  return {
    openDeleteConfirm,
    closeDeleteConfirm,
  }
}
