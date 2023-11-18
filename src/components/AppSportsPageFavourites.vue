<script lang="ts" setup>
const { t } = useI18n()
const { sportsFavoriteData } = storeToRefs(useSportsStore())

const currentSi = ref(-1)
/** 收藏数据根据球种组合 */
const sportsFavoriteList = computed(() => {
  if (sportsFavoriteData.value && sportsFavoriteData.value.list)
    return sportsDataGroupBySport(sportsFavoriteData.value.list)

  return []
})
const navs = computed(() => {
  return sportsFavoriteList.value.map((a) => {
    return {
      si: a.si,
      sn: a.sn,
      count: a.list.length,
      icon: 'spt-soccer',
    }
  })
})
const list = computed(() => {
  if (sportsFavoriteData.value)
    return sportsDataGroupByLeague(sportsFavoriteData.value.list.filter(a => a.si === currentSi.value))

  return null
})

const stop = watch(sportsFavoriteData, (a) => {
  if (a && currentSi.value === -1)
    currentSi.value = a.list[0].si
})

onBeforeUnmount(() => {
  stop()
})
</script>

<template>
  <div class="tg-sports-favourites">
    <template v-if="navs.length > 0">
      <AppSportsTab v-show="navs.length > 0" v-model="currentSi" :list="navs" />
      <div v-if="list" class="market-wrapper">
        <AppSportsMarket
          v-for="item in list" :key="item.ci"
          :is-standard="true"
          :league-name="item.cn"
          :event-count="item.list.length"
          :event-list="item.list"
          base-type="winner"
        />
      </div>
    </template>
    <div v-else class="empty">
      <BaseEmpty icon="empty-2" :description="t('data_empty')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
.empty{
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
