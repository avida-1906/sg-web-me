import
AppVipBonusRecordDialog
  from '~/components/AppVipBonusRecordDialog.vue'

export function useDialogVipBonusRecord() {
  const { t } = useI18n()
  const {
    openDialog: openVipBonusRecordDialog,
    closeDialog: closeVipBonusRecordDialog,
  } = useDialog({
    title: t('receive_record_label'),
    icon: 'chess-affiliate',
    default: () => h(AppVipBonusRecordDialog),
  })

  return {
    openVipBonusRecordDialog,
    closeVipBonusRecordDialog,
  }
}
