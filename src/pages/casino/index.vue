<script setup lang='ts'>
const gameType = ref('')
const tabList = [
  { label: '大厅', value: 'all' },
  { label: '真人娱乐场', value: 'real' },
  { label: '特色老虎机', value: 'slot' },
  { label: '游戏节目', value: 'live' },
  { label: 'Stake 原创游戏', value: 'origin' },
]

const gameInfo = { id: 2, url: 'https://mediumrare.imgix.net/d51d84f1074e5b54c25c54e6cbf026a4e352c491e7a574d3da6504743d71e2d6?&dpr=2&format=auto&auto=format&q=50&w=167', name: 'plynko' }
const gameList = Array(66).fill(gameInfo)
const gameProviders = [
  { id: '0', src: 'https://mediumrare.imgix.net/be6c453a8f450c2fbf5181abc844f080b537458061aeca3902575510acacdbea?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/fffebb8ad954c1fdcaca444cf83308ef0226ea06f8aa7a8d0a4e5f50c1d433c7?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/22312812dc37b6e91ba3534d88abb3e92599818d8b7adb5fec4f43353d9485fa?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/49a2201353bd06c3f89a9c5ff56d0efee785712e77786d4200d6fbc4ffc0e73d?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/bbe0383f83f2e71badab4b10933267b48ea655c522873a74ca22059d36b44220?&dpr=2&format=auto&auto=format&q=50' },
]
</script>

<template>
  <div class="layout-spacing">
    <div class="hero-wrapper mt-24">
      <AppBanner />
    </div>
    <div class="mt-24">
      <AppGameSearch game-type="2" />
    </div>
    <div class="mt-24">
      <BaseTab v-model="gameType" :list="tabList" />
    </div>
    <div class="content-wrapper">
      <AppSlider api="" icon="chess-original-game" :title="$t('casino_origin_game')" :data="gameList" />
      <AppSlider api="" icon="chess-game-provider" :title="$t('casino_provider')" :data="gameProviders" :show-view-all="false">
        <template #default="{ item }">
          <div class="provider-item-wrap">
            <BaseImage :url="item.src" />
          </div>
        </template>
      </AppSlider>
    </div>
  </div>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang='scss' scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
