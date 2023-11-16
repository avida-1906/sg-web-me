<script lang="ts" setup>
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0
const region = route.params.region ? route.params.region.toString() : ''

const { data } = useRequest(() =>
  ApiSportOutrightList({ si: sport, page: 1, page_size: 100 }), {
  manual: false,
})
const list = computed(() => {
  return data.value ? data.value.list.filter(a => a.pgid === region) : []
})
</script>

<template>
  <div class="acc-box">
    <AppOutrightPreview
      v-for="league, i in list" :key="league.ci"
      :auto-show="i === 0" :data="league"
    />
  </div>
</template>

<style lang="scss" scoped>
.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
