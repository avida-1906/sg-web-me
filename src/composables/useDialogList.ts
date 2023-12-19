export const useDialogList = createGlobalState(() => {
  const { bool: closeAllDialog, setBool: setCloseAllDialog } = useBoolean(false)
  const closeDialog = ref()

  const setDialogClose = (fn: () => void) => {
    closeDialog.value = fn
  }

  return {
    closeAllDialog,
    setCloseAllDialog,
    setDialogClose,
    closeDialog: closeDialog.value,
  }
})
