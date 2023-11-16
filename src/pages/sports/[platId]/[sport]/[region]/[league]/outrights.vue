<script lang="ts" setup>
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const league = route.params.league ? route.params.league.toString() : ''

const { data } = useRequest(() =>
  ApiSportOutrightList({ si: sport, page: 1, page_size: 100 }), {
  manual: false,
})
const list = computed(() => {
  return data.value ? data.value.list.filter(a => a.ci === league) : []
})
</script>

<template>
  <AppOutrightPreview
    v-for="item, i in list" :key="item.ci"
    :auto-show="i === 0" :data="item"
  />
</template>

<style lang="scss" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
