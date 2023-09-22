import AppLoginDialog from '~/components/AppLoginDialog.vue'

export function useLoginDialog() {
  const { openDialog: openLoginDialog, closeDialog: closeLoginDialog } = useDialog({
    title: '',
    icon: '',
    default: () => h(AppLoginDialog),
  })

  const checkLogin = () => {
    const token = Local.get(STORAGE_TOKEN_KEY)?.value
    if (!token) {
      // 显示登录弹窗

      return false
    }
    return true
  }

  return {
    openLoginDialog,
    closeLoginDialog,
    checkLogin,
  }
}
