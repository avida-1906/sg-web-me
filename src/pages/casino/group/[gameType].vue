<script setup lang="ts">
import {
  EnumCasinoSortType,
} from '~/utils/enums'

const props = defineProps<{ gameType: string }>()
const route = useRoute()
const { appContentWidth } = storeToRefs(useWindowStore())

const currentType = ref(props.gameType)
const isRec = computed(() => currentType.value === 'rec') // 推荐游戏
const isProvider = computed(() => currentType.value === 'provider') // 供应商
const isCat = computed(() => currentType.value === 'category') // 类别
// 类别游戏数据
const cid = computed(() => isCat.value ? route.query.cid?.toString() ?? '' : '')
const title = computed(() => route.query.name)
// 参数
const pid = computed(() =>
  isProvider.value ? route.query.pid?.toString() : undefined)

const sort = ref(EnumCasinoSortType.recommend)
const paramsGame = computed(() =>
  ({
    platform_id: pid.value,
    sort: sort.value,
  }))
const {
  list: gameList,
  total: gameTotal,
  runAsync: runGameList,
  loading: loadingGame,
  loadMore: loadMoreGame,
} = useList(ApiMemberGameList)
// 推荐游戏
const paramsRec = computed(() => ({ sort: sort.value }))
const {
  list: recList,
  total: recTotal,
  runAsync: runRecList,
  loading: loadingRec,
  loadMore: loadMoreRec,
} = useList(ApiMemberGameRecList)
const paramsCate = computed(() => ({ cid: cid.value }))
const {
  list: cateList,
  total: cateTotal,
  runAsync: runCateGames,
  loading: loadingCate,
  loadMore: loadMoreCate,
} = useList(ApiMemberGameCateGames)
// 页面数据
const list = computed(() => {
  if (isProvider.value)
    return gameList.value
  else if (isRec.value)
    return recList.value
  else if (isCat.value)
    return cateList.value

  return []
})
const total = computed(() => {
  if (isProvider.value)
    return gameTotal.value
  else if (isRec.value)
    return recTotal.value
  else if (isCat.value)
    return cateTotal.value
  return 0
})
const loading = computed(() => {
  if (isProvider.value)
    return loadingGame.value
  else if (isRec.value)
    return loadingRec.value
  else if (isCat.value)
    return loadingCate.value
  return false
})
const push = computed(() => {
  if (isProvider.value)
    return loadMoreGame
  else if (isRec.value)
    return loadMoreRec
  else if (isCat.value)
    return loadMoreCate
  return () => { }
})

// 获取数据
function getData() {
  if (isProvider.value)
    runGameList(paramsGame.value)
  else if (isRec.value)
    runRecList(paramsRec.value)
  else if (isCat.value)
    runCateGames(paramsCate.value)
}
// 游戏提供商选择变化
function onPlatTypeChecked(v: string) {
  runGameList({ ...paramsGame.value, platform_id: v })
}
// 排序变化
// function onSortChange(v: any) {
//   sort.value = v
//   getData()
// }

// 路由变化
const stop = watch(route, (a) => {
  currentType.value = a.params.gameType.toString()
  sort.value = EnumCasinoSortType.recommend
  getData()
})
onBeforeRouteLeave(() => {
  stop()
})

// 初始化
if (isProvider.value)
  await application.allSettled([runGameList(paramsGame.value)])
else if (isRec.value)
  await application.allSettled([runRecList(paramsRec.value)])
else if (isCat.value)
  await application.allSettled([runCateGames(paramsCate.value)])
</script>

<template>
  <div>
    <section class="layout-spacing tg-game-type-page">
      <div class="group-banner-wrap" :class="{ 'less-than-700': appContentWidth <= 700 }">
        <div class="group-banner-bg" />
        <div class="banner-wrap">
          <div class="banner">
            <div class="left">
              <h1>
                <span>{{ title }}</span>
              </h1>
            </div>
            <div class="right">
              <BaseImage url="/img/casino/group-banner-default.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <AppGameSearch game-type="1" />
      </div>
      <div class="mt-24">
        <AppGroupFilter
          :game-type="currentType" :sort-type="sort"
          @plat-type-checked="onPlatTypeChecked"
        />
      </div>
      <div class="mt-24">
        <AppCardList :list="list ?? []" />
      </div>
      <div class="load-more mt-24">
        <AppPercentage :total="total" :percentage="list?.length" />
        <BaseButton
          v-show="list && list?.length < total" size="md" :loading="loading"
          @click="push"
        >
          <div>
            {{ $t('load_more') }}
          </div>
        </BaseButton>
      </div>
      <AppProviderSlider />
    </section>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.load-more {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-16);

  button {
    width: 184px;
    height: 44px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
  browserTitle: Play Slots Online - Best Casino Slot Games at Stake.com
</route>
