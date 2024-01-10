<script setup lang='ts'>
const props = defineProps<{ si: number }>()

const route = useRoute()
const fixture = route.params.fixture ? route.params.fixture.toString() : ''
const { t } = useI18n()
const { allSportsNameList } = storeToRefs(useSportsStore())
const { data } = useRequest(
  () => ApiSportsEventHot({ si: props.si, page: 1, page_size: 10 }),
  { manual: false },
)
const list = computed(() => {
  if (data.value && data.value.d) {
    return data.value.d.filter(b => b.ei !== fixture).map((a) => {
      return {
        ...a,
        path: `/sports/${SPORTS_PLAT_ID}/${props.si}/${a.pgid}/${a.ci}/${a.ei}`,
        date: timeToCustomizeFormat(a.ed, 'YYYY - MM - DD'),
        time: timeToCustomizeFormat(a.ed, 'HH : mm'),
      }
    })
  }
  return []
})
const name = computed(() => {
  return allSportsNameList.value.find(a => a.si === props.si)?.sn ?? '-'
})
</script>

<template>
  <div class="hot-events">
    <div class="title">
      <BaseIcon name="uni-popular" />
      <span>{{ t('casino_sort_popular') }}{{ name }}</span>
    </div>
    <AppSportsHotEventItem v-for="item in list" :key="item.ei" :data="item" />
  </div>
</template>

<style lang='scss' scoped>
.hot-events{
  width: 100%;
  padding: var(--tg-spacing-13) var(--tg-spacing-16) ;
  font-size: var( --tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-lightgrey);
  background-color: var( --tg-secondary-dark);
  border-radius: var(--tg-radius-default);
  display:flex ;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  .title{
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-4);
  }
}
</style>
