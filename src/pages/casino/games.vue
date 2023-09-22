<script setup lang='ts'>
const { isMobile } = storeToRefs(useWindowStore())
const { bool: isTheatre, setBool } = useBoolean(false) // 影院模式

const { gameList, gameProviders } = useGameList()
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre && !isMobile }">
    <AppIframe :is-theatre="isTheatre" @change-theatre="setBool" />
    <AppDesc />
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
</template>

<style lang='scss' scoped>
.casino-games {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3vw;
}

.theatre {
  padding: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
