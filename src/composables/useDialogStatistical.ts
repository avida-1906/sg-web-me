import AppStatisticsDialogVue from '~/components/AppStatisticsDialog.vue'

export function useStatisticsDialog() {
  const {
    openDialog: openStatisticsDialog,
    closeDialog: closeStatisticsDialog,
  } = useDialog({
    title: 'Statistics',
    icon: 'uni-trend',
    default: () => h(AppStatisticsDialogVue),
  })

  return {
    openStatisticsDialog,
    closeStatisticsDialog,
  }
}
