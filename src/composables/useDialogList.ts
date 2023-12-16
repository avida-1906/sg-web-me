export const useDialogList = createGlobalState(() => {
  const closeDialog = ref()

  const setDialogClose = (fn: () => void) => {
    closeDialog.value = fn
  }

  return {
    setDialogClose,
    closeDialog: closeDialog.value,
  }
})
