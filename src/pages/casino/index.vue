<script setup lang='ts'>
const gameType = ref('all')
const tabList = [
  { label: '大厅', value: 'all' },
  { label: '真人娱乐场', value: '1' },
  { label: '特色老虎机', value: '3' },
]

const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env

const { gameList, gameProviders } = useGameList()
const { list: liveList } = useApiGameList({ page: 1, page_size: VITE_CASINO_HOME_PAGE_SIZE, game_type: 1 })
const { list: slotList } = useApiGameList({ page: 1, page_size: VITE_CASINO_HOME_PAGE_SIZE, game_type: 3 })
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
      <AppSlider api="" icon="chess-original-game" title="真人娱乐场" :data="liveList" />
      <AppSlider api="" icon="chess-original-game" title="特色老虎机" :data="slotList" />
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
