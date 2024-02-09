import AppDialogSwiperNotice from '~/components/AppDialogSwiperNotice.vue'

export function useDialogSwiperNotice(width: number) {
  const {
    openDialog: openSwiperNoticeDialog,
    closeDialog: closeSwiperNoticeDialog,
  } = useDialog({
    maxWidth: width,
    // transparent: true,
    // title: t('notice'),
    // icon: 'navbar-notice',
    default: data => h(AppDialogSwiperNotice, { data }),
  })

  return {
    openSwiperNoticeDialog,
    closeSwiperNoticeDialog,
  }
}
