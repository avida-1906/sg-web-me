import AppReceiveBonusDialog from '~/components/AppReceiveBonusDialog.vue'

export function useDialogReceiveBonus(cb?: () => void) {
  const { t } = useI18n()
  const {
    openDialog: openReceiveBonusDialog,
    closeDialog: closeReceiveBonusDialog,
  } = useDialog({
    title: t('receive_bonus'),
    icon: 'chat-tip',
    maxWidth: 342,
    default: ({ feedBackItem, totalBonus }) =>
      h(AppReceiveBonusDialog, {
        feedBackItem,
        totalBonus,
      }),
    onDialogClose: () => {
      cb && cb()
    },
  })

  return {
    openReceiveBonusDialog,
    closeReceiveBonusDialog,
  }
}
