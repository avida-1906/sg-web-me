import AppEmailCodeDialog from '~/components/AppEmailCodeDialog.vue'

export function useEmailCodeDialog() {
  const { t } = useI18n()
  const title = computed(() => t('label_email_check'))
  const {
    openDialog:
    openEmailCodeDialog,
    closeDialog: closeEmailCodeDialog,
  } = useDialog({
    title: title.value,
    icon: 'settings-email',
    default: data => h(AppEmailCodeDialog, data),
  })

  return {
    openEmailCodeDialog,
    closeEmailCodeDialog,
  }
}
