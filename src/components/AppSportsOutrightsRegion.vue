<script setup lang='ts'>
interface Props {
  title?: string
  icon?: string
  init?: boolean
  count: number
  leagueList: {
    ci: string
    cn: string
    c: number
  }[]
  isHotGame?: boolean
}

const props = defineProps<Props>()
const { bool: isOpen, toggle: toggleOpen } = useBoolean(props.init)
</script>

<template>
  <div
    class="base-secondary-accordion level-1"
    :class="{ 'is-open': isOpen }"
  >
    <div class="header no-active-scale" @click="toggleOpen">
      <div class="container">
        <div class="container" style="--app-sport-image-error-icon-size:16px;">
          <AppImage
            v-if="icon" width="16px" height="16px" is-cloud :url="icon"
            style="border-radius: 50%;overflow: hidden;flex-shrink: 0;"
          />
          <div class="container">
            <div class="center">
              <span>{{ title }}</span>
            </div>
          </div>
        </div>
        <div v-show="!isOpen" class="accordion-badge-wrap">
          <BaseBadge :count="count" :max="99999" />
        </div>
      </div>
      <div class="arrow" :class="{ down: isOpen }">
        <BaseIcon name="uni-arrow-left" />
      </div>
    </div>
    <div v-show="isOpen" class="content" :class="{ 'is-open': isOpen }">
      <div class="acc-box">
        <AppSportsOutrightsLeague
          v-for="league, ii in leagueList"
          :key="league.ci"
          :auto-show="!!isHotGame && ii === 0"
          :league-name="league.cn"
          :league-id="league.ci"
          :is-region-open="isOpen"
          :count="league.c"
        />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
  padding: var(--tg-spacing-8);
}
.load-more-box {
  padding-left: var(--tg-spacing-16);
  padding-top: var(--tg-spacing-12);
  padding-bottom: var(--tg-spacing-12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
@keyframes aniScale {
  0% {
    transform: scale(0.85);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0.85);
  }
}
.ani-scale {
  animation: 800ms linear 0ms infinite normal both running aniScale;
}
.level-1 {
  --tg-secondaryAccordion-header-background: var(--tg-text-grey-deep);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-white);
  --tg-secondaryAccordion-content-background: var(--tg-primary-main);
  --tg-secondaryAccordion-content-border-color: var(--tg-text-grey-deep);
  .arrow {
    --tg-icon-color: var(--tg-text-white);
  }
}
.level-2 {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
}
.level-3 {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-dark);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-dark);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
  .arrow {
    --tg-icon-color: var(--tg-text-white);
  }
}
.base-secondary-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 0;
  box-shadow: var(--tg-box-shadow), var(--tg-shadow-inset);
  border-radius: var(--tg-radius-default);
  background: var(--header-background);
  --header-background: var(--tg-secondaryAccordion-header-background);
  --title-color: var(--tg-secondaryAccordion-header-title-color);
  --content-background: var(--tg-secondaryAccordion-content-background);
  --content-border: var(--tg-secondaryAccordion-content-border-color);
  &.is-open {
    .header {
      border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
    }
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-base);
    width: var(--tg-spacing-18);
    height: var(--tg-spacing-18);
    transition: all ease .25s;
    &.down{
      transform: rotate(-90deg);
    }
  }
  .header {
    width: 100%;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: 0 0;
    padding: var(--tg-spacing-12) var(--tg-spacing-16);
    color: var(--title-color);
    cursor: pointer;
    border-radius: var(--tg-radius-default);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 1.5;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--tg-spacing-8);
      width: 100%;
    }
    .center {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: var(--tg-spacing-8);
      color: var(--tg-text-white);
      > span {
        display: inline-flex;
        align-items: center;
        text-align: left;
        justify-content: flex-start;
      }
    }
  }
  .content {
    background: var(--content-background);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);
    &.is-open {
      border-top: 2px solid var(--content-border);
    }
  }
  .show-more {
    --tg-spacing-button-padding-vertical-xs: 0;
    --tg-spacing-button-padding-horizontal-xs: 0;
    hr {
      background: var(--tg-secondary-main);
      height: 2px;
      width: 100%;
      margin-top: var(--tg-spacing-8);
    }
  }
}
.icon{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
