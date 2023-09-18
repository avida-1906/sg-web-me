<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
const { run, data } = useRequest(() => ApiMemberLogin({
  username: '章三',
  password: '123456',
}), {
  manual: true,
  onSuccess: (res: any) => {
    console.log(res)
  },
})

function getData() {
  run()
}

console.log(application.timestampToTime(1628774400000))
console.log(application.timestampToTime(1628774400000, EnumLanguage['zh-CN']))
console.log(application.timestampToTime(1628774400000, EnumLanguage['pt-BR']))
console.log(application.timestampToTime(1628774400000, EnumLanguage['vi-VN']))

console.log(application.numberToCurrency(1232330.19999, EnumCurrency.CAD))
</script>

<template>
  <div class="home-index">
    <AppBanner />
    <AppBetData />
    <AppSlider />
    <div>
      {{ t('hello') }}
    </div>
    <div>
      {{ data }}
    </div>
    <button @click="getData">
      请求
    </button>
  </div>
</template>

<style lang="scss" scoped>
.home-index{
  padding: 24px 0 32px;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
