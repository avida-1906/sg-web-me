<script setup lang="ts">
const { VITE_SOCKET_PREFIX } = getEnv()

const appStore = useAppStore()
const { isLogin, userInfo, mqttIsConnected } = storeToRefs(appStore)
const refreshBalanceBus = useEventBus(REFRESH_BALANCE_BUS)
const refreshMemberBus = useEventBus(REFRESH_MEMBER_BUS)

function handleUpdated() {
  const loading = document.querySelector('#full-loading')
  if (loading) {
    setTimeout(() => {
      loading.remove()
    }, 2000)
  }
}

watch([isLogin, userInfo], ([_isLogin, _userInfo]) => {
  if (_isLogin && _userInfo?.uid)
    socketClient.connect('登录连接')
})

watch([isLogin, userInfo, mqttIsConnected], ([_isLogin, _userInfo, _mqttIsConnected]) => {
  if (_isLogin && _userInfo?.uid && _mqttIsConnected) {
    socketClient.addSubscribe(`${VITE_SOCKET_PREFIX}/balance/${_userInfo?.uid}`)
    socketClient.addSubscribe(`${VITE_SOCKET_PREFIX}/member/${_userInfo?.uid}`)
  }
})
onMounted(() => {
  if (!isLogin.value)
    socketClient.connect('没登录连接')

  refreshBalanceBus.on(() => {
    appStore.getBalanceData()
  })
  refreshMemberBus.on(() => {
    appStore.updateUserInfo()
  })
})
</script>

<template>
  <RouterView @vue:updated="handleUpdated" />
</template>

<style scoped lang="scss">
</style>
