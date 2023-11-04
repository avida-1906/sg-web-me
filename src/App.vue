<script setup lang="ts">
const { VITE_SOCKET_PREFIX } = getEnv()

const { isLogin, userInfo } = storeToRefs(useAppStore())

function handleUpdated() {
  const loading = document.querySelector('#full-loading')
  if (loading) {
    setTimeout(() => {
      loading.remove()
    }, 400)
  }
}

// 如果登录，并且用户信息存在，就订阅用户余额刷新
watch([isLogin, userInfo], ([isLogin, userInfo]) => {
  if (isLogin && userInfo?.uid)
    socketClient.addSubscribe(`${VITE_SOCKET_PREFIX}/balance/${userInfo.uid}`)
}, { immediate: true, deep: true })
</script>

<template>
  <RouterView @vue:updated="handleUpdated" />
</template>

<style scoped lang="scss">
</style>
