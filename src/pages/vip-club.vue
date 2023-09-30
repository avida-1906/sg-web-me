<script lang="ts" setup>
const {
  appContentWidth,
  widthBoundarySm,
} = storeToRefs(useWindowStore())
const isSm = computed(() => appContentWidth.value < widthBoundarySm.value)
</script>

<template>
  <div class="tg-vip-club">
    <div class="vip-banner">
      <div class="banner-wrap" :class="{ 'is-sm': isSm }">
        <div class="banner-left">
          <p class="left-title">
            无与伦比的 VIP 体验
          </p>
          <p class="left-desc">
            解锁专属福利并获得无需任何附加条件即可立即提取的奖金。
          </p>
          <div class="left-btns">
            <BaseButton bg-style="secondary" size="md">
              <span>开始游戏</span>
            </BaseButton>
            <BaseButton size="md">
              <a href="#">查看 VIP 级别表</a>
            </BaseButton>
          </div>
        </div>
        <div class="banner-right">
          <BaseImage v-if="!isSm" url="https://mediumrare.imgix.net//vip-club-header.png?&amp;dpr=2&amp;format=auto&amp;auto=format&amp;q=50" />
          <BaseImage v-else url="https://mediumrare.imgix.net//vip-club-header-mobile.png?&amp;dpr=2&amp;format=auto&amp;auto=format&amp;q=50" width="80px" class="base-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-vip-club {
  padding: var(--tg-spacing-56) 0;
    position: relative;
  &::before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1000px;
      right: -1000px;
      background-color: var(--tg-secondary-dark);
    }
  .vip-banner{
    position: relative;
    .banner-wrap{
      width: 100%;
      max-width: 1200px;
      display: grid;
      grid-template-areas: "headerText headerImage";
      grid-template-columns: 1fr 400px;
      gap: 1.5rem;
      .banner-left{
        display: flex;
        flex-direction: column;
        gap: .75rem;
        grid-area: headerText;
        .left-title{
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-3xl);
          font-weight: var(--tg-font-weight-bold);
          line-height: 42px;
        }
        .left-desc{
          color: var(--tg-text-lightgrey);
          font-size: var(--tg-font-size-base);
          line-height: 24px;
        }
        .left-btns{
          margin-top: var(--tg-spacing-12);
          font-size: var(--tg-font-size-default);
          display: flex;
          gap: .5rem;
          flex-wrap: wrap;
        }
      }
      .banner-right{
        grid-area: headerImage;
        .base-image{
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      &.is-sm{
        grid-template-areas:
        "headerImage"
        "headerText";
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
