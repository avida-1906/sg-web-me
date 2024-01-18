import AppAddVirAddressDialog from '~/components/AppAddVirAddressDialog.vue'

export function useVirAddressDialog(headMsg: { icon: string }) {
  const {
    openDialog: openVirAddressDialog,
    closeDialog: closeVirAddressDialog,
  } = useDialog({
    icon: `coin-${headMsg.icon.toLocaleLowerCase()}-title`,
    default: obj => h(AppAddVirAddressDialog, obj),
  })

  return {
    openVirAddressDialog,
    closeVirAddressDialog,
  }
}
