import AppStatisticsDialogVue from '~/components/AppStatisticsDialog.vue'

export function useStatisticsDialog() {
  const {
    openDialog: openStatisticsDialog,
    closeDialog: closeStatisticsDialog,
  } = useDialog({
    title: 'Statistics',
    icon: 'uni-trend',
    default: (userName?: string) => h(AppStatisticsDialogVue, { userName }),
  })

  return {
    openStatisticsDialog,
    closeStatisticsDialog,
  }
}
