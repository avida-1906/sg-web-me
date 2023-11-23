<script setup lang='ts'>
const { t } = useI18n()
const params = ref({ si: 0, m: 0, hot: 1, page: 1, page_size: 50 })
const { data, runAsync, run } = useRequest(ApiSportEventList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

const list = computed(() => {
  if (data.value && data.value.list)
    return sportsDataGroupByLeague(data.value.list)

  return []
})

onMounted(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <div class="sports-hot-event">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>{{ t('sports_hot_event') }}</h6>
      </div>
    </div>

    <div class="market-wrapper">
      <AppSportsMarket
        v-for="item in list" :key="item.ci"
        :league-name="item.cn"
        :event-count="item.list.length"
        :event-list="item.list"
        base-type="winner"
        is-standard
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports-hot-event{

}
.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
  margin-top: var(--tg-spacing-12);
}
</style>
