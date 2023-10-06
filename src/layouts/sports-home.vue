<script setup lang='ts'>
import Home from './home.vue'

const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const { animatingMounted, animatingWatch } = useLayoutAnimate({ aniMounted: true, aniRouteNameChange: true })

const gameType = ref('all')
const tabList = [
  { label: '大厅', value: 'all', icon: 'spt-basketball', path: '/sports' },
  { label: '我的投注', value: 'my-bet', icon: 'spt-user-bet', path: '/sports/my-bets', disabled: !isLogin.value },
  { label: '收藏夹', value: 'fav', icon: 'uni-favorites', path: '/sports/favourites', disabled: !isLogin.value },
  { label: '滚球盘', value: 'live', icon: 'spt-ball-plate', path: '/sports/live/tennis' },
  { label: '即将开赛', value: 'soon', icon: 'spt-timing', path: '/sports/upcoming/all' },
]
const keepAliveList = ref<string[]>(['KeepAliveSports'])
</script>

<template>
  <Home>
    <template #default>
      <div :class="{ 'home-slide-fade-enter-active': animatingMounted }">
        <AppContent>
          <div class="sports sports-layout-home">
            <div class="layout-spacing">
              <div class="hero-wrapper mt-24">
                <AppBanner />
              </div>
              <div v-if="!isMobile" class="mt-24">
                <AppGameSearch game-type="2" />
              </div>
              <div class="mt-24">
                <BaseTab v-model="gameType" :list="tabList" :center="false" />
              </div>
              <AppSportsTab v-model="currentGame" :list="gameList" />
            </div>
            <div class="content-container" :class="{ 'home-slide-fade-enter-active': animatingWatch }">
              <RouterView v-slot="{ Component }">
                <template v-if="Component">
                  <KeepAlive :include="keepAliveList" :max="10">
                    <Suspense timeout="0">
                      <component :is="Component" />
                      <template #fallback>
                        <div class="center loading-content-height">
                          <BaseLoading />
                        </div>
                      </template>
                    </Suspense>
                  </KeepAlive>
                </template>
              </RouterView>
            </div>
            <div class="layout-spacing">
              <AppBetData mode="casino" />
            </div>
          </div>
        </AppContent>
      </div>
    </template>
  </Home>
</template>

<style lang='scss' scoped>
.sports {
}
</style>
