import AppRegisterTermsConditions from '~/components/AppRegisterTermsConditions.vue'

export function useDialogAuthTerms() {
  const {
    openDialog: openTermsDialog,
    closeDialog: closeTermsDialog,
  } = useDialog({
    title: '注册 OAuth',
    icon: '',
    default: () => h(AppRegisterTermsConditions, { isAuth: true }),
  })

  return {
    openTermsDialog,
    closeTermsDialog,
  }
}
