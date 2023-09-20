<script setup lang="ts">
</script>

<template>
  <section class="tg-favourites layout-spacing">
    <div class="group-banner-wrap">
      <div class="group-banner-bg" />
      <div class="banner-wrap">
        <div class="banner">
          <div class="left">
            <h1>
              <span>近期游戏记录</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage url="/img/casino/group-banner-default.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24">
      <AppGameSearch game-type="2" />
    </div>
    <div class="mt-24">
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
