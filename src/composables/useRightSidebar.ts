export enum EnumRightSidebarContent {
  CHATROOM = 'chatroom',
  BETTING = 'betting',
  NOTIFICATION = 'notification',
  CASINOBET = 'casinobet',
}

export const useRightSidebar = createGlobalState(() => {
  const { isLogin } = storeToRefs(useAppStore())
  const { isMobile } = useWindowStore()

  let defaultRightStatus = false
  const rightStatus = Local.get(
    STORAGE_RIGHT_SIDEBAR_CONTENT,
  )?.value as string | null ?? null
  // 显示内容，聊天室，投注单，通知
  const currentRightSidebarContent = ref<EnumRightSidebarContent | null>(null)

  if (
    Object.values(EnumRightSidebarContent).includes(rightStatus as EnumRightSidebarContent)
    && isLogin.value
  ) {
    defaultRightStatus = true
    currentRightSidebarContent.value = rightStatus as EnumRightSidebarContent
  }

  // 右侧是否展开
  const { bool: rightIsExpand, setTrue: setRightIsExpandTrue, setFalse: setRightIsExpandFalse } = useBoolean(defaultRightStatus)
  const { bool: rightContainerIs0, setTrue: setRightContainerIs0True, setFalse: setRightContainerIs0False } = useBoolean(!defaultRightStatus)

  if (isMobile)
    useLockScroll(rightIsExpand)

  function openRightSidebar(rightSidebarContent?: EnumRightSidebarContent) {
    // 打开右侧侧边栏
    setRightIsExpandTrue()
    Local.set(STORAGE_RIGHT_SIDEBAR_CONTENT, rightSidebarContent)
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
      Local.set(STORAGE_RIGHT_SIDEBAR_CONTENT, null)
    }, 50)
  }

  return {
    rightIsExpand,
    rightContainerIs0,
    currentRightSidebarContent,
    openRightSidebar,
    closeRightSidebar,
  }
})
