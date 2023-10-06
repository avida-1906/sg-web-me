<script setup lang='ts'>
interface Props {
  layout?: 'horizontal' | 'vertical'
  active?: boolean
  disabled?: boolean
}
withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})
</script>

<template>
  <div class="app-sports-bet-button" :class="{ active, disabled }">
    <div class="content" :class="[layout]">
      <div class="name">
        汉夫曼，扬尼克
      </div>
      <span v-if="disabled" class="status">暂停</span>
      <AppSportsOdds v-else :style="`--tg-sports-odds-color:${active ? 'var(--tg-text-white)' : ''}`" :arrow="layout === 'horizontal' ? 'left' : 'right'" odds="1.65" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-button {
  background: var(--tg-secondary-deepdark);
  border-radius: var(--tg-radius-default);
  transition: all .1s;
  width: 100%;
  position: relative;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  min-width: 0;
  padding: 0.5em 0.75em;
  line-height: 1.5;
  cursor: pointer;

  .content {
    display: flex;

    .name {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.horizontal {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &.vertical {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }

  &:hover {
    background: var(--tg-bet-button-deepblue);
  }

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  &.active {
    background: var(--tg-text-blue);
    box-shadow: var(--tg-box-shadow-lg);

    .name {
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-black);
    }
  }

  &.disabled {
    pointer-events: none;

    .name {
      opacity: 0.2;
    }
    .status{
      opacity: 0.4;
    }
  }
}
</style>
