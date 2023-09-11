<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
console.log(timestampToTime(1628774400000))
const { t } = useI18n()
const { run, data } = useRequest(() => ApiMemberLogin({
  username: '章三',
  password: '123456',
}), {
  manual: true,
  onSuccess: (res) => {
  },
})

function getData() {
  run()
}
</script>

<template>
  <div style="background-color: white; height: 1000px">
    <AppContent>
      <div>
        {{ t('hello') }}
      </div>
      <div>
        {{ data }}
      </div>
      <button @click="getData">
        请求
      </button>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
