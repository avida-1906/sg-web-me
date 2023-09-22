<script setup lang='ts'>
const gameType = ref('')
const tabList = [
  { label: '大厅', value: 'all' },
  { label: '真人娱乐场', value: 'real' },
  { label: '特色老虎机', value: 'slot' },
  { label: '游戏节目', value: 'live' },
  { label: 'Stake 原创游戏', value: 'origin' },
]

const { gameList, gameProviders } = useGameList()
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
      <BaseTab v-model="gameType" :list="tabList" :center="false" />
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
