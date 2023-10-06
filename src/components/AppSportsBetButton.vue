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
      <div class="odd-box" :class="[layout]">
        <span v-if="disabled" class="status">暂停</span>
        <span v-else class="odd">1.65</span>
        <div v-if="!disabled" class="icon arrow-odd odd-down">
          <BaseIcon name="uni-tri-down" />
        </div>
      </div>
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

    .odd-box {
      display: grid;

      &.horizontal {
        grid-template-areas: "icon odd";

        .icon {
          margin-right: var(--tg-spacing-4);
        }
      }

      &.vertical {
        grid-template-areas: "odd icon";

        .icon {
          margin-left: var(--tg-spacing-4);
        }
      }

      .icon {
        grid-area: icon;
        font-size: var(--tg-spacing-8);
        display: flex;
        align-items: center;
      }

      .odd {
        grid-area: odd;
        color: var(--tg-text-lightblue);
        font-weight: var(--tg-font-weight-bold);
      }

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

    .odd-box {
      .odd {
        color: var(--tg-text-white);
      }
    }
  }

  &.disabled {
    pointer-events: none;

    .name {
      opacity: 0.2;
    }

    .odd-box {
      .status {
        grid-area: odd;
        color: var(--tg-text-white);
        opacity: 0.4;
      }
    }
  }
}
</style>
