<script setup lang='ts'>
import SportsLive from '~/pages/sports/live/index.vue'
import SportsUpComing from '~/pages/sports/upcoming/index.vue'
import SportsMyBets from '~/pages/sports/my-bets.vue'
import SportsFavourites from '~/pages/sports/favourites.vue'

defineOptions({
  name: 'KeepAliveSports',
})

const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())

const marketType = ref('all')
const tabList = [
  { label: '大厅', value: 'all', icon: 'spt-basketball' },
  { label: '我的投注', value: 'my-bet', icon: 'spt-user-bet', disabled: !isLogin.value },
  { label: '收藏夹', value: 'fav', icon: 'uni-favorites', disabled: !isLogin.value },
  { label: '滚球盘', value: 'live', icon: 'spt-ball-plate' },
  { label: '即将开赛', value: 'soon', icon: 'spt-timing' },
]
const currentGame = ref('2')
const gameList = [
  { name: '网球', id: '2', num: 22 },
  { name: '足球', id: '3', num: 30 },
  { name: '美式橄榄球', id: '4', num: 5 },
  { name: '乒乓球', id: '7', num: 7 },
  { name: '篮球', id: '6', num: 6 },
  { name: '英雄联盟', id: '24', num: 24 },
]
const { bool: isBase, toggle: toggleBase } = useBoolean(true)
const marketTypeText = computed(() => isBase.value ? '三项投注' : '标准')
// 标准盘选项
const baseType = ref('winner')
const baseOptions = [
  { label: '获胜盘', value: 'winner' },
  { label: '让分盘', value: 'handicap' },
  { label: '总分盘', value: 'total' },
]
// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: '主页', value: 'home' },
]
</script>

<template>
  <div class="sports sports-layout-home">
    <div class="layout-spacing">
      <div class="hero-wrapper mt-24">
        <AppBanner />
      </div>
      <div v-if="!isMobile" class="mt-24">
        <AppGameSearch game-type="2" />
      </div>
      <div class="mt-24">
        <BaseTab v-model="marketType" size="large" :list="tabList" :center="false" />
      </div>
    </div>

    <!-- 大厅 -->
    <div v-if="marketType === 'all'" class="hall">
      <div class="sports-page-title">
        <div class="left">
          <BaseIcon name="spt-ball-plate" />
          <h6>滚球盘</h6>
        </div>
        <div class="right">
          <VMenu placement="top">
            <BaseButton size="sm" type="text" @click="toggleBase">
              <BaseIcon v-if="isBase" name="uni-three-top" />
              <BaseIcon v-else name="uni-standard" />
            </BaseButton>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ marketTypeText }}
              </div>
            </template>
          </VMenu>

          <BaseSelect v-if="isBase" v-model="baseType" :options="baseOptions" popper />
          <BaseSelect v-else v-model="threeType" :options="threeOptions" popper disabled />
        </div>
      </div>
      <AppSportsTab v-model="currentGame" :list="gameList" />
    </div>

    <!-- 我的投注 -->
    <SportsMyBets v-else-if="marketType === 'my-bet'" />
    <!-- 收藏夹 -->
    <SportsFavourites v-else-if="marketType === 'fav'" />
    <!-- 滚球 -->
    <SportsLive v-else-if="marketType === 'live'" />
    <!-- 即将开赛 -->
    <SportsUpComing v-else-if="marketType === 'soon'" />

    <div class="layout-spacing">
      <AppBetData mode="casino" />
    </div>
  </div>
</template>

<style lang='scss' scoped></style>

<route lang="yaml">
name: sports-home
meta:
  layout: home
</route>
