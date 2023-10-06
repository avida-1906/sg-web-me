<script lang="ts" setup>
const breadcrumb = [
  { path: '', title: '足球' },
  { path: '', title: '英格兰' },
  { path: '', title: '英超' },
  { path: '', title: 'Premier League 23/24' },
]
</script>

<template>
  <div class="tg-sports-country-event-betdetail">
    当前国家某种赛事的其中具体的一场对局赛事盘口详情
    <AppNavBreadCrumb :breadcrumb="breadcrumb" />
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-country-event-betdetail {

}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
