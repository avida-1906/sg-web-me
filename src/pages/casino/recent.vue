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
            <BaseImage url="/img/group-banner-default.png" />
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
.group-banner-wrap {
  position: relative;
  .group-banner-bg {
    position: absolute;
    top: 0px;
    height: 100%;
    left: -100%;
    width: 300%;
    background: rgb(33, 55, 67);
  }
  .banner-wrap {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    grid-gap: var(--tg-spacing-button-padding-horizontal-sm);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    line-height: 1;
    .banner {
      width: 100%;
      height: 115px;
      display: flex;
      overflow: hidden;
      justify-content: space-between;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        h1 {
          font-weight: 600;
          font-size: var(--tg-font-size-xl);
          color: var(--tg-text-white);
        }
      }
      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          width: auto;
          height: 100%;
          display: block;
        }
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
