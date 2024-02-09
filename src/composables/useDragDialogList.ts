export const useDragDialogList = createGlobalState(() => {
  const dragDialogList = ref<string[]>([])

  const dragDialogListAdd = (id: string) => {
    dragDialogList.value.push(id)
  }

  const dragDialogListRemove = (id: string) => {
    dragDialogList.value.splice(dragDialogList.value.findIndex(a => a === id), 1)
  }

  const checkDragDialog = (id: string) => {
    return dragDialogList.value.includes(id)
  }

  return {
    dragDialogList,
    dragDialogListAdd,
    dragDialogListRemove,
    checkDragDialog,
  }
})
