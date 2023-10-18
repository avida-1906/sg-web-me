/** 退出登录 */
export function useLoginout(callback?: () => void) {
  const appStore = useAppStore()
  const router = useRouter()
  const {
    run: runMemberLoginout,
    loading: loginoutLoading,
  } = useRequest(ApiMemberLoginout, {
    onSuccess() {
      appStore.removeToken()
      socketClient.close()
      router.push('/')
      callback && callback()
    },
  })

  return {
    runMemberLoginout,
    loginoutLoading,
  }
}
