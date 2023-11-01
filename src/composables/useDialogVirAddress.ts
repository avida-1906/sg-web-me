import AppVirAddressDialog from '~/components/AppVirAddressDialog.vue'

export function useVirAddressDialog(headMsg:
{ title: string
  icon: string
}) {
  // const { t } = useI18n()

  const {
    openDialog: openVirAddressDialog,
    closeDialog: closeVirAddressDialog,
  } = useDialog({
    title: headMsg.title,
    icon: `coin-${headMsg.icon.toLocaleLowerCase()}`,
    default: obj => h(AppVirAddressDialog, obj),
  })

  return {
    openVirAddressDialog,
    closeVirAddressDialog,
  }
}
