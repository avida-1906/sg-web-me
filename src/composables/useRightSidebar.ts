export const useRightSidebar = createGlobalState(() => {
  // 右侧是否展开
  const { bool: rightIsExpand, setTrue: setRightIsExpandTrue, setFalse: setRightIsExpandFalse } = useBoolean(false)
  const { bool: rightContainerIs0, setTrue: setRightContainerIs0True, setFalse: setRightContainerIs0False } = useBoolean(true)

  function setRightSidebarExpandStatus() {
    if (!rightIsExpand.value) {
      setRightIsExpandTrue()
      setTimeout(() => {
        setRightContainerIs0False()
      }, 30)
    }
    else {
      setRightContainerIs0True()
      setTimeout(() => {
        setRightIsExpandFalse()
      }, 200)
    }
  }

  return {
    rightIsExpand,
    rightContainerIs0,
    setRightSidebarExpandStatus,
  }
})
