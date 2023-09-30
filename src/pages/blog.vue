<script lang="ts" setup>
const menuData = [
  { title: '测试111', value: '123' },
  { title: '测试1332221', value: '222' },
  { title: '测试19999991', value: '333' },
]
const curmenu = ref(menuData[0].value)
</script>

<template>
  <div class="tg-blog">
    <BaseMenu v-model="curmenu" :data="menuData" />
  </div>
</template>

<style lang="scss" scoped>
.tg-blog {

}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
