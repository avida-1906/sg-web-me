import AppVipBonusDialog from '~/components/AppVipBonusDialog.vue'

export function useDialogVipBonus(callBack?: () => void) {
  const { t } = useI18n()
  const title = computed(() => t('receive_bonus'))
  const {
    openDialog: openVipBonusDialog,
    closeDialog: closeVipBonusDialog,
  } = useDialog({
    title: title.value,
    icon: 'uni-bonus',
    default: ({ bonusType, vipBonusId }) =>
      h(AppVipBonusDialog, {
        bonusType,
        vipBonusId,
        callBack,
      }),
  })

  return {
    openVipBonusDialog,
    closeVipBonusDialog,
  }
}
