<script setup lang="ts">
const props = defineProps<{ gameType: string }>()

const { appContentWidth } = storeToRefs(useWindowStore())
const route = useRoute()
const title = computed(() => route.query.name)
const { bool: loading } = useBoolean(false)

const currentType = ref(props.gameType)

function handleBeforeUnmounted() {
  loading.value = true
}
function handleMounted() {
  const t = setTimeout(() => {
    loading.value = false
    clearTimeout(t)
  }, 500)
}
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
        />
      </div>
      <div v-show="loading" class="loading">
        <BaseLoading />
      </div>
      <AppCasinoGameTypeGameList
        :key="route.fullPath" :game-type="gameType"
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
