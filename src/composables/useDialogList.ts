export const useDialogList = createGlobalState(() => {
  const { bool: closeAllDialog, setBool: setCloseAllDialog } = useBoolean(false)

  return {
    closeAllDialog,
    setCloseAllDialog,
  }
})
