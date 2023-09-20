<script setup lang="ts">
import AppDemoCard from '~/components/AppDemoCard.vue'

defineOptions({
  name: 'IndexPage',
})

const appStore = useAppStore()
const { isLogin } = storeToRefs(appStore)
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

const { openDialog, closeDialog } = useDialog({
  title: '表格',
  icon: 'balls-darts-on',
  default: () => h(AppDemoCard, { title: '标题' }, {
    default: () => h('table', { style: { color: 'orange' } }, 'abcdefg'),
  }),
})
function connectMqtt() {
  openDialog()
  appStore.toggle()
}
</script>

<template>
  <div class="home-index">
    <AppBanner />
    <AppGroupFilter />
    <div>
      {{ t('hello') }}
    </div>
    <div>
      {{ data }}
    </div>
    <button @click="getData">
      请求
    </button>
    <button style="color: #fff" @click="connectMqtt">
      链接mqtt {{ isLogin }} {{ $t('hello') }}
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
