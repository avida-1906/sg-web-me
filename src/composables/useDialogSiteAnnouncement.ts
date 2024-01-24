import AppDialogSiteAnnouncement from '~/components/AppDialogSiteAnnouncement.vue'
import AppDialogNoMoreToday from '~/components/AppDialogNoMoreToday.vue'
import { i18n } from '~/modules/i18n'

export function useDialogSiteAnnouncement() {
  const { t } = i18n.global

  const {
    openDialog: openDialogSiteAnnouncement,
    closeDialog: closeDialogSiteAnnouncement,
  } = useDialog({
    title: t('site_announcement'),
    icon: 'uni-speaker',
    noMoreToday: true,
    default: data => h(AppDialogSiteAnnouncement, { data }),
    bottomSlot: () => h(AppDialogNoMoreToday),
  })

  return {
    openDialogSiteAnnouncement,
    closeDialogSiteAnnouncement,
  }
}
