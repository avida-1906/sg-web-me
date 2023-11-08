import AppDialogBetSlip from '~/components/AppDialogBetSlip.vue'

export function useDialogBetSlip() {
  const { t } = useI18n()

  const {
    openDialog: openBetSlipDialog,
    closeDialog: closeBetSlipDialog,
  } = useDialog({
    title: t('menu_title_settings_bets'),
    icon: 'navbar-notice',
    default: (p: { type: 'casino' | 'sports'; data: any }) => h(AppDialogBetSlip,
      {
        type: p.type,
        data: p.data,
      },
    ),
  })

  return {
    openBetSlipDialog,
    closeBetSlipDialog,
  }
}
