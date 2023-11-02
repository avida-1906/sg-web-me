<script setup lang="ts">
const { appContentWidth } = storeToRefs(useWindowStore())

const { list, page, runAsync, prev, next, hasMore } = useList(ApiMemberFavList)

await application.allSettled([runAsync()])
</script>

<template>
  <section class="layout-spacing tg-favourites">
    <div class="group-banner-wrap" :class="{ 'less-than-700': appContentWidth <= 700 }">
      <div class="group-banner-bg" />
      <div class="banner-wrap">
        <div class="banner">
          <div class="left">
            <h1>
              <span>收藏夹</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage url="/png/casino/group-banner-default.png" />
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
  browserTitle: 热门赌场游戏 – Stake.com
</route>
