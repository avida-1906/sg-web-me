import AppRegisterTermsConditions from '~/components/AppRegisterTermsConditions.vue'

export function useDialogAuthTerms() {
  const { t } = useI18n()
  const title = computed(() => `${t('reg')} OAuth`)
  const {
    openDialog: openTermsDialog,
    closeDialog: closeTermsDialog,
  } = useDialog({
    title: title.value,
    icon: '',
    default: () => h(AppRegisterTermsConditions, { isAuth: true }),
  })

  return {
    openTermsDialog,
    closeTermsDialog,
  }
}
