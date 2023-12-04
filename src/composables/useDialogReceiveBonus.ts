import AppReceiveBonusDialog from '~/components/AppReceiveBonusDialog.vue'

export function useDialogReceiveBonus(cb?: () => void) {
  const { t } = useI18n()
  const {
    openDialog: openReceiveBonusDialog,
    closeDialog: closeReceiveBonusDialog,
  } = useDialog({
    title: t('receive_bonus'),
    icon: 'chat-tip',
    default: ({ feedBackItem, totalBonus, vipBonus, vipBonusId }) =>
      h(AppReceiveBonusDialog, {
        feedBackItem,
        totalBonus,
        vipBonus,
        vipBonusId,
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
