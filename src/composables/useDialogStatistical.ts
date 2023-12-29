import AppStatisticsDialogVue from '~/components/AppStatisticsDialog.vue'

export function useStatisticsDialog() {
  const { t } = useI18n()
  const title = computed(() => t('statistical_data'))
  const {
    openDialog: openStatisticsDialog,
    closeDialog: closeStatisticsDialog,
  } = useDialog({
    title: title.value,
    icon: 'uni-trend',
    default: (userName?: string) => h(AppStatisticsDialogVue, { userName }),
  })

  return {
    openStatisticsDialog,
    closeStatisticsDialog,
  }
}
