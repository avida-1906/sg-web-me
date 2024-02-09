import AppTermsConditionsDialog from '~/components/AppTermsConditionsDialog.vue'

export function useTermsConditionsDialog() {
  const {
    openDialog: openTermsConditionsDialog,
    closeDialog: closeTermsConditionsDialog,
  } = useDialog({
    title: '',
    icon: '',
    default: () => h(AppTermsConditionsDialog),
  })

  return {
    openTermsConditionsDialog,
    closeTermsConditionsDialog,
  }
}
