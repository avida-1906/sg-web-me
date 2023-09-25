<script lang="ts" setup>
const { gameProviders } = useGameList()
</script>

<template>
  <div class="tg-app-provider-slider">
    <AppSlider api="" icon="chess-game-provider" :title="$t('casino_provider')" :data="gameProviders" :show-view-all="false" game-type="provider">
      <template #default="{ item }">
        <div class="provider-item-wrap">
          <BaseImage :url="item.src" />
        </div>
      </template>
    </AppSlider>
  </div>
</template>

<style lang="scss">
.tg-app-provider-slider {}
</style>
