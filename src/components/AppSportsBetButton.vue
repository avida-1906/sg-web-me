<script setup lang='ts'>
interface Props {
  layout?: 'horizontal' | 'vertical'
}
withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})
</script>

<template>
  <div class="app-sports-bet-button" :class="[layout]">
    <div class="content">
      <div class="name">
        汉夫曼，扬尼克
      </div>
      <div class="odd-box">
        <span class="odd">1.65</span>
        <div class="icon arrow-odd odd-up">
          <BaseIcon name="uni-tri-up" />
        </div>
      </div>
      <!-- <div class="status">
      暂停
    </div> -->
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-button {
  display: flex;
  background: var(--tg-secondary-deepdark);
  border-radius: var(--tg-radius-default);
  transition: all .1s;
  justify-content: center;
  width: 100%;
  position: relative;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  align-items: flex-start;
  min-width: 0;
  padding: 0.5em 0.75em;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    background: var(--tg-bet-button-deepblue);
  }

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  .name {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .odd-box {
    display: flex;
    align-items: center;

    .icon {
      font-size: var(--tg-spacing-8);
      margin-left: var(--tg-spacing-4);
    }

    .odd {
      color: var(--tg-text-lightblue);
      font-weight: var(--tg-font-weight-bold);
    }
  }

  &.horizontal {
    flex-direction: row;
    align-items: center;
  }

  &.vertical {
    flex-direction: column;
  }
}
</style>
