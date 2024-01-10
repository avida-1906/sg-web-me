<script setup lang="ts">
usePageTitle({ prefix: 'recent_casino_game', isT: true })
const { appContentWidth, isMobile } = storeToRefs(useWindowStore())
</script>

<template>
  <section class="layout-spacing tg-favourites">
    <div class="group-banner-wrap" :class="{ 'less-than-700': appContentWidth <= 700 }">
      <div class="group-banner-bg" />
      <div class="banner-wrap">
        <div class="banner">
          <div class="left">
            <h1>
              <span>{{ $t('recent_game_record') }}</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage
              url="/png/casino/group-banner-default.png"
              style="height: 100%;width: auto;"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isMobile" class="tg-mt-24">
      <AppGameSearch game-type="1" />
    </div>
    <div class="tg-mt-24">
      <AppCardList />
    </div>
  </section>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang="scss" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
