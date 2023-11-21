import AppDialogSwiperNotice from '~/components/AppDialogSwiperNotice.vue'

export function useDialogSwiperNotice() {
  const {
    openDialog: openSwiperNoticeDialog,
    closeDialog: closeSwiperNoticeDialog,
  } = useDialog({
    maxWidth: 420,
    // title: t('notice'),
    // icon: 'navbar-notice',
    default: data => h(AppDialogSwiperNotice, { data }),
  })

  return {
    openSwiperNoticeDialog,
    closeSwiperNoticeDialog,
  }
}
