<script setup lang="ts">
const gameProviders = [
  { id: '0', src: 'https://mediumrare.imgix.net/be6c453a8f450c2fbf5181abc844f080b537458061aeca3902575510acacdbea?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/fffebb8ad954c1fdcaca444cf83308ef0226ea06f8aa7a8d0a4e5f50c1d433c7?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/22312812dc37b6e91ba3534d88abb3e92599818d8b7adb5fec4f43353d9485fa?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/49a2201353bd06c3f89a9c5ff56d0efee785712e77786d4200d6fbc4ffc0e73d?&dpr=2&format=auto&auto=format&q=50' },
  { id: '0', src: 'https://mediumrare.imgix.net/bbe0383f83f2e71badab4b10933267b48ea655c522873a74ca22059d36b44220?&dpr=2&format=auto&auto=format&q=50' },
]
</script>

<template>
  <div>
    <section class="layout-spacing tg-game-type-page">
      <div class="group-banner-wrap">
        <div class="group-banner-bg" />
        <div class="banner-wrap">
          <div class="banner">
            <div class="left">
              <h1>
                <span>老虎机</span>
              </h1>
            </div>
            <div class="right">
              <BaseImage url="/img/casino/group-banner-slots.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <AppGameSearch game-type="2" />
      </div>
      <div class="mt-24">
        <AppGroupFilter />
      </div>
      <div class="mt-24">
        <AppCardList />
      </div>
      <div class="load-more mt-24">
        <AppPercentage />
        <BaseButton size="md">
          <div>加载更多</div>
        </BaseButton>
      </div>
      <div class="">
        <AppSlider api="" icon="chess-game-provider" :title="$t('casino_provider')" :data="gameProviders" :show-view-all="false">
          <template #default="{ item }">
            <div class="provider-item-wrap">
              <BaseImage :url="item.src" />
            </div>
          </template>
        </AppSlider>
      </div>
    </section>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.load-more {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-16);
  button {
    width: 184px;
    height: 44px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
