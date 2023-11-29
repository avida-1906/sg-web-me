<script setup lang="ts">
const props = defineProps<{ gameType: string }>()

const { appContentWidth } = storeToRefs(useWindowStore())
const { platformList } = storeToRefs(useCasinoStore())
const route = useRoute()
const title = computed(() => route.query.name)
const { bool: loading } = useBoolean(false)
usePageTitle({ prefix: title })

const currentType = ref(props.gameType)
const sortType = ref(EnumCasinoSortType.hot)
const pids = ref('')
const cid = ref(route.query.cid ? route.query.cid?.toString() ?? '' : '')

const isRec = computed(() => currentType.value === 'rec') // 推荐游戏
const isCat = computed(() => currentType.value === 'category') // 类别

// 类别场馆列表
const {
  data: catGameData,
  run: runGameCate,
} = useRequest(ApiMemberGameCate)

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

function handleBeforeUnmounted() {
  loading.value = true
}
function handleMounted() {
  const t = setTimeout(() => {
    loading.value = false
    clearTimeout(t)
  }, 500)
}
// 游戏提供商选择变化
function onPlatTypeChecked(v: string) {
  pids.value = v
}
// 排序变化
function onSortChange(v: any) {
  sortType.value = v
}

watch(route, (a) => {
  if (a.params.gameType) {
    currentType.value = a.params.gameType.toString()
    cid.value = a.query.cid ? route.query.cid?.toString() ?? '' : ''
    pids.value = ''
    sortType.value = EnumCasinoSortType.hot
  }
})

onMounted(() => {
  if (isCat.value)
    runGameCate({ cid: cid.value })
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
            <div class="right">
              <BaseImage url="/png/casino/group-banner-default.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <AppGameSearch game-type="1" />
      </div>
      <div class="mt-24">
        <AppGroupFilter
          :game-type="currentType"
          :sort-type="sortType"
          :platform-options="platformOptions"
          @plat-type-checked="onPlatTypeChecked"
          @sort-type-change="onSortChange"
        />
      </div>
      <div v-show="loading" class="loading">
        <BaseLoading />
      </div>
      <AppCasinoGameTypeGameList
        :key="route.fullPath + pids + sortType" :game-type="gameType"
        :sort-type="sortType" :pids="pids"
        @vue:mounted="handleMounted" @vue:before-unmount="handleBeforeUnmounted"
      />
      <AppProviderSlider />
    </section>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.loading{
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
