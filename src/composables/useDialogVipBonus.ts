import AppVipBonusDialog from '~/components/AppVipBonusDialog.vue'

export function useDialogVipBonus(cb?: () => void) {
  const { t } = useI18n()
  const title = computed(() => t('receive_bonus'))
  const {
    openDialog: openVipBonusDialog,
    closeDialog: closeVipBonusDialog,
  } = useDialog({
    title: title.value,
    icon: 'chat-tip',
    default: ({ vipBonus, vipBonusId }) =>
      h(AppVipBonusDialog, {
        vipBonus,
        vipBonusId,
      }),
    onDialogClose: () => {
      cb && cb()
    },
  })

  return {
    openVipBonusDialog,
    closeVipBonusDialog,
  }
}
