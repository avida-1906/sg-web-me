<script setup lang='ts'>
interface Props {
  gameType: string
  sortType: string
  pids: string
}
const props = defineProps<Props>()
const route = useRoute()

const { VITE_CASINO_GAME_PAGE_SIZE } = getEnv()
const { push } = useLocalRouter()

const currentType = ref(props.gameType)
const isRec = computed(() => currentType.value === 'rec') // 推荐游戏
const isProvider = computed(() => currentType.value === 'provider') // 供应商
const isCat = computed(() => currentType.value === 'category') // 类别
// 类别游戏数据
const cid = computed(() => isCat.value ? route.query.cid?.toString() ?? '' : '')

// 参数
const pid = computed(() =>
  isProvider.value ? route.query.pid?.toString() : void 0)
const vid = computed(() =>
  isProvider.value ? route.query.vid?.toString() : void 0)

const paramsGame = computed(() =>
  ({
    platform_id: pid.value,
    sort: props.sortType,
    venue_id: vid.value,
  }))
// 场馆游戏
const {
  list: gameList,
  total: gameTotal,
  runAsync: runGameList,
  loading: loadingGame,
  loadMore: loadMoreGame,
} = useList(ApiMemberGameList, {}, { page_size: VITE_CASINO_GAME_PAGE_SIZE })
// 推荐游戏
const paramsRec = computed(() => ({ sort: props.sortType, platform_id: props.pids }))
const {
  list: recList,
  total: recTotal,
  runAsync: runRecList,
  loading: loadingRec,
  loadMore: loadMoreRec,
} = useList(ApiMemberGameRecList, {}, { page_size: VITE_CASINO_GAME_PAGE_SIZE })
// 类别游戏
const paramsCate = computed(() => ({
  cid: cid.value,
  sort: props.sortType,
  venue_id: props.pids,
}))
const {
  list: cateList,
  total: cateTotal,
  runAsync: runCateGames,
  loading: loadingCate,
  loadMore: loadMoreCate,
} = useList(ApiMemberGameCateGames, {}, { page_size: VITE_CASINO_GAME_PAGE_SIZE })
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
const pushData = computed(() => {
  if (isProvider.value)
    return loadMoreGame
  else if (isRec.value)
    return loadMoreRec
  else if (isCat.value)
    return loadMoreCate
  return () => { }
})

// 检查场馆是否开启
function checkPlat() {
  return new Promise((resolve, reject) => {
    ApiMemberPlatformState(pid.value || vid.value || '').then((res) => {
      if (res === 1) {
        resolve(res)
      }
      else {
        push('/')
        reject(res)
      }
    })
      .catch((err) => {
        push('/')
        reject(err)
      })
  })
}

// 检查类别是否开启
function checkCate() {
  return new Promise((resolve, reject) => {
    ApiMemberCateState(cid.value || '').then((res) => {
      if (res === 1) {
        resolve(res)
      }
      else {
        push('/')
        reject(res)
      }
    })
      .catch((err) => {
        push('/')
        reject(err)
      })
  })
}

// 初始化
if (isProvider.value)
  await application.allSettled([checkPlat().then(() => runGameList(paramsGame.value))])
else if (isRec.value)
  await application.allSettled([runRecList(paramsRec.value)])
else if (isCat.value)
  await application.allSettled([checkCate().then(() => runCateGames(paramsCate.value))])
</script>

<template>
  <div class="mt-24">
    <AppCardList :list="list ?? []" />
  </div>
  <div class="load-more mt-24">
    <AppPercentage :total="total" :percentage="list?.length" />
    <BaseButton
      v-show="list && list?.length < total" size="md" :loading="loading"
      @click="pushData"
    >
      <div>
        {{ $t('load_more') }}
      </div>
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
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
