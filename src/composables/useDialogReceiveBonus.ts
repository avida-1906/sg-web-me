import AppReceiveBonusDialog from '~/components/AppReceiveBonusDialog.vue'

export function useDialogReceiveBonus() {
  const { t } = useI18n()
  const {
    openDialog: openReceiveBonusDialog,
    closeDialog: closeReceiveBonusDialog,
  } = useDialog({
    title: t('receive_bonus'),
    icon: 'chat-tip',
    maxWidth: 342,
    default: () => h(AppReceiveBonusDialog),
  })

  return {
    openReceiveBonusDialog,
    closeReceiveBonusDialog,
  }
}
