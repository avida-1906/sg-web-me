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
      socketClient.close()
      closeRightSidebar()
      router.push('/')
      callback && callback()
    },
  })

  return {
    runMemberLogout,
    logoutLoading,
  }
}
