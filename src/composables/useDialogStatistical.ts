import AppStatisticsDialogVue from '~/components/AppStatisticsDialog.vue'

export function useStatisticsDialog() {
  const { t } = useI18n()
  const {
    openDialog: openStatisticsDialog,
    closeDialog: closeStatisticsDialog,
  } = useDialog({
    title: t('statistical_data'),
    icon: 'uni-trend',
    default: (userName?: string) => h(AppStatisticsDialogVue, { userName }),
  })

  return {
    openStatisticsDialog,
    closeStatisticsDialog,
  }
}
