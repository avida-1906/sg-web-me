import
AppVipBonusRecordDialog
  from '~/components/AppVipBonusRecordDialog.vue'

export function useDialogVipBonusRecord() {
  const { t } = useI18n()
  const title = computed(() => t('receive_record_label'))
  const {
    openDialog: openVipBonusRecordDialog,
    closeDialog: closeVipBonusRecordDialog,
  } = useDialog({
    title: title.value,
    icon: 'chess-affiliate',
    default: () => h(AppVipBonusRecordDialog),
  })

  return {
    openVipBonusRecordDialog,
    closeVipBonusRecordDialog,
  }
}
