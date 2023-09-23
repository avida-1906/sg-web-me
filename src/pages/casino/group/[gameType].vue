<script setup lang="ts">
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
          <div>{{ $t('load_more') }}</div>
        </BaseButton>
      </div>
      <AppProviderSlider />
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
