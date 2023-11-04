/** 退出登录 */
export function useLogout(callback?: () => void) {
  const { closeRightSidebar } = useRightSidebar()
  const appStore = useAppStore()
  const router = useRouter()
  const {
    run: runMemberLogout,
    loading: logoutLoading,
  } = useRequest(ApiMemberLogout, {
    onSuccess() {
      appStore.removeToken()
      appStore.removeUserInfo()
      appStore.setMqttConnectedFalse()
      closeRightSidebar()
      socketClient.connect('退出 重新连接')
      router.push('/')
      callback && callback()
    },
  })

  return {
    runMemberLogout,
    logoutLoading,
  }
}
