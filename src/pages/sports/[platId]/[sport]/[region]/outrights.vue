<script lang="ts" setup>
const route = useRoute()
const sport = route.params.sport

const { data } = useRequest(() =>
  ApiSportOutrightList({ si: +sport, page: 1, page_size: 100 }), {
  manual: false,
})
const list = computed(() => {
  return data.value ? sportsOutrightsGroupByRegion(data.value.list) : []
})
</script>

<template>
  <div class="tg-sports-outrights">
    按联赛分类的冠军
  </div>
</template>

<style lang="scss" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
