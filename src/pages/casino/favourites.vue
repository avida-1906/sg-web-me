<script setup lang="ts">
const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env

const { list, page, runAsync, prev, next, hasMore } = useList(ApiMemberFavList, {}, { page_size: VITE_CASINO_HOME_PAGE_SIZE })

await application.allSettled([runAsync()])
</script>

<template>
  <section class="tg-favourites layout-spacing">
    <div class="group-banner-wrap">
      <div class="group-banner-bg" />
      <div class="banner-wrap">
        <div class="banner">
          <div class="left">
            <h1>
              <span>收藏夹</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage url="/img/casino/group-banner-default.png" />
          </div>
        </div>
      </div>
    </div>
    <AppGameSearch game-type="1" />
    <template v-if="list.length > 0">
      <AppCardList :list="list" />
    </template>
    <div v-else class="no-data">
      暂无任何收藏，请使用
      <div class="icon">
        <BaseIcon name="chess-star" />
      </div>
      把游戏添加到收藏夹中。
    </div>
    <div class="btns">
      <BaseButton type="text" :disabled="page === 1" @click="prev">
        {{ $t('page_prev') }}
      </BaseButton>
      <BaseButton type="text" :disabled="!hasMore" @click="next">
        {{ $t('page_next') }}
      </BaseButton>
    </div>
  </section>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang="scss" scoped>
.tg-favourites{
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-24);
}
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
.no-data{
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tg-text-lightgrey);
  font-size:var(--tg-font-size-default);
  .icon{
    margin: 0 var(--tg-spacing-8);
  }
}
.btns{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
