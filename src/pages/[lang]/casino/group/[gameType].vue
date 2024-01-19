<script setup lang="ts">
const props = defineProps<{ gameType: string }>()

const { t } = useI18n()
const { appContentWidth, isMobile } = storeToRefs(useWindowStore())
const casinoStore = useCasinoStore()
const { cateProviderData, platformList, lobbyBdata } = storeToRefs(casinoStore)
const route = useRoute()
const title = computed(() => route.query.name)
const { bool: loading } = useBoolean(false)
const titles = computed<any>(() => ({
  3: t('page_title_live'),
}))

const gameListRef = ref()
const currentType = ref(props.gameType)
const sortType = ref(EnumCasinoSortType.recommend)
const pids = ref('')
const cid = ref(route.query.cid ? route.query.cid?.toString() ?? '0' : '0')
usePageTitle({
  prefix: cid.value && titles.value[cid.value]
    ? titles.value[cid.value]
    : title,
})

const isRec = computed(() => currentType.value === 'rec') // 推荐游戏
const isCat = computed(() => currentType.value === 'category') // 类别
const isProvider = computed(() => currentType.value === 'provider') // 供应商
const vid = computed(() =>
  isProvider.value ? route.query.vid?.toString() : void 0)

// 类别场馆列表
const {
  data: catGameData,
  run: runGameCate,
} = useRequest(ApiMemberGameCate, {
  onSuccess: () => {
    scrollToTop()
  },
})

const platformOptions = computed(() => {
  if (isCat.value && catGameData.value) {
    return catGameData.value.sums.map((a) => {
      return {
        label: a.platform_name,
        value: a.platform_id,
        count: a.total,
        isChecked: false,
      }
    })
  }
  else if (isRec.value) {
    return platformList.value.map((p) => {
      const label = p.name
      const value = p.id
      const count = p.game_num
      const isChecked = false
      return { ...p, label, value, count, isChecked }
    })
  }
  return []
})
const bannerBg = computed(() => {
  if (isRec.value) {
    return '/png/casino/group-banner-default.png'
  }
  else if (isProvider.value) {
    return platformList.value.find(a => a.venue_id === vid.value)?.background ?? ''
  }
  else {
    if (lobbyBdata.value)
      return casinoStore.getBg(cid.value)
    return ''
  }
})

function startLoading() {
  loading.value = true
}
function stopLoading() {
  const t = setTimeout(() => {
    loading.value = false
    clearTimeout(t)
  }, 500)
}
// 游戏提供商选择变化
function onPlatTypeChecked(v: string) {
  pids.value = v
  gameListRef.value.init()
}
// 排序变化
function onSortChange(v: any) {
  sortType.value = v
  gameListRef.value.init()
}

watch(route, (a) => {
  if (a.params.gameType) {
    currentType.value = a.params.gameType.toString()
    cid.value = a.query.cid ? route.query.cid?.toString() ?? '0' : '0'
    pids.value = ''
    sortType.value = EnumCasinoSortType.hot

    if (isCat.value)
      runGameCate({ cid: cid.value })

    gameListRef.value.init()

    setTimeout(() => {
      scrollToTop()
    }, 50)
  }
})

onMounted(() => {
  if (isCat.value)
    runGameCate({ cid: cid.value })
  setTimeout(() => {
    scrollToTop()
  }, 50)
})
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
            <div
              class="right center" :style="{
                '--app-sport-image-error-icon-size': '20px',
              }"
            >
              <AppImage
                :key="bannerBg"
                :is-cloud="!isRec"
                style="height: 100%;width: auto;"
                :url="bannerBg"
                loading="eager"
                err-icon="uni-game-err"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isMobile" class="tg-mt-24">
        <AppGameSearch :key="currentType + cid + pids" game-type="1" />
      </div>
      <div class="tg-mt-24">
        <AppGroupFilter
          :game-type="currentType"
          :sort-type="sortType"
          :platform-options="platformOptions"
          :disabled="false"
          @plat-type-checked="onPlatTypeChecked"
          @sort-type-change="onSortChange"
        />
      </div>
      <AppLoading v-if="loading" full-screen />
      <AppCasinoGameTypeGameList
        ref="gameListRef" :game-type="gameType"
        :sort-type="sortType" :pids="pids"
        @request-finish="stopLoading" @loading="startLoading"
      />
      <AppProviderSlider
        :icon="cateProviderData?.icon ?? ''"
        :list="cateProviderData?.games ?? []"
        :title="cateProviderData?.name ?? ''"
      />
    </section>
    <AppBetData mode="casino" />
  </div>
</template>

<style lang="scss" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
