export function useUserVerify() {
  const {
    isSetAuth, isOpenVerify, isSetPayPwd, brandBaseDetail,
  } = useBrandBaseDetail()
  const { userInfo } = storeToRefs(useAppStore())

  const SecuritySafePwd = defineAsyncComponent(() => import('~/components/AppPayPassword.vue'))
  const SecuritySafeCheck = defineAsyncComponent(() => import('~/pages/[lang]/settings/security-safe-check.vue'))
  const AppEmailVerify = defineAsyncComponent(() => import('~/components/AppEmailVerify.vue'))

  const isEmailVerify = computed(() => userInfo.value?.email_check_state === 1)

  const getComponent = computed(() => {
    const check = brandBaseDetail.value?.check
    if (!isEmailVerify.value)
      return AppEmailVerify

    else if (check === 3 && !isSetPayPwd.value && !isSetAuth.value)
      return SecuritySafePwd

    else if (check === 1 && !isSetAuth.value)
      return SecuritySafeCheck

    else if (check === 2 && !isSetPayPwd.value)
      return SecuritySafePwd

    else
      return null
  })

  return {
    getComponent,
    isEmailVerify,
  }
}
