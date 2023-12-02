<script lang="ts" setup>
import type { ISportDataGroupedByLeague } from '~/types'
import { EnumSportMarketType } from '~/utils/enums'

const { t } = useI18n()
const { VITE_SPORT_DEFAULT_MARKET_TYPE } = getEnv()
const { bool: isStandard } = useBoolean(true)
const sportsStore = useSportsStore()
const { sportsFavoriteData, allSportsCount, currentFavNav } = storeToRefs(sportsStore)
/** 定时更新数据 */
const { startTimer, stopTimer }
= useSportsDataUpdate(sportsStore.refreshSportsFavList)

const baseType = ref(VITE_SPORT_DEFAULT_MARKET_TYPE)
/** 收藏数据根据球种组合 */
const sportsFavoriteList = computed(() => {
  if (sportsFavoriteData.value && sportsFavoriteData.value.d)
    return sportsDataGroupBySport(sportsFavoriteData.value.d)

  return []
})
const navs = computed(() => {
  return sportsFavoriteList.value.map((a) => {
    return {
      si: a.si,
      sn: allSportsCount.value?.list.find(b => b.si === a.si)?.sn ?? '',
      count: a.list.length,
      icon: allSportsCount.value?.list.find(b => b.si === a.si)?.spic ?? '',
      useCloudImg: true,
    }
  })
})
const list = computed(() => {
  let arr: ISportDataGroupedByLeague = []
  if (sportsFavoriteData.value && sportsFavoriteData.value.d) {
    // eslint-disable-next-line max-len
    const list = sportsFavoriteList.value.find(a => a.si === currentFavNav.value)?.list ?? []
    if (baseType.value === EnumSportMarketType.HANDICAP) {
      arr = sportsDataGroupByLeague(
        list.filter((event) => {
          return event.ml.findIndex(market => market.bt === 1) > -1
        }),
      )
    }
    else if (baseType.value === EnumSportMarketType.TOTAL) {
      arr = sportsDataGroupByLeague(
        list.filter((event) => {
          return event.ml.findIndex(market => market.bt === 2) > -1
        }),
      )
    }
    else if (baseType.value === EnumSportMarketType.WINNER) {
      arr = sportsDataGroupByLeague(
        list.filter((event) => {
          return event.ml.findIndex(market => market.bt === 3 || market.bt === 4) > -1
        }),
      )
    }
  }
  return arr
})

function onBaseTypeChange(v: EnumSportMarketType) {
  baseType.value = v
}

onMounted(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <div class="tg-sports-favourites">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-favorites" />
        <h6>{{ t('sports_title_favourites') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <template v-if="navs.length > 0">
      <AppSportsTab v-show="navs.length > 0" v-model="currentFavNav" :list="navs" />
      <div class="market-wrapper">
        <AppSportsMarket
          v-for="item in list" :key="item.ci"
          :is-standard="true"
          :league-name="item.cn"
          :event-count="item.list.length"
          :event-list="item.list"
          :base-type="baseType"
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
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
