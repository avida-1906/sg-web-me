import AppAddPix from '~/components/AppAddPix.vue'

export function useDialogAddPix(params: {
  title: string
  icon: string
  openName: string
  isFirst: boolean
}) {
  const {
    openDialog: openAddPixDialog,
    closeDialog: closeAddPixDialog,
  } = useDialog({
    icon: params.icon,
    default: () => h(AppAddPix, {
      openName: params.openName,
      isFirst: params.isFirst,
      title: params.title,
    }),
  })

  return {
    openAddPixDialog,
    closeAddPixDialog,
  }
}
