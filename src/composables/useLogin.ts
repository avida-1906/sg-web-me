/**
 * 登录相关逻辑
 */
export function useLogin() {
  const checkLogin = (fn) => {
    const token = Local.get(STORAGE_TOKEN_KEY)?.value
    if (!token) {
      // 显示登录弹窗

      return false
    }
    return true
  }

  return {
    checkLogin,
  }
}
