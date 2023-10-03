<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveSports',
})

const { isMobile } = storeToRefs(useWindowStore())

const gameType = ref('all')
const tabList = [
  { label: '大厅', value: 'all', icon: 'spt-basketball' },
  { label: '我的投注', value: 'my-bet', icon: 'spt-user-bet' },
  { label: '收藏夹', value: 'fav', icon: 'uni-favorites' },
  { label: '滚球盘', value: 'live', icon: 'spt-ball-plate' },
  { label: '即将开赛', value: 'soon', icon: 'spt-timing' },
]
</script>

<template>
  <div class="sports">
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
    </div>
    <div class="layout-spacing">
      <AppBetData mode="casino" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports{
}
</style>

<route lang="yaml">
meta:
  layout: home
  </route>
