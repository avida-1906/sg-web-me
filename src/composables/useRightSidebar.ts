export enum EnumRightSidebarContent {
  CHATROOM = 'chatroom',
  BETTING = 'betting',
  NOTIFICATION = 'notification',
}

export const useRightSidebar = createGlobalState(() => {
  // 右侧是否展开
  const { bool: rightIsExpand, setTrue: setRightIsExpandTrue, setFalse: setRightIsExpandFalse } = useBoolean(false)
  const { bool: rightContainerIs0, setTrue: setRightContainerIs0True, setFalse: setRightContainerIs0False } = useBoolean(true)

  // 显示内容，聊天室，投注单，通知
  const currentRightSidebarContent = ref<EnumRightSidebarContent | null>(null)

  function openRightSidebar(rightSidebarContent?: EnumRightSidebarContent) {
    // 打开右侧侧边栏
    setRightIsExpandTrue()
    setTimeout(() => {
      setRightContainerIs0False()

      if (rightSidebarContent)
        currentRightSidebarContent.value = rightSidebarContent
    }, 30)
  }

  function closeRightSidebar() {
    setRightContainerIs0True()
    setTimeout(() => {
      // 关闭右侧侧边栏
      setRightIsExpandFalse()
    }, 200)
  }

  return {
    rightIsExpand,
    rightContainerIs0,
    currentRightSidebarContent,
    openRightSidebar,
    closeRightSidebar,
  }
})
