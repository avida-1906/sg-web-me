import AppRegisterTermsConditions from '~/components/AppRegisterTermsConditions.vue'

export function useDialogAuthTerms() {
  const { t } = useI18n()
  const {
    openDialog: openTermsDialog,
    closeDialog: closeTermsDialog,
  } = useDialog({
    title: `${t('reg')} OAuth`,
    icon: '',
    default: () => h(AppRegisterTermsConditions, { isAuth: true }),
  })

  return {
    openTermsDialog,
    closeTermsDialog,
  }
}
