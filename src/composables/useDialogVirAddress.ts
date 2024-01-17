import AppVirAddressDialog from '~/components/AppVirAddressDialog.vue'

export function useVirAddressDialog(headMsg: { icon: string }) {
  const {
    openDialog: openVirAddressDialog,
    closeDialog: closeVirAddressDialog,
  } = useDialog({
    icon: `coin-${headMsg.icon.toLocaleLowerCase()}-title`,
    default: obj => h(AppVirAddressDialog, obj),
  })

  return {
    openVirAddressDialog,
    closeVirAddressDialog,
  }
}
