<script setup lang="ts">
const props = defineProps<{ gameType: string }>()

const { appContentWidth } = storeToRefs(useWindowStore())
const route = useRoute()
const title = computed(() => route.query.name)
const { bool: loading } = useBoolean(false)

const gameListRef = ref()
const currentType = ref(props.gameType)
const sortType = ref(EnumCasinoSortType.recommend)
const pids = ref('')

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
  nextTick(() => {
    gameListRef.value.getData()
  })
}
// 排序变化
function onSortChange(v: any) {
  sortType.value = v
  nextTick(() => {
    gameListRef.value.getData()
  })
}

watch(route, (a) => {
  currentType.value = a.params.gameType.toString()
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
          @plat-type-checked="onPlatTypeChecked"
          @sort-type-change="onSortChange"
        />
      </div>
      <div v-show="loading" class="loading">
        <BaseLoading />
      </div>
      <AppCasinoGameTypeGameList
        ref="gameListRef"
        :key="route.fullPath" :game-type="gameType" :sort-type="sortType" :pids="pids"
        @vue:mounted="handleMounted"
        @vue:before-unmount="handleBeforeUnmounted"
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
  # 在router.ts中，取route.query.name 作为浏览器动态标题
  # browserTitle: Play Slots Online - Best Casino Slot Games at Stake.com
</route>
