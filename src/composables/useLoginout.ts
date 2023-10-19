/** 退出登录 */
export function useLogout(callback?: () => void) {
  const appStore = useAppStore()
  const router = useRouter()
  const {
    run: runMemberLogout,
    loading: logoutLoading,
  } = useRequest(ApiMemberLogout, {
    onSuccess() {
      appStore.removeToken()
      socketClient.close()
      router.push('/')
      callback && callback()
    },
  })

  return {
    runMemberLogout,
    logoutLoading,
  }
}
